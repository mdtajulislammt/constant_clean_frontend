import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact, LegalSection } from "@/components/layout/LegalPage";
import { business } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.legalName} collects and uses your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what information ${business.name} collects when you book with us, and how we use it.`}
    >
      <LegalSection n={1} title="What we collect">
        <p>When you book, we collect:</p>
        <ul>
          <li>Your name, phone number and email address</li>
          <li>Your service address</li>
          <li>Vehicle details (type, year, make and model)</li>
          <li>Your booking history with us</li>
        </ul>
        <p>Card details are handled by our payment provider and are never stored by us.</p>
      </LegalSection>

      <LegalSection n={2} title="How we use it">
        <p>We use your information to schedule and perform your services, send booking confirmations and reminders, and provide support.</p>
      </LegalSection>

      <LegalSection n={3} title="Text messages & email">
        <p>
          By booking, you agree to receive booking confirmations and reminders by text message and email. Message &amp; data rates may apply. Reply{" "}
          <strong>STOP</strong> to any text to opt out of text messages.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Sharing">
        <p>
          We don&apos;t sell your data. We only share it with service providers that help us run bookings, payments and messaging, and only as needed for
          them to do that.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Data retention & your choices">
        <p>We keep your information for as long as we need it to provide our services. You can ask us to update or delete your information at any time.</p>
      </LegalSection>

      <LegalSection n={6} title="Contact">
        <p>
          Questions or requests about your information? Get in touch. See also our <Link href="/terms">Terms of Service</Link>.
        </p>
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
