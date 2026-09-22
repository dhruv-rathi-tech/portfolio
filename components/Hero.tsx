"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { profile } from "@/data/profile";

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

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 3200);
    return () => clearInterval(id);
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
            <motion.div {...fade(0.6)} className="flex flex-wrap gap-3.5 mt-1">
              <button onClick={() => scrollTo("contact")} className="btn-primary">
                Contact Me
              </button>
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

          {/* ── Right: Natural Cutout Portrait (Restored clean previous state) ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            <div className="relative flex items-center justify-center">
              {/* Subtle ambient light bloom behind the subject */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center 42%, rgba(59,130,246,0.22) 0%, rgba(6,182,212,0.12) 40%, transparent 72%)",
                  filter: "blur(48px)",
                  transform: "scale(1.2)",
                }}
              />

              {/* Natural cutout portrait with subtle bottom fade */}
              <div
                className="relative overflow-hidden pointer-events-none"
                style={{
                  width: "clamp(280px, 34vw, 400px)",
                  aspectRatio: "3/4",
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
              >
                {!imgError ? (
                  <>
                    <Image
                      src={profile.photo}
                      alt="Dhruv Rathi"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                      priority
                      onError={() => setImgError(true)}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
