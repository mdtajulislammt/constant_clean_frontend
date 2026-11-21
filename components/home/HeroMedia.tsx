"use client";

import { useState, useSyncExternalStore } from "react";
import { media } from "@/lib/media";
import MediaImg from "../ui/MediaImg";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };

/** Video only on ≥768px, no reduced-motion preference, and no data-saver / 2G connection. */
function canPlayVideo() {
  if (typeof window === "undefined") return false;
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = (navigator as NavigatorWithConnection).connection;
  const slow = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
  return wide && !reduced && !slow;
}

/**
 * Poster image is always server-rendered (LCP, priority). The <video> is mounted after hydration
 * (via useSyncExternalStore) only when appropriate, then fades in once it can play — no hydration mismatch, no flash.
 */
function subscribe(onChange: () => void) {
  const mqs = [window.matchMedia("(min-width: 768px)"), window.matchMedia("(prefers-reduced-motion: reduce)")];
  mqs.forEach((m) => m.addEventListener("change", onChange));
  return () => mqs.forEach((m) => m.removeEventListener("change", onChange));
}

export default function HeroMedia() {
  // Server + hydration render: false (poster only). Client: re-evaluated on viewport / motion changes.
  const showVideo = useSyncExternalStore(subscribe, canPlayVideo, () => false);
  const [playing, setPlaying] = useState(false);

  const { poster, video } = media.hero;

  return (
    <div className="absolute inset-0 -z-20" aria-hidden>
      <MediaImg image={poster} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      {showVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          poster={poster.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setPlaying(true)}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
