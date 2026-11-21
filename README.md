# Constant Clean — Frontend

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Redux Toolkit / redux-persist + Framer Motion.
**Frontend only** — all data is mock/placeholder. Design brief: [`guid frontend/PROMPT.md`](./guid%20frontend/PROMPT.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | **The only place hex colours exist** — `@theme` tokens (`bg`, `surface`, `accent`, `muted` …) + type scale (`.h1 .h2 .h3 .eyebrow .btn-text`). Tailwind's default palette is disabled. |
| `lib/config.ts` | **All placeholder content**: phone, prices, packages, add-ons, slots, areas, club plans, reviews, FAQ, trust/why-us items, gallery, cancellation policy. |
| `lib/media.ts` | **Every image & video** (src, alt, credit, source link, blur placeholder, `todo` flag). Stock photos from Pexels until client photos arrive. |
| `lib/pricing.ts` | Price / date helpers. |
| `store/` | Redux store, `booking` / `bookings` / `user` slices, persisted to `localStorage`. |
| `components/Providers.tsx` | `<Provider>` + `<PersistGate>` + `<MotionConfig reducedMotion="user">`. |
| `components/home/*` | Home sections (Hero, Services, Service Areas, How It Works, Club, Gallery, Reviews, CTA). |
| `components/booking/*` | 7-step booking flow (`BookingFlow.tsx` orchestrates; `steps/*`). |
| `public/images/`, `public/videos/` | Client logo (`logo.png`), social card (`og.png`), hero poster, hero video (`hero.mp4` + `hero.webm`). |

## Before launch (client to send)

- Final service list + what each Maintenance Check-Up includes (`packages` in `lib/config.ts`; prices are from the Nov 2026 flyer)
- Add-ons, if any → `addOns`, then set `SHOW_ADD_ONS = true` (re-enables booking step 3)
- Real photos to replace the Pexels stock in `lib/media.ts` (every entry has `todo: true`)
- Real reviews, Terms & Privacy copy
- Real payments (Stripe card + Google Pay); Zelle/Venmo handles. Everything is mocked today.

## Next phase

`/bookings` has a basic list (status + payment). Reschedule/cancel requests, Account (`/account`) and the admin panel come next.
Changing persisted Redux shapes? Bump `PERSIST_VERSION` in `store/index.ts` and add a migration.
