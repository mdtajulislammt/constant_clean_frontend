/**
 * ─────────────────────────────────────────────────────────────
 *  Constant Clean — SINGLE SOURCE OF BUSINESS / MOCK DATA
 *  Edit prices, phone, hours, slots, reviews and copy here.
 *  Anything marked PLACEHOLDER / SAMPLE must be replaced before launch.
 * ─────────────────────────────────────────────────────────────
 *  Images & videos live in lib/media.ts.
 */

import { media, type MediaImage } from "./media";

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export const business = {
  name: "Constant Clean",
  legalName: "Constant Clean LLC",
  tagline: "Mobile Auto Detailing",
  city: "Dublin, CA",
  phone: "(925) 404-4304",
  phoneHref: "tel:+19254044304",
  /** E.164 for schema.org */
  phoneE164: "+19254044304",
  email: "ythomas@constantclean.org",
  instagram: "@constantcleanllc",
  instagramUrl: "https://www.instagram.com/constantcleanllc/",
  siteUrl: "https://constantclean.org",
  /** Open 7 days. Display rows (Footer etc.). */
  hours: [{ days: "Mon – Sun", time: "8:00 AM – 6:00 PM" }],
  /** Short form for chips/badges. Keep in sync with `hours`. */
  hoursShort: "7 days, 8 AM – 6 PM",
  /** Machine-readable hours (JSON-LD). Keep in sync with `hours`. */
  openingHours: { dayOfWeek: ALL_DAYS, opens: "08:00", closes: "18:00", schema: "Mo-Su 08:00-18:00" },
  description:
    "100% mobile car detailing in the Tri-Valley. We come to your home or office and bring our own water and power.",
};

/** Shared notification copy (booking flow, FAQ, confirmation). */
export const notificationCopy = "You'll get a confirmation and reminders by text and email.";

export type LogoVariant = "full" | "horizontal" | "icon";

/** Client logo (transparent PNG, 905×327). All variants point to it until separate versions exist. */
const LOGO = { src: "/images/logo.png", width: 905, height: 327 };

export const images = {
  logo: { full: LOGO, horizontal: LOGO, icon: LOGO } satisfies Record<LogoVariant, { src: string; width: number; height: number }>,
};

// ── Vehicles (needed for the job, does NOT change the price) ──
export type VehicleSizeId = "coupe" | "sedan" | "suv" | "truck" | "hatchback" | "minivan";

export const vehicleSizes: { id: VehicleSizeId; label: string; hint: string }[] = [
  { id: "coupe", label: "Coupe", hint: "2-door" },
  { id: "sedan", label: "Sedan", hint: "4-door car" },
  { id: "suv", label: "SUV", hint: "Crossover / SUV" },
  { id: "truck", label: "Truck", hint: "Pickup" },
  { id: "hatchback", label: "Hatchback", hint: "Compact" },
  { id: "minivan", label: "Minivan", hint: "3-row van" },
];

// ── Packages (booking step 2) ─────────────────────────────
// Prices from client flyer (Nov 2026). Final service list pending — admin panel will manage this later.
// Fixed prices — the same for every vehicle size.
export type PackageId = "full" | "monthly" | "bimonthly" | "insideout";
export type PackageGroup = "detail" | "maintenance";

export interface Package {
  id: PackageId;
  group: PackageGroup;
  name: string;
  blurb: string;
  duration: string;
  /** USD, fixed */
  price: number;
  /** e.g. "/ visit" for recurring options */
  period?: string;
  popular?: boolean;
  includes: string[];
}

export const packages: Package[] = [
  {
    id: "full",
    group: "detail",
    name: "Full Detail",
    blurb: "Our complete inside-and-out detail, done in your driveway or office lot.",
    duration: "~3 hrs",
    price: 200,
    popular: true,
    includes: ["Exterior wash (4,000 PSI)", "Steam / extract interior", "Shampoo rugs & carpets", "Wheels & tires", "Streak-free glass"],
  },
  // Maintenance Check-Up — `includes` lists are SAMPLE copy until the client confirms what each visit covers.
  {
    id: "monthly",
    group: "maintenance",
    name: "Monthly",
    blurb: "A check-up once a month to keep a detailed car looking detailed.",
    duration: "~1.5 hrs",
    price: 50,
    period: "/ visit",
    includes: ["Exterior hand wash", "Wheels & tires", "Quick interior vacuum", "Same slot every month"],
  },
  {
    id: "bimonthly",
    group: "maintenance",
    name: "Bi-Monthly",
    blurb: "A deeper check-up every other month for daily drivers.",
    duration: "~2 hrs",
    price: 75,
    period: "/ visit",
    includes: ["Exterior hand wash", "Wheels & tires", "Interior vacuum & wipe-down", "Streak-free glass"],
  },
  {
    id: "insideout",
    group: "maintenance",
    name: "Inside & Out",
    blurb: "Full interior and exterior maintenance on every visit.",
    duration: "~2.5 hrs",
    price: 100,
    period: "/ visit",
    includes: ["Exterior wash (4,000 PSI)", "Interior vacuum & steam touch-up", "Mats & carpets refreshed", "Wheels, tires & glass"],
  },
];

export const maintenancePackages = packages.filter((p) => p.group === "maintenance");

/** Name used in summaries/receipts: "Full Detail", "Monthly Check-Up", … */
export const packageTitle = (id: PackageId | null | undefined) => {
  const p = packages.find((x) => x.id === id);
  if (!p) return "";
  return p.group === "maintenance" ? `${p.name} Check-Up` : p.name;
};

// ── Add-ons — NOT confirmed by the client yet ─────────────
/** false → the add-ons step is skipped and add-on lines are hidden everywhere. Data kept for later. */
export const SHOW_ADD_ONS = false;

export type AddOnId = "engine" | "headlights" | "pethair";

export const addOns: { id: AddOnId; name: string; desc: string; price: number }[] = [
  { id: "engine", name: "Engine Bay", desc: "Degrease, rinse and dress the engine bay.", price: 49 },
  { id: "headlights", name: "Headlight Restoration", desc: "Remove yellowing and haze from both lenses.", price: 69 },
  { id: "pethair", name: "Pet Hair Removal", desc: "Extra time to pull embedded hair from fabric.", price: 39 },
];

// ── Payment (MOCK UI only — no real processing) ──────────
export type PaymentMethodId = "card" | "googlepay" | "zelle" | "venmo";
export type PaymentStatus = "paid" | "unpaid";

export const paymentMethods: { id: PaymentMethodId; label: string; hint: string; payNow: boolean }[] = [
  { id: "card", label: "Card", hint: "Visa / Mastercard", payNow: true },
  { id: "googlepay", label: "Google Pay", hint: "Pay in one tap", payNow: true },
  { id: "zelle", label: "Zelle", hint: "Pay after service", payNow: false },
  { id: "venmo", label: "Venmo", hint: "Pay after service", payNow: false },
];

export const paysNow = (id: PaymentMethodId) => paymentMethods.find((m) => m.id === id)?.payNow ?? true;
export const paymentLabel = (id: PaymentMethodId) => paymentMethods.find((m) => m.id === id)?.label ?? "Card";

// ── Time slots — open 7 days, 8 AM – 6 PM, max 3 jobs/day ──
export const timeSlots = [
  { id: "08-11", label: "8:00 AM – 11:00 AM", start: 8, end: 11 },
  { id: "11-14", label: "11:00 AM – 2:00 PM", start: 11, end: 14 },
  { id: "14-17", label: "2:00 PM – 5:00 PM", start: 14, end: 17 },
] as const;
export type TimeSlotId = (typeof timeSlots)[number]["id"];
export const MAX_JOBS_PER_DAY = timeSlots.length;

export const isTimeSlotId = (v: unknown): v is TimeSlotId => timeSlots.some((s) => s.id === v);
export const isPackageId = (v: unknown): v is PackageId => packages.some((p) => p.id === v);

/** Every day gets the same three 3-hour blocks. */
export function slotsForDay() {
  return timeSlots;
}

/** MOCK availability — deterministic "already booked" slots per date. */
export function isSlotMockBooked(isoDate: string, slotId: TimeSlotId) {
  let h = 0;
  for (const c of isoDate + slotId) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 === 0;
}

export const BOOKING_DAYS_AHEAD = 14;

// ── Home: Our Services ───────────────────────────────────
export const services = [
  {
    id: "full",
    name: "Full Detail",
    desc: "4,000 PSI exterior wash, steam-cleaned interior, shampooed carpets, wheels and glass.",
    image: media.services.full,
    href: "/book?package=full",
    priceLabel: "$200",
  },
  {
    id: "interior",
    name: "Interior Steam Clean",
    desc: "Seats steamed and extracted, rugs and carpets shampooed. Included in every Full Detail.",
    image: media.services.interior,
    href: "/book?package=full",
    priceLabel: "In Full Detail",
  },
  {
    id: "maintenance",
    name: "Maintenance Check-Up",
    desc: "Recurring visits on a monthly or bi-monthly schedule to keep your car spotless.",
    image: media.services.maintenance,
    href: "/#club",
    priceLabel: `From $${Math.min(...maintenancePackages.map((p) => p.price))}`,
  },
] as const;

// ── Service areas ────────────────────────────────────────
/** Listed north → south — the order the van visits the "stops" on the route strip. */
export interface ServiceArea {
  city: string;
  line: string;
  zips: string[];
  isHomeBase?: boolean;
}

export const serviceAreas: ServiceArea[] = [
  { city: "Walnut Creek", line: "Homes, condos and office garages across the city.", zips: ["94595", "94596", "94597", "94598"] },
  { city: "Alamo", line: "Larger properties and long driveways, no problem.", zips: ["94507"] },
  { city: "Danville", line: "Blackhawk, Diablo and every quiet cul-de-sac between.", zips: ["94506", "94526", "94528"] },
  { city: "San Ramon", line: "Bishop Ranch offices, Gale Ranch, Windemere and beyond.", zips: ["94582", "94583"] },
  { city: "Dublin", line: "Our home base. Same-week appointments most weeks.", zips: ["94568"], isHomeBase: true },
  { city: "Pleasanton", line: "Downtown, Ruby Hill and the Hacienda business park.", zips: ["94566", "94588"] },
];

export const homeBase = serviceAreas.find((a) => a.isHomeBase)!;

/** City for a 5-digit ZIP, or undefined if we don't cover it. */
export const areaForZip = (zip: string) => serviceAreas.find((a) => a.zips.includes(zip.trim()));

// ── How it works ─────────────────────────────────────────
export const howItWorks = [
  { title: "Book online in 2 minutes", desc: "Pick your vehicle, service and a 3-hour window that suits you." },
  { title: "We come to you", desc: "Home or office. We bring our own water and power, no hookups needed." },
  { title: "Drive away spotless", desc: "Walk out to a car that looks, feels and smells like new." },
];

// ── Maintenance Club (= Maintenance Check-Up packages) ───
export const clubPlans = maintenancePackages.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  period: p.period ?? "/ visit",
  featured: p.id === "monthly",
  includes: p.includes,
  href: `/book?package=${p.id}`,
}));

// ── Gallery — stock pairs (NOT the same vehicle) until client sends real before/afters ──
export type GalleryCategory = "exterior" | "interior";
export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
];
/**
 * One photo per item: BeforeAfter shows it clean on the "After" side and filtered/dirtied on the "Before" side.
 * When the client sends real pairs (same car), add `before` + `after` in lib/media.ts and they are used instead.
 */
export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: MediaImage;
  before?: MediaImage;
  after?: MediaImage;
}
export const gallery: GalleryItem[] = [
  { id: "ext1", title: "Wheels & tires", category: "exterior", ...media.gallery.ext1 },
  { id: "ext2", title: "Full exterior detail", category: "exterior", ...media.gallery.ext2 },
  { id: "int1", title: "Seats & upholstery", category: "interior", ...media.gallery.int1 },
];

