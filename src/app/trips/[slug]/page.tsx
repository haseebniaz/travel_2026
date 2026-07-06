import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrip, trips } from "@/data/trips";
import SmartImage from "@/components/SmartImage";
import Gallery from "@/components/Gallery";
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
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <SmartImage
          src={trip.heroImage}
          alt={trip.title}
          fallbackLabel={trip.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900/85 via-sea-900/25 to-sea-900/30" />
        <div className="absolute inset-x-0 top-0 p-4 sm:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-medium text-sea-800 shadow-sm transition hover:bg-white"
          >
            ← All trips
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-8 sm:px-6">
          <div className="text-sm font-medium uppercase tracking-wide text-sand-100">
            {trip.flag} {trip.country} · {trip.region}
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {trip.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-sand-50/90 sm:text-lg">{trip.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* At a glance */}
        <section className="-mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Duration", value: `${trip.days} days` },
            { label: "Route", value: "Loop drive", sub: trip.loop },
            { label: "Best for", value: trip.tags[0] },
            { label: "Explore by", value: "Bike / scooter" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-sea-900/5"
            >
              <div className="text-[11px] uppercase tracking-wide text-sea-700/70">{s.label}</div>
              <div className="mt-1 font-display text-lg font-semibold text-sea-900">{s.value}</div>
              {s.sub && <div className="mt-1 text-[11px] leading-snug text-sea-700/70">{s.sub}</div>}
            </div>
          ))}
        </section>

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
          <ol className="mt-5 space-y-3">
            {trip.itinerary.map((d) => (
              <li key={d.day} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-sea-900/5">
                <div className="w-16 shrink-0 text-sm font-semibold text-terracotta-600">{d.day}</div>
                <div>
                  <div className="font-medium text-sea-900">{d.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-sea-700">{d.detail}</p>
                </div>
              </li>
            ))}
          </ol>
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
