"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../../components/FileUpload";
import TextInput from "../../components/TextInput";
import RiskBadge from "../../components/RiskBadge";
import FindingsTable from "../../components/FindingsTable";
import InsightsPanel from "../../components/InsightsPanel";
import ParticleBackground from "../../components/ParticleBackground";

export default function AnalyzePage() {
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState("file");
  const [resultTab, setResultTab] = useState("visual");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "null") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 animate-slide-up">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            🔍 Analyze Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
              Data
            </span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Upload a file or paste text to detect security risks
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center flex-wrap">
          {[
            { key: "file", label: "📁 File / Log" },
            { key: "text", label: "📝 Text / SQL" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300
                ${tab === t.key ? "bg-indigo-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-600 hover:bg-indigo-50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-4 sm:p-6 animate-fade-in">
          {tab === "file" ? <FileUpload onUpload={setResult} /> : <TextInput onResult={setResult} />}
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 sm:mt-8 animate-slide-up">
            {result.error ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-3xl mb-2">⚠️</div>
                <h2 className="text-lg font-bold text-red-700 mb-1">Analysis Failed</h2>
                <p className="text-red-600 text-sm">{result.error}</p>
                <p className="text-gray-500 text-xs mt-2">Make sure the backend server is running on port 4000.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">📊 Analysis</h2>
                    <RiskBadge level={result.risk_level} />
                  </div>
                  
                  {/* Result Tab Toggler */}
                  <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-bold">
                    <button 
                      onClick={() => setResultTab("visual")}
                      className={`px-3 py-1.5 rounded-md transition-all ${resultTab === "visual" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                      Visual
                    </button>
                    <button 
                      onClick={() => setResultTab("raw")}
                      className={`px-3 py-1.5 rounded-md transition-all ${resultTab === "raw" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                      Raw JSON
                    </button>
                  </div>
                </div>

                {resultTab === "visual" ? (
                  <>
                    <FindingsTable findings={result.findings} />
                    <InsightsPanel
                      summary={result.summary}
                      riskScore={result.risk_score}
                      action={result.action}
                      insights={result.insights}
                    />
                  </>
                ) : (
                  <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden border border-slate-800">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono italic">section_9_compliant_response.json</span>
                    </div>
                    <pre className="text-xs sm:text-sm text-indigo-300 font-mono overflow-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-700">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}