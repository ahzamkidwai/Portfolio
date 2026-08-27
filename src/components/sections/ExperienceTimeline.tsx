"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Card";
import { experience } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

export default function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built."
          description="Roles spanning mobile app delivery, government data systems, and full-stack e-commerce infrastructure."
        />

        <div className="relative mt-4 border-l border-line pl-8 md:pl-10">
          {experience.map((entry, i) => {
            const isOpen = openId === entry.id;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center md:-left-[49px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-signal-soft" />
                </span>

                <button
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  className="flex w-full flex-col items-start gap-1 text-left sm:flex-row sm:items-baseline sm:justify-between"
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {entry.role} · {entry.company}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
                      <MapPin size={12} /> {entry.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">
                      {entry.startDate} — {entry.endDate}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn("text-muted transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>
                      <ul className="mt-4 space-y-2.5">
                        {entry.highlights.map((h, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {entry.technologies.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
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
