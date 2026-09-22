"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project, ProjectCategory } from "@/data/projects";
import ProjectFilters from "./ProjectFilters";
import ProjectShowcase from "./ProjectShowcase";

const categoryOrder: Record<ProjectCategory, string[]> = {
  "AI/GenAI": [
    "hybrid-rag-chatbot",
    "agentic-trip-planner",
    "ai-image-classifier",
    "invoice-forecasting",
  ],
  "Data/Analytics": [
    "sensorlens",
    "finrisk",
    "invoice-forecasting",
  ],
  "Full Stack": [
    "shopease",
    "medidesk",
    "hybrid-rag-chatbot",
  ],
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | ProjectCategory>("ALL");

  const filtered: Project[] =
    activeFilter === "ALL"
      ? projects
      : categoryOrder[activeFilter]
          .map((slug) => projects.find((p) => p.slug === slug))
          .filter((p): p is Project => Boolean(p));

  return (
    <section id="projects" className="py-14 sm:py-18" style={{ background: "#09090b" }}>
      <div className="global-container">
        {/* Section header & filters */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">Featured Work.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ProjectFilters active={activeFilter} onChange={setActiveFilter} />
          </motion.div>
        </div>

        {/* Project Showcase */}
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-24 border border-dashed border-[#1f2230] rounded-2xl">
            <p className="text-slate-500 text-sm">No projects found in this category.</p>
          </div>
        ) : (
          <ProjectShowcase projects={filtered} />
        )}
      </div>
    </section>
  );
}
