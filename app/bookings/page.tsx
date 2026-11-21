import MyBookingsList from "@/components/bookings/MyBookingsList";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <>
      <Navbar solid />
      <main>
        <section className="border-b border-border bg-bg-alt pb-12 pt-32 md:pb-16 md:pt-40 lg:pt-44">
          <div className="container-page flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Your account</p>
              <h1 className="h1">My bookings</h1>
              <p className="mt-5 max-w-xl">Upcoming and past appointments. Reschedule and cancel requests are coming in the next update.</p>
            </div>
            <ButtonLink href="/book">Book Now</ButtonLink>
          </div>
        </section>
        <div className="container-page py-12 md:py-16">
          <MyBookingsList />
        </div>
      </main>
      <Footer />
    </>
  );
}
