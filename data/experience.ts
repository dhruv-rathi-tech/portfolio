export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "AI & ML Intern",
    company: "Sutherland",
    period: "June 2026 – August 2026",
    location: "Chennai, Tamil Nadu",
    description:
      "Engineered production AI systems across LLM retrieval, agentic workflows, and predictive analytics pipelines for enterprise operations.",
    highlights: [
      "Built FastAPI backend services and data pipelines for LLM-powered retrieval and forecasting workflows.",
      "Developed a contractual-document RAG pipeline with citation-aware generation and information extraction.",
      "Designed modular agentic workflows with tool orchestration for multi-step AI tasks.",
      "Worked on forecasting workflows across 50,000+ invoice transactions.",
    ],
    tags: ["Python", "LLMs", "RAG", "Agentic AI", "FastAPI", "LangChain", "Forecasting", "Data Pipelines"],
  },
];
