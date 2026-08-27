"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks, personal } from "@/lib/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const activeId = useActiveSection(navLinks.map((l) => l.href.replace("#", "")));

  function handleLogoClick(e: MouseEvent) {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      e.preventDefault();
      setShowEasterEgg(true);
      setLogoClicks(0);
      setTimeout(() => setShowEasterEgg(false), 3200);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-signature",
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Primary">
          <Link
            href="#home"
            onClick={handleLogoClick}
            className="relative font-display text-base font-semibold tracking-tight text-ink"
          >
            Ahzam<span className="text-signal">.</span>
            <AnimatePresence>
              {showEasterEgg && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-0 top-full mt-2 whitespace-nowrap rounded border border-line bg-ink px-3 py-1.5 font-mono text-[11px] text-paper shadow-card-hover"
                >
                  $ echo &quot;thanks for looking closely&quot;
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded px-3 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-signal"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="hidden items-center gap-1.5 rounded border border-line-strong px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-ink hover:text-ink md:inline-flex"
              aria-label="Open command palette"
            >
              <Command size={13} />
              <span className="font-mono">K</span>
            </button>
            <a
              href={personal.resumeUrl}
              className="hidden rounded bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors duration-300 hover:bg-signal md:inline-block"
            >
              Resume
            </a>
            <button
              className="md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-paper md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-sm text-muted">Theme</span>
                <ThemeToggle />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-2 py-3 text-base text-ink-soft transition-colors hover:text-signal"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={personal.resumeUrl}
                className="mt-2 rounded bg-ink px-4 py-3 text-center text-sm font-medium text-paper"
              >
                View Resume
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
