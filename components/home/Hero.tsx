"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { business } from "@/lib/config";
import { ButtonLink } from "../ui/Button";
import Stars from "../ui/Stars";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  const item = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="hero-title">
      {/* Background video + poster (lib/media.ts → media.hero) */}
      <HeroMedia />
      {/* Left-to-right dark gradient for readability (A&N style) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/80 to-bg/20" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-bg/25" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent" aria-hidden />

      <div className="mx-auto w-full max-w-[1360px] px-5 pb-16 pt-32 md:px-8 lg:px-[72px] lg:pt-[104px]">
        <div className="relative max-w-[640px] border-l-2 border-accent pl-6 md:pl-9">
          <motion.p {...item(0.05)} className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-text">
            <Stars size={14} /> 5-Star Rated
          </motion.p>

          <motion.h1 {...item(0.15)} id="hero-title" className="h1 mt-5 text-[34px] min-[400px]:text-[40px] md:mt-7 md:text-[64px]">
            <span className="block text-accent-tint">Mobile Car</span>
            <span className="block text-accent-tint">Detailing</span>
            <span className="block text-text">In Dublin, CA</span>
          </motion.h1>

          <motion.p {...item(0.25)} className="mt-6 text-[20px] text-text md:mt-8 md:text-[24px]">
            <span className="border-b border-accent/60 font-medium">We bring our own water &amp; power.</span>
          </motion.p>
          <motion.p {...item(0.3)} className="mt-4 max-w-[540px] text-muted">
            Premium mobile detailing at your <strong className="font-medium text-text">home</strong> or{" "}
            <strong className="font-medium text-text">office</strong> across the Tri-Valley.
          </motion.p>

          <motion.div {...item(0.4)} className="mt-9 flex flex-wrap gap-4 md:mt-10">
            <ButtonLink href="/book">Book Now</ButtonLink>
            <ButtonLink href={business.phoneHref} variant="secondary" aria-label={`Call ${business.name} at ${business.phone}`}>
              <Phone size={16} strokeWidth={1.75} aria-hidden /> {business.phone}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
