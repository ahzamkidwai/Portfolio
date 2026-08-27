"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { ProjectEntry } from "@/lib/types";
import { Badge } from "@/components/ui/Card";

export default function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: ProjectEntry;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex h-full flex-col rounded-lg border border-line bg-surface/60 p-6 shadow-card transition-all duration-300 ease-signature hover:-translate-y-1 hover:shadow-card-hover ${
        featured ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <Badge>{project.category}</Badge>
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.displayName} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="text-muted transition-colors hover:text-signal"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.displayName} live demo`}
              onClick={(e) => e.stopPropagation()}
              className="text-muted transition-colors hover:text-signal"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className={`mt-4 font-display font-semibold text-ink ${featured ? "text-xl" : "text-base"}`}>
        {project.displayName}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
          <span key={tech} className="rounded-sm bg-paper-dim px-2 py-1 font-mono text-[11px] text-ink-soft">
            {tech}
          </span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-5 self-start text-sm font-medium text-signal-dim transition-colors hover:text-signal"
      >
        View details →
      </button>
    </motion.div>
  );
}
