"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/config";
import Reveal from "../ui/Reveal";
import Stars from "../ui/Stars";
import ReviewCard from "./ReviewCard";

/** Scroll-snap carousel: swipe on touch, arrows + dots on any device. */
export default function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => cards.indexOf(e.target as HTMLElement));
        if (visible.length) setActive(Math.min(...visible));
      },
      { root: el, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[Math.max(0, Math.min(reviews.length - 1, i))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Stars size={22} className="mb-4" />
            <h2 className="h2">What our customers say</h2>
            <p className="mt-4">Sample reviews shown — real Google reviews coming soon.</p>
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => goTo(active + d)}
                aria-label={d === -1 ? "Previous reviews" : "Next reviews"}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent"
              >
                {d === -1 ? <ChevronLeft size={22} strokeWidth={1.5} /> : <ChevronRight size={22} strokeWidth={1.5} />}
              </button>
            ))}
          </div>
        </Reveal>

        <ul
          ref={track}
          aria-label="Customer reviews"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 py-3 md:-mx-8 md:scroll-px-8 md:px-8 lg:gap-6"
        >
          {reviews.map((r) => (
            <li key={r.name} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-48px)/3)]">
              <ReviewCard {...r} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all ${active === i ? "w-8 bg-accent-gradient" : "w-2 bg-surface-2 hover:bg-subtle"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
