# Drive & Explore — October Road Trip Dashboard

A small Next.js dashboard for planning an October, drive-friendly, bike-and-scooter
exploration trip — in the spirit of last year's Nice → French Riviera road trip. It
presents **10 trip options** across Europe, each with the feel, a ~7–9 day itinerary,
driving + bike/scooter notes, an October weather panel, and a photo gallery. Every
image opens full-screen when clicked.

Built to be shared with a travel partner as a visual review of the options.

## Trip options

Amalfi Coast & Bay of Naples · Tuscany & Val d'Orcia · Sicily (East & Baroque SE) ·
Dalmatian Coast (Croatia) · Peloponnese (Greece) · Crete (Greece) · Bay of Kotor
(Montenegro) · Slovenia (Julian Alps & Istria) · Corsica (France) · Dordogne &
Périgord (France).

## Tech

- Next.js 14 (App Router) + TypeScript, statically generated
- Tailwind CSS
- Custom client-side lightbox (no image libraries)
- **Self-hosted images**: each destination's hero + gallery art is generated as
  crisp SVG "travel posters" into [`public/images`](public/images) by
  [`scripts/gen-images.mjs`](scripts/gen-images.mjs), so photos always load from
  Vercel and can never break. Regenerate with `node scripts/gen-images.mjs`.

All trip content lives in one file: [`src/data/trips.ts`](src/data/trips.ts).

### Swapping in real photos

Drop a real image into `public/images` using the same filename (e.g.
`amalfi-campania-hero.svg` → `amalfi-campania-hero.jpg`) and point that entry in
`src/data/trips.ts` at the new path — the self-hosting means it will load reliably.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (10 static pages + detail routes)
```

## Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm i -g vercel
vercel deploy --prod --yes --token <YOUR_VERCEL_TOKEN>
```

**Option B — Git import**

Push this repo and, in the Vercel dashboard, choose **Add New → Project → Import Git
Repository**. Next.js is detected automatically; no configuration needed.

## Notes

- Spain and Portugal are intentionally excluded.
- Weather figures are October climate averages, not a live forecast.
