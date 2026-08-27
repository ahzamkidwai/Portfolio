"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import { personal } from "@/lib/data/personal";

export default function ResumeSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-8 rounded-lg border border-line bg-ink p-10 text-paper md:flex-row md:items-center md:p-14"
        >
          <div className="flex items-start gap-5">
            <div className="rounded-lg bg-paper/10 p-3">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">{personal.name}</h3>
              <p className="mt-1 font-mono text-sm text-paper/70">{personal.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-signal px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal-dim"
            >
              <Eye size={16} /> View Resume
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded border border-paper/30 px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
            >
              <Download size={16} /> Download
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
