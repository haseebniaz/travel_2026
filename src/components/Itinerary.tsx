"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";
import type { ItineraryDay } from "@/data/trips";

/**
 * Day-by-day itinerary. Each day is a card with a photo, the plan, and stop
 * chips. Clicking any day photo opens the Lightbox over all the day images.
 */
export default function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = days.map((d) => ({
    url: d.image ?? "",
    caption: `${d.day} — ${d.title}`,
  }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <ol className="space-y-4">
        {days.map((d, i) => (
          <li
            key={d.day}
            className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5 sm:flex-row"
          >
            <button
              onClick={() => openAt(i)}
              aria-label={`Open photo for ${d.day}: ${d.title}`}
              className="group relative h-44 w-full shrink-0 overflow-hidden bg-sand-100 sm:h-auto sm:w-56"
            >
              <SmartImage
                src={d.image ?? ""}
                alt={`${d.day}: ${d.title}`}
                fallbackLabel={d.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-sea-800 opacity-0 transition group-hover:opacity-100">
                ⤢
              </span>
            </button>

            <div className="flex-1 p-4 pt-0 sm:p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-terracotta-600">
                {d.day}
              </div>
              <h3 className="mt-0.5 font-display text-lg font-semibold text-sea-900">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-sea-700">{d.detail}</p>
              {d.stops && d.stops.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.stops.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-sea-500/10 px-2.5 py-1 text-xs text-sea-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      {open && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
