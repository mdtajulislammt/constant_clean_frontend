# Constant Clean — Claude design kit

Ei folder ta Claude (ba onno AI) e diye Constant Clean er website + booking UI bananor jonno. Prompt e Next.js (App Router) frontend-only, Redux Persist, ar global color tokens already lekha ache.

## Kivabe use korbe

1. Claude.ai (ba Claude Desktop / Cursor e Claude) e notun chat khulo.
2. `PROMPT.md` er **puro text** copy kore paste koro (first message e).
3. `references/` folder er **shob image** attach / upload koro, same message e ba immediately pore. Claude link theke live site dekhte pare na, tai screenshot chara pixel-perfect result ashbe na.
4. Client er real phone number ar final price ekhono ashe nai — prompt e `[PHONE NUMBER]` ar `$XX` placeholder rakha ache. Answer asle prompt e boshiye dio.

## References folder e ki ki ache

| File | Ki |
|---|---|
| `00-client-prototype-logo.jpg` | Constant Clean er nijer logo (navbar e eta use korte hobe). Veloce/Volante placeholder na. |
| `01-hero-andetailing.png` / `01-hero-andetailing-live.png` | A&N (`andetailing.com`) hero — desktop. Layout, 5-star, 3-line headline, vertical accent line, foam-car background. Mobile: `01-hero-andetailing-mobile.png`. |
| `02-service-areas-spoton.png` | Spot On (`mobilespotoncalifornia.com`) er "Detailing services across the Bay Area" section (desktop). Mobile: `02-service-areas-spoton-mobile.png`. |
| `03-typography-soko-home.png` | Soko home, full page — typography reference. Mobile: `03-typography-soko-home-mobile.png`. |
| `03-booking-soko.png` | Soko `/book` booking flow (full page). `03-booking-soko-viewport.png` = desktop first step. `03-booking-soko-mobile.png` = mobile. |
| `04-our-services-highgloss.png` | High Gloss "Our Services" section (desktop). Mobile: `04-our-services-highgloss-mobile.png`. |

## Prompt e already thik kora ache

- Dark + yellow/lime theme, Constant Clean logo, A&N hero layout, High Gloss services cards, Spot On section rhythm, Soko typography + booking steps.
- **Font (Soko site theke computed style):** headings = **Alfa Slab One**, body/UI = **DM Sans**. Inter/Montserrat fallback hishebe rakha ache.
- **Stack:** Next.js App Router + TypeScript + Tailwind. Shudhu frontend, mock data, backend nai.
- **Redux Toolkit + redux-persist:** booking progress, vehicle/package/add-ons/slot, customer details, mock bookings, ar mock auth `localStorage` e persist hobe. `Providers` + `PersistGate` App Router layout e.
- **Global colors:** hex shudhu `globals.css` er CSS variables e (`--color-bg`, `--color-accent`, etc.). Component e token class (`bg-bg`, `text-accent`) — raw hex nai.

## Notes

- Original A&N hero screenshot (user attach korechilo) box e ar pawa jay nai. `01-hero-andetailing.png` ta live site theke new capture (andetailing.com headless Chromium e "Confirm you are human" bot-wall dey, tai HTML + hero image curl diye load kora hoise). Layout user er dewa screenshot er sathe mile.
- Competitor der text, logo ba photo copy kora jabe na — shudhu layout/spacing/style.
