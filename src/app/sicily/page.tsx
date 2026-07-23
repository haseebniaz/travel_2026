import Link from "next/link";
import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import Places from "@/components/Places";
import Towns from "@/components/Towns";
import WeatherPanel from "@/components/WeatherPanel";
import SicilyRoutes from "@/components/SicilyRoutes";
import { getTrip } from "@/data/trips";
import {
  regions,
  sicilyRoutes,
  towns,
  etnaGuide,
  mustDos,
  hiddenGems,
  westAndIslands,
  foodAndDrink,
  beaches,
  perfectDays,
  octoberEvents,
  driveLegs,
  budget,
  practicalNotes,
  timeline,
  bookings,
} from "@/data/sicily";

export const metadata: Metadata = {
  title: "Sicily — the one-stop guide · Drive & Explore",
  description:
    "Everything worth doing, seeing, eating, and driving in Sicily this October — regions, route options, must-dos, hidden gems, food, and beaches, in one page.",
};

const sections = [
  { id: "timeline", label: "Timeline" },
  { id: "bookings", label: "Bookings" },
  { id: "regions", label: "The island" },
  { id: "routes", label: "Routes" },
  { id: "towns", label: "Towns" },
  { id: "etna", label: "Etna" },
  { id: "mustdos", label: "Must-dos" },
  { id: "gems", label: "Hidden gems" },
  { id: "west", label: "West & islands" },
  { id: "food", label: "Food & drink" },
  { id: "beaches", label: "Beaches" },
  { id: "days", label: "Perfect days" },
  { id: "october", label: "October" },
  { id: "practical", label: "Practical" },
];

function SectionHeading({
  id,
  title,
  sub,
}: {
  id: string;
  title: string;
  sub: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-14">
      <h2 className="font-display text-2xl font-semibold text-sea-900 sm:text-3xl">{title}</h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-sea-700/80 sm:text-[15px]">{sub}</p>
    </div>
  );
}

