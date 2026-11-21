import { Quote } from "lucide-react";
import Stars from "../ui/Stars";

export default function ReviewCard({ name, city, text }: { name: string; city: string; text: string }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-card">
      <div className="flex items-center justify-between">
        <Stars size={16} />
        <Quote size={28} className="text-surface-2" fill="currentColor" strokeWidth={0} aria-hidden />
      </div>
      <blockquote className="mt-5 flex-1 text-[16px] text-muted">“{text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-bold text-accent" aria-hidden>
          {name.charAt(0)}
        </span>
        <span>
          <span className="block font-medium text-text">{name}</span>
          <span className="block text-[13px] text-subtle">{city} · sample review</span>
        </span>
      </figcaption>
    </figure>
  );
}
