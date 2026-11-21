import FinalCta from "@/components/home/FinalCta";
import Faq from "@/components/home/Faq";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import InstagramStrip from "@/components/home/InstagramStrip";
import MaintenanceClub from "@/components/home/MaintenanceClub";
import PricingTable from "@/components/home/PricingTable";
import Reviews from "@/components/home/Reviews";
import ServiceAreas from "@/components/home/ServiceAreas";
import ServicesSection from "@/components/home/ServicesSection";
import TrustBar from "@/components/home/TrustBar";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import MobileFab from "@/components/layout/MobileFab";
import Navbar from "@/components/layout/Navbar";

export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <WhyChooseUs />
        <PricingTable />
        <ServiceAreas />
        <HowItWorks />
        <MaintenanceClub />
        <Gallery />
        <Reviews />
        <Faq />
        <InstagramStrip />
        <FinalCta />
      </main>
      <Footer />
      <MobileFab />
      {/* keeps footer content clear of the mobile floating buttons */}
      <div className="h-24 bg-bg-alt md:hidden" aria-hidden />
    </>
  );
}
