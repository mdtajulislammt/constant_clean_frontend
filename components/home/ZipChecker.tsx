"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, MapPinOff, Search } from "lucide-react";
import { useState } from "react";
import { areaForZip, business, type ServiceArea } from "@/lib/config";
import { Button } from "../ui/Button";
import { inputClass } from "../ui/Field";

type Result = { kind: "covered"; area: ServiceArea } | { kind: "outside" } | { kind: "invalid" } | null;

export default function ZipChecker({ onFound, onBook }: { onFound: (city: string | null) => void; onBook: (city: string) => void }) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<Result>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setResult({ kind: "invalid" });
      return;
    }
    const area = areaForZip(zip);
    setResult(area ? { kind: "covered", area } : { kind: "outside" });
    onFound(area?.city ?? null);
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-5 md:p-6">
      <form onSubmit={check} noValidate>
        <label htmlFor="zip-check" className="block font-bold text-text">
          Check if we come to you
        </label>
        <div className="mt-3 flex gap-2">
          <input
            id="zip-check"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="ZIP code, e.g. 94568"
            value={zip}
            aria-invalid={result?.kind === "invalid"}
            aria-describedby="zip-result"
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              if (result) setResult(null);
            }}
            className={`${inputClass} min-w-0 flex-1 !py-3`}
          />
          <Button type="submit" className="shrink-0 !px-5 !py-3">
            <Search size={16} aria-hidden /> Check
          </Button>
        </div>
      </form>

      <div id="zip-result" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {result && (
            <motion.div
              key={result.kind + (result.kind === "covered" ? result.area.city : "")}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              {result.kind === "covered" && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-success/40 bg-success/10 p-4">
                  <p className="flex items-center gap-2 font-bold text-success">
                    <CircleCheck size={18} aria-hidden /> Great news, we serve {result.area.city}!
                  </p>
                  <Button onClick={() => onBook(result.area.city)} className="!px-5 !py-2.5">
                    Book in {result.area.city} <ArrowRight size={16} aria-hidden />
                  </Button>
                </div>
              )}
              {result.kind === "outside" && (
                <p className="flex items-start gap-2 rounded-md border border-border bg-bg-alt p-4 text-[15px]">
                  <MapPinOff size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>
                    We&apos;re not in your area yet. Call us at{" "}
                    <a href={business.phoneHref} className="font-bold text-accent underline-offset-4 hover:underline">
                      {business.phone}
                    </a>{" "}
                    and we&apos;ll see what we can do.
                  </span>
                </p>
              )}
              {result.kind === "invalid" && <p className="text-[14px] text-danger">Enter a 5-digit ZIP code.</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
