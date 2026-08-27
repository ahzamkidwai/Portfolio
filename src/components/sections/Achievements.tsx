"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/data/achievements";

export default function Achievements() {
  return (
    <section id="achievements" className="bg-paper-dim/50 py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Achievements" title="Highlights along the way." />
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-lg border border-line bg-surface/70 p-6"
            >
              <Trophy size={20} className="mt-0.5 shrink-0 text-signal" />
              <div>
                <p className="font-display text-sm font-semibold text-ink">{a.title}</p>
                {a.detail && <p className="mt-1 text-sm text-muted">{a.detail}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
