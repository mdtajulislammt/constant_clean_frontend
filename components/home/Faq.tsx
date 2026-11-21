"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { business, faqs } from "@/lib/config";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <p className="-mt-6 max-w-sm">
            Still curious? Email{" "}
            <a href={`mailto:${business.email}`} className="text-accent underline-offset-4 hover:underline">
              {business.email}
            </a>
            .
          </p>
        </div>
        <Reveal>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panel = `${baseId}-panel-${i}`;
              const btn = `${baseId}-btn-${i}`;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      id={btn}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panel}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-bold text-text transition-colors hover:text-accent md:text-[18px]"
                    >
                      {f.q}
                      <Plus
                        size={20}
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : "text-muted"}`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panel}
                        role="region"
                        aria-labelledby={btn}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[15px] md:text-[16px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
