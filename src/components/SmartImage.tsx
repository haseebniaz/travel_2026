"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Text shown on the gradient fallback if the photo fails to load */
  fallbackLabel?: string;
  /** Load immediately instead of lazily — use for above-the-fold hero images */
  eager?: boolean;
};

/**
 * A plain <img> (loaded directly by the browser, no server optimization) that
 * swaps to a labeled gradient placeholder if the remote photo fails to load,
 * so the dashboard never shows a broken image.
 */
export default function SmartImage({ src, alt, className, fallbackLabel, eager }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`img-fallback flex items-center justify-center ${className ?? ""}`}
        aria-label={alt}
        role="img"
      >
        <span className="px-4 text-center font-display text-lg font-medium text-sand-50/90 drop-shadow">
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
