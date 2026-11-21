"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import type { MediaImage } from "@/lib/media";
import MediaImg from "../ui/MediaImg";

const SIZES = "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw";
/** Same fit + position on both layers so the divider lines up exactly. */
const FIT = "object-cover object-center";

/**
 * Before/after compare. An invisible full-size range input handles drag, touch and keyboard.
 * Real pair (`before` + `after`) → shown as-is. Otherwise the single `image` is used on both sides,
 * with a dirt filter + grime overlay on the "Before" side.
 * TODO: Replace with client's real before/after photos of the same car.
 */
export default function BeforeAfter({
  image,
  before,
  after,
  title,
}: {
  image: MediaImage;
  before?: MediaImage;
  after?: MediaImage;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const realPair = !!(before && after);
  const afterImg = realPair ? after! : image;
  const beforeImg = realPair ? before! : image;

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent">
      <div className="relative aspect-[4/3] select-none">
        <MediaImg image={afterImg} alt={`After: ${afterImg.alt}`} fill sizes={SIZES} className={FIT} draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <MediaImg
            image={beforeImg}
            alt={realPair ? `Before: ${beforeImg.alt}` : `Before (simulated): ${beforeImg.alt}`}
            fill
            sizes={SIZES}
            className={`${FIT} ${realPair ? "" : "filter-dirty"}`}
            draggable={false}
          />
          {!realPair && <div className="grime-overlay pointer-events-none absolute inset-0" aria-hidden />}
        </div>

        <span className="btn-text absolute left-3 top-3 rounded-[4px] bg-bg/80 px-2.5 py-1 !text-[11px] text-text">Before</span>
        <span className="btn-text absolute right-3 top-3 rounded-[4px] bg-accent-gradient px-2.5 py-1 !text-[11px] text-on-accent">After</span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-accent" style={{ left: `${pos}%` }} aria-hidden>
          <span className="absolute left-1/2 top-1/2 inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-gradient text-on-accent shadow-lift">
            <ChevronsLeftRight size={20} />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${title}: drag to compare before and after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="font-medium text-text">{title}</span>
        <span className="text-right text-[11px] uppercase tracking-[1.5px] text-subtle">{realPair ? "Real result" : "Stock sample"}</span>
      </figcaption>
    </figure>
  );
}
