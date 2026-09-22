"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { MapPin, Calendar } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function handleMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function Experience() {
  return (
    <section id="experience" className="py-14 sm:py-18" style={{ background: "#09090b" }}>
      <div className="global-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Where I&apos;ve contributed.</p>
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease }}
              whileHover={{ y: -3, scale: 1.005 }}
              onMouseMove={handleMove}
              className="relative rounded-2xl border overflow-hidden card-glow cursor-default transition-all duration-300"
              style={{
                background: "linear-gradient(180deg, #0f1016 0%, #0c0d12 100%)",
                borderColor: "#1f2230",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(59, 130, 246, 0.4)";
                el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#1f2230";
                el.style.boxShadow = "none";
              }}
            >
              {/* Electric blue accent indicator on the left */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: "linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%)",
                }}
              />

              <div className="p-6 sm:p-8 pl-7 sm:pl-10">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="w-6 h-px bg-[#1f2230]" />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                        Internship
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-base font-medium mt-0.5 text-blue-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0 text-slate-400">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar size={13} className="text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5 text-slate-400 max-w-3xl">
                  {exp.description}
                </p>

                {/* 4 Strong bullet points */}
                <ul className="space-y-2.5 mb-6 max-w-3xl">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] shrink-0" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1a1d28]">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
