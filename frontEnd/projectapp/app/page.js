import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12 text-center">

        {/* Badge */}
        <div className="animate-fade-in mb-4 sm:mb-6">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            🚀 AI Powered Security Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-slide-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Detect. Analyze.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-cyan-500">
            Protect.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up text-sm sm:text-lg md:text-xl text-gray-500 max-w-xs sm:max-w-xl md:max-w-2xl mb-6 sm:mb-10">
          Upload your logs, files, or paste text — our AI detects passwords,
          API keys, and security risks instantly.
        </p>

        {/* Buttons */}
        <div className="animate-slide-up flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link href="/analyze" className="w-full sm:w-auto">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition">
              🔍 Start Analyzing
            </button>
          </Link>

          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-bold transition">
              📝 Register Free
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-gray-400 text-sm">
          Built for Hackathon 🏆 — AI Secure Data Intelligence Platform
        </p>
      </div>
    </div>
  );
}