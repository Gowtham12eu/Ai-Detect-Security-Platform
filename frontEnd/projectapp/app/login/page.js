"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParticleBackground from "../../components/ParticleBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      router.push("/analyze");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-4">
      <ParticleBackground />
      <div className="relative z-10 bg-white border border-indigo-100 rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md animate-slide-up">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-3">🔐</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Login to SecureAI Platform</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-xs sm:text-sm animate-fade-in">
            ❌ {error}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-sm" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-sm" />
          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 animate-glow-pulse disabled:opacity-50">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </span>
            ) : "Login 🔐"}
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4 sm:mt-6 text-xs sm:text-sm">
          No account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Register Free</Link>
        </p>
      </div>
    </div>
  );
}