"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { business, navLinks } from "@/lib/config";
import { ButtonLink } from "../ui/Button";
import Logo from "../ui/Logo";

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filled = solid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        filled ? "border-b border-border bg-bg/85 backdrop-blur-md" : "border-b border-text/10 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-6 px-5 md:px-8 lg:h-[104px]" aria-label="Main">
        <Logo variant="horizontal" className="h-10 w-auto md:h-12" />

        <ul className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((l) => (
            <li key={l.label} className="group relative">
              <Link
                href={l.href}
                className="flex items-center gap-1 whitespace-nowrap py-3 text-[14px] font-medium uppercase tracking-[1.5px] text-text transition-colors hover:text-accent 2xl:tracking-[2px]"
              >
                {l.label}
                {l.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" aria-hidden />}
              </Link>
              {l.children && (
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="rounded-lg border border-border bg-surface p-2 shadow-card">
                    {l.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          className="block rounded-md px-3 py-2.5 text-[15px] text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.name} at ${business.phone}`}
            title={business.phone}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Phone size={18} strokeWidth={1.75} aria-hidden />
          </a>
          <div className="hidden sm:block">
            <ButtonLink href="/book" variant="outline-accent" className="whitespace-nowrap !px-6 !py-3.5 2xl:!px-8">
              Book Now
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] text-text xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-80px)] overflow-y-auto border-t border-border bg-bg px-5 pb-10 pt-4 xl:hidden"
          >
            <ul className="divide-y divide-border">
              {navLinks.map((l) => (
                <li key={l.label}>
                  {l.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium uppercase tracking-[2px] text-text"
                        aria-expanded={openSub === l.label}
                        onClick={() => setOpenSub(openSub === l.label ? null : l.label)}
                      >
                        {l.label}
                        <ChevronDown size={18} className={`transition-transform ${openSub === l.label ? "rotate-180 text-accent" : ""}`} />
                      </button>
                      {openSub === l.label && (
                        <ul className="pb-3 pl-3">
                          {l.children.map((c) => (
                            <li key={c.label}>
                              <Link href={c.href} onClick={() => setOpen(false)} className="block py-2 text-muted hover:text-accent">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-[15px] font-medium uppercase tracking-[2px] text-text"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link href="/bookings" onClick={() => setOpen(false)} className="block py-4 text-[15px] font-medium uppercase tracking-[2px] text-text">
                  My Bookings
                </Link>
              </li>
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/book" onClick={() => setOpen(false)}>
                Book Now
              </ButtonLink>
              <ButtonLink href={business.phoneHref} variant="secondary">
                <Phone size={16} /> Call {business.phone}
              </ButtonLink>
            </div>
            <p className="mt-6 text-center text-[14px] text-subtle">
              {business.hours.map((h) => `${h.days} · ${h.time}`).join(" / ")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
