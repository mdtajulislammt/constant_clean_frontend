"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import { useRef } from "react";
import type { ServiceArea } from "@/lib/config";
import { Button } from "../ui/Button";
import { TRAVEL_MS } from "./useRouteDriver";

type Props = {
  areas: ServiceArea[];
  active: number;
  vanAt: number;
  lap: number;
  dir: 1 | -1;
  /** intro done (road drawn + stops in) */
  drawn: boolean;
  /** van visible & moving dashes running */
  live: boolean;
  activate: (i: number) => void;
  onBook: (city: string) => void;
};

/** Centre of stop i along the road, in % (6 equal columns). */
const pct = (i: number, n: number) => ((i + 0.5) / n) * 100;
const ease = [0.65, 0, 0.35, 1] as const;

/** Arrow / Home / End move focus between stops; focusing a stop activates it. */
function onStopKey(e: React.KeyboardEvent, i: number, n: number, refs: React.RefObject<(HTMLButtonElement | null)[]>) {
  const next =
    e.key === "ArrowRight" || e.key === "ArrowDown"
      ? (i + 1) % n
      : e.key === "ArrowLeft" || e.key === "ArrowUp"
        ? (i - 1 + n) % n
        : e.key === "Home"
          ? 0
          : e.key === "End"
            ? n - 1
            : null;
  if (next === null) return;
  e.preventDefault();
  refs.current[next]?.focus();
}

const stopLabel = (i: number) => `Stop ${String(i + 1).padStart(2, "0")}`;

function Pulse({ big, live }: { big?: boolean; live: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute rounded-full bg-accent/35 animate-ping [animation-duration:2s] motion-reduce:hidden ${live ? "" : "[animation-play-state:paused]"} ${
        big ? "h-12 w-12" : "h-9 w-9"
      }`}
    />
  );
}

function ZipChips({ zips }: { zips: string[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {zips.map((z) => (
        <span key={z} className="rounded-[4px] border border-border px-1.5 py-0.5 font-mono text-[11px] text-subtle">
          {z}
        </span>
      ))}
    </span>
  );
}

function Van({ dir, vertical }: { dir: 1 | -1; vertical?: boolean }) {
  return (
    <span className="relative flex items-center justify-center" aria-hidden>
      {/* motion-blur glow trailing behind the van */}
      <span
        className={`absolute rounded-full bg-accent/40 blur-md ${
          vertical ? "-top-3 h-8 w-4" : dir === 1 ? "right-3 h-4 w-10" : "left-3 h-4 w-10"
        }`}
      />
      <span
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 bg-bg text-accent shadow-lift"
        style={{ transform: vertical ? "rotate(90deg)" : dir === -1 ? "scaleX(-1)" : undefined }}
      >
        <Truck size={18} strokeWidth={2} />
      </span>
    </span>
  );
}

export default function RouteStrip(p: Props) {
  return (
    <>
      <DesktopRoute {...p} />
      <MobileRoute {...p} />
    </>
  );
}

// ── Desktop (≥1024px): horizontal road ───────────────────────
function DesktopRoute({ areas, active, vanAt, lap, dir, drawn, live, activate, onBook }: Props) {
  const n = areas.length;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = areas[active];

  return (
    <div className="hidden lg:block">
      <div className="relative">
        {/* road (draws in left → right) */}
        <motion.div
          className="absolute inset-x-0 top-16 h-14 origin-left rounded-full border border-border bg-surface-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: drawn ? 1 : 0 }}
          transition={{ duration: 0.9, ease }}
          aria-hidden
        >
          <span className={`road-dash-x absolute inset-x-8 top-1/2 -mt-px h-0.5 motion-reduce:animate-none ${live ? "" : "[animation-play-state:paused]"}`} />
        </motion.div>

        {/* van — parks just before the active stop's pin */}
        <div className="pointer-events-none absolute inset-x-0 top-16 h-14 motion-reduce:hidden" aria-hidden>
          <AnimatePresence>
            {drawn && (
              <motion.div
                key={lap}
                className="absolute top-1/2 -mt-[18px]"
                initial={{ opacity: 0, left: `${pct(vanAt, n)}%` }}
                animate={{ opacity: 1, left: `${pct(vanAt, n)}%` }}
                exit={{ opacity: 0, transition: { duration: 0.35 } }}
                transition={{ left: { duration: TRAVEL_MS / 1000, ease }, opacity: { duration: 0.4, delay: 0.5 } }}
              >
                <div className={dir === 1 ? "-translate-x-[84px]" : "translate-x-11"}>
                  <Van dir={dir} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* stops */}
        <ol className="relative grid grid-cols-6" aria-label="Service route stops">
          {areas.map((a, i) => {
            const on = i === active;
            const home = !!a.isHomeBase;
            return (
              <li key={a.city} className="flex flex-col items-center text-center">
                <div className="flex h-16 flex-col items-center justify-end gap-1 pb-2">
                  {home && (
                    <span className="rounded-full bg-accent-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-on-accent">Home base</span>
                  )}
                  <span className={`text-[15px] font-bold leading-tight transition-colors xl:text-[16px] ${on ? "text-accent" : "text-text"}`}>{a.city}</span>
                </div>
                <div className="flex h-14 items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={drawn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      type="button"
                      tabIndex={on ? 0 : -1}
                      aria-label={`${a.city}${home ? ", home base" : ""}, ${stopLabel(i)}`}
                      aria-current={on ? "true" : undefined}
                      onClick={() => activate(i)}
                      onMouseEnter={() => activate(i)}
                      onFocus={() => activate(i)}
                      onKeyDown={(e) => onStopKey(e, i, n, refs)}
                      className="relative flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <Pulse big={home || on} live={live} />
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full bg-accent text-on-accent ring-4 transition-all duration-300 ${
                          home ? "h-12 w-12" : "h-10 w-10"
                        } ${on ? "scale-110 ring-accent/30" : "ring-bg"}`}
                      >
                        <MapPin size={home ? 22 : 18} strokeWidth={2.25} aria-hidden />
                      </span>
                    </button>
                  </motion.div>
                </div>
                <span className={`mt-2 font-mono text-[11px] uppercase tracking-[1.5px] ${on ? "text-accent" : "text-subtle"}`}>{stopLabel(i)}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* "Now serving" card for the active stop */}
      <div className="relative mt-6">
        <motion.span
          className="absolute -top-2 -ml-2 h-4 w-4 rotate-45 border-l border-t border-border bg-surface"
          animate={{ left: `${pct(active, n)}%` }}
          transition={{ duration: 0.4, ease }}
          aria-hidden
        />
        <div className="overflow-hidden rounded-lg border border-border bg-surface" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.city}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-8 px-7 py-6"
            >
              <div className="min-w-0 flex-1">
                <p className="eyebrow mb-1 !text-[11px]">Now serving · {stopLabel(active)}</p>
                <h3 className="flex items-center gap-3 font-display text-[28px] uppercase leading-none text-text">
                  {current.city}
                  {current.isHomeBase && (
                    <span className="rounded-full bg-accent-gradient px-2 py-0.5 font-sans text-[10px] font-bold tracking-[1px] text-on-accent">Home base</span>
                  )}
                </h3>
                <p className="mt-2 text-[15px]">{current.line}</p>
              </div>
              <div className="w-56 shrink-0">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[1.5px] text-subtle">ZIP codes</p>
                <ZipChips zips={current.zips} />
              </div>
              <Button onClick={() => onBook(current.city)} className="shrink-0">
                Book in {current.city} <ArrowRight size={16} aria-hidden />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Mobile (<1024px): vertical road down the left ────────────
