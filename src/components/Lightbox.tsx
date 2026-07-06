"use client";

import { useCallback, useEffect } from "react";
import SmartImage from "./SmartImage";
import type { GalleryImage } from "@/data/trips";

type Props = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Full-screen image overlay. Click backdrop or press Esc to close; arrows /
 * on-screen buttons move between images when there is more than one.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const count = images.length;
  const current = images[index];

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) go(1);
      if (e.key === "ArrowLeft" && count > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, go, count]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sea-900/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
      >
        ×
      </button>

      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage
          src={current.url}
          alt={current.caption}
          fallbackLabel={current.caption}
          className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-sm text-sand-100">
          {current.caption}
          {count > 1 && (
            <span className="ml-2 text-sand-100/60">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
