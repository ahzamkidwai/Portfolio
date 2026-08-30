import Link from "next/link";
import { Github, Linkedin, Code2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { navLinks, personal } from "@/lib/data/personal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-24 py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{personal.name}</p>
          <p className="mt-1 text-sm text-muted">{personal.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted sm:grid-cols-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-signal"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-signal"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={personal.links.leetcode}
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            className="text-muted transition-colors hover:text-signal"
          >
            <Code2 size={18} />
          </a>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col-reverse items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row">
        <p>© {year} {personal.name}. All rights reserved.</p>
        {/* <p className="font-mono">Built with Next.js, TypeScript &amp; AI.</p> */}
      </Container>
    </footer>
  );
}
