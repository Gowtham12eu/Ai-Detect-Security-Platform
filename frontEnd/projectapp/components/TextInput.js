"use client";
import { useState } from "react";

export default function TextInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null") {
        throw new Error("You must be logged in to analyze data.");
      }
      const res = await fetch("http://localhost:4000/api/analyze/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ input_type: "text", content: text }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }
      const data = await res.json();
      setDone(true);
      onResult(data);
    } catch (err) {
      console.error("Analyze error:", err.message);
      onResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setDone(false);
    onResult(null);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-green-600 font-semibold text-sm">✅ Analysis complete! See results below.</p>
        <button
          onClick={handleReset}
          className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-medium text-sm transition"
        >
          🔄 Analyze Another
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text, SQL, log, or chat here..."
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-none text-sm"
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analyzing...
          </span>
        ) : "🔍 Analyze"}
      </button>
    </div>
  );
}