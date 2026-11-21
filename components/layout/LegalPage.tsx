import Link from "next/link";
import { business, legalLastUpdated } from "@/lib/config";
import Footer from "./Footer";
import Navbar from "./Navbar";

/** Shared layout for /terms and /privacy. */
export default function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar solid />
      <main>
        <section className="border-b border-border bg-bg-alt pb-12 pt-32 md:pb-16 md:pt-40 lg:pt-44">
          <div className="container-page">
            <nav aria-label="Breadcrumb" className="mb-4 text-[14px] text-subtle">
              <Link href="/" className="underline-offset-4 hover:text-accent hover:underline">
                Home
              </Link>{" "}
              / <span className="text-muted">{title}</span>
            </nav>
            <p className="eyebrow mb-3">{business.legalName}</p>
            <h1 className="h1">{title}</h1>
            <p className="mt-5 max-w-2xl">{intro}</p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[1.5px] text-subtle">Last updated: {legalLastUpdated}</p>
          </div>
        </section>
        <div className="container-page py-12 md:py-16">
          <article className="max-w-3xl space-y-10">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** One numbered section of a legal page. */
export function LegalSection({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`legal-${n}`}>
      <h2 id={`legal-${n}`} className="h3 flex items-baseline gap-3">
        <span className="font-mono text-[13px] font-normal text-subtle">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[16px] leading-relaxed [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:pl-1 [&_strong]:text-text [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

/** Phone + email block used in the "Contact" section. */
export function LegalContact() {
  return (
    <ul>
      <li>
        Phone: <a href={business.phoneHref}>{business.phone}</a>
      </li>
      <li>
        Email: <a href={`mailto:${business.email}`}>{business.email}</a>
      </li>
    </ul>
  );
}
