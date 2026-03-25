export default function InsightsPanel({ summary, riskScore, action, insights }) {
  const actionConfig = {
    block: { color: "bg-red-100 text-red-700 border-red-200", icon: "🚫", label: "BLOCK" },
    mask: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "🔒", label: "MASK" },
    allow: { color: "bg-green-100 text-green-700 border-green-200", icon: "✅", label: "ALLOW" },
  };

  const cfg = actionConfig[action] || { color: "bg-gray-100 text-gray-600 border-gray-200", icon: "ℹ️", label: (action || "—").toUpperCase() };

  // Convert simple markdown to readable text
  const renderSummary = (text) => {
    if (!text) return null;
    return text
      .split("\n")
      .map((line, i) => {
        // H3 headings (###)
        if (line.startsWith("### ")) {
          return <h4 key={i} className="font-bold text-indigo-800 mt-3 mb-1 text-sm">{line.replace(/^###\s+/, "").replace(/\*\*/g, "")}</h4>;
        }
        // Horizontal rule
        if (line.trim() === "---") {
          return <hr key={i} className="border-indigo-100 my-2" />;
        }
        // Bullet points
        if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
          const content = line.replace(/^\s*[\*\-]\s+/, "").replace(/\*\*([^*]+)\*\*/g, "$1");
          return <li key={i} className="ml-4 text-gray-700 text-sm list-disc">{content}</li>;
        }
        // Numbered list
        if (/^\s*\d+\.\s/.test(line)) {
          const content = line.replace(/^\s*\d+\.\s+/, "").replace(/\*\*([^*]+)\*\*/g, "$1");
          return <p key={i} className="ml-2 text-gray-700 text-sm font-medium mt-1">{content}</p>;
        }
        // Empty line
        if (line.trim() === "") return <br key={i} />;
        // Normal text — strip bold markers
        const content = line.replace(/\*\*([^*]+)\*\*/g, "$1");
        return <p key={i} className="text-gray-700 text-sm">{content}</p>;
      });
  };

  return (
    <div className="mt-4 sm:mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 sm:p-6 animate-slide-up">
      <h3 className="text-base sm:text-lg font-bold text-indigo-700 mb-3 sm:mb-4">🤖 AI Insights</h3>
      <div className="mb-4 leading-relaxed">{renderSummary(summary)}</div>

      {insights && insights.length > 0 && (
        <div className="mb-5 bg-white bg-opacity-60 rounded-xl p-4 border border-indigo-100 shadow-inner">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🛡️</span>
            <h4 className="font-bold text-indigo-900 text-sm italic">Security Warnings & Insights:</h4>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex gap-2 items-center text-sm text-gray-700 bg-indigo-50 bg-opacity-50 px-3 py-2 rounded-lg border border-indigo-50">
                <span className="text-indigo-600 text-lg">✦</span>
                <span className="font-medium tracking-tight">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3 sm:gap-4">
        <div className="bg-white px-4 py-3 rounded-xl border border-indigo-100 shadow-sm">
          <span className="text-gray-400 text-xs block mb-1">Risk Score</span>
          <p className="text-xl sm:text-2xl font-extrabold text-indigo-600">{riskScore}</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-xl border border-indigo-100 shadow-sm">
          <span className="text-gray-400 text-xs block mb-1">Recommended Action</span>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border font-bold text-sm ${cfg.color}`}>
            {cfg.icon} {cfg.label}
          </span>
        </div>
      </div>
    </div>
  );
}