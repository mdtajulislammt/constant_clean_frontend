You are a senior UI/UX designer and front-end developer. Build a pixel-perfect, production-quality, responsive website + booking app UI for "Constant Clean Mobile Auto Detailing".

This is a **frontend-only Next.js (App Router)** application. Do not build a backend, API routes that persist data, or a database. All data comes from mock/config files and client-side Redux state.

## 0. Reference links (study these closely and match the specified sections)
- Client's own prototype (colors, logo position, wording, five-star display, overall dark + yellow look):
  https://aistudio.google.com/apps/04615630-a266-463e-92a8-cf70b5b7b6bd?showPreview=true
- Hero section layout (attached screenshot is from this site):
  https://andetailing.com/
  Screenshot: `references/01-hero-andetailing.png` (desktop) and `references/01-hero-andetailing-mobile.png` (mobile). A second copy of the live desktop capture is also at `references/01-hero-andetailing-live.png`.
- "Detailing services across the Bay Area" section (use for the Service Areas section):
  https://www.mobilespotoncalifornia.com/
  Screenshot: `references/02-service-areas-spoton.png` (desktop) and `references/02-service-areas-spoton-mobile.png` (mobile).
- Typography, text style and booking flow:
  https://www.sokomobiledetailing.com/
  https://www.sokomobiledetailing.com/book
  Screenshots: `references/03-typography-soko-home.png` and `references/03-typography-soko-home-mobile.png` (full home page typography); `references/03-booking-soko.png`, `references/03-booking-soko-viewport.png` (first step, desktop viewport), and `references/03-booking-soko-mobile.png` (booking flow).
- "Our Services" section design (use for the Our Services section):
  https://highglossautodetailing.com/
  Screenshot: `references/04-our-services-highgloss.png` (desktop) and `references/04-our-services-highgloss-mobile.png` (mobile).
- Client logo (use this exact mark in the navbar, top-left):
  `references/00-client-prototype-logo.jpg`
- Client's current website (business info, services and pricing context):
  https://constantclean.org/

Use these only for layout, structure, spacing and style. Do not copy their text, logos or images. Always apply the Constant Clean branding, colors and content described below.

## 1. Business context
- Business: Constant Clean LLC, a 100% mobile car detailing company based in Dublin, California. We come to the customer's home or office and bring our own water and electricity.
- Service area: Dublin, San Ramon, Pleasanton, Danville, Alamo, Walnut Creek.
- Hours: Mon–Sat 9:00 AM–6:00 PM, Sun 12:00 PM–6:00 PM.
- Phone: [PHONE NUMBER]   Email: ythomas@constantclean.org   Instagram: @constantcleanllc
- Customers book a 3-hour appointment slot online and pay upfront.
- Platforms: mobile first (iOS/Android web-app feel), and fully responsive for tablet and desktop/Windows browsers.
- Do NOT include: vehicle photo upload, GPS/live tracking, a studio drop-off option.

