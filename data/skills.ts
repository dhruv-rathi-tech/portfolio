export interface SkillCategory {
  label: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "LANGUAGES",
    items: ["Python", "Java", "SQL", "C++", "C", "JavaScript"],
  },
  {
    label: "FRAMEWORKS",
    items: [
      "LangChain",
      "FastAPI",
      "Node.js",
      "Express.js",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Streamlit",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "RAG",
      "Agentic AI",
      "LLMs",
      "Vector Embeddings",
      "Deep Learning",
      "NLP",
      "Feature Engineering",
      "Predictive Modeling",
      "Prompt Engineering",
      "Neural Networks",
    ],
  },
  {
    label: "DATA",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "Data Transformation",
      "EDA",
      "Feature Engineering",
      "KPI Analysis",
    ],
  },
  {
    label: "TOOLS",
    items: [
      "Git / GitHub",
      "MySQL",
      "PostgreSQL",
      "ChromaDB",
      "Google Colab",
      "JWT Auth",
    ],
  },
];
