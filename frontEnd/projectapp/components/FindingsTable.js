export default function FindingsTable({ findings }) {
  if (!findings || findings.length === 0)
    return <p className="text-gray-400 text-center py-6 text-sm">No findings detected.</p>;

  const riskColor = {
    critical: "text-red-600 font-bold",
    high: "text-orange-500 font-bold",
    medium: "text-yellow-600 font-semibold",
    low: "text-green-600",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm animate-fade-in">
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="px-3 sm:px-4 py-3 text-left">Line</th>
            <th className="px-3 sm:px-4 py-3 text-left">Type</th>
            <th className="px-3 sm:px-4 py-3 text-left">Value</th>
            <th className="px-3 sm:px-4 py-3 text-left">Risk</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f, i) => (
            <tr key={i} className={`border-t border-gray-100 hover:bg-indigo-50 transition 
              ${f.risk === "critical" ? "bg-red-50 animate-pulse-slow font-bold" : "bg-white"}`}>
              <td className="px-3 sm:px-4 py-3 text-gray-500 font-mono text-xs">{f.line}</td>
              <td className="px-3 sm:px-4 py-3 font-medium text-gray-800">
                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase border ${f.risk === 'critical' ? 'border-red-200 bg-red-100 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                  {f.type}
                </span>
              </td>
              <td className="px-3 sm:px-4 py-3">
                {f.value ? (
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all text-indigo-600 border border-gray-200">{f.value}</code>
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 italic bg-gray-50 px-2 py-1 rounded border border-dashed border-gray-200">
                    [HIDDEN FOR SECURITY]
                  </span>
                )}
              </td>
              <td className={`px-3 sm:px-4 py-3 uppercase text-xs tracking-wider ${riskColor[f.risk]}`}>
                {f.risk === 'critical' ? '🔥 ' : ''}{f.risk}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}