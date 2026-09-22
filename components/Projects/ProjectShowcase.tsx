"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ImageIcon, ChevronDown, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/projects";

// Clean thumbnail component (prefers real image, falls back to intentional placeholder)
function ProjectThumbnail({ project }: { project: Project }) {
  const [err, setErr] = useState(false);

  if (project.image && !err) {
    return (
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0c0d14] border border-[#1f2230]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top transition-transform duration-500 hover:scale-105"
          onError={() => setErr(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-xl flex flex-col items-center justify-center p-4 text-center overflow-hidden transition-all duration-300 group-hover:border-blue-500/40"
      style={{
        background: "linear-gradient(135deg, #0e1017 0%, #0a0b10 100%)",
        border: "1px dashed #1f2230",
      }}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20">
        <ImageIcon size={18} />
      </div>
      <p className="text-xs font-semibold text-slate-300 tracking-tight">{project.name}</p>
      <p className="text-[10px] text-slate-500 mt-0.5">Preview</p>
    </div>
  );
}

// ── Full Project Detail Modal (Category badges removed per request) ──
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#2d3246] p-6 sm:p-8 shadow-2xl z-10"
        style={{
          background: "linear-gradient(180deg, #11131c 0%, #0c0d14 100%)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px rgba(59,130,246,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#1f2230] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 pr-8">
          {project.name}
        </h3>

        <p className="text-sm font-medium text-blue-400 mb-5">
          {project.tagline}
        </p>

        {/* Full description */}
        <div className="mb-6 pb-6 border-b border-[#1f2230]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6 pb-6 border-b border-[#1f2230]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Key Features &amp; Implementation
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics (if available) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 pb-6 border-b border-[#1f2230]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Impact &amp; Benchmarks
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl border border-[#1f2230] bg-[#141622]"
                >
                  <p className="text-lg font-bold text-blue-400 font-mono">{m.value}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <GithubIcon size={14} /> View GitHub Repo
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Desktop/Tablet Stacked Card ──
// Header displays project number and title clearly so stacked cards show readable titles!
function StackedProjectCard({
  project,
  index,
  total,
  onOpenDetails,
}: {
  project: Project;
  index: number;
  total: number;
  onOpenDetails: (p: Project) => void;
}) {
  // Sticky header offset: 80px base + 48px per stacked card header
  const stickyTop = 80 + index * 48;

  return (
    <div
      className="sticky mb-6 transition-all duration-300"
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 10,
      }}
    >
      <div
        className="group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer"
        style={{
          background: "linear-gradient(180deg, #10121a 0%, #0c0d14 100%)",
          borderColor: "#1f2230",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
        onClick={() => onOpenDetails(project)}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "rgba(59, 130, 246, 0.45)";
          el.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.7), 0 0 25px rgba(59,130,246,0.15)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "#1f2230";
          el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
        }}
      >
        {/* ── Fixed 48px Stack Header: Displays Number & Title Clearly When Collapsed ── */}
        <div className="h-12 px-5 sm:px-6 flex items-center justify-between border-b border-[#1f2230] bg-[#12141f]">
          <div className="flex items-center min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors tracking-tight truncate">
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline group-hover:text-blue-400 transition-colors">
              Details
            </span>
            <ArrowUpRight
              size={15}
              className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
        </div>

        {/* ── Card Body (covered when subsequent card stacks over this one) ── */}
        <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start justify-between">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-blue-400 mb-1.5">
              {project.tagline}
            </p>

            {/* Truncated description with subtle ellipsis */}
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 max-w-2xl mb-4">
              {project.description}
            </p>

            {/* Metrics pills if present */}
            {project.metrics && (
              <div className="flex flex-wrap gap-2.5 mb-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs"
                  >
                    <span className="font-bold text-blue-400 font-mono mr-1.5">{m.value}</span>
                    <span className="text-slate-400 text-[11px]">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technology tags & direct links */}
            <div className="flex flex-wrap gap-2 items-center justify-between mt-2 pt-2 border-t border-[#1a1d29]/60">
              <div className="flex flex-wrap gap-1.5 items-center">
                {project.technologies.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="tag"
                    style={{ fontSize: "0.7rem", padding: "0.2rem 0.55rem" }}
                  >
                    {t}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-xs text-slate-500 font-mono ml-1">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                <span className="text-xs text-blue-400 font-medium group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                  Details &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contained clean thumbnail */}
          <div className="hidden sm:block shrink-0 w-44 h-28 self-center rounded-xl overflow-hidden">
            <ProjectThumbnail project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile View: Expandable Clean Cards ──
function MobileProjectCards({
  projects,
  onOpenDetails,
}: {
  projects: Project[];
  onOpenDetails: (p: Project) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <div className="space-y-3.5">
      {projects.map((p, i) => {
        const isOpen = openId === p.id;
        return (
          <div
            key={p.id}
            className="rounded-2xl border overflow-hidden transition-colors"
            style={{
              background: "#0d0e15",
              borderColor: isOpen ? "rgba(59, 130, 246, 0.4)" : "#1f2230",
            }}
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
              onClick={() => setOpenId(isOpen ? null : p.id)}
            >
              <div className="min-w-0 pr-3 flex items-center">
                <h3 className="text-sm font-bold text-white truncate">{p.name}</h3>
              </div>
              <ChevronDown
                size={16}
                className="text-slate-400 shrink-0 transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 border-t border-[#1f2230] space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex-1"
                        >
                          <ExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-[#161926] border border-[#2d3246] flex-1"
                        >
                          <GithubIcon size={13} />
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => onOpenDetails(p)}
                        className="btn-primary text-xs px-4 py-2 justify-center"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Export ──
export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileProjectCards projects={projects} onOpenDetails={setSelectedProject} />
      ) : (
        <div className="relative pb-16">
          {projects.map((project, idx) => (
            <StackedProjectCard
              key={project.id}
              project={project}
              index={idx}
              total={projects.length}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>
      )}

      {/* Details Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
