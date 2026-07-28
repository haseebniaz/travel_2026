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
- **Interactive route map** (`/map`): all ten itineraries plotted in distinct colors
  with per-trip toggles and a major-airports switch — Leaflet + CARTO basemap,
  route/airport data in [`src/data/routes.ts`](src/data/routes.ts)
- **Sicily one-stop guide** (`/sicily`): the chosen trip's full menu — regions,
  four toggleable route options on a mini map, town-by-town mini-guides with
  named venues, an Etna deep-dive, must-dos, 19 off-the-beaten-path finds,
  west & islands options, food & drink, beaches, hour-by-hour perfect days,
  October events, a drive-time matrix, and budget ballparks, all with photos —
  content in [`src/data/sicily.ts`](src/data/sicily.ts)
- **Iceland family trip** (`/iceland`): a separate, booked plan (SEA ⇄ KEF on
  Icelandair, Aug 26–31 2026, two adults + kids 7 & 2) — flight cards, a visual
  day-capacity trip timeline plus a matching per-day flow strip on every day
  card, a toggleable one-color-per-day Leaflet route map, per-day mini maps with
  numbered stops, hour-by-hour schedules, family/safety notes, practical notes,
  and persistent book-&-pack checklists — content in
  [`src/data/iceland.ts`](src/data/iceland.ts)
- **Self-hosted real photos**: every destination's hero + gallery image is a real,
  freely-licensed photo from Wikimedia Commons, downloaded into
  [`public/images`](public/images) by [`scripts/fetch-photos.mjs`](scripts/fetch-photos.mjs)
  (then resized to ~1600px), so they always load from Vercel. Attribution for
  every photo is in [`public/images/CREDITS.md`](public/images/CREDITS.md).
  Re-fetch with `node scripts/fetch-photos.mjs` (needs network access to
  `commons.wikimedia.org` / `upload.wikimedia.org`); the Iceland set is
  `node scripts/fetch-photos.mjs --iceland`.

All trip content lives in one file: [`src/data/trips.ts`](src/data/trips.ts).

### Swapping in a different photo

Replace any file in `public/images` (keep the same filename, e.g.
`amalfi-campania-hero.jpg`) and it loads automatically — the filenames are wired
in `src/data/trips.ts`.

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

**Branch previews**

The Git-connected project only builds production from `main`, so
[`.github/workflows/vercel-preview.yml`](.github/workflows/vercel-preview.yml) deploys the
Iceland branch to a Vercel *preview* on every push. It needs three repo secrets —
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (see the workflow header) — and skips
with a warning until they exist. If you instead enable all-branch preview deployments in
the Vercel dashboard (travel-2026 → Settings → Git), delete the workflow to avoid double
builds.

## Notes

- Spain and Portugal are intentionally excluded.
- Weather figures are October climate averages, not a live forecast.
