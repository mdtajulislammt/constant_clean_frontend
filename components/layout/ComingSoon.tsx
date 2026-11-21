import { ButtonLink } from "../ui/Button";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <Navbar solid />
      <main className="container-page flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-40">
        <p className="eyebrow mb-3">Coming next</p>
        <h1 className="h1">{title}</h1>
        <p className="mt-5 max-w-xl">{note}</p>
        <ButtonLink href="/book" className="mt-8">
          Book Now
        </ButtonLink>
      </main>
      <Footer />
    </>
  );
}
