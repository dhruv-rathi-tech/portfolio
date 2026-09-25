export type ProjectCategory = "AI/GenAI" | "Data/Analytics" | "Full Stack";

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  highlights: string[];
  metrics?: { label: string; value: string }[];
  github?: string;
  demo?: string;
  image?: string;
  logo?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "DocMate – Multi-Format Document Assistant",
    slug: "hybrid-rag-chatbot",
    tagline: "Full-stack RAG assistant supporting multi-format document parsing for high-fidelity, context-aware Q&A.",
    description:
      "A full-stack document chatbot that combines dense vector search with BM25 sparse retrieval for high-accuracy document Q&A. Built with LangChain, FastAPI, and ChromaDB, with session-isolated document pipelines that keep each user's context cleanly separated. Supports multi-format document ingestion for seamless knowledge extraction and retrieval.",
    categories: ["AI/GenAI", "Full Stack"],
    technologies: ["LangChain", "FastAPI", "ChromaDB", "BM25", "PyTorch", "Python"],
    highlights: [
      "Hybrid retrieval combining dense embeddings and BM25 sparse search",
      "Cross-encoder reranking for precision result ordering",
      "Multi-format document ingestion and processing",
      "Session-isolated document pipelines for multi-user support",
      "Context-aware Q&A with accurate citation handling",
      "FastAPI backend with async document ingestion endpoints",
      "Contractual document RAG with information extraction",
    ],
    github: "https://github.com/dhruv-rathi-tech/document-chatbot",
    image: "/images/projects/docmate.png",
  },
  {
    id: "2",
    name: "TripPilot – Agentic Trip Planner",
    slug: "agentic-trip-planner",
    tagline: "LLM-powered agentic system that orchestrates multiple tools and APIs to generate travel plans.",
    description:
      "An agentic AI system powered by a Groq LLM that coordinates flight, hotel, weather, and route tools to build complete travel itineraries. It executes independent searches concurrently, processes and ranks candidate options against user constraints, and adaptively replans when the generated plan fails validation.",
    categories: ["AI/GenAI"],
    technologies: ["Python", "Groq LLM", "Pydantic", "SerpApi", "Open-Meteo"],
    highlights: [
      "LLM-powered agentic workflow with tool orchestration",
      "Concurrent API calls for flights, hotels, weather, and routes",
      "Structured data processing with Pydantic validation",
      "Candidate generation and ranking based on budget and travel constraints",
      "Reflection-based verification and adaptive replanning",
      "Deterministic validation of LLM-generated travel plans",
    ],
    github: "https://github.com/dhruv-rathi-tech/agentic-trip-planner",
    image: "/images/projects/trippilot.png",
  },
  {
    id: "3",
    name: "SynthLens – AI Image Detection",
    slug: "ai-image-classifier",
    tagline: "Attention-based deep learning system for distinguishing AI-generated images from real photographs.",
    description:
      "A hybrid deep learning system that distinguishes AI-generated images from real photographs by combining spatial features with frequency-domain and color-stability signals. Built around a custom FDCS-Net V4 architecture with EfficientNet-B0, FFT-based feature extraction, perturbation-based color analysis, and attention-driven feature fusion.",
    categories: ["AI/GenAI"],
    technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Matplotlib"],
    highlights: [
      "Multi-branch architecture combining spatial, FFT-frequency, and color-stability features",
      "EfficientNet-B0 backbone for spatial feature extraction",
      "Attention-based fusion that dynamically weights the three feature branches",
      "Auxiliary branch supervision to improve feature learning and prevent branch collapse",
      "Three-stage training pipeline with progressive backbone unfreezing and end-to-end fine-tuning",
      "Validation-based threshold selection and leak-free held-out test evaluation",
      "Real-time image inference through the prediction pipeline",
    ],
    metrics: [
      { label: "Test Accuracy", value: "93.78%" },
      { label: "AUC-ROC", value: "0.9748" },
      { label: "Test F1-Score", value: "0.94" },
    ],
    github: "https://github.com/dhruv-rathi-tech/ai-image-detection",
    image: "/images/projects/synthlens.png",
  },
  {
    id: "4",
    name: "PayCast – Enterprise Invoice Payment Forecasting",
    slug: "invoice-forecasting",
    tagline: "ML pipeline predicting invoice payment timelines across 50,000+ B2B transactions.",
    description:
      "An end-to-end machine learning pipeline built on 50,000+ enterprise invoice transactions to predict payment delay duration. The system covers data preprocessing, exploratory analysis, feature engineering, recursive feature elimination, and comparative ensemble modeling, with a Streamlit dashboard for interactive predictions.",
    categories: ["AI/GenAI", "Data/Analytics"],
    technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    highlights: [
      "50,000+ business transactions processed end-to-end",
      "Recursive feature elimination (RFE) for optimal feature selection",
      "Comparative evaluation of Random Forest, Gradient Boosting, and XGBoost",
      "Comprehensive EDA and feature engineering pipeline",
      "Interactive Streamlit prediction dashboard for payment-delay predictions",
    ],
    metrics: [
      { label: "Transactions", value: "50,000+" },
      { label: "R² Score", value: "0.656" },
      { label: "RMSE", value: "~8 days" },
    ],
    github: "https://github.com/dhruv-rathi-tech/invoice-payment-forecasting",
    demo: "https://invoicepaymentforecasting.streamlit.app",
    image: "/images/projects/paycast.png",
  },
  {
    id: "5",
    name: "ShopEase – Full-Stack E-Commerce Platform",
    slug: "shopease",
    tagline: "Production-ready e-commerce platform with JWT authentication, RBAC, Razorpay.",
    description:
      "A full-stack e-commerce platform built with Node.js, Express.js, and MySQL, supporting product catalog, cart, orders, user, and inventory management. Implements JWT-based authentication, bcrypt password hashing, role-based access control, and Razorpay payments with server-side signature verification.",
    categories: ["Full Stack"],
    technologies: ["Node.js", "Express.js", "MySQL", "JavaScript", "JWT", "Razorpay"],
    highlights: [
      "RESTful API for catalog, cart, orders, users, and inventory",
      "JWT-based authentication with bcrypt password hashing",
      "Role-based access control for customers and administrators",
      "Razorpay payment gateway with server-side signature verification",
      "Structured route architecture with middleware layers",
    ],
    github: "https://github.com/dhruv-rathi-tech/ecommerce-web",
    demo: "https://shopease-web.up.railway.app/",
    image: "/images/projects/shopease.png",
  },
  {
    id: "6",
    name: "MediDesk – Healthcare Appointment Manager",
    slug: "medidesk",
    tagline: "Concurrency-safe healthcare appointment platform with Google Calendar sync and LLM-powered visit summaries.",
    description:
      "A healthcare appointment management system with concurrency-safe scheduling using PostgreSQL advisory locks to prevent double-booking. Integrates Google Calendar sync, async email workflows, and LLM-powered visit summaries. Supports patient, doctor, and admin portals with JWT RBAC and OAuth security.",
    categories: ["Full Stack"],
    technologies: ["Node.js", "Express.js", "PostgreSQL", "React", "JWT", "OAuth"],
    highlights: [
      "Concurrency-safe scheduling with PostgreSQL advisory locks",
      "Database-level double-booking prevention",
      "Google Calendar synchronization for appointments",
      "Async email notification workflows",
      "LLM-powered visit summary generation",
      "Patient, doctor, and admin role portals",
      "OAuth2 authentication with JWT-based RBAC",
    ],
    github: "https://github.com/dhruv-rathi-tech/healthcare-appointment-manager",
    demo: "https://medidesk-healthcare.vercel.app",
    image: "/images/projects/medidesk.png",
  },
  {
    id: "7",
    name: "SensorLens – Sensor Data Analytics Platform",
    slug: "sensorlens",
    tagline: "End-to-end ETL and analytics platform for IoT sensor telemetry with SQL-driven insights and KPI dashboards.",
    description:
      "A data analytics platform for processing IoT sensor telemetry through an end-to-end Python ETL pipeline. Handles data ingestion, validation, deduplication, and rejected-record logging before loading data into a normalized MySQL schema. Advanced SQL analytics and a Streamlit dashboard provide sensor KPIs, trends, anomalies, and data-quality insights.",
    categories: ["Data/Analytics"],
    technologies: ["Python", "Pandas", "MySQL", "Streamlit"],
    highlights: [
      "ETL pipeline with validation, deduplication, and rejection logging",
      "Normalized MySQL schema with analytical views",
      "Advanced SQL analytics using CTEs, subqueries, and window functions",
      "KPI dashboard for sensor performance and trend analysis",
      "Sensor anomaly detection and automated data-quality reporting",
      "CSV export for downstream analysis",
    ],
    github: "https://github.com/dhruv-rathi-tech/sensor-data-analytics",
    demo: "https://sensor-data-analytics.streamlit.app",
    image: "/images/projects/sensorlens.png",
  },
  {
    id: "8",
    name: "FinRisk – Financial Anomaly & Risk Narrator",
    slug: "finrisk",
    tagline: "Multi-factor financial anomaly detection and risk analysis platform with interactive dashboards.",
    description:
      "A financial analytics system that ingests, transforms, and validates structured financial data to perform multi-factor anomaly detection and risk scoring. Extracts relevant market signals and presents risk patterns through interactive Streamlit dashboards with drill-down analysis and narrative insights.",
    categories: ["Data/Analytics"],
    technologies: ["Python", "Pandas", "NumPy", "SQL", "PowerBI"],
    highlights: [
      "End-to-end financial data ingestion, transformation, and validation",
      "Multi-factor anomaly detection across financial metrics",
      "Risk scoring and severity-based classification",
      "Market-signal extraction from structured financial data",
      "Interactive dashboards with drill-down analysis and narrative insights",
    ],
    github: "https://github.com/dhruv-rathi-tech/finrisk-engine",
    image: "/images/projects/finrisk.png",
  },
];