function MobileRoute({ areas, active, vanAt, lap, drawn, live, activate, onBook }: Props) {
  const n = areas.length;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="relative lg:hidden">
      <motion.div
        className="absolute bottom-0 left-0 top-0 w-10 origin-top rounded-full border border-border bg-surface-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: drawn ? 1 : 0 }}
        transition={{ duration: 0.9, ease }}
        aria-hidden
      >
        <span className={`road-dash-y absolute inset-y-5 left-1/2 -ml-px w-0.5 motion-reduce:animate-none ${live ? "" : "[animation-play-state:paused]"}`} />
      </motion.div>

      <ol className="relative space-y-3 py-3" aria-label="Service route stops">
        {areas.map((a, i) => {
          const on = i === active;
          const home = !!a.isHomeBase;
          return (
            <motion.li
              key={a.city}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={drawn ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
            >
              {/* marker on the road (+ van when it's here) */}
              <div className="relative flex w-10 shrink-0 flex-col items-center pt-3">
                <span className="relative flex items-center justify-center">
                  <Pulse big={home || on} live={live} />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full bg-accent text-on-accent ring-4 transition-all duration-300 ${
                      home ? "h-9 w-9" : "h-8 w-8"
                    } ${on ? "scale-110 ring-accent/30" : "ring-bg"}`}
                    aria-hidden
                  >
                    <MapPin size={home ? 18 : 16} strokeWidth={2.25} />
                  </span>
                </span>
                {drawn && vanAt === i && (
                  <motion.div
                    layoutId={`van-mobile-${lap}`}
                    className="mt-3 motion-reduce:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ layout: { duration: TRAVEL_MS / 1000, ease }, opacity: { duration: 0.4 } }}
                  >
                    <Van dir={1} vertical />
                  </motion.div>
                )}
              </div>

              {/* stop row (active one expands) */}
              <div
                className={`min-w-0 flex-1 rounded-lg border px-4 transition-all duration-300 ${
                  on ? "border-accent bg-surface-2 py-4" : "border-border bg-surface py-3"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    type="button"
                    tabIndex={on ? 0 : -1}
                    aria-current={on ? "true" : undefined}
                    onClick={() => activate(i)}
                    onFocus={() => activate(i)}
                    onKeyDown={(e) => onStopKey(e, i, n, refs)}
                    className="min-w-0 flex-1 cursor-pointer rounded text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[1.5px] text-subtle">{stopLabel(i)}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className={`text-[17px] font-bold leading-tight ${on ? "text-accent" : "text-text"}`}>{a.city}</span>
                      {home && (
                        <span className="rounded-full bg-accent-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-on-accent">Home base</span>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onBook(a.city)}
                    aria-label={`Book in ${a.city}`}
                    className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      on ? "bg-accent-gradient text-on-accent" : "border border-border text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-[14px] leading-snug"
                    >
                      <span className="block pt-2">{a.line}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-2">
                  <ZipChips zips={a.zips} />
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
