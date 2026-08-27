import { cn } from "@/lib/utils";

export default function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(var(--color-line)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-line)) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
        opacity: 0.5,
      }}
    />
  );
}
