"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SceneWrapper from "@/components/3d/SceneWrapper";

const nodes = [
  {
    label: "Software",
    detail: "Full-stack applications built with React, Next.js, React Native, and Node.js — the surfaces people interact with.",
  },
  {
    label: "Data",
    detail: "Relational schemas (MySQL, PostgreSQL) and vector stores (ChromaDB, FAISS) that hold structured and semantic information.",
  },
  {
    label: "AI",
    detail: "Embeddings, retrieval, and LLM reasoning — RAG pipelines that ground model outputs in real context.",
  },
  {
    label: "Agents",
    detail: "LangChain/LangGraph orchestration that chains tools, retrieval, and reasoning into multi-step workflows.",
  },
  {
    label: "Applications",
    detail: "The finished product — a smart-contract auditor, a document Q&A tool, a credential verification portal.",
  },
];

export default function EngineeringVisualization() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? nodes[activeIndex] : null;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Systems View"
          title="Software → Data → AI → Agents → Applications."
          description="Click a node to see what that layer means in the projects I've built."
        />

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="relative h-72 md:h-96">
            <SceneWrapper
              nodeCount={5}
              interactive
              activeIndex={activeIndex}
              onNodeClick={(i) => setActiveIndex(i)}
              fallbackLabel="Software → Data → AI → Agents → Applications"
              className="h-full w-full"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 md:hidden">
              {nodes.map((n, i) => (
                <button
                  key={n.label}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeIndex === i ? "border-signal bg-signal-soft text-signal-dim" : "border-line-strong text-muted"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeIndex ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 rounded-lg border border-line bg-surface/60 p-6 md:mt-0"
            >
              {active ? (
                <>
                  <p className="eyebrow mb-2">{active.label}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{active.detail}</p>
                </>
              ) : (
                <p className="text-sm leading-relaxed text-muted">
                  Select a node — on desktop, click directly on the visualization; on mobile, use the labels above.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
