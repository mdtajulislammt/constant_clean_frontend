import { business, images, serviceAreas } from "@/lib/config";
import { media } from "@/lib/media";

/** schema.org AutoWash (a LocalBusiness subtype) for rich results. */
export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["AutoWash", "LocalBusiness"],
    name: business.legalName,
    alternateName: `${business.name} ${business.tagline}`,
    description: business.description,
    url: business.siteUrl,
    logo: `${business.siteUrl}${images.logo.full.src}`,
    image: `${business.siteUrl}${media.og.src}`,
    email: business.email,
    telephone: business.phoneE164,
    address: { "@type": "PostalAddress", addressLocality: "Dublin", addressRegion: "CA", addressCountry: "US" },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: `${a.city}, CA` })),
    openingHours: business.openingHours.schema,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.openingHours.dayOfWeek,
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    sameAs: [business.instagramUrl],
    priceRange: "$$",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
