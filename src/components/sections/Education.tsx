"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/lib/data/education";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Education" title="Academic background." />
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg border border-line bg-surface/60 p-6"
            >
              <GraduationCap size={20} className="text-signal" />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{entry.degree}</h3>
              <p className="mt-1 text-sm text-ink-soft">{entry.institution}</p>
              <p className="mt-1 font-mono text-xs text-muted">{entry.location}</p>
              {(entry.startDate || entry.endDate) && (
                <p className="mt-3 font-mono text-xs text-signal-dim">
                  {entry.startDate} — {entry.endDate}
                </p>
              )}
              {entry.detail && <p className="mt-2 text-sm text-muted">{entry.detail}</p>}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
