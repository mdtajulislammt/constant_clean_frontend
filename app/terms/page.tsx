import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact, LegalSection } from "@/components/layout/LegalPage";
import { business, cancellationPolicy, MAX_JOBS_PER_DAY, paymentSummary, serviceAreas } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for booking mobile auto detailing with ${business.legalName}.`,
  alternates: { canonical: "/terms" },
};

const cities = `${serviceAreas
  .slice(0, -1)
  .map((a) => a.city)
  .join(", ")} and ${serviceAreas[serviceAreas.length - 1].city}, CA`;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms explain how booking with ${business.name} works. By booking a service, you agree to them.`}
    >
      <LegalSection n={1} title="About our service">
        <p>
          {business.legalName} provides 100% mobile auto detailing in {cities}. We come to your home or office and bring our own water and power.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Bookings">
        <p>
          Every appointment is a 3-hour service window, available {business.hoursShort}. We take up to {MAX_JOBS_PER_DAY} appointments a day.
        </p>
        <p>We may contact you by phone, text or email to confirm your booking or to adjust the time if needed.</p>
      </LegalSection>

      <LegalSection n={3} title="Cancellation & rescheduling">
        <p>{cancellationPolicy}</p>
      </LegalSection>

      <LegalSection n={4} title="Satisfaction guarantee">
        <p>
          We stand behind our work instead of offering monetary refunds. If you&apos;re not satisfied, contact us and we&apos;ll come back to fix it at no
          cost.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Payment">
        <p>{paymentSummary}</p>
        <p>Card payments are processed by our payment provider. We never see or store your full card details.</p>
      </LegalSection>

      <LegalSection n={6} title="Your responsibilities">
        <ul>
          <li>Give us an accurate service address and vehicle details.</li>
          <li>Make sure we can reach the vehicle at the scheduled time (unlocked, or keys left somewhere safe for interior work).</li>
          <li>Remove valuables and personal items before we arrive.</li>
        </ul>
      </LegalSection>

      <LegalSection n={7} title="Vehicle condition">
        <p>
          We take great care with every vehicle, but we&apos;re not responsible for pre-existing damage or normal wear, such as scratches, chips, loose
          trim or worn upholstery. If we notice anything like that, we&apos;ll let you know.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Weather">
        <p>If the weather makes it unsafe to work, we may reschedule your appointment at no cost to you.</p>
      </LegalSection>

      <LegalSection n={9} title="Contact">
        <p>
          Questions about these terms? Get in touch. See also our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
