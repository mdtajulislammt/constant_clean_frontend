import { CalendarCheck, Home, Leaf, ShieldCheck } from "lucide-react";
import { whyChooseUs } from "@/lib/config";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const icons = { home: Home, leaf: Leaf, shield: ShieldCheck, calendar: CalendarCheck };

export default function WhyChooseUs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Why Constant Clean" title="Why choose us" align="center" intro="Professional results without leaving your driveway." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal key={f.title} delay={i * 0.08}>
                <article className="group h-full rounded-lg border border-border bg-surface p-7 transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-card">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent-gradient text-on-accent transition-transform duration-300 group-hover:-rotate-6">
                    <Icon size={26} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="h3 mt-6 !text-[20px]">{f.title}</h3>
                  <p className="mt-2 text-[15px]">{f.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
