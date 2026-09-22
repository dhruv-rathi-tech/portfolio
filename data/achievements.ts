export interface Certification {
  title: string;
  issuer: string;
  image: string;
  year?: string;
  credentialUrl?: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    title: "Advanced Generative AI – Professional",
    issuer: "IBM",
    image: "/certificates/ibm-advanced-generative-ai.svg",
    year: "2025",
    description: "Advanced specialization in Generative AI architectures, foundation models, fine-tuning, and enterprise AI lifecycle.",
  },
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    image: "/certificates/oracle-agentic-ai.svg",
    year: "2025",
    description: "Certification in multi-agent orchestration, autonomous agent design patterns, tool integration, and reasoning systems.",
  },
  {
    title: "Prompt Engineering for Everyone",
    issuer: "IBM",
    image: "/certificates/ibm-prompt-engineering.svg",
    year: "2025",
    description: "Systematic techniques for context structuring, zero/few-shot reasoning, chain-of-thought, and prompt security.",
  },
  {
    title: "Machine Learning Implementation",
    issuer: "Infosys Springboard",
    image: "/certificates/infosys-ml.svg",
    year: "2025",
    description: "End-to-end implementation of classical ML algorithms, model evaluation pipelines, regression, and tree-based ensembles.",
  },
  {
    title: "Data Science",
    issuer: "Infosys",
    image: "/certificates/infosys-data-science.svg",
    year: "2024",
    description: "Statistical data analysis, feature engineering, exploratory modeling, data wrangling, and structured business insights.",
  },
];

export const achievements = [
  {
    title: "Adobe University Hackathon 2026",
    subtitle: "Among the top 416 teams out the 301,066",
    description:
      "Selected among 416 teams out of 301,066 global participants. Ranked in the top 0.14% of all competing teams worldwide.",
    metric: "Top 0.14%",
    highlight: true,
  },
  {
    title: "Design Lead",
    subtitle: "Sports Club, VIT Chennai",
    description:
      "Leading visual design and creative direction for the Sports Club at VIT Chennai, managing design systems for events and communications.",
    metric: null,
    metricLabel: null,
    highlight: false,
  },
];
