import { SkillCategory } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "Solidity"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    skills: ["React.js", "React Native", "Node.js", "Express.js", "Next.js", "FastAPI", "Foundry"],
  },
  {
    id: "ai-ml",
    label: "AI / LLM Engineering",
    skills: [
      "LangChain",
      "LangGraph",
      "Model Context Protocol (MCP)",
      "Retrieval-Augmented Generation (RAG)",
      "Hugging Face Transformers",
      "Scikit-learn",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Text Chunking",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "ChromaDB", "FAISS", "Supabase"],
  },
  {
    id: "blockchain",
    label: "Blockchain / Web3",
    skills: ["Solidity", "Foundry", "ERC-721 (Soulbound Tokens)", "IPFS", "Ethers.js"],
  },
  {
    id: "tools",
    label: "Developer Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "Postman",
      "LangSmith",
      "Google Firebase",
      "Google Play Console",
      "REST API Development & Testing",
    ],
  },
];
