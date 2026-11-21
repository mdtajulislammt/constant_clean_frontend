import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookingFlow, { BookingSkeleton } from "@/components/booking/BookingFlow";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { packages, type PackageId } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book Your Detail",
  description: "Book a 3-hour mobile detailing appointment in about two minutes.",
};

/** Reads ?package=… (dynamic) inside Suspense so the page shell stays prerendered. */
async function FlowWithParams({ searchParams }: { searchParams: PageProps<"/book">["searchParams"] }) {
  const sp = await searchParams;
  const raw = typeof sp.package === "string" ? sp.package : undefined;
  const initialPackage = packages.some((p) => p.id === raw) ? (raw as PackageId) : undefined;
  return <BookingFlow initialPackage={initialPackage} />;
}

export default function BookPage({ searchParams }: PageProps<"/book">) {
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
              / <span className="text-muted">Book</span>
            </nav>
            <p className="eyebrow mb-3">Book online</p>
            <h1 className="h1">Book your detail</h1>
            <p className="mt-5 max-w-xl">About two minutes. Pick a 3-hour window, pay online or with Zelle / Venmo after, and we&apos;ll handle the rest at your door.</p>
          </div>
        </section>
        <div className="container-page">
          <Suspense fallback={<BookingSkeleton />}>
            <FlowWithParams searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
