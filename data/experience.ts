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
      "Engineered backend services and data pipelines using Python and FastAPI, integrating vector databases and modular APIs to support scalable AI/LLM workflows.",
      "Developed Agentic AI workflows with modular tool integration and task orchestration for LLM-driven multi-step task execution and automation.",
      "Architected a contractual-document RAG pipeline with hybrid retrieval, cross-encoder reranking, and citation-aware LLM generation, prototyped on 100 documents and designed to scale to 1M documents.",
      "Built predictive data processing and forecasting workflows across 50,000+ enterprise business transactions.",
    ],
    tags: ["Python", "FastAPI", "LLMs", "RAG", "Agentic AI", "LangChain", "Vector DBs", "Data Pipelines"],
  },
];
