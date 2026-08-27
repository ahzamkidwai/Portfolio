"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export default function Skills() {
  const [openCategory, setOpenCategory] = useState<string | null>(skillCategories[0]?.id ?? null);

  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Grouped by what they're actually used for."
          description="Not a wall of badges — categories organized around real project experience."
        />

        <div className="grid gap-3">
          {skillCategories.map((category, i) => {
            const isOpen = openCategory === category.id;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-lg border border-line"
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-semibold text-ink">{category.label}</span>
                  <Plus
                    size={16}
                    className={cn("text-muted transition-transform duration-300", isOpen && "rotate-45 text-signal")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 px-5 pb-5">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-sm border border-line-strong bg-paper-dim px-2.5 py-1.5 font-mono text-xs text-ink-soft transition-colors duration-200 hover:border-signal hover:text-signal-dim"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
