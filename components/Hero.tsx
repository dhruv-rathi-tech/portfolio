"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronRight, Download, ChevronDown, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { profile, resumes } from "@/data/profile";

const ease = [0.16, 1, 0.3, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: "#09090b" }}
    >
      {/* Subtle top ambient radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(59,130,246,0.14) 0%, rgba(6,182,212,0.05) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 global-container pt-28 pb-12 sm:pt-32 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-14 items-center">

          {/* ── Left Content ── */}
          <div className="flex flex-col gap-5">
            {/* Display Typography for Dhruv Rathi */}
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.25rem, 8vw, 5.75rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              <motion.span
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 28 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              >
                Dhruv
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 28 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.28, ease }}
              >
                Rathi
              </motion.span>
            </h1>

            {/* Animated rotating role */}
            <motion.div {...fade(0.35)} className="h-8 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  className="text-lg sm:text-xl font-medium bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent font-mono tracking-tight"
                  initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease }}
                >
                  {profile.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...fade(0.48)}
              className="text-base sm:text-lg leading-relaxed max-w-xl text-slate-400"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(0.6)} className="flex flex-wrap items-center gap-3.5 mt-1 relative z-20">
              <button onClick={() => scrollTo("contact")} className="btn-primary">
                Contact Me
              </button>

              {/* Download Resume with 3 options dropdown */}
              <div className="relative" ref={resumeMenuRef}>
                <button
                  type="button"
                  onClick={() => setResumeOpen((v) => !v)}
                  className="btn-secondary inline-flex items-center gap-2 cursor-pointer"
                  aria-expanded={resumeOpen}
                  aria-haspopup="menu"
                >
                  <Download size={15} className="text-blue-400" />
                  <span>Download Resume</span>
                  <ChevronDown
                    size={14}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: resumeOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>

                <AnimatePresence>
                  {resumeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 py-1.5 rounded-xl border shadow-2xl z-50 min-w-[240px] sm:min-w-[260px] overflow-hidden"
                      style={{
                        background: "#0d0e15",
                        borderColor: "#1f2230",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(59,130,246,0.15)",
                      }}
                      role="menu"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1f2230]">
                        Choose Resume Track
                      </div>
                      {resumes.map((r) => (
                        <a
                          key={r.label}
                          href={r.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setResumeOpen(false)}
                          className="flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors group cursor-pointer"
                          role="menuitem"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText size={14} className="text-blue-400 shrink-0" />
                            <span className="truncate">{r.label}</span>
                          </div>
                          <Download size={13} className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => scrollTo("projects")} className="btn-secondary">
                View Projects <ChevronRight size={15} className="text-blue-400" />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div {...fade(0.72)} className="flex items-center gap-3 mt-1">
              {[
                { href: profile.github, label: "GitHub", icon: <GithubIcon size={17} /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={17} /> },
                { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={17} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-xl border border-[#1f2230] text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Seamlessly Integrated Studio Portrait ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            <div className="relative flex items-center justify-center">
              {/* Cinematic ambient backlight bloom */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.14) 40%, rgba(147,51,234,0.06) 65%, transparent 80%)",
                  filter: "blur(50px)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Vertical progressive mask to dissolve bottom */}
              <div
                className="relative pointer-events-none select-none"
                style={{
                  width: "clamp(310px, 38vw, 440px)",
                  aspectRatio: "3/4",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 40%, rgba(0, 0, 0, 0.75) 58%, rgba(0, 0, 0, 0.2) 74%, transparent 88%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 40%, rgba(0, 0, 0, 0.75) 58%, rgba(0, 0, 0, 0.2) 74%, transparent 88%)",
                }}
              >
                {/* Horizontal side-softener mask to eliminate cut lines */}
                <div
                  className="w-full h-full relative"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.7) 12%, black 22%, black 78%, rgba(0, 0, 0, 0.7) 88%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.7) 12%, black 22%, black 78%, rgba(0, 0, 0, 0.7) 88%, transparent 100%)",
                  }}
                >
                  {!imgError ? (
                    <>
                      <Image
                        src={profile.photo}
                        alt="Dhruv Rathi"
                        fill
                        className="object-contain object-bottom"
                        priority
                        onError={() => setImgError(true)}
                      />
                      {/* Deep bottom fade into page background */}
                      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent pointer-events-none" />
                      {/* Side feathering layers to soften edges */}
                      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#09090b] via-[#09090b]/60 to-transparent pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#09090b] via-[#09090b]/60 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-3 shadow-[0_0_24px_rgba(59,130,246,0.25)]"
                        style={{
                          background: "rgba(59,130,246,0.12)",
                          border: "1px solid rgba(59,130,246,0.35)",
                          color: "#60a5fa",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        DR
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
