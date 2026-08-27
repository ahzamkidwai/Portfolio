"use client";

import { motion } from "framer-motion";
import { Boxes, Bot, Blocks, Server } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const interests = [
  {
    icon: Server,
    title: "Full-Stack Engineering",
    description: "Next.js, React, Node.js, and Spring Boot — building products end to end, from schema to UI.",
  },
  {
    icon: Bot,
    title: "AI & LLM Engineering",
    description: "RAG pipelines, agentic workflows, and structured LLM outputs with LangChain and LangGraph.",
  },
  {
    icon: Blocks,
    title: "Blockchain & Web3",
    description: "Solidity smart contracts, on-chain verification systems, and decentralized applications.",
  },
  {
    icon: Boxes,
    title: "Developer Tooling",
    description: "In-browser IDEs, algorithm visualizers, and internal tools that make other engineers faster.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="About"
            title="An engineer who builds the pipeline, not just the interface."
            description="I work across the stack that modern AI products actually need — from mobile and web frontends, to backend APIs, to the retrieval and agent systems underneath. Currently pursuing an M.Tech in Computer Engineering at Aligarh Muslim University, alongside shipping production software."
            className="mb-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((interest, i) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="h-full">
                  <interest.icon size={20} className="text-signal" />
                  <h3 className="mt-4 font-display text-sm font-semibold text-ink">{interest.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{interest.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
