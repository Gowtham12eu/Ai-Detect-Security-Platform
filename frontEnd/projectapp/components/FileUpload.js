"use client";
import { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFile = async (file) => {
    setFileName(file.name);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null") {
        throw new Error("You must be logged in to upload files.");
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("input_type", "log");
      const res = await fetch("http://localhost:4000/api/analyze/file", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }
      const data = await res.json();
      setDone(true);
      onUpload(data);
    } catch (err) {
      console.error("Upload error:", err.message);
      onUpload({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFileName("");
    setDone(false);
    onUpload(null);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-green-600 font-semibold text-sm">✅ <strong>{fileName}</strong> analyzed! See results below.</p>
        <button
          onClick={handleReset}
          className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-medium text-sm transition"
        >
          🔄 Upload Another File
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer
        ${dragging ? "border-indigo-500 bg-indigo-50 scale-105" : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"}`}
    >
      <div className="text-4xl sm:text-5xl mb-3 animate-float">📁</div>
      <p className="text-gray-600 font-medium text-sm sm:text-base">Drag & Drop your file here</p>
      <p className="text-gray-400 text-xs sm:text-sm mb-4">Supports .txt .log .pdf .doc</p>
      <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 sm:px-6 py-2 rounded-xl cursor-pointer transition font-medium text-sm">
        Browse File
        <input type="file" accept=".txt,.log,.pdf,.doc" className="hidden"
          onChange={(e) => handleFile(e.target.files[0])} />
      </label>
      {fileName && <p className="text-indigo-600 mt-3 text-xs sm:text-sm font-medium">📄 {fileName}</p>}
      {loading && (
        <div className="mt-4 flex justify-center">
          <svg className="animate-spin h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      )}
    </div>
  );
}