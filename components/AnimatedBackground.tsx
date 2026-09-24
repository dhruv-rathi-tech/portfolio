"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
}

interface NeonStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  colorStart: string;
  colorEnd: string;
  delay: number;
}

const NEON_PALETTE = [
  { color: "59, 130, 246", glow: "rgba(59, 130, 246, 0.85)" },  // Electric Blue
  { color: "6, 182, 212", glow: "rgba(6, 182, 212, 0.85)" },   // Vibrant Cyan
  { color: "56, 189, 248", glow: "rgba(56, 189, 248, 0.9)" },  // Sky Blue
  { color: "99, 102, 241", glow: "rgba(99, 102, 241, 0.8)" },  // Neon Indigo
  { color: "34, 211, 238", glow: "rgba(34, 211, 238, 0.95)" }, // Bright Aqua
];

export default function AnimatedBackground() {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle interactive repulsion/drift
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      active: false,
    };

    let mouseTimeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 2000);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Particle count: scaled for mobile vs desktop performance
    const getParticleCount = () => {
      if (width < 640) return 28;
      if (width < 1024) return 45;
      return 65;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        const item = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: -0.2 - Math.random() * 0.4, // gentle upward drift
          radius: Math.random() * 1.8 + 1.2,
          color: item.color,
          glowColor: item.glow,
          baseAlpha: Math.random() * 0.4 + 0.35,
          alpha: Math.random() * 0.4 + 0.35,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.02 + Math.random() * 0.025,
        });
      }
    };

    initParticles();

    // Neon Shooting Streaks / Beams
    const streaks: NeonStreak[] = [
      {
        x: -200,
        y: 100,
        length: 160,
        speed: 6.5,
        angle: Math.PI / 6, // 30 deg
        opacity: 0.7,
        active: false,
        colorStart: "rgba(34, 211, 238, 0.9)",
        colorEnd: "rgba(59, 130, 246, 0)",
        delay: 60,
      },
      {
        x: -200,
        y: 300,
        length: 210,
        speed: 8.0,
        angle: Math.PI / 5, // 36 deg
        opacity: 0.8,
        active: false,
        colorStart: "rgba(56, 189, 248, 0.95)",
        colorEnd: "rgba(99, 102, 241, 0)",
        delay: 220,
      },
      {
        x: -200,
        y: 500,
        length: 140,
        speed: 5.5,
        angle: Math.PI / 7,
        opacity: 0.65,
        active: false,
        colorStart: "rgba(6, 182, 212, 0.85)",
        colorEnd: "rgba(37, 99, 235, 0)",
        delay: 400,
      },
    ];

    const resetStreak = (streak: NeonStreak) => {
      streak.active = true;
      streak.length = 130 + Math.random() * 110;
      streak.speed = 5.5 + Math.random() * 3.5;
      streak.angle = (25 + Math.random() * 18) * (Math.PI / 180);
      streak.x = -150;
      streak.y = Math.random() * (height * 0.75);
      const palette = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      streak.colorStart = palette.glow;
      streak.colorEnd = `rgba(${palette.color}, 0)`;
      streak.opacity = 0.5 + Math.random() * 0.4;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update animated neon streaks / laser beams
      for (const streak of streaks) {
        if (!streak.active) {
          streak.delay--;
          if (streak.delay <= 0) {
            resetStreak(streak);
          }
          continue;
        }

        streak.x += Math.cos(streak.angle) * streak.speed;
        streak.y += Math.sin(streak.angle) * streak.speed;

        const tailX = streak.x - Math.cos(streak.angle) * streak.length;
        const tailY = streak.y - Math.sin(streak.angle) * streak.length;

        // Gradient for sleek luminous tail
        const gradient = ctx.createLinearGradient(streak.x, streak.y, tailX, tailY);
        gradient.addColorStop(0, streak.colorStart);
        gradient.addColorStop(0.3, streak.colorStart.replace("0.9", "0.5").replace("0.85", "0.4"));
        gradient.addColorStop(1, streak.colorEnd);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = streak.colorStart;
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Bright glowing pinpoint head
        ctx.beginPath();
        ctx.arc(streak.x, streak.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = streak.colorStart;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Check if out of bounds
        if (streak.x - streak.length > width || streak.y - streak.length > height) {
          streak.active = false;
          streak.delay = 180 + Math.floor(Math.random() * 320); // 3-8s wait before next beam
        }
      }

      // 2. Draw Constellation lines between nearby particles
      const maxDist = width < 640 ? 75 : 95;
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18 * (p1.alpha / p1.baseAlpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Update and draw neon particles
      for (const p of particles) {
        // Breathing pulse
        p.phase += p.phaseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.22;

        // Subtle mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Float movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds seamlessly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        // Draw particle with neon aura
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 9;
        ctx.fill();

        // Intense inner spark core for larger particles
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(mouseTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Layer 1: Ambient Glowing Nebulae (Deep Depth Atmosphere) ── */}

      {/* Electric Blue Orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "680px",
          height: "680px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(37, 99, 235, 0.05) 45%, transparent 70%)",
          filter: "blur(90px)",
          top: "-15%",
          left: "-10%",
        }}
        animate={{
          x: [0, 70, -35, 0],
          y: [0, 50, 90, 0],
          scale: [1, 1.14, 0.96, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan Ambient Orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.13) 0%, rgba(14, 116, 144, 0.04) 45%, transparent 70%)",
          filter: "blur(85px)",
          top: "35%",
          right: "-12%",
        }}
        animate={{
          x: [0, -80, 35, 0],
          y: [0, 60, -45, 0],
          scale: [1, 0.94, 1.15, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Soft Indigo / Violet Nebula */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)",
          filter: "blur(90px)",
          bottom: "8%",
          left: "15%",
        }}
        animate={{
          x: [0, 60, -50, 0],
          y: [0, -45, 35, 0],
          scale: [1, 1.09, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* ── Layer 2: Subtle Digital Tech Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Layer 3: Moving Neon Horizontal Scan/Sweep Line ── */}
      <motion.div
        className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 20%, rgba(6, 182, 212, 0.5) 50%, rgba(59, 130, 246, 0.1) 80%, transparent 100%)",
          boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
        }}
        animate={{
          top: ["-5%", "105%"],
          opacity: [0, 0.75, 0.75, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 5,
        }}
      />

      {/* ── Layer 4: High-Performance Canvas for Neon Particles & Laser Streaks ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
