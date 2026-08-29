"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Code2, Mail, Phone, FileText } from "lucide-react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { personal } from "@/lib/data/personal";
import SceneWrapper from "@/components/3d/SceneWrapper";
import BackgroundGrid from "@/components/effects/BackgroundGrid";

const socials = [
  { href: personal.links.github, icon: Github, label: "GitHub" },
  { href: personal.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: personal.links.leetcode, icon: SiLeetcode, label: "LeetCode" },
  { href: personal.links.gfg, icon: SiGeeksforgeeks, label: "GeeksforGeeks" },
  { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
  { href: `tel:${personal.phone}`, icon: Phone, label: "Phone" }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <BackgroundGrid />
      <Container className="relative grid gap-16 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {personal.availability.show && (
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-xs text-ink-soft">{personal.availability.label}</span>
            </motion.div>
          )}

          <motion.h1 variants={item} className="font-display text-display-1 font-semibold text-ink">
            {personal.name}
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-mono text-sm text-signal-dim md:text-base">
            {personal.title}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {personal.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary" icon={<ArrowRight size={16} />}>
              View Projects
            </ButtonLink>
            <ButtonLink href={personal.resumeUrl} external variant="secondary">
              View Resume
            </ButtonLink>
            {/* <ButtonLink href="#contact" variant="ghost">
              Contact Me
            </ButtonLink> */}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex gap-5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="text-muted transition-colors duration-200 hover:text-signal"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-72 md:h-[420px]"
        >
          <SceneWrapper
            nodeCount={5}
            fallbackLabel="Software → Data → AI → Agents → Applications"
            className="h-full w-full"
          />
        </motion.div>
      </Container>
    </section>
  );
}
