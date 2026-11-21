import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { MediaImage } from "@/lib/media";
import MediaImg from "../ui/MediaImg";

export default function ServiceCard({
  name,
  desc,
  image,
  href,
  priceLabel,
}: {
  name: string;
  desc: string;
  image: MediaImage;
  href: string;
  /** e.g. "$200", "From $50", "In Full Detail" (lib/config.ts → services) */
  priceLabel: string;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImg
          image={image}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" aria-hidden />
      </div>
      <div className="relative -mt-12 flex flex-1 flex-col px-6 pb-6 md:px-7 md:pb-7">
        <h3 className="font-display text-[22px] uppercase leading-tight text-text md:text-[24px]">{name}</h3>
        <p className="mt-3 line-clamp-2 text-[15px] md:text-[16px]">{desc}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <p className="text-[15px] text-subtle">
            <span className="text-[20px] font-bold text-accent">{priceLabel}</span>
          </p>
          <Link
            href={href}
            className="btn-text inline-flex items-center gap-3 text-text transition-colors after:absolute after:inset-0 hover:text-accent"
          >
            <span className="h-px w-6 bg-current transition-all group-hover:w-9" aria-hidden />
            Book This
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
