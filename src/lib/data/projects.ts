import { ProjectEntry } from "@/lib/types";

/**
 * Projects are sourced from two places:
 *  - "resume": full descriptions extracted from the resume's Projects section
 *  - "github": pinned repositories on github.com/ahzamkidwai, described using
 *    each repo's own public description (language taken from the repo card)
 *
 * IntelliRAG exists on GitHub but is not currently pinned — its repo URL is
 * left as a placeholder until it's added.
 *
 * Nothing here is fabricated: no invented stars, live demos, or metrics.
 */
export const projects: ProjectEntry[] = [
  {
    id: "smart-contract-auditor",
    name: "Agentic-Smart-Contract-Security-Auditor",
    displayName: "Smart Contract Auditor — RAG-Powered Vulnerability Analysis",
    description:
      "An AI-powered smart contract auditing pipeline that turns raw Slither security findings into actionable, developer-friendly explanations.",
    longDescription:
      "Developed an AI-powered smart contract auditing pipeline integrating Slither static analysis with retrieval-augmented generation to convert raw Solidity security findings into actionable, developer-friendly explanations. Built a Smart Contract Weakness Classification (SWC) knowledge base using ChromaDB, embeddings, and LangChain, grounding LLM responses across vulnerability categories including Reentrancy (SWC-107), Unchecked Calls, Access Control, and Timestamp Dependence. Integrated Groq Llama 3.3 70B and Google Gemini with Pydantic structured outputs to generate vulnerability explanations, security impact assessments, remediation guidance, and secure Solidity fix snippets.",
    category: "AI Engineering",
    featured: true,
    githubUrl: "https://github.com/ahzamkidwai/Agentic-Smart-Contract-Security-Auditor",
    technologies: ["Python", "Solidity", "Slither", "LangChain", "RAG", "ChromaDB", "Groq Llama 3.3 70B", "Google Gemini", "Pydantic"],
    keyFeatures: [
      "Converts raw Slither static-analysis findings into developer-friendly explanations",
      "SWC knowledge base (Reentrancy, Unchecked Calls, Access Control, Timestamp Dependence) grounding LLM responses via RAG",
      "Deterministic false-positive validation and severity reassessment",
      "Structured outputs (Pydantic) for security impact assessments and secure Solidity fix snippets",
    ],
    source: "resume",
  },
  {
    id: "credential-verification-dapp",
    name: "Blockchain-Enabled-Academic-Credential-Verification",
    displayName: "Credential Verification DApp — Blockchain-Enabled Academic Credentials",
    description:
      "A decentralized platform issuing tamper-proof, non-transferable academic credentials as Soulbound NFTs on Ethereum.",
    longDescription:
      "Engineered a decentralized platform for issuing and authenticating academic credentials as non-transferable Soulbound NFTs permanently bound to a student's wallet, addressing forged degrees and fraudulent certificates in education and recruitment. Implemented a smart contract-based issuance workflow allowing institutions to mint credentials directly on-chain, with certificate files stored on IPFS and metadata recorded immutably for transparent, public verifiability. Built a public verification portal enabling employers and institutions to confirm credential authenticity instantly, alongside an institution-controlled revocation mechanism.",
    category: "Blockchain / Web3",
    featured: true,
    githubUrl: "https://github.com/ahzamkidwai/Blockchain-Enabled-Academic-Credential-Verification",
    technologies: ["Solidity", "ERC-721 (Soulbound Tokens)", "IPFS", "Next.js", "Ethers.js"],
    keyFeatures: [
      "Non-transferable (soulbound) NFT certificates bound to a student's wallet",
      "On-chain issuance workflow with IPFS-stored certificate files and immutable metadata",
      "Public verification portal for instant, centralized-database-free authenticity checks",
      "Institution-controlled revocation mechanism",
    ],
    source: "resume",
  },
  {
    id: "intellirag",
    name: "IntelliRAG",
    displayName: "IntelliRAG — Local LLM-Powered Knowledge Retrieval System",
    description:
      "A fully local, privacy-preserving retrieval-augmented generation pipeline for offline document question-answering.",
    longDescription:
      "Built a retrieval-augmented generation pipeline implementing document ingestion, text preprocessing, chunking, embedding generation, and semantic retrieval using PyMuPDF, Sentence Transformers (all-mpnet-base-v2), PyTorch, and vector similarity search. Integrated Hugging Face Transformers with Google Gemma 2B/7B Instruct for fully local LLM inference, enabling privacy-preserving, offline document question-answering. Optimized LLM inference using 4-bit quantization, CUDA GPU acceleration, FP16 precision, and Scaled Dot-Product Attention (SDPA) to reduce memory footprint and improve inference throughput.",
    category: "AI Engineering",
    featured: true,
    // Confirmed to exist on GitHub but not yet pinned/linked — add the repo
    // URL here once available.
    githubUrl: undefined,
    technologies: ["Python", "Hugging Face Transformers", "Sentence Transformers", "PyTorch", "PyMuPDF", "Google Gemma 2B/7B"],
    keyFeatures: [
      "Document ingestion, chunking, embedding generation, and semantic retrieval pipeline",
      "Fully local, offline LLM inference for privacy-preserving Q&A",
      "4-bit quantization, CUDA acceleration, FP16 precision, and SDPA for optimized inference throughput",
    ],
    source: "resume",
  },
  {
    id: "ai-resume-analyzer",
    name: "AI-Resume-Analyzer",
    displayName: "AI Resume Analyzer (FitCheckAI)",
    description:
      "An AI-powered resume analyzer that evaluates resumes against a job description and returns a match score.",
    category: "AI Engineering",
    featured: false,
    githubUrl: "https://github.com/ahzamkidwai/AI-Resume-Analyzer",
    technologies: ["TypeScript"],
    keyFeatures: [
      "Upload a resume and a job description to generate a match score",
      "Evaluates resume content against job requirements",
    ],
    metrics: ["3 GitHub stars"],
    source: "github",
  },
  {
    id: "unicodex",
    name: "unicodeX",
    displayName: "unicodeX — Browser-Based Multi-Language IDE",
    description:
      "A web-based IDE built with Next.js supporting JavaScript, Python, C++, C, and Java with in-browser execution.",
    category: "Developer Tools",
    featured: false,
    githubUrl: "https://github.com/ahzamkidwai/unicodeX",
    technologies: ["TypeScript", "Next.js"],
    keyFeatures: [
      "Syntax highlighting across five languages",
      "Real-time console output",
      "Seamless in-browser code execution",
    ],
    source: "github",
  },
  // {
  //   id: "algorithm-insights",
  //   name: "AlgorithmInsights",
  //   displayName: "Algorithm Insights",
  //   description:
  //     "A platform for visualizing sorting and searching algorithms for students, educators, and enthusiasts.",
  //   category: "Developer Tools",
  //   featured: false,
  //   githubUrl: "https://github.com/ahzamkidwai/AlgorithmInsights",
  //   technologies: ["JavaScript"],
  //   keyFeatures: ["Visualizes common sorting and searching algorithms step by step"],
  //   metrics: ["1 fork"],
  //   source: "github",
  // },
  {
    id: "face-recognition",
    name: "Face-Recognition",
    displayName: "Advance Security Server - Face Recognition",
    description:
      "A real-time surveillance system using Raspberry Pi, OpenCV, and MongoDB Atlas that detects criminal faces via a live web dashboard and sends SMS alerts.",
    category: "Full-Stack",
    featured: false,
    githubUrl: "https://github.com/ahzamkidwai/Face-Recognition",
    technologies: ["Python", "OpenCV", "Flask", "MongoDB", "PyMongo", "Twilio", "NumPy"],
    keyFeatures: [
      "Real-time face detection and recognition with criminal vs. unknown classification",
      "Live MJPEG video dashboard with detection overlays and FPS metrics",
      "SMS alerts via Twilio and audio alerts on confirmed detections",
      "MongoDB Atlas + GridFS logging of detection history with IP-based geolocation",
    ],
    // metrics: ["0 GitHub stars", "0 forks"],
    source: "github",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
