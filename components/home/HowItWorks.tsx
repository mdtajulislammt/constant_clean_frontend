import { howItWorks } from "@/lib/config";
import { media } from "@/lib/media";
import MediaImg from "../ui/MediaImg";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-y border-border bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Simple process" title="How it works" align="center" />
        <ol className="grid gap-8 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <MediaImg
                  image={media.howItWorks[i]}
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-alt via-bg-alt/30 to-transparent" aria-hidden />
                <span className="absolute bottom-3 left-5 font-display text-[72px] leading-none text-accent-gradient md:text-[88px]">{i + 1}</span>
              </div>
              <h3 className="h3 mt-6">{s.title}</h3>
              <p className="mt-2 max-w-sm">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
