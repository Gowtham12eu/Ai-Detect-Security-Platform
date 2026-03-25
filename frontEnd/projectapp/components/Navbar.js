"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-indigo-600">
          🔐 SecureAI
        </Link>
        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
          {name && <span className="text-gray-600 font-medium text-sm">👤 {name}</span>}
          <Link href="/analyze" className="text-indigo-600 hover:text-indigo-800 font-medium transition text-sm">Analyze</Link>
          {name ? (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium text-sm">Logout</button>
          ) : (
            <Link href="/login">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition font-medium text-sm">Login</button>
            </Link>
          )}
        </div>
        <button className="sm:hidden text-indigo-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-indigo-100 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {name && <span className="text-gray-600 font-medium text-sm">👤 {name}</span>}
          <Link href="/analyze" className="text-indigo-600 font-medium text-sm" onClick={() => setMenuOpen(false)}>Analyze</Link>
          {name ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm w-full">Logout</button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-full">Login</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}