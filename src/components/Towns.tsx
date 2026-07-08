"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";
import type { TownGuide } from "@/data/sicily";

/**
 * Town-by-town mini-guides for the Sicily page: photo (lightbox), time chip,
 * don't-miss list, named eat & drink spots, and a parking line.
 */
export default function Towns({ towns }: { towns: TownGuide[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = towns.map((t) => ({ url: t.image ?? "", caption: t.name }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {towns.map((t, i) => (
          <article
            key={t.name}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5 sm:flex-row"
          >
            <button
              onClick={() => openAt(i)}
              aria-label={`Open photo of ${t.name}`}
              className="group relative h-44 w-full shrink-0 overflow-hidden bg-sand-100 sm:h-auto sm:w-44"
            >
              <SmartImage
                src={t.image ?? ""}
                alt={t.name}
                fallbackLabel={t.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-sea-800 opacity-0 transition group-hover:opacity-100">
                ⤢
              </span>
            </button>

            <div className="flex-1 p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-sea-900">{t.name}</h3>
                <span className="rounded-full bg-sea-500/10 px-2.5 py-0.5 text-xs font-semibold text-sea-700">
                  {t.time}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-terracotta-600">
                {t.area}
              </div>

              <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-sea-700/60">
                Don&apos;t miss
              </div>
              <ul className="mt-1 space-y-0.5 text-sm leading-relaxed text-sea-800">
                {t.dontMiss.map((d) => (
                  <li key={d} className="flex gap-1.5">
                    <span className="text-terracotta-500">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-sea-700/60">
                Eat &amp; drink
              </div>
              <ul className="mt-1 space-y-0.5 text-sm leading-relaxed text-sea-800">
                {t.eatDrink.map((d) => (
                  <li key={d} className="flex gap-1.5">
                    <span className="text-terracotta-500">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 rounded-lg bg-sand-50 px-3 py-2 text-xs leading-relaxed text-sea-700">
                🅿️ {t.parking}
              </p>
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
