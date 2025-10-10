// lib/embeddings.ts
export async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.gemini.com/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gemini-embedding-001",
      input: text,
    }),
  });

  const data = await res.json();

  // Gemini embedding API returns array under 'embedding'
  return data.embedding;
}
