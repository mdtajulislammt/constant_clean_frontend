import { business } from "@/lib/config";
import { media } from "@/lib/media";
import InstagramIcon from "../ui/InstagramIcon";
import MediaImg from "../ui/MediaImg";
import Reveal from "../ui/Reveal";

export default function InstagramStrip() {
  return (
    <section aria-labelledby="ig-title" className="py-20 md:py-24">
      <div className="container-page">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Follow along</p>
            <h2 id="ig-title" className="h2 text-[24px] sm:text-[30px] md:text-[44px]">
              <span className="text-accent-gradient">{business.instagram}</span>
            </h2>
          </div>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-text inline-flex items-center gap-2 text-text hover:text-accent"
          >
            <InstagramIcon size={18} /> Follow on Instagram
          </a>
        </Reveal>
      </div>
      <ul className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {media.instagram.map((img) => (
          <li key={img.src}>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden"
              aria-label={`View on Instagram: ${img.alt}`}
            >
              <MediaImg image={img} fill sizes="(min-width:768px) 17vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-center justify-center bg-bg/0 text-text opacity-0 transition-all duration-300 group-hover:bg-bg/60 group-hover:opacity-100">
                <InstagramIcon size={28} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
