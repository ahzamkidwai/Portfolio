"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-signal focus-visible:bg-signal",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:border-ink",
  ghost: "bg-transparent text-ink hover:text-signal",
};

const base =
  "group inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-medium transition-all duration-300 ease-signature hover:-translate-y-0.5 active:translate-y-0";

export function ButtonLink({
  href,
  external,
  variant = "primary",
  className,
  children,
  icon,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variantClasses[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  icon,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variantClasses[variant], className)} {...rest}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}
