"use client";
import { useEffect, useState } from "react";

export default function ParticleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 10 + 4}px`,
      height: `${Math.random() * 10 + 4}px`,
      duration: `${Math.random() * 10 + 8}s`,
      delay: `${Math.random() * 5}s`,
      color: ["#6366f1", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setParticles(generated);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div key={p.id} className="particle"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}