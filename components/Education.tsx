"use client";

import { motion } from "framer-motion";
import { education } from "@/data/education";
import { Calendar, MapPin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Education() {
  return (
    <section id="education" className="py-14 sm:py-18" style={{ background: "#09090b" }}>
      <div className="global-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic background.</p>
        </motion.div>

        {education.map((ed) => (
          <motion.div
            key={ed.institution}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="rounded-2xl border p-6 sm:p-10 transition-all duration-300"
            style={{
              background: "linear-gradient(180deg, #0d0e15 0%, #090a0f 100%)",
              borderColor: "#1f2230",
            }}
          >
            {/* Institution header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#1a1d28]">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {ed.institution}
                </h3>
                <p className="text-base font-medium text-blue-400 mt-1">
                  {ed.degree}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-slate-500" /> {ed.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-blue-400" /> {ed.period}
                  </span>
                </div>
              </div>

              {/* Restrained CGPA badge */}
              <div className="sm:text-right shrink-0">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/25 bg-blue-500/10 text-xs font-mono font-semibold text-blue-300">
                  CGPA: <strong className="text-white text-sm">{ed.cgpa}</strong> / 10.0
                </span>
              </div>
            </div>

            {/* Coursework */}
            <div className="pt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3.5">
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {ed.coursework.map((c) => (
                  <span
                    key={c}
                    className="tag"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
