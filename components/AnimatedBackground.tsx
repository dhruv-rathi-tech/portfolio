"use client";

import { useReducedMotion, motion } from "framer-motion";

export default function AnimatedBackground() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Dynamic Floating Light Orbs (Framer Motion / motion.dev) ── */}

      {/* Orb 1: Electric Blue Bloom */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)",
          filter: "blur(90px)",
          top: "-15%",
          left: "-10%",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, 100, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Cyan Ambient Bloom */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.09) 0%, rgba(14, 116, 144, 0.03) 45%, transparent 70%)",
          filter: "blur(80px)",
          top: "35%",
          right: "-12%",
        }}
        animate={{
          x: [0, -90, 40, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.92, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Orb 3: Soft Deep Violet/Blue Bloom */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.025) 50%, transparent 70%)",
          filter: "blur(85px)",
          bottom: "5%",
          left: "20%",
        }}
        animate={{
          x: [0, 70, -60, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Orb 4: Wandering Cyan Accent Glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
          top: "60%",
          left: "60%",
        }}
        animate={{
          x: [0, -60, 50, 0],
          y: [0, -80, 60, 0],
          scale: [0.9, 1.2, 0.85, 0.9],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Subtle Moving Background Grid Lines Texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "64px 64px"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
