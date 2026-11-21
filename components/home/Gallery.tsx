"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/config";
import SectionHeading from "../ui/SectionHeading";
import BeforeAfter from "./BeforeAfter";

type Filter = "all" | GalleryCategory;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);
  const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...galleryCategories];

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Our work" title="Before & after" intro="Drag the handle to compare. Stock samples for now — real customer jobs coming soon.">
          <div role="tablist" aria-label="Filter gallery" className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1">
            {tabs.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="gallery-grid"
                  onClick={() => setFilter(t.id)}
                  className={`btn-text shrink-0 rounded-full border px-5 py-2.5 transition-colors ${
                    active ? "border-transparent bg-accent-gradient text-on-accent" : "border-border text-muted hover:border-accent hover:text-text"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </SectionHeading>

        <motion.div id="gallery-grid" role="tabpanel" layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((g) => (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <BeforeAfter image={g.image} before={g.before} after={g.after} title={g.title} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
