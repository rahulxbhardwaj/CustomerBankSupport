import { useState, useRef, useEffect } from "react";

export default function AICopilot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    const userMessage = { type: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/aicopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const aiMessage = { type: "ai", text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { type: "ai", text: "Error fetching AI response" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto h-[80vh] p-6 bg-gray-50 rounded-xl shadow-xl flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        AI Copilot
      </h2>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner mb-4 space-y-4"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.type === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-200 text-gray-800 self-start p-3 rounded-lg flex items-center gap-2 animate-fadeIn">
            <div className="dot-flashing"></div>
            AI is typing...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query..."
          className="flex-1 p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-4 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Ask
        </button>
      </form>

      {/* Animations */}
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #4f46e5;
          color: #4f46e5;
          animation: dotFlashing 1s infinite linear alternate;
        }
        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -1.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #4f46e5;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.33s;
        }
        .dot-flashing::after {
          left: 1.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #4f46e5;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.66s;
        }
        @keyframes dotFlashing {
          0% { opacity: 0.2; }
          50%, 100% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
