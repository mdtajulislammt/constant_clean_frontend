"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/lib/config";

/** Mobile-only floating actions. Appear after the hero so they don't cover its CTAs. */
export default function MobileFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 px-4 pb-[max(16px,env(safe-area-inset-bottom))] md:hidden"
        >
          <Link
            href="/book"
            className="btn-text flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-accent-gradient text-on-accent shadow-lift"
          >
            <CalendarCheck size={18} aria-hidden /> Book Now
          </Link>
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.name} at ${business.phone}`}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-card"
          >
            <Phone size={22} aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
