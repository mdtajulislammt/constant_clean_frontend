"use client";

import { ArrowRight, Check, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { packages, type PackageId } from "@/lib/config";
import { formatUSD } from "@/lib/pricing";
import { useAppDispatch } from "@/store/hooks";
import { resetBooking, setPackage } from "@/store/slices/bookingSlice";
import { Button } from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/** Full Detail + the 3 Maintenance Check-Up options. Fixed prices (lib/config.ts → packages). */
export default function PricingTable() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  /** Start a fresh booking pre-filled with this package, then open the flow. */
  const book = (pkg: PackageId) => {
    dispatch(resetBooking());
    dispatch(setPackage(pkg));
    router.push("/book");
  };

  return (
    <section id="pricing" className="scroll-mt-24 border-y border-border bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Simple pricing" title="Services & pricing" align="center" intro="One flat price for any car, SUV or truck. No hidden fees." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col rounded-lg border bg-surface p-7 transition-all duration-300 hover:border-accent hover:shadow-card ${
                  p.popular ? "border-accent lg:-translate-y-3" : "border-border"
                }`}
              >
                {p.popular ? (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-gradient px-4 py-1 text-[12px] font-bold uppercase tracking-[1px] text-on-accent">
                    Most Popular
                  </span>
                ) : (
                  p.group === "maintenance" && <p className="eyebrow mb-2 !text-[11px]">Maintenance Check-Up</p>
                )}
                <h3 className="font-display text-[24px] uppercase text-text">{p.name}</h3>
                <p className="mt-2 text-[15px]">{p.blurb}</p>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-[48px] leading-none text-accent-gradient">{formatUSD(p.price)}</span>
                  {p.period && <span className="text-[15px] text-muted">{p.period}</span>}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-[14px] text-subtle">
                  <Clock size={14} aria-hidden /> {p.duration}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-[15px]">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent-2" aria-hidden /> {x}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.popular ? "primary" : "secondary"}
                  className="mt-8 w-full whitespace-nowrap"
                  onClick={() => book(p.id)}
                  aria-label={`Book ${p.name}`}
                >
                  Book Now <ArrowRight size={16} aria-hidden />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
