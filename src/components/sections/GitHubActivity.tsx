"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookMarked } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { personal } from "@/lib/data/personal";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  topLanguages: string[];
}

export default function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${personal.githubUsername}`);
        if (!res.ok) throw new Error("GitHub API unavailable");
        const data = await res.json();
        if (!cancelled) {
          setStats({
            publicRepos: data.public_repos ?? 0,
            followers: data.followers ?? 0,
            topLanguages: [],
          });
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="GitHub Activity"
          title="Open-source footprint."
          description="Live counts pulled from the public GitHub API — no fabricated numbers if the request fails."
        />

        {status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg border border-line bg-paper-dim" />
            ))}
          </div>
        )}

        {status === "ready" && stats && (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={BookMarked} label="Public Repositories" value={stats.publicRepos} />
            <StatCard icon={Star} label="Followers" value={stats.followers} />
            <StatCard icon={GitFork} label="Profile" value="@ahzamkidwai" isText />
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg border border-dashed border-line-strong bg-paper-dim/60 p-6 text-center">
            <p className="text-sm text-muted">
              Live GitHub stats couldn&apos;t be loaded right now. Visit the profile directly instead.
            </p>
            <a
              href={personal.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-signal-dim hover:text-signal"
            >
              github.com/{personal.githubUsername} →
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  isText = false,
}: {
  icon: typeof Star;
  label: string;
  value: string | number;
  isText?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg border border-line bg-surface/60 p-6"
    >
      <Icon size={18} className="text-signal" />
      <p className={`mt-4 font-display font-semibold text-ink ${isText ? "text-lg" : "text-3xl"}`}>{value}</p>
      <p className="mt-1 font-mono text-xs text-muted">{label}</p>
    </motion.div>
  );
}
