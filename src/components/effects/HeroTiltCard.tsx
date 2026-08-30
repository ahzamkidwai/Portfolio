"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2 } from "lucide-react";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const pipeline = [
  { label: "Software", detail: "TypeScript · React · Next.js" },
  { label: "Data", detail: "Pipelines · Embeddings · Vector DBs" },
  { label: "AI", detail: "RAG · LLMs · Fine-tuning" },
  { label: "Agents", detail: "Tool use · Orchestration" },
  { label: "Applications", detail: "Shipped, end to end" },
];

export default function HeroTiltCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const disabled = reducedMotion || isTouch;

  // Normalized 0–1 cursor position within the card, spring-smoothed so the
  // tilt trails the cursor instead of snapping to it.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.6 };
  const x = useSpring(mx, springConfig);
  const y = useSpring(my, springConfig);

  const rotateX = useTransform(y, [0, 1], [9, -9]);
  const rotateY = useTransform(x, [0, 1], [-9, 9]);
  const spotlightX = useTransform(x, (v) => `${v * 100}%`);
  const spotlightY = useTransform(y, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${spotlightX} ${spotlightY}, rgb(var(--color-signal) / 0.16), transparent 72%)`;

  // Background orb drifts opposite the tilt for a subtle parallax layer
  // sitting "behind" the card in 3D space.
  const orbX = useTransform(x, [0, 1], [18, -18]);
  const orbY = useTransform(y, [0, 1], [18, -18]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Ambient background orb — parallaxes opposite the card's tilt */}
      <motion.div
        aria-hidden="true"
        style={{ x: disabled ? 0 : orbX, y: disabled ? 0 : orbY }}
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-40 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgb(var(--color-signal) / 0.25) 0%, transparent 70%)" }}
        />
      </motion.div>

      <div
        className="[perspective:1400px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={ref}
          style={{
            rotateX: disabled ? 0 : rotateX,
            rotateY: disabled ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative overflow-hidden rounded-lg border border-line bg-surface/60 p-6 shadow-card md:p-8"
        >
          {/* Cursor-tracking spotlight */}
          {!disabled && (
            <motion.div
              aria-hidden="true"
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0"
            />
          )}

          {/* Faint grid texture, matches BackgroundGrid used across the site */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--color-line)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-line)) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 100%)",
            }}
          />

          <div style={{ transform: "translateZ(40px)" }} className="relative">
            <div className="mb-6 flex items-center gap-2">
              <Code2 size={15} className="text-signal-dim" />
              <p className="eyebrow">Signal path</p>
            </div>

            <div className="space-y-2.5">
              {pipeline.map((step, i) => (
                <div
                  key={step.label}
                  style={{ transform: `translateZ(${16 + i * 5}px)` }}
                  className="flex items-center gap-3 rounded-md border border-line-strong bg-paper-dim/70 px-3.5 py-2.5 backdrop-blur-sm transition-colors duration-200 hover:border-signal/40"
                >
                  <span className="font-mono text-xs text-signal-dim">0{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight text-ink">{step.label}</p>
                    <p className="truncate font-mono text-[11px] text-muted">{step.detail}</p>
                  </div>
                  {i < pipeline.length - 1 && (
                    <span aria-hidden="true" className="ml-auto font-mono text-xs text-line-strong">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}