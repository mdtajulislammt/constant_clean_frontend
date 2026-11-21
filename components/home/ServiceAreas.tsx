"use client";

import { useInView } from "framer-motion";
import { Clock, Droplets, MapPin, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { business, homeBase, serviceAreas } from "@/lib/config";
import { media } from "@/lib/media";
import MediaImg from "../ui/MediaImg";
import Reveal from "../ui/Reveal";
import RouteStrip from "./RouteStrip";
import { useBookInCity } from "./useBookInCity";
import { usePageVisible, useRouteDriver } from "./useRouteDriver";
import ZipChecker from "./ZipChecker";

const INTRO_MS = 1300; // road draws + stops pop in, then the van starts

export default function ServiceAreas() {
  const strip = useRef<HTMLDivElement>(null);
  const drawn = useInView(strip, { once: true, amount: 0.3 });
  const inView = useInView(strip, { amount: 0.1 });
  const visible = usePageVisible();
  const [introDone, setIntroDone] = useState(false);
  const bookIn = useBookInCity();

  useEffect(() => {
    if (!drawn) return;
    const t = setTimeout(() => setIntroDone(true), INTRO_MS);
    return () => clearTimeout(t);
  }, [drawn]);

  const route = useRouteDriver({
    count: serviceAreas.length,
    homeIndex: serviceAreas.indexOf(homeBase),
    enabled: introDone && inView && visible,
  });
  const live = inView && visible && !route.reduce;

  const stats = [
    { icon: MapPin, label: `${serviceAreas.length} cities covered` },
    { icon: Droplets, label: "Own water & power, no hookups" },
    { icon: Clock, label: `Open ${business.hoursShort}` },
  ];

  return (
    <section id="areas" className="scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="eyebrow mb-3">Where we work</p>
          <h2 className="h2">Detailing services across the Tri-Valley</h2>
          <p className="mx-auto mt-5 max-w-2xl">
            {serviceAreas.length} cities, one mobile crew. We bring our own water and power right to your driveway or office.
          </p>
        </Reveal>

        {/* "We drive to you" route strip */}
        <div ref={strip}>
          <RouteStrip
            areas={serviceAreas}
            active={route.active}
            vanAt={route.vanAt}
            lap={route.lap}
            dir={route.dir}
            drawn={drawn}
            live={live}
            activate={route.activate}
            onBook={bookIn}
          />
        </div>

        {/* ZIP checker + "no hookups" image card */}
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
          <Reveal className="h-full [&>div]:h-full">
            <ZipChecker
              onFound={(city) => {
                const i = serviceAreas.findIndex((a) => a.city === city);
                if (i >= 0) route.activate(i);
              }}
              onBook={bookIn}
            />
          </Reveal>
          <Reveal delay={0.08} className="relative min-h-[240px] overflow-hidden rounded-lg border border-border">
            <MediaImg image={media.areas} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[center_60%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/15" aria-hidden />
            <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 md:p-7">
              <p className="max-w-sm text-[20px] font-bold leading-snug text-text md:text-[22px]">No hookups needed. We bring our own water &amp; power.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Droplets, label: "Own water" },
                  { icon: Zap, label: "Own power" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 py-1 pl-1 pr-3 text-[13px] font-medium text-text backdrop-blur-sm">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-gradient text-on-accent">
                      <Icon size={13} aria-hidden />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 border-y border-dashed border-border md:mt-14">
          <ul className="grid divide-y divide-dashed divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 py-4 sm:justify-center sm:px-4 sm:py-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-on-accent">
                  <Icon size={17} aria-hidden />
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[1px] text-text md:text-[13px]">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
