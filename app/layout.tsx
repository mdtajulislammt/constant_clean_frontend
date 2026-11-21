import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, DM_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { business } from "@/lib/config";
import { media } from "@/lib/media";
import "./globals.css";

const alfa = Alfa_Slab_One({ variable: "--font-alfa", weight: "400", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", weight: ["400", "500", "700"], subsets: ["latin"], display: "swap" });

const title = "Constant Clean | Mobile Car Detailing in Dublin, CA";
const description =
  "100% mobile car detailing in Dublin, San Ramon, Pleasanton, Danville, Alamo and Walnut Creek. We bring our own water and power. Book online in 2 minutes.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? business.siteUrl),
  title: { default: title, template: "%s | Constant Clean" },
  description,
  keywords: ["mobile car detailing", "Dublin CA", "full detail", "interior steam cleaning", "car maintenance wash", "San Ramon", "Pleasanton", "Danville", "Tri-Valley"],
  openGraph: {
    type: "website",
    siteName: business.legalName,
    locale: "en_US",
    url: "/",
    title,
    description,
    images: [{ url: media.og.src, width: media.og.width, height: media.og.height, alt: media.og.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [media.og.src] },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${alfa.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh bg-bg">
        <LocalBusinessJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
