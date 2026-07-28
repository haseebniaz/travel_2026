"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";

type Photo = { file: string; caption: string };

/**
 * A day card's photo strip: first photo large, the rest alongside, captions
 * always visible on a gradient. Any photo opens the shared Lightbox.
 */
export default function IcelandPhotoRow({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  const images = photos.map((p) => ({ url: `/images/${p.file}.jpg`, caption: p.caption }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const gridCols =
    photos.length <= 2
      ? "sm:grid-cols-2"
      : photos.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <>
      <div className={`grid grid-cols-1 gap-3 ${gridCols}`}>
        {images.map((image, i) => (
          <button
            key={image.url}
            onClick={() => openAt(i)}
            aria-label={`Open image: ${image.caption}`}
            className={`group relative overflow-hidden rounded-xl bg-sand-100 shadow-sm ring-1 ring-sea-900/5 transition hover:shadow-md ${
              i === 0 ? "aspect-[16/10] sm:col-span-1" : "aspect-[16/10]"
            }`}
          >
            <SmartImage
              src={image.url}
              alt={image.caption}
              fallbackLabel={image.caption}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-sea-900/85 via-sea-900/30 to-transparent pt-10" />
            <span className="pointer-events-none absolute bottom-2 left-2.5 right-2.5 text-left text-xs font-medium leading-snug text-white drop-shadow">
              {image.caption}
            </span>
            <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-sea-800 opacity-0 transition group-hover:opacity-100">
              ⤢
            </span>
          </button>
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
