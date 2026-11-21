import { Check } from "lucide-react";
import { formatUSD } from "@/lib/pricing";
import { ButtonLink } from "../ui/Button";

export default function PlanCard({
  name,
  price,
  period,
  includes,
  featured,
  href,
}: {
  name: string;
  price: number;
  period: string;
  includes: string[];
  featured?: boolean;
  href: string;
}) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-surface p-7 transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-card ${
        featured ? "border-accent/60" : "border-border"
      }`}
    >
      <h3 className="font-display text-[24px] uppercase text-text">{name}</h3>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-[48px] leading-none text-accent">{formatUSD(price)}</span>
        <span className="text-subtle">{period}</span>
      </p>
      <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-7">
        {includes.map((x) => (
          <li key={x} className="flex items-start gap-3 text-[15px]">
            <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {x}
          </li>
        ))}
      </ul>
      <ButtonLink href={href} variant={featured ? "primary" : "secondary"} className="mt-9 w-full">
        Book {name}
      </ButtonLink>
    </article>
  );
}
