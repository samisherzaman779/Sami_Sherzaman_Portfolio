import { SYSTEM_PROMPT } from "../data/chatbotKnowledge";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b"; // Groq console se koi aur model bhi choose kar sakte ho

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY set nahi hai." });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages required hain." });
  }

  // Sirf last 12 messages, sirf user/assistant roles, length limit
  const safeMessages = messages
    .filter(
      (m) =>
        m &&
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data?.error?.message || "Groq API error" });
    }

    return res
      .status(200)
      .json({ reply: data.choices?.[0]?.message?.content ?? "" });
  } catch (err) {
    return res.status(500).json({ error: "Server error, dobara try karein." });
  }
}