"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Download, FileText } from "lucide-react";

import { resumes } from "@/data/profile";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Education", href: "education" },
  { label: "Skills", href: "skills" },
  { label: "Certifications", href: "certifications" },
  { label: "Achievements", href: "achievements" },
  { label: "Contact", href: "contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].href);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(navLinks[i].href);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOut = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, []);

  const scrollTo = (id: string) => {
    const isMobile = mobileOpen;
    setMobileOpen(false);

    const performScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    };

    if (isMobile) {
      setTimeout(performScroll, 80);
    } else {
      performScroll();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1f2230" : "none",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="global-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-base font-bold tracking-tight group flex items-center gap-1 cursor-pointer"
            style={{ color: "#fafafa" }}
          >
            <span className="group-hover:text-blue-400 transition-colors">DR</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? "#ffffff" : "#94a3b8",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                      style={{ background: "rgba(59, 130, 246, 0.08)", zIndex: -1 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume dropdown */}
          <div className="hidden sm:block relative" ref={dropdownRef}>
            <button
              onClick={() => setResumeOpen((v) => !v)}
              className="flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200"
              style={{
                color: "#f1f5f9",
                borderColor: resumeOpen ? "#3b82f6" : "#2d3246",
                background: resumeOpen ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)",
                boxShadow: resumeOpen ? "0 0 16px rgba(59,130,246,0.2)" : "none",
              }}
              aria-expanded={resumeOpen}
              aria-haspopup="menu"
            >
              <FileText size={13} className="text-blue-400" />
              Resume
              <ChevronDown
                size={12}
                style={{
                  color: "#94a3b8",
                  transform: resumeOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 py-1.5 rounded-xl border shadow-2xl overflow-hidden"
                  style={{
                    background: "#0d0d14",
                    borderColor: "#1f2230",
                    minWidth: "230px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.7), 0 0 20px rgba(59,130,246,0.1)",
                  }}
                  role="menu"
                >
                  {resumes.map((r) => (
                    <a
                      key={r.file}
                      href={r.file}
                      download
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors duration-150 group"
                      style={{ color: r.primary ? "#ffffff" : "#94a3b8" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = r.primary ? "#ffffff" : "#94a3b8";
                      }}
                      role="menuitem"
                    >
                      <Download size={13} className="text-blue-400 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
                      <span className="font-medium">{r.label}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ background: "rgba(9,9,11,0.98)", borderColor: "#1f2230" }}
          >
            <div className="global-container py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={`block w-full text-left px-3.5 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-white bg-blue-500/15 font-medium border border-blue-500/25"
                        : "text-slate-300 hover:text-white hover:bg-blue-500/10"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#1f2230] space-y-1">
                <p className="px-3 pb-1 text-xs text-slate-500 uppercase tracking-wider font-semibold">Resumes</p>
                {resumes.map((r) => (
                  <a
                    key={r.file}
                    href={r.file}
                    download
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-blue-400 rounded-lg"
                  >
                    <Download size={13} className="text-blue-400" /> {r.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
