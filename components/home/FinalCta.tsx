import { Phone } from "lucide-react";
import { business } from "@/lib/config";
import { ButtonLink } from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function FinalCta() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-xl bg-accent-gradient px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="h2 !text-on-accent">Ready for a spotless car?</h2>
          <p className="mx-auto mt-4 max-w-xl text-on-accent/80">
            Open 7 days, {business.hours[0].time}. Book a 3-hour window in about two minutes. We handle the rest, right in your driveway.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/book" className="!bg-none !bg-on-accent !text-accent hover:!bg-bg-alt">
              Book Now
            </ButtonLink>
            <ButtonLink href={business.phoneHref} className="border border-on-accent/30 !bg-none !bg-transparent !text-on-accent hover:!border-on-accent">
              <Phone size={16} aria-hidden /> Call {business.phone}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