## 2. Client's design requirements (must follow exactly)
- Dark theme: near-black backgrounds (#0A0A0A / #111111), dark grey surfaces (#1A1A1A / #222222), subtle borders (#2A2A2A).
- ONE accent color: bright yellow/lime (use #E6FF00 as the primary accent, with #D4EB00 for hover). Use it for primary buttons, stars, active states, prices, and highlights. Do not use blue anywhere.
- Text: white (#FFFFFF) for headings, light grey (#B3B3B3) for body text, muted grey (#7A7A7A) for captions.
- These hex values must be defined **once** as global design tokens (see §8). Never hardcode hex (or rgb) values inside React components.
- The Constant Clean car logo sits in the top-left corner of the navbar. Use `references/00-client-prototype-logo.jpg`.
- Show a five-star rating display (★★★★★) prominently in the hero and reviews.
- Premium, clean, modern, trustworthy feel. Generous spacing, sharp typography, high-contrast CTAs.

## 3. Typography
Reference: https://www.sokomobiledetailing.com/ and https://www.sokomobiledetailing.com/book
Screenshot: `references/03-typography-soko-home.png` (desktop full page) and `references/03-typography-soko-home-mobile.png` (mobile full page).

Computed font-family values taken from the live Soko site (getComputedStyle):
- Headings (h1 / h2 / h3): **"Alfa Slab One"** (weight 400 — this family is a display slab and already reads as heavy). Soko headings are sentence case, with tight line-height (~1.08) and very little letter-spacing.
- Body, nav, buttons, and UI text: **"DM Sans", system-ui, sans-serif** (body 400, nav 500, labels/eyebrows 700). Document body computed style: `"DM Sans", "DM Sans Fallback", system-ui, sans-serif`.
- Load both families from Google Fonts. Fallbacks if they cannot load: "Montserrat" (700/800) for headings and "Inter" for body.
- For Constant Clean, keep the uppercase heading style and type scale below (A&N hero is also uppercase). Match Soko's *clean, high-contrast, readable* typography — do not copy Soko's teal/cream colors or wordmark script (Yellowtail is used only on their logo, not in our UI).

- Type scale (desktop / mobile):
  - H1: 64px / 40px, weight 800 (or Alfa Slab One 400), uppercase, line-height 1.05, letter-spacing 0.5px
  - H2: 44px / 30px, weight 800 (or Alfa Slab One 400), uppercase
  - H3: 24px / 20px, weight 700
  - Body: 18px / 16px, weight 400, line-height 1.6
  - Small label/eyebrow: 13px, weight 700, uppercase, letter-spacing 2px, accent color
  - Buttons: 14px, weight 700, uppercase, letter-spacing 1px

## 4. Components
Build every component using the global color tokens from §8 (e.g. `bg-bg`, `bg-surface`, `border-border`, `text-text`, `text-muted`, `text-subtle`, `bg-accent`, `text-accent`, `hover:bg-accent-hover`). No raw hex in component files.
- Primary button: accent background, black text, 4px radius, padding 16px 28px, hover = darker accent + slight lift.
- Secondary button: transparent, 1px white/20% border, white text, hover = accent border and text.
- Navbar CTA: outlined accent button "BOOK NOW".
- Cards: surface background, 1px border-color border, 8px radius, hover = accent border + slight scale(1.02) + shadow.
- Badges/eyebrows: small uppercase accent text, e.g. "★★★★★ 5-STAR RATED".
- Inputs: darker surface/bg background, border-color border, 6px radius, accent focus ring.
- Icons: lucide-react, thin line style.

## 5. Home page, section by section (in this order)

### 5.1 Navbar
- Sticky, transparent over the hero, turns near-black (token `--color-bg`) with a blur on scroll.
- Left: Constant Clean logo (`references/00-client-prototype-logo.jpg`). Center: Services ▾, Service Areas ▾, Our Work, Maintenance Club. Right: outlined "BOOK NOW" button + hamburger on mobile.

### 5.2 Hero
Reference: https://andetailing.com/ (see attached screenshot)
Screenshot: `references/01-hero-andetailing.png` (desktop) and `references/01-hero-andetailing-mobile.png` (mobile). Match this layout pixel to pixel.
- Full-width, full-viewport-height dark car photo (foam/wash close-up) with a dark gradient overlay on the left for text readability.
- Left-aligned content block with a thin vertical accent line on its left edge.
- Eyebrow: "★★★★★ 5-STAR RATED" (stars in accent).
- H1 (3 lines): "MOBILE CAR / DETAILING / IN DUBLIN, CA" (the first two lines in a slightly lighter tint, the last line pure white, as in the reference).
- Subhead: "We bring our own water & power." Premium mobile detailing at your home or office.
- Two buttons side by side: "BOOK NOW" (primary, accent fill, black text) and "CALL NOW" (secondary/outline).

### 5.3 Our Services
Reference: https://highglossautodetailing.com/ ("Our Services" section)
Screenshot: `references/04-our-services-highgloss.png` (desktop) and `references/04-our-services-highgloss-mobile.png` (mobile). Match its layout and card style.
- Eyebrow "WHAT WE DO", H2 "OUR SERVICES", short intro line.
- Grid of service cards (3 columns desktop, 2 tablet, 1 mobile). Each card: full-bleed image on top, service name, 2-line description, "From $XX" in accent, and a "Book This" link with arrow.
- Services: Basic Detail, Premium Detail, Ceramic Coating, Maintenance Club. Use placeholder prices "$XX" (client will send final prices).

### 5.4 Service Areas
Reference: https://www.mobilespotoncalifornia.com/ ("Detailing services across the Bay Area" section)
Screenshot: `references/02-service-areas-spoton.png` (desktop) and `references/02-service-areas-spoton-mobile.png` (mobile). Match its layout.
- H2 "DETAILING SERVICES ACROSS THE TRI-VALLEY".
- Cards or chips for each city: Dublin, San Ramon, Pleasanton, Danville, Alamo, Walnut Creek, with a location pin icon and a short line each.
- Note line: "We bring our own water and electricity, no hookups needed."
- (On the Spot On site this heading sits above a clean service-card grid with "From $X" and a Book button. Use that *section layout / typography / card rhythm* as the visual reference; the content of this Constant Clean section is the city/service-area list above, not a copy of their package list.)

### 5.5 How It Works
- 3 steps in a row with large accent numbers: 1. Book online in 2 minutes. 2. We come to you. 3. Drive away spotless.

### 5.6 Maintenance Club
- Highlighted band with an accent border. Two plan cards: Weekly and Bi-Monthly, each with price placeholder, "Save X%" badge, included items list, and a "JOIN THE CLUB" button.

### 5.7 Gallery
- Before/after slider cards (drag handle in accent). Use clearly marked placeholder images; real photos will be added later.

### 5.8 Reviews
- H2 "WHAT OUR CUSTOMERS SAY", 5-star accent stars, 3 review cards (placeholder names and text marked as sample).

### 5.9 Final CTA + Footer
- CTA band: "READY FOR A SPOTLESS CAR?" + Book Now button.
- Footer: logo, short description, quick links, service areas, hours, phone, email, Instagram icon, Terms, Privacy. © Constant Clean LLC.

## 6. Booking flow (multi-step)
Reference: https://www.sokomobiledetailing.com/ and https://www.sokomobiledetailing.com/book
Screenshot: `references/03-booking-soko.png` (full page), `references/03-booking-soko-viewport.png` (desktop first step), and `references/03-booking-soko-mobile.png`. Match the multi-step flow, progress bar, vehicle-size cards, and sticky summary / running total — not Soko's teal/cream colors or logo.
- A top progress bar with steps, and a sticky bottom bar on mobile showing the running total and a "Continue" button.
- Step 1 Vehicle: select size with icon cards (Coupe, Sedan, SUV, Truck, Hatchback, Minivan) + year/make/model inputs.
- Step 2 Package: package cards with included items; price updates by vehicle size.
- Step 3 Add-ons: toggle cards (e.g. Engine Bay, Headlight Restoration, Pet Hair, Ceramic Boost) with prices.
- Step 4 Date & time: 14-day date strip + 3-hour time slot cards (e.g. 9:00–12:00, 12:00–3:00, 3:00–6:00); booked slots disabled and greyed out.
- Step 5 Your details: name, phone, email, service address, notes about vehicle condition.
- Step 6 Review & pay: order summary, cancellation policy text, card payment form placeholder (Stripe-style), "CONFIRM & PAY" button.
- Step 7 Confirmation: success check icon in accent, booking summary, "Add to Calendar" and "View My Bookings" buttons.

Persist in-progress booking state with Redux Persist (see §8) so a refresh does not lose the current step, vehicle, package, add-ons, slot, or customer details.

## 7. Other customer screens
- My Bookings: upcoming and past tabs, booking cards with status badge, Reschedule and Cancel request buttons.
- Account: profile, saved vehicles, saved addresses, logout.

## 8. Technical requirements
- **Frontend only.** Next.js (App Router) + TypeScript + Tailwind CSS. No backend, no real payment processing, no database. All prices, phone, images, reviews, slots and bookings come from clearly labeled placeholders in one config/mock file so they can be edited easily.
- Componentized (Navbar, Hero, ServiceCard, AreaCard, PlanCard, ReviewCard, BookingStepper, etc.).
- Mobile first, breakpoints at 640 / 768 / 1024 / 1280px. Max content width 1200px.
- Smooth subtle animations (fade/slide on scroll, button hovers) using Framer Motion; nothing flashy.
- Accessible: proper contrast, focus states, alt text, semantic HTML.

### 8.1 Global color tokens (required)
Define all colors once as CSS variables in `app/globals.css`. Map them in the Tailwind theme config so components use **only** token classes. No hardcoded hex, rgb, or named color values inside components.

Example tokens (use these names, or equivalent, consistently):

```css
:root {
  --color-bg: #0A0A0A;
  --color-bg-alt: #111111;
  --color-surface: #1A1A1A;
  --color-surface-2: #222222;
  --color-border: #2A2A2A;
  --color-accent: #E6FF00;
  --color-accent-hover: #D4EB00;
  --color-text: #FFFFFF;
  --color-text-muted: #B3B3B3;
  --color-text-subtle: #7A7A7A;
}
```

In `tailwind.config` (or the Tailwind v4 `@theme` block), map e.g. `bg`, `bg-alt`, `surface`, `surface-2`, `border`, `accent`, `accent-hover`, `text`, `muted`, `subtle` to those variables. Components then use classes such as `bg-bg`, `bg-surface`, `border-border`, `text-text`, `text-muted`, `text-subtle`, `bg-accent`, `text-accent`, `hover:bg-accent-hover`.

### 8.2 State management: Redux Toolkit + redux-persist (required)
- Use Redux Toolkit with redux-persist. Persist to `localStorage`.
- Persist: booking flow progress (current step), selected vehicle / package / add-ons / slot, customer details, mock bookings, and auth/user mock state.
- Create a client-side `Providers` component that wraps the app with `<Provider store={store}>` and `<PersistGate loading={null} persistor={persistor}>`. Use it from the App Router `app/layout.tsx` (the Providers file itself must be a Client Component).
- Typed hooks: `useAppDispatch` and `useAppSelector`.
- Suggested slices:
  - `bookingSlice` — step, vehicle, package, add-ons, date/slot, customer details, running total
  - `userSlice` — mock auth/user profile, saved vehicles, saved addresses
  - `bookingsSlice` — mock upcoming/past bookings, reschedule and cancel request state
- Rehydrate cleanly (no flicker of empty booking state after refresh). Do not persist ephemeral UI flags unless useful.

## 9. Output
- First deliver the Home page and the full Booking flow. Match the attached reference screenshots for layout, spacing and proportions as closely as possible, but apply the Constant Clean colors, logo and text above.
- After that, I will ask for My Bookings, Account and the admin panel.
