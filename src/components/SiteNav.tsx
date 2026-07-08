"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Trips" },
  { href: "/map", label: "Route map" },
  { href: "/sicily", label: "Sicily ★" },
];

/** Slim sticky tab bar shown on every page: Trips | Route map. */
export default function SiteNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/trips") : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link href="/" className="font-display text-lg font-bold text-sea-900">
          Drive &amp; Explore
        </Link>
        <div className="flex gap-1.5">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                isActive(t.href)
                  ? "bg-sea-700 text-sand-50"
                  : "text-sea-700 hover:bg-sea-500/10"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
