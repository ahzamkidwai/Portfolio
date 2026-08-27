"use client";

import { motion } from "framer-motion";
import { Github, Code2, FileCode2, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { personal } from "@/lib/data/personal";

const profiles = [
  {
    icon: Github,
    name: "GitHub",
    handle: "@ahzamkidwai",
    href: personal.links.github,
  },
  {
    icon: Code2,
    name: "LeetCode",
    handle: "ahzamkidwai",
    href: personal.links.leetcode,
  },
  {
    icon: FileCode2,
    name: "GeeksforGeeks",
    handle: "ahzamnaseemkidwai",
    href: personal.links.gfg,
  },
];

export default function CodingProfiles() {
  return (
    <section className="border-y border-line bg-paper-dim/50 py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Coding Profiles" title="Where I practice and share code." />
        <div className="grid gap-4 sm:grid-cols-3">
          {profiles.map((profile, i) => (
            <motion.a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between rounded-lg border border-line bg-surface/70 p-6 transition-all duration-300 ease-signature hover:-translate-y-1 hover:border-signal hover:shadow-card"
            >
              <div className="flex items-center gap-4">
                <profile.icon size={22} className="text-ink group-hover:text-signal" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{profile.name}</p>
                  <p className="font-mono text-xs text-muted">{profile.handle}</p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
              />
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
