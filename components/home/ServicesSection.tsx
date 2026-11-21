"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { services } from "@/lib/config";
import { ButtonLink } from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "./ServiceCard";

/** High Gloss–style section: eyebrow + left heading, arrow controls, snap carousel (3 / 2 / 1 per view). */
export default function ServicesSection() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 28), behavior: "smooth" });
  };

  return (
    <section id="services" className="scroll-mt-24 bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Our Services"
          intro="Professional detailing, done in your driveway or office parking lot."
        >
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d === -1 ? "Previous services" : "Next services"}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent"
              >
                {d === -1 ? <ChevronLeft size={22} strokeWidth={1.5} /> : <ChevronRight size={22} strokeWidth={1.5} />}
              </button>
            ))}
          </div>
        </SectionHeading>

        <ul
          ref={track}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 py-3 md:-mx-8 md:scroll-px-8 md:px-8 lg:gap-7"
        >
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.id}
              delay={i * 0.08}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-56px)/3)]"
            >
              <ServiceCard name={s.name} desc={s.desc} image={s.image} href={s.href} priceLabel={s.priceLabel} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <ButtonLink href="/#pricing" variant="secondary">
            See pricing
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
