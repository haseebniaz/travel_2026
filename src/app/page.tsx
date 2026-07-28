import Link from "next/link";
import TripCard from "@/components/TripCard";
import SmartImage from "@/components/SmartImage";
import { trips } from "@/data/trips";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      {/* Header */}
      <header className="pt-14 pb-10 text-center sm:pt-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-terracotta-600">
          October Road Trip · Planning Dashboard
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-sea-900 sm:text-6xl">
          Drive &amp; Explore
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sea-700 sm:text-lg">
          Ten drive-friendly European trips in the spirit of last year&apos;s Riviera run — fly in,
          rent a car, road-trip between towns, and explore each one by bike or scooter. Every option
          is sized to about a week in October. Tap any card for the full plan, the feel, weather, and
          photos.
        </p>
        <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-sea-700/80">
          <span>🚗 Drive between bases</span>
          <span>🛵 Bike / scooter the towns</span>
          <span>🗓️ ~7–9 days each</span>
          <span>🌤️ October weather included</span>
        </div>
      </header>

      {/* Trip grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip, i) => (
          <TripCard key={trip.slug} trip={trip} order={i + 1} />
        ))}
      </section>

      {/* Booked trips tracked as separate plans */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-sea-900">Also on the books</h2>
          <p className="text-sm text-sea-700/70">Booked trips with their own plan pages</p>
        </div>
        <Link
          href="/iceland"
          className="group mt-4 grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5 transition hover:-translate-y-0.5 hover:shadow-xl sm:grid-cols-[2fr,3fr]"
        >
          <div className="relative min-h-[200px] overflow-hidden bg-sand-100">
            <SmartImage
              src="/images/iceland-hero.jpg"
              alt="The Blue Lagoon, Iceland"
              fallbackLabel="Iceland"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-sea-800">
              🇮🇸 Iceland
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-7">
            <div className="text-xs font-medium uppercase tracking-wide text-terracotta-600">
              Family trip · flights booked · Aug 26–31, 2026
            </div>
            <h3 className="mt-1.5 font-display text-2xl font-semibold text-sea-900">
              Iceland with the kids
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sea-700/90">
              SEA ⇄ KEF nonstop on Icelandair with a 7- and a 2-year-old: Blue Lagoon straight
              off the overnight flight, the Golden Circle, a measured South Coast day, and a
              Reykjavík finale — all from one hotel.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["4 nights", "≈ 3.5 usable days", "One Reykjavík base", "Kid-paced"].map((t) => (
                <span key={t} className="rounded-full bg-sea-500/10 px-2.5 py-1 text-xs text-sea-700">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 text-sm font-semibold text-terracotta-600">
              View the full plan →
            </div>
          </div>
        </Link>
      </section>

      <footer className="mt-16 border-t border-sand-200 pt-8 text-center text-sm text-sea-700/70">
        <p>
          A shared planning space — the October options are still just options; booked trips live
          on their own plan pages. Spain &amp; Portugal left out by request. Weather figures are
          October climate averages.
        </p>
      </footer>
    </main>
  );
}
