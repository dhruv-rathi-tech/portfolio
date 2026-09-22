"use client";

import { ProjectCategory } from "@/data/projects";

const filters: { label: string; value: "ALL" | ProjectCategory }[] = [
  { label: "ALL", value: "ALL" },
  { label: "AI / GENAI", value: "AI/GenAI" },
  { label: "DATA / ANALYTICS", value: "Data/Analytics" },
  { label: "FULL STACK", value: "Full Stack" },
];

interface Props {
  active: "ALL" | ProjectCategory;
  onChange: (v: "ALL" | ProjectCategory) => void;
}

export default function ProjectFilters({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = active === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                : "rgba(255, 255, 255, 0.03)",
              color: isActive ? "#ffffff" : "#94a3b8",
              border: isActive
                ? "1px solid rgba(96, 165, 250, 0.5)"
                : "1px solid #1f2230",
              boxShadow: isActive ? "0 0 16px rgba(59, 130, 246, 0.35)" : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(59, 130, 246, 0.4)";
                el.style.color = "#ffffff";
                el.style.background = "rgba(59, 130, 246, 0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#1f2230";
                el.style.color = "#94a3b8";
                el.style.background = "rgba(255, 255, 255, 0.03)";
              }
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
