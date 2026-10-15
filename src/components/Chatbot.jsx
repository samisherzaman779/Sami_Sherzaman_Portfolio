import { useEffect, useRef, useState } from "react";
import { QUICK_QUESTIONS } from "../data/chatbotKnowledge";
import "./Chatbot.css";

const WELCOME = {
  role: "assistant",
  content:
    "Hi! 👋 I'm Sami's AI assistant. Ask me about his services, projects, tech stack, or how to get in touch.",
};

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...svgProps}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20.5l1.5-5.1A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
  </svg>
);

const CloseIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...svgProps}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

const SparkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...svgProps}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    <path d="M19 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
  </svg>
);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Teaser: thori der baad dikhao, phir khud hide
  useEffect(() => {
    const show = setTimeout(() => setTeaser(true), 2500);
    const hide = setTimeout(() => setTeaser(false), 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Naye message par neeche scroll (welcome message ko na chhedo)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (messages.length > 1 || loading) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  // Chat dobara khulne par latest message par jao
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el && messages.length > 1) el.scrollTop = el.scrollHeight;
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Esc se band
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't respond just now. Please try again in a moment.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showQuick = messages.length === 1 && !loading;

  return (
    <div className="cb-root">
      {teaser && !open && (
        <button className="cb-teaser" onClick={() => setOpen(true)}>
          Ask AI about Sami
        </button>
      )}

      <button
        className={`cb-toggle ${open ? "cb-toggle--open" : ""}`}
        onClick={() => {
          setOpen((o) => !o);
          setTeaser(false);
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {open && (
        <div className="cb-window" role="dialog" aria-label="AI assistant chat">
          <div className="cb-header">
            <div className="cb-avatar">
              <SparkIcon />
            </div>
            <div className="cb-header-text">
              <div className="cb-title">Sami's AI Assistant</div>
              <div className="cb-status">
                <span className="cb-status-dot" /> Online
              </div>
            </div>
            <button
              className="cb-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="cb-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`cb-msg cb-msg--${m.role} ${
                  m.error ? "cb-msg--error" : ""
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="cb-msg cb-msg--assistant cb-typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {showQuick && (
              <div className="cb-quick-wrap">
                <div className="cb-quick-label">Try asking</div>
                <div className="cb-quick">
                  {QUICK_QUESTIONS.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="cb-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}