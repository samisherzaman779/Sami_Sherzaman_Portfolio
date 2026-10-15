
import { SYSTEM_PROMPT } from "../data/chatbotKnowledge.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

export default async function handler(req, res) {
  // Only allow POST requests.
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Validate API key without logging its value.
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    console.error("[Chat API] GROQ_API_KEY is missing.");
    return res.status(500).json({
      error: "Chatbot configuration error. Please try again later.",
    });
  }

  // Validate request body.
  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    console.warn("[Chat API] Invalid or empty messages array.");

    return res.status(400).json({
      error: "A non-empty messages array is required.",
    });
  }

  // Keep only valid user/assistant messages.
  const safeMessages = messages
    .filter(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1500),
    }));

  if (safeMessages.length === 0) {
    console.warn("[Chat API] No valid messages after validation.");

    return res.status(400).json({
      error: "No valid chat messages were provided.",
    });
  }

  try {
    console.info("[Chat API] Sending request to Groq.", {
      model: MODEL,
      messageCount: safeMessages.length,
    });

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...safeMessages,
        ],
        temperature: 0.6,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(25000),
    });

    // Read the body as text first to handle invalid JSON safely.
    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      console.error("[Chat API] Groq returned invalid JSON.", {
        status: response.status,
      });

      return res.status(502).json({
        error: "The AI provider returned an invalid response.",
      });
    }

    if (!response.ok) {
      // Log diagnostic details, never the API key or request headers.
      console.error("[Chat API] Groq request failed.", {
        status: response.status,
        code: data?.error?.code || null,
        type: data?.error?.type || null,
        message: data?.error?.message || "Unknown provider error",
        model: MODEL,
      });

      // Preserve useful status codes while avoiding leaking provider details.
      const status =
        response.status === 401 || response.status === 403
          ? 502
          : response.status === 429
            ? 429
            : response.status >= 500
              ? 502
              : 502;

      return res.status(status).json({
        error:
          status === 429
            ? "The chatbot is temporarily busy. Please try again shortly."
            : "The AI provider could not process your request.",
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      console.error("[Chat API] Groq response contained no reply.", {
        model: MODEL,
      });

      return res.status(502).json({
        error: "The AI provider returned an empty response.",
      });
    }

    console.info("[Chat API] Request completed successfully.", {
      model: MODEL,
    });

    return res.status(200).json({ reply });
  } catch (error) {
    // Log the error type and message without logging credentials.
    console.error("[Chat API] Request failed unexpectedly.", {
      name: error?.name || "UnknownError",
      message: error?.message || "Unknown error",
      model: MODEL,
    });

    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      return res.status(504).json({
        error: "The chatbot request timed out. Please try again.",
      });
    }

    return res.status(500).json({
      error: "The chatbot encountered a server error. Please try again.",
    });
  }
}
