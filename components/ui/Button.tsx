import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline-accent" | "ghost";

const base =
  "btn-text inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-4 transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent-gradient text-on-accent hover:-translate-y-0.5 hover:shadow-lift hover:brightness-110",
  secondary: "border border-text/20 text-text hover:border-accent hover:text-accent",
  "outline-accent": "border border-accent text-accent hover:bg-accent hover:text-on-accent",
  ghost: "text-muted hover:text-text px-3",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
