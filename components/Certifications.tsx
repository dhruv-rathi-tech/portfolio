"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications } from "@/data/achievements";
import { ExternalLink, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-20">
      <div className="global-container">
        {/* Single strong editorial heading — NO small uppercase eyebrow label per instruction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Credentials &amp; specializations.</p>
        </motion.div>

        {/* 3-column desktop, 2-column tablet, 1-column mobile grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(180deg, #0d0f18 0%, #080a10 100%)",
                borderColor: "#1c2030",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(59, 130, 246, 0.45)";
                el.style.boxShadow =
                  "0 16px 36px rgba(0,0,0,0.65), 0 0 28px rgba(59, 130, 246, 0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#1c2030";
                el.style.boxShadow = "none";
              }}
            >
              {/* ── Certificate Image Area (Dominant visual: 16/10 aspect ratio) ── */}
              {/* Clicking opens full-resolution certificate image in a new browser tab */}
              <a
                href={cert.image}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open full ${cert.title} certificate in new tab`}
                className="relative block w-full aspect-[16/10] overflow-hidden bg-[#06070b] border-b border-[#1c2030] cursor-pointer"
              >
                <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} - ${cert.issuer} Certificate`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Subtle overlay badge on hover indicating click opens full image */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1 shadow-md">
                  <span>View Full</span>
                  <ExternalLink size={11} />
                </div>
              </a>

              {/* ── Card Content Area ── */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Issuer with cyan accent & verified checkmark */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                      {cert.issuer}
                    </span>
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  </div>

                  {/* Prominent Certificate Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-blue-200 transition-colors mb-2.5">
                    {cert.title}
                  </h3>

                  {/* Supporting Description */}
                  {cert.description && (
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Card Footer: Year badge */}
                {cert.year && (
                  <div className="mt-5 pt-3.5 border-t border-[#1c2030]/80 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-[#141724] border border-[#23283c]">
                      {cert.year}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
