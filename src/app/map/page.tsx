import type { Metadata } from "next";
import TripMap from "@/components/TripMap";

export const metadata: Metadata = {
  title: "Route map — Drive & Explore",
  description:
    "All ten October itineraries on one interactive map, with major airports — pick the fly-in by route density.",
};

export default function MapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <header className="pt-10 pb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-terracotta-600">
          October Road Trip · Route Map
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-sea-900 sm:text-4xl">
          All ten itineraries, one map
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sea-700 sm:text-base">
          Every route in its own color, with the major airports that serve them. Toggle
          itineraries on and off to compare clusters — then pick the airport with the most
          options around it.
        </p>
      </header>

      <TripMap />
    </main>
  );
}
