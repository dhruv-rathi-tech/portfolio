"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Trophy, Star, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Achievements() {
  return (
    <section id="achievements" className="py-14 sm:py-18" style={{ background: "#09090b" }}>
      <div className="global-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">Milestones &amp; leadership.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => {
            const isHighlight = ach.highlight;

            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                whileHover={{ y: -3 }}
                className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                  isHighlight ? "lg:col-span-2" : "lg:col-span-1"
                }`}
                style={{
                  background: isHighlight
                    ? "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.03) 50%, #0d0e15 100%)"
                    : "linear-gradient(180deg, #0d0e15 0%, #090a0f 100%)",
                  borderColor: isHighlight ? "rgba(59, 130, 246, 0.35)" : "#1f2230",
                  boxShadow: isHighlight ? "0 0 30px rgba(59,130,246,0.12)" : "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = isHighlight
                    ? "rgba(59, 130, 246, 0.6)"
                    : "rgba(59, 130, 246, 0.3)";
                  el.style.boxShadow = isHighlight
                    ? "0 15px 35px rgba(0,0,0,0.6), 0 0 35px rgba(59,130,246,0.2)"
                    : "0 10px 25px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = isHighlight
                    ? "rgba(59, 130, 246, 0.35)"
                    : "#1f2230";
                  el.style.boxShadow = isHighlight
                    ? "0 0 30px rgba(59,130,246,0.12)"
                    : "none";
                }}
              >
                {/* Highlight Badge */}
                {isHighlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                    <Sparkles size={13} className="text-cyan-400" />
                    <span>Featured Achievement</span>
                  </div>
                )}

                {/* Big Prominent Metric for Hackathon */}
                {ach.metric && (
                  <div className="mb-4">
                    <p className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                      {ach.metric}
                    </p>
                    {ach.metricLabel && (
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                        {ach.metricLabel}
                      </p>
                    )}
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {ach.title}
                </h3>
                <p className="text-sm font-semibold text-blue-400 mt-1">
                  {ach.subtitle}
                </p>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {ach.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