// ── Reviews — SAMPLE (replace with real Google reviews) ──
export const reviews = [
  { name: "Sample Customer D.", city: "Danville", text: "Sample review — booked the Full Detail for our SUV. The carpets look newer than the day we bought it." },
  { name: "Sample Customer E.", city: "Walnut Creek", text: "Sample review — they worked around my meetings at the office lot. Easiest car care I've ever done." },
  { name: "Sample Customer F.", city: "Alamo", text: "Sample review — on the monthly check-up now. I haven't thought about washing my car since." },
  { name: "Sample Customer A.", city: "Dublin", text: "Sample review — showed up right on time, didn't need anything from us, and the car looked better than when we bought it." },
  { name: "Sample Customer B.", city: "San Ramon", text: "Sample review — booked during lunch, had the detail done in the office garage. Interior smells brand new." },
  { name: "Sample Customer C.", city: "Pleasanton", text: "Sample review — dog hair everywhere and they got all of it. Friendly, careful and worth every dollar." },
];

// ── Trust bar (under hero) ────────────────────────────────
export const trustItems = [
  { icon: "star", label: "5-Star Rated" },
  { icon: "truck", label: "Fully Mobile – We Come To You" },
  { icon: "droplets", label: "Own Water & Power" },
  { icon: "shield", label: "Free Re-Service Guarantee" },
] as const;

// ── Why choose us ─────────────────────────────────────────
export const whyChooseUs = [
  { icon: "home", title: "We come to you", desc: "Home, office or apartment lot. No driving, no waiting rooms, no lost afternoon." },
  { icon: "leaf", title: "Eco-friendly products", desc: "pH-balanced, biodegradable soaps and low-water methods that are safe for paint and driveways." },
  { icon: "shield", title: "Satisfaction guaranteed", desc: "Not happy with something? We'll come back and fix it at no cost. We stand behind our work." },
  { icon: "calendar", title: "Easy online booking", desc: "Pick a 3-hour window in about two minutes. Reschedule free up to 24 hours before." },
] as const;

// ── Cancellation & refund policy ─────────────────────────
export const cancellationPolicy =
  "Cancel or reschedule free of charge up to 24 hours before your scheduled time. We don't offer monetary refunds — we guarantee our work. If you're not happy, we'll come back and fix it at no cost.";

// ── FAQ ───────────────────────────────────────────────────
export const faqs = [
  {
    q: "Do you need my water or power?",
    a: "No. Our setup carries its own water tank and power, so we can work anywhere with room around the car: driveways, office lots and most apartment complexes.",
  },
  {
    q: "How long does a detail take?",
    a: "Every booking is a 3-hour window. A Full Detail takes about 3 hours; Maintenance Check-Ups are usually quicker, depending on the vehicle and its condition.",
  },
  {
    q: "What areas do you serve?",
    a: "Dublin, San Ramon, Pleasanton, Danville, Alamo and Walnut Creek. Just outside the area? Give us a call and we'll see what we can do.",
  },
  {
    q: "How do I pay?",
    a: `Visa, Mastercard or Google Pay online when you book, or Zelle / Venmo after your service. ${notificationCopy}`,
  },
  {
    q: "Can I reschedule or cancel? What about refunds?",
    a: cancellationPolicy,
  },
  {
    q: "Do I need to be home?",
    a: "Not for exterior work. For interior services we just need the car unlocked or the keys left somewhere safe. Add any instructions in the booking notes.",
  },
];

export const navLinks = [
  {
    label: "Services",
    href: "/#services",
    children: services.map((s) => ({ label: s.name, href: s.href })),
  },
  {
    label: "Service Areas",
    href: "/#areas",
    children: serviceAreas.map((a) => ({ label: a.city, href: "/#areas" })),
  },
  { label: "Pricing", href: "/#pricing" },
  { label: "Our Work", href: "/#gallery" },
  { label: "Maintenance Club", href: "/#club" },
  { label: "FAQ", href: "/#faq" },
];
