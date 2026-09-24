"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

const ease = [0.16, 1, 0.3, 1] as const;

function SkillChip({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03, ease }}
      whileHover={{ y: -2.5, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#12141f] border border-[#1f2230] text-slate-300 hover:text-white hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] transition-all duration-200 cursor-default select-none text-xs font-mono"
    >
      <span>{name}</span>
    </motion.div>
  );
}

function TableRow({
  label,
  items,
  rowIndex,
}: {
  label: string;
  items: string[];
  rowIndex: number;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: rowIndex * 0.08, ease }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      className="relative flex flex-col sm:flex-row items-stretch border-b border-[#1a1d28] last:border-b-0 transition-colors duration-200"
      style={{
        background: isHovered
          ? "linear-gradient(90deg, rgba(13,15,24,0.95) 0%, rgba(11,13,20,0.95) 100%)"
          : "#0b0c12",
      }}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && mousePos && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.07), transparent 70%)`,
          }}
        />
      )}

      {/* Pinned Left Category Label */}
      <div
        className="w-full sm:w-44 shrink-0 flex items-center px-4 sm:px-6 py-3.5 sm:py-4 border-b sm:border-b-0 sm:border-r border-[#1a1d28] transition-colors duration-200 z-10"
        style={{
          background: isHovered ? "#0c0e18" : "#090a10",
        }}
      >
        <span
          className={`font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
            isHovered ? "text-cyan-300" : "text-cyan-400/90"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Static Wrapping Skill Chips with Spring Hover Animation */}
      <div className="flex-1 flex flex-wrap items-center gap-2.5 py-3.5 px-4 sm:px-6 z-10">
        {items.map((skill, idx) => (
          <SkillChip key={`${label}-${skill}`} name={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-14 sm:py-18 relative overflow-hidden"
    >
      <div className="global-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technical expertise &amp; core stack.</p>
        </motion.div>

        {/* Unified Table Container with Interactive Spotlight and Springy Chips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="rounded-2xl border border-[#1f2230] overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/30"
          style={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(6,182,212,0.06)",
          }}
        >
          {skillCategories.map((cat, idx) => (
            <TableRow
              key={cat.label}
              label={cat.label}
              items={cat.items}
              rowIndex={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
