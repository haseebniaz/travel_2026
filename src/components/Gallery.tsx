"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/data/trips";

/**
 * A responsive thumbnail grid for a trip's photos. Clicking any thumbnail opens
 * the full-screen Lightbox, which then supports prev/next through the set.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.url}
            onClick={() => openAt(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-100 shadow-sm ring-1 ring-sea-900/5 transition hover:shadow-md"
            aria-label={`Open image: ${image.caption}`}
          >
            <SmartImage
              src={image.url}
              alt={image.caption}
              fallbackLabel={image.caption}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea-900/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-left text-xs font-medium text-white opacity-0 drop-shadow transition group-hover:opacity-100">
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
