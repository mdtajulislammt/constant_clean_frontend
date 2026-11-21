"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export const TRAVEL_MS = 1400; // drive between two stops
export const PAUSE_MS = 1200; // wait at a stop
const MANUAL_PAUSE_MS = 6000; // auto-drive stays paused after a click/hover/focus/ZIP match

const RM_QUERY = "(prefers-reduced-motion: reduce)";

/** Reduced-motion preference. Server/hydration snapshot = false, so markup never mismatches. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(RM_QUERY);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

/** false while the browser tab is hidden. */
export function usePageVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener("visibilitychange", cb);
      return () => document.removeEventListener("visibilitychange", cb);
    },
    () => document.visibilityState === "visible",
    () => true,
  );
}

/**
 * Drives the van along the route: go to the next stop (TRAVEL_MS), mark it active, wait (PAUSE_MS), repeat.
 * After the last stop it starts a new `lap` at stop 0 (the van fades out and back in).
 * `enabled` = in view + tab visible + intro finished. Reduced motion: never drives; Dublin (homeIndex) shows as active.
 */
export function useRouteDriver({ count, homeIndex, enabled }: { count: number; homeIndex: number; enabled: boolean }) {
  const reduce = usePrefersReducedMotion();
  const [target, setTarget] = useState(0); // stop the van is at / heading to
  const [arrived, setArrived] = useState(0); // stop shown as active
  const [lap, setLap] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [manual, setManual] = useState(false);
  const [touched, setTouched] = useState(false);
  const resume = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const driving = enabled && !manual && !reduce;

  useEffect(() => {
    if (!driving) return;
    const arrive = setTimeout(() => setArrived(target), TRAVEL_MS);
    const depart = setTimeout(() => {
      const next = (target + 1) % count;
      if (next === 0) setLap((l) => l + 1);
      setDir(1);
      setTarget(next);
    }, TRAVEL_MS + PAUSE_MS);
    return () => {
      clearTimeout(arrive);
      clearTimeout(depart);
    };
  }, [driving, target, count]);

  useEffect(() => () => clearTimeout(resume.current), []);

  /** User picked a stop (click, hover, keyboard focus or ZIP match): jump there and pause auto-drive. */
  const activate = useCallback(
    (i: number) => {
      setDir(i >= target ? 1 : -1);
      setTarget(i);
      setArrived(i);
      setTouched(true);
      setManual(true);
      clearTimeout(resume.current);
      resume.current = setTimeout(() => setManual(false), MANUAL_PAUSE_MS);
    },
    [target],
  );

  const staticHome = reduce && !touched;
  return {
    active: staticHome ? homeIndex : arrived,
    vanAt: staticHome ? homeIndex : target,
    lap,
    dir,
    driving,
    reduce,
    activate,
  };
}
