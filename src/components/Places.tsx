"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";
import type { Place } from "@/data/trips";

/**
 * "Places to visit" card grid. Each card has a photo, name, area, and blurb;
 * clicking the photo opens the Lightbox over all the place images.
 */
export default function Places({ places }: { places: Place[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = places.map((p) => ({ url: p.image ?? "", caption: p.name }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((p, i) => (
          <article
            key={p.name}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5"
          >
            <button
              onClick={() => openAt(i)}
              aria-label={`Open photo of ${p.name}`}
              className="group relative aspect-[4/3] overflow-hidden bg-sand-100"
            >
              <SmartImage
                src={p.image ?? ""}
                alt={p.name}
                fallbackLabel={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-sea-800 opacity-0 transition group-hover:opacity-100">
                ⤢
              </span>
            </button>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-lg font-semibold leading-tight text-sea-900">
                {p.name}
              </h3>
              {p.area && (
                <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-terracotta-600">
                  {p.area}
                </div>
              )}
              <p className="mt-2 text-sm leading-relaxed text-sea-700">{p.blurb}</p>
            </div>
          </article>
        ))}
      </div>

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
