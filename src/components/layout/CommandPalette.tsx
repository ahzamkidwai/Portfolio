"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, FileText, Mail, ArrowRight } from "lucide-react";
import { navLinks, personal } from "@/lib/data/personal";

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenRequest = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  const commands: Command[] = [
    ...navLinks.map((link) => ({
      id: link.href,
      label: `Go to ${link.label}`,
      icon: <ArrowRight size={15} />,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      },
    })),
    {
      id: "github",
      label: "Open GitHub profile",
      icon: <Github size={15} />,
      action: () => window.open(personal.links.github, "_blank"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn profile",
      icon: <Linkedin size={15} />,
      action: () => window.open(personal.links.linkedin, "_blank"),
    },
    {
      id: "resume",
      label: "View resume",
      icon: <FileText size={15} />,
      action: () => window.open(personal.resumeUrl, "_blank"),
    },
    {
      id: "email",
      label: `Email ${personal.email}`,
      icon: <Mail size={15} />,
      action: () => window.open(`mailto:${personal.email}`),
    },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const runAndClose = (cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-4 pt-28 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-lg border border-line bg-paper shadow-card-hover"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No matching commands.</li>
              )}
              {filtered.map((cmd) => (
                <li key={cmd.id}>
                  <button
                    onClick={() => runAndClose(cmd)}
                    className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-signal-soft hover:text-signal-dim"
                  >
                    {cmd.icon}
                    {cmd.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
