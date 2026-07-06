import TripCard from "@/components/TripCard";
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

      <footer className="mt-16 border-t border-sand-200 pt-8 text-center text-sm text-sea-700/70">
        <p>
          A shared planning space — options only, nothing booked. Spain &amp; Portugal left out by
          request. Weather figures are October climate averages.
        </p>
      </footer>
    </main>
  );
}
