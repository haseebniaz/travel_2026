"use client";

import Link from "next/link";
import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";
import WeatherBadge from "./WeatherBadge";
import type { Trip } from "@/data/trips";

/**
 * Dashboard card. A "stretched link" overlay (absolute, sibling of the content
 * — not a wrapper) makes the whole card navigate to the detail page, so the
 * expand button can sit above it without nesting one interactive inside another.
 * The expand button opens the hero photo in a lightbox instead of navigating.
 */
export default function TripCard({ trip, order }: { trip: Trip; order: number }) {
  const [open, setOpen] = useState(false);

  const heroImage = { url: trip.heroImage, caption: trip.title };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5 transition hover:-translate-y-1 hover:shadow-xl">
      {/* Stretched link covering the whole card */}
      <Link
        href={`/trips/${trip.slug}`}
        aria-label={`View the ${trip.title} trip plan`}
        className="absolute inset-0 z-0"
      />

      <div className="pointer-events-none relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
          <SmartImage
            src={trip.heroImage}
            alt={trip.title}
            fallbackLabel={trip.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-sea-900/80 px-2.5 py-1 text-xs font-medium text-sand-50">
            {String(order).padStart(2, "0")}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-sea-800">
            {trip.flag} {trip.country}
          </span>
          {/* Expand button sits above the stretched link; visible on touch, hover-revealed on desktop */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Expand photo of ${trip.title}`}
            className="pointer-events-auto absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sea-800 shadow transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
          >
            ⤢
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="text-xs font-medium uppercase tracking-wide text-terracotta-600">
            {trip.region} · {trip.days} days
          </div>
          <h2 className="mt-1 font-display text-xl font-semibold leading-snug text-sea-900">
            {trip.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-sea-700/90">
            {trip.tagline}
          </p>

          <div className="mt-4 border-t border-sand-100 pt-3">
            <WeatherBadge weather={trip.weather} />
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {trip.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sea-500/10 px-2.5 py-1 text-xs text-sea-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm font-semibold text-terracotta-600">
            View trip plan →
          </div>
        </div>
      </div>

      {open && (
        <Lightbox
          images={[heroImage]}
          index={0}
          onClose={() => setOpen(false)}
          onIndexChange={() => {}}
        />
      )}
    </article>
  );
}
