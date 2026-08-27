"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { ProjectEntry } from "@/lib/types";
import { Badge } from "@/components/ui/Card";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectEntry | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-line bg-paper p-8 shadow-card-hover"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 rounded p-1 text-muted transition-colors hover:text-ink"
            >
              <X size={20} />
            </button>

            <Badge>{project.category}</Badge>
            <h2 id="project-modal-title" className="mt-4 font-display text-2xl font-semibold text-ink">
              {project.displayName}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {project.longDescription ?? project.description}
            </p>

            {project.keyFeatures.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-3">Key Features</p>
                <ul className="space-y-2">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-3">Metrics</p>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <Badge key={m}>{m}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="eyebrow mb-3">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal"
                >
                  <Github size={16} /> View Repository
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded border border-dashed border-line-strong px-4 py-2.5 font-mono text-xs text-muted">
                  Repository link coming soon
                </span>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
