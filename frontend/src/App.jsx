import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, FileText, AlertCircle, X } from "lucide-react";
import ReactMarkdown from 'react-markdown'

const BACKEND_URL = "https://Fardeen1004-flowdesk-support-agent.hf.space/chat";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

function SourceChip({ name }) {
  const clean = name.replace(".md", "").replace(/_/g, " ");
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-medium capitalize">
      <FileText size={10} />
      {clean}
    </span>
  );
}

function UserBubble({ text }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[72%] bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function AiBubble({ text, sources }) {
  return (
    <div className="flex justify-start mb-4 gap-2.5">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md mt-0.5">
        <Bot size={15} className="text-white" />
      </div>
      <div className="max-w-[72%]">
        <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-700 leading-relaxed">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        {sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
            {sources.map((s, i) => (
              <SourceChip key={i} name={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorToast({ message, onClose }) {
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-xl shadow-sm animate-fade-in">
      <AlertCircle size={13} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 hover:text-red-800 transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm the FlowDesk support assistant. Ask me anything about pricing, features, troubleshooting, or getting started.",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.answer, sources: data.sources || [] },
      ]);
    } catch (err) {
      setError("Couldn't reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>

      <div className="w-full max-w-2xl flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        style={{ height: "85vh" }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
            <Sparkles size={17} className="text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 font-semibold text-sm leading-tight">FlowDesk Support</h1>
            <p className="text-slate-400 text-xs">AI-powered · Always available</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}>
          {messages.map((msg, i) =>
            msg.role === "user"
              ? <UserBubble key={i} text={msg.text} />
              : <AiBubble key={i} text={msg.text} sources={msg.sources} />
          )}
          {loading && (
            <div className="flex justify-start gap-2.5 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md mt-0.5">
                <Bot size={15} className="text-white" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="px-5 pb-2">
            <ErrorToast message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a support question..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 resize-none outline-none leading-relaxed"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm"
            >
              <Send size={14} className={input.trim() && !loading ? "text-white" : "text-slate-400"} />
            </button>
          </div>
          <p className="text-center text-slate-300 text-xs mt-2">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
