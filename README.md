# Avida by Abigail — Next.js implementation

Production scaffold of the broker landing site for Abigail S. Natan (Authorized Property Specialist · Avida Land Corp).

## Stack
- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3** with the design tokens from the original handoff (`tailwind.config.ts`)
- **@tailwindcss/forms** for input baseline
- **Zod** for form validation (shared between client and `/api/inquiry`)
- **Resend** (optional) for inquiry email delivery — falls back to server log if `RESEND_API_KEY` is unset

## Getting started
```bash
cd web
npm install
cp .env.example .env.local   # optional — fill RESEND_API_KEY when ready
npm run dev
```
Open <http://localhost:3000>.

## Project layout
```
src/
  app/
    api/inquiry/route.ts   # POST handler, Zod-validated, Resend or log fallback
    layout.tsx             # Fonts (Plus Jakarta + Open Sans), JSON-LD RealEstateAgent
    page.tsx               # Composes the 11 sections
    globals.css            # Tailwind + Material Symbols + utility classes
  components/
    TopStrip / Header / Hero / StatsAndWhy / PropertyGrid /
    AboutAbigail / AlvieraSpotlight / VideoWalkthrough /
    Stories / Contact / InquiryForm / Footer / Icon
  data/properties.ts       # Typed Property[] + BROKER constants — single source of truth
  lib/inquiry-schema.ts    # Zod schema + interest options
public/assets/             # All photography (copied from ../assets)
```

## Inquiry form
- Client-validated (Zod), then re-validated server-side
- Honeypot field (`website`) — silently succeeds if filled by a bot
- Sends via Resend when `RESEND_API_KEY` is set; otherwise logs the payload and returns success so local dev still works

## Still to do
- **Hero background image** — drop a ≥2400×1200 photo into `public/assets/` and replace the striped placeholder in `Hero.tsx`
- **Video thumbnail + story thumbnails** — same pattern, replace the placeholder div in `VideoWalkthrough.tsx` and `Stories.tsx`
- **Avida wordmark authorization** — confirm written permission from Avida Land Corp marketing before going live (see original handoff README)
- **Analytics** — wire phone/email taps, `Send Inquiry`, `Book a Viewing`, property-card clicks
- **Privacy Policy page** — footer link currently goes nowhere
- **OG image** — add `public/og-image.jpg` (1200×630) and reference it in `layout.tsx` metadata.openGraph.images

## Env vars
| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Unset → logs only. |
| `INQUIRY_TO_EMAIL` | Inbox for inquiries (default `phpropertiesonline@gmail.com`) |
| `INQUIRY_FROM_EMAIL` | Verified sender on Resend (default `inquiry@avidabyabigail.ph`) |
