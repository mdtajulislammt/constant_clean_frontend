import { Clock, Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "../ui/InstagramIcon";
import Link from "next/link";
import { business, navLinks, serviceAreas } from "@/lib/config";
import CurrentYear from "../ui/CurrentYear";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="full" className="h-20 w-auto md:h-24" />
          <p className="mt-5 max-w-xs text-[15px]">{business.description}</p>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent"
            aria-label={`Instagram ${business.instagram}`}
          >
            <InstagramIcon size={18} />
          </a>
        </div>

        <FooterCol title="Quick links">
          {[...navLinks.map((l) => ({ label: l.label, href: l.href })), { label: "Book Now", href: "/book" }, { label: "My Bookings", href: "/bookings" }].map(
            (l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </FooterCol>

        <FooterCol title="Service areas">
          {serviceAreas.map((a) => (
            <li key={a.city} className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" aria-hidden /> {a.city}
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex gap-3">
            <Clock size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
            <span>
              {business.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="text-text">{h.days}</span> · {h.time}
                </span>
              ))}
            </span>
          </li>
          <li>
            <a href={business.phoneHref} className="flex items-center gap-3 hover:text-accent">
              <Phone size={16} className="text-accent" aria-hidden /> {business.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all hover:text-accent">
              <Mail size={16} className="shrink-0 text-accent" aria-hidden /> {business.email}
            </a>
          </li>
          <li>
            <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent">
              <InstagramIcon size={16} className="text-accent" /> {business.instagram}
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {business.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-5">{title}</h3>
      <ul className="space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}
