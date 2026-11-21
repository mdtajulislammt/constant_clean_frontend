import { Star } from "lucide-react";

export default function Stars({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-accent ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}
