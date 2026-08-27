import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface/60 p-6 shadow-card transition-all duration-300 ease-signature hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-line-strong px-2.5 py-1 font-mono text-xs text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
