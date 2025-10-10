import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/chromaConnect";
import { getEmbedding } from "../../lib/embeddings";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    // 1️⃣ Ensure the collection exists
    const collection = await client.getCollection({ name: "transactions" }).catch(() =>
      client.createCollection({ name: "transactions" })
    );

    // 2️⃣ Generate embedding for user query
    const queryEmbedding = await getEmbedding(query);

    // 3️⃣ Retrieve top 3 relevant transactions from ChromaDB
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 3,
    });

    const topMatches = results.metadatas?.[0]
      ?.map((m: any) => m.text)
      .join("\n") || "No relevant transactions found.";

    // 4️⃣ Call Gemini API with retrieved context
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const prompt = `You are a helpful banking assistant. A user asked about their transactions.

User Question: "${query}"

Relevant Transactions:
${topMatches}

Please answer the user's question based on these transactions. Be concise and helpful.`;

    const result = await model.generateContent(prompt);
    const aiAnswer = result.response.text();

    // 5️⃣ Return AI answer
    res.status(200).json({ answer: aiAnswer });
  } catch (err) {
    console.error("Error in AI Copilot:", err);
    res.status(500).json({ error: "AI Copilot failed", details: String(err) });
  }
}
