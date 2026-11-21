"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Year computed on the client (Next 16 forbids `new Date()` during prerender). */
export default function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span>{year}</span>;
}
