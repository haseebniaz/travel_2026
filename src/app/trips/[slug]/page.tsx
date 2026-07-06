import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrip, trips } from "@/data/trips";
import SmartImage from "@/components/SmartImage";
import Gallery from "@/components/Gallery";
import Itinerary from "@/components/Itinerary";
import Places from "@/components/Places";
import WeatherPanel from "@/components/WeatherPanel";

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const trip = getTrip(params.slug);
  if (!trip) return { title: "Trip not found" };
  return {
    title: `${trip.title} — Drive & Explore`,
    description: trip.tagline,
  };
}

export default function TripPage({ params }: { params: { slug: string } }) {
  const trip = getTrip(params.slug);
  if (!trip) notFound();

  return (
    <main className="pb-20">
      {/* Hero — sizes to its content so long titles never clip */}
      <header className="relative flex min-h-[440px] flex-col justify-end overflow-hidden">
        <SmartImage
          src={trip.heroImage}
          alt={trip.title}
          fallbackLabel={trip.title}
          eager
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/30 to-sea-900/35" />

        <div className="absolute inset-x-0 top-0 p-4 sm:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-medium text-sea-800 shadow-sm transition hover:bg-white"
          >
            ← All trips
          </Link>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-12 pt-24 sm:px-6">
          <div className="text-sm font-medium uppercase tracking-wide text-sand-100">
            {trip.flag} {trip.country} · {trip.region}
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-5xl">
            {trip.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-sand-50/90 sm:text-lg">{trip.tagline}</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* At a glance — floats over the hero edge */}
        <section className="relative z-10 -mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Duration", value: `${trip.days} days` },
            { label: "Route", value: "Loop" },
            { label: "Best for", value: trip.tags[0] },
            { label: "Explore by", value: "Bike / scooter" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white p-4 text-center shadow-md ring-1 ring-sea-900/5"
            >
              <div className="text-[11px] uppercase tracking-wide text-sea-700/70">{s.label}</div>
              <div className="mt-1 font-display text-lg font-semibold text-sea-900">{s.value}</div>
            </div>
          ))}
        </section>

        {/* Full route line */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm text-sea-800 ring-1 ring-sea-900/5">
          <span className="shrink-0 text-terracotta-500">🚗</span>
          <span className="font-medium">{trip.loop}</span>
        </div>

        {/* The feel */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">The feel</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-sea-800">
            {trip.feel.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-sea-900">Highlights</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {trip.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 rounded-xl bg-white/70 px-4 py-3 text-sm text-sea-800 ring-1 ring-sea-900/5"
              >
                <span className="mt-0.5 text-terracotta-500">◆</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Weather */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">October weather</h2>
          <div className="mt-4">
            <WeatherPanel weather={trip.weather} />
          </div>
        </section>

        {/* Itinerary */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">
            Suggested {trip.days}-day itinerary
          </h2>
          <p className="mt-1 text-sm text-sea-700/70">Tap a day&apos;s photo to open it full-screen.</p>
          <div className="mt-5">
            <Itinerary days={trip.itinerary} />
          </div>
        </section>

        {/* Places to visit */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">Places to visit</h2>
          <p className="mt-1 text-sm text-sea-700/70">
            The stops worth building the trip around — tap any photo to expand.
          </p>
          <div className="mt-5">
            <Places places={trip.places} />
          </div>
        </section>

        {/* Things to do & ideas */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">Things to do &amp; ideas</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {trip.experiences.map((e) => (
              <li
                key={e.title}
                className="rounded-xl bg-white/70 px-4 py-3 ring-1 ring-sea-900/5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="mt-0.5 text-terracotta-500">◆</span>
                  <span className="font-semibold text-sea-900">{e.title}</span>
                </div>
                <p className="mt-1 pl-5 text-sm leading-relaxed text-sea-700">{e.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Getting around */}
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sea-900/5">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
              🚗 Driving
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-sea-700">{trip.driving}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sea-900/5">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
              🛵 Bike &amp; scooter
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-sea-700">{trip.bikeScooter}</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-sea-900">
            The feel, in pictures
          </h2>
          <p className="mt-1 text-sm text-sea-700/70">Tap any photo to open it full-screen.</p>
          <div className="mt-4">
            <Gallery images={trip.gallery} />
          </div>
        </section>

        {/* Nav */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-sea-700 px-6 py-3 text-sm font-semibold text-sand-50 transition hover:bg-sea-800"
          >
            ← Back to all 10 trips
          </Link>
        </div>
      </div>
    </main>
  );
}