export default function SicilyGuidePage() {
  const trip = getTrip("sicily-east")!;

  return (
    <main className="pb-20">
      {/* Hero */}
      <header className="relative flex min-h-[400px] flex-col justify-end overflow-hidden">
        <SmartImage
          src="/images/sicily-east-hero.jpg"
          alt="Taormina and the Sicilian coast"
          fallbackLabel="Sicily"
          eager
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/30 to-sea-900/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sand-100">
            🎉 The pick · Oct 31 → Nov 7 · flights booked
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white [text-wrap:balance] sm:text-5xl">
            Sicily, the one-stop guide
          </h1>
          <p className="mt-3 max-w-2xl text-base text-sand-50/90 sm:text-lg">
            Every idea worth having about this island, on one page — pick and choose, no
            further research required. The 9-day plan lives on{" "}
            <Link href="/trips/sicily-east" className="font-semibold text-sand-100 underline underline-offset-2">
              the trip page
            </Link>
            ; this is the full menu.
          </p>
        </div>
      </header>

      {/* Section index */}
      <div className="sticky top-[49px] z-30 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-sea-700 transition hover:bg-sea-500/10"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* October at a glance */}
        <section className="mt-8">
          <WeatherPanel weather={trip.weather} />
        </section>

        {/* Timeline */}
        <SectionHeading
          id="timeline"
          title="The timeline"
          sub="Flights are locked: 7 nights on the island, Oct 31 → Nov 7. The days in between are a suggested shape, not a schedule — swap, stretch, or skip based on the morning's mood."
        />
        <ol className="relative mt-8 space-y-8 border-l-2 border-sand-200 pl-6">
          {timeline.map((d) => (
            <li key={d.date} className="relative">
              <span
                className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-sand-50 ${
                  d.flight ? "bg-terracotta-500" : "bg-sea-700"
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs font-bold uppercase tracking-wide text-terracotta-600">
                  {d.date}
                </span>
                <h3 className="font-display text-lg font-semibold text-sea-900">
                  {d.flight ? "✈️ " : ""}
                  {d.title}
                </h3>
                <span className="ml-auto rounded-full bg-sea-500/10 px-2.5 py-0.5 text-xs font-semibold text-sea-700">
                  🌙 {d.night}
                </span>
              </div>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-sea-700">{d.detail}</p>
            </li>
          ))}
        </ol>

        {/* Bookings */}
        <SectionHeading
          id="bookings"
          title="Booked & confirmed"
          sub="Only things that are actually locked live here — everything else on this page is a menu of suggestions to decide on the fly. As we book something, it gets added to this board."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <article
              key={b.title}
              className={`flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ${
                b.status === "booked" ? "ring-green-600/20" : "ring-sea-900/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold leading-snug text-sea-900">
                  <span>{b.icon}</span> {b.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    b.status === "booked"
                      ? "bg-green-100 text-green-800"
                      : b.status === "todo"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-sand-100 text-sea-700"
                  }`}
                >
                  {b.status === "booked" ? "✓ Booked" : b.status === "todo" ? "To book" : "Optional"}
                </span>
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-terracotta-600">
                {b.when}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-sea-700">{b.detail}</p>
            </article>
          ))}
        </div>

        {/* 1 · Regions */}
        <SectionHeading
          id="regions"
          title="The island at a glance"
          sub="Sicily is six trips wearing one coat. Your loop owns the first two regions; the rest are add-ons if the mood (or a longer stay) strikes. Times are drives from Catania."
        />
        <div className="mt-6">
          <Places places={regions} />
        </div>

        {/* 2 · Routes */}
        <SectionHeading
          id="routes"
          title="Routes to take"
          sub="Four ways to shape the days. Toggle them on the map — green is the itinerary you already picked; the others show what stretching or splitting the trip buys you."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sicilyRoutes.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5"
              style={{ borderLeft: `5px solid ${r.color}` }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-sea-900">{r.name}</h3>
                <span className="shrink-0 rounded-full bg-sea-500/10 px-2.5 py-1 text-xs font-semibold text-sea-700">
                  {r.days}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-sea-700">{r.summary}</p>
              <p className="mt-3 rounded-lg bg-sand-50 px-3 py-2 text-xs font-medium leading-relaxed text-sea-800">
                {r.chain}
              </p>
              <div className="mt-3 space-y-1 text-xs text-sea-700/80">
                <p>
                  <span className="font-semibold text-sea-900">Pace:</span> {r.pace}
                </p>
                <p>
                  <span className="font-semibold text-sea-900">Best for:</span> {r.bestFor}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <SicilyRoutes />
        </div>

        {/* Towns */}
        <SectionHeading
          id="towns"
          title="Town by town"
          sub="Your bases and day-stops, decoded: what actually deserves your time, where locals (and greedy travelers) eat, and where to put the car. Venues are long-standing institutions — still, check hours and book the dinner spots a day or two out."
        />
        <div className="mt-6">
          <Towns towns={towns} />
        </div>

        {/* Etna */}
        <SectionHeading
          id="etna"
          title="Etna, properly"
          sub="Europe's greatest volcano deserves more than a drive-by. Five ways at it — pick one, or pair a summit morning with a wine afternoon."
        />
        <div className="mt-6">
          <Places places={etnaGuide} />
        </div>

        {/* 3 · Must-dos */}
        <SectionHeading
          id="mustdos"
          title="Can't-miss experiences"
          sub="If the trip were only these eight things, it would still be a great trip. The first four sit directly on your loop; the rest belong to the optional regions."
        />
        <div className="mt-6">
          <Places places={mustDos} />
        </div>

        {/* 4 · Hidden gems */}
        <SectionHeading
          id="gems"
          title="Off the beaten path"
          sub="The mood-of-the-day detours — canyons, film sets, ghost-quiet Baroque, and villages the buses skip. Each is under an hour from a base on your route."
        />
        <div className="mt-6">
          <Places places={hiddenGems} />
        </div>

        {/* West & islands */}
        <SectionHeading
          id="west"
          title="Further afield: the west & the islands"
          sub="The menu for the longer route variants — golden mosaics, salt pans, car-free coastal reserves, and the green Aeolian. If you stretch past 10 days, these earn their drive."
        />
        <div className="mt-6">
          <Places places={westAndIslands} />
        </div>

        {/* 5 · Food & drink */}
        <SectionHeading
          id="food"
          title="Eat & drink like a Sicilian"
          sub="Sicily is a food destination that happens to have scenery. Work through this list like a checklist — breakfast granita to midnight cannolo."
        />
        <div className="mt-6">
          <Places places={foodAndDrink} />
        </div>

        {/* 6 · Beaches */}
        <SectionHeading
          id="beaches"
          title="Beaches & swims"
          sub="The sea holds ~24°C into late October. These are the swims worth planning a day around, ordered roughly along your route."
        />
        <div className="mt-6">
          <Places places={beaches} />
        </div>

        {/* Perfect days */}
        <SectionHeading
          id="days"
          title="Perfect days"
          sub="Four hour-by-hour days to steal from wholesale — or cut up for parts. Times are relaxed; nothing here minds if you're an hour late."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {perfectDays.map((d) => (
            <article key={d.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
              <h3 className="font-display text-lg font-semibold text-sea-900">{d.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-sea-700/80">{d.blurb}</p>
              <ol className="mt-4 space-y-2">
                {d.steps.map((s) => (
                  <li key={s.time} className="flex gap-3 text-sm leading-relaxed">
                    <span className="w-12 shrink-0 font-semibold text-terracotta-600">{s.time}</span>
                    <span className="text-sea-800">{s.what}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        {/* October events */}
        <SectionHeading
          id="october"
          title="October on the island"
          sub="What the calendar adds while you're there — harvest festivals, open monuments, and the wet-weather fallback. Exact dates shift each year; confirm when booking."
        />
        <div className="mt-6">
          <Places places={octoberEvents} />
        </div>

        {/* 7 · Practical */}
        <SectionHeading
          id="practical"
          title="Practical notes for October"
          sub="The handful of logistics that actually matter. Everything else can be decided over breakfast."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practicalNotes.map((n) => (
            <div key={n.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
                <span>{n.icon}</span> {n.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-sea-700">{n.detail}</p>
            </div>
          ))}
        </div>

        {/* Drive times + budget */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
              🚗 Drive times between stops
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {driveLegs.map((l) => (
                    <tr key={`${l.from}-${l.to}`} className="border-t border-sand-100">
                      <td className="py-1.5 pr-2 text-sea-800">
                        {l.from} <span className="text-sea-700/50">→</span> {l.to}
                      </td>
                      <td className="whitespace-nowrap py-1.5 pr-2 text-right font-semibold text-sea-900">
                        {l.time}
                      </td>
                      <td className="hidden whitespace-nowrap py-1.5 text-right text-xs text-sea-700/60 sm:table-cell">
                        {l.note ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
              💶 Budget ballparks
            </h3>
            <p className="mt-1 text-xs text-sea-700/60">
              Recent-season October ranges — sanity-check when booking.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {budget.map((b) => (
                    <tr key={b.item} className="border-t border-sand-100">
                      <td className="py-1.5 pr-2 text-sea-800">{b.item}</td>
                      <td className="whitespace-nowrap py-1.5 pr-2 text-right font-semibold text-sea-900">
                        {b.range}
                      </td>
                      <td className="hidden py-1.5 text-right text-xs text-sea-700/60 sm:table-cell">
                        {b.note ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <Link
            href="/trips/sicily-east"
            className="rounded-full bg-sea-700 px-6 py-3 text-sm font-semibold text-sand-50 transition hover:bg-sea-800"
          >
            The 9-day itinerary →
          </Link>
          <Link
            href="/map"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-sea-700 ring-1 ring-sea-900/10 transition hover:bg-sand-50"
          >
            Route map
          </Link>
        </div>
      </div>
    </main>
  );
}
