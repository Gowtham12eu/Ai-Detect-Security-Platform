export default function RiskBadge({ level }) {
  const styles = {
    low: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    high: "bg-orange-100 text-orange-700 border-orange-300",
    critical: "bg-red-100 text-red-700 border-red-300 animate-pulse",
  };

  const icons = { low: "🟢", medium: "🟡", high: "🔴", critical: "🚨" };

  return (
    <span className={`border px-3 sm:px-4 py-1 rounded-full font-bold uppercase text-xs sm:text-sm ${styles[level] || "bg-gray-100 text-gray-700"}`}>
      {icons[level]} {level}
    </span>
  );
}