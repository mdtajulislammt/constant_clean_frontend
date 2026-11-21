import { Droplets, ShieldCheck, Star, Truck } from "lucide-react";
import { trustItems } from "@/lib/config";

const icons = { star: Star, truck: Truck, droplets: Droplets, shield: ShieldCheck };

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="border-y border-border bg-bg-alt">
      <ul className="container-page grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {trustItems.map((t) => {
          const Icon = icons[t.icon];
          return (
            <li key={t.label} className="flex items-center gap-3 bg-bg-alt px-2 py-5 sm:px-4 md:justify-center md:py-6">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={20} strokeWidth={1.75} fill={t.icon === "star" ? "currentColor" : "none"} aria-hidden />
              </span>
              <span className="text-[13px] font-bold uppercase leading-snug tracking-[1px] text-text sm:text-[14px]">{t.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
