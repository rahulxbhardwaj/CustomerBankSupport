import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/chromaConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    // 1️⃣ Ensure the collection exists
    const collection =
      (await client.getCollection({ name: "transactions" }).catch(() =>
        client.createCollection({ name: "transactions" })
      ));

    // 2️⃣ Retrieve top 3 relevant transactions from Chroma
    const results = await collection.query({
      queryEmbeddings: [await getEmbedding(userQuery)], // pass embeddings
      nResults: 3,
    });

    const topMatches = results[0]?.matches
      .map((m: any) => m.metadatas.text)
      .join("\n") || "No relevant transactions found.";


    // 3️⃣ Call Gemini API
    const geminiRes = await fetch("https://api.gemini.com/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-001",
        prompt: `You are a banking assistant. User asked: "${query}"\nRelevant transactions:\n${topMatches}\nAnswer the user's query based on these transactions:`,
        max_tokens: 300,
      }),
    });

    const geminiData = await geminiRes.json();
    const aiAnswer = geminiData.choices?.[0]?.text || "No answer from AI.";

    // 4️⃣ Return AI answer
    res.status(200).json({ answer: aiAnswer });
  } catch (err) {
    console.error("Error in API connect:", err);
    res.status(500).json({ error: "AI Copilot failed" });
  }
}
