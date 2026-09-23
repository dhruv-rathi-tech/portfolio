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
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    setImgErr(false);
  }, [project.image]);

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

        {/* ── Project Preview Image in Detailed View ── */}
        {project.image && !imgErr && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] max-h-80 rounded-xl overflow-hidden bg-[#06070b] border border-[#1f2230] mb-6 group">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              unoptimized
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() => setImgErr(true)}
            />
            {/* Direct full-view link */}
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full-resolution screenshot"
              className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>View Full</span>
              <ExternalLink size={11} />
            </a>
          </div>
        )}

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

// ── Responsive Project Card (Full desktop aesthetic on both mobile and desktop) ──
function ProjectCard({
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
  // Sticky offset on desktop/tablet: 80px base + 48px per stacked card header
  const stickyTop = 80 + index * 48;

  return (
    <div
      className="relative md:sticky mb-5 md:mb-6 transition-all duration-300"
      style={{
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
        {/* ── Card Header: Displays Title Clearly ── */}
        <div className="h-12 px-4 sm:px-6 flex items-center justify-between border-b border-[#1f2230] bg-[#12141f]">
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

        {/* ── Card Body: Rich content with preview, metrics & actions ── */}
        <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-5 sm:gap-6 items-start justify-between">
          {/* Mobile Thumbnail on top */}
          <div className="w-full md:hidden h-44 rounded-xl overflow-hidden mb-1">
            <ProjectThumbnail project={project} />
          </div>

          {/* Left Content */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs font-medium text-blue-400 mb-1.5">
              {project.tagline}
            </p>

            {/* Truncated description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-2 max-w-2xl mb-4">
              {project.description}
            </p>

            {/* Metrics pills if present */}
            {project.metrics && (
              <div className="flex flex-wrap gap-2 mb-4">
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
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mt-2 pt-2 border-t border-[#1a1d29]/60">
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

              <div className="flex items-center gap-3 self-end sm:self-auto">
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
                    <span className="inline">Code</span>
                  </a>
                )}
                <span className="text-xs text-blue-400 font-medium group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                  Details &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: Contained clean thumbnail */}
          <div className="hidden md:block shrink-0 w-44 h-28 self-center rounded-xl overflow-hidden">
            <ProjectThumbnail project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ──
export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <div className="relative pb-12 sm:pb-16">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={projects.length}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </div>

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
