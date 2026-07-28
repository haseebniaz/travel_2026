"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapStop } from "@/data/iceland";

/**
 * A day card's mini map: the day's real route as a polyline with numbered stop
 * pins. Stops that repeat a location (loop days) share one pin with merged
 * notes. Leaflet loads dynamically on mount, so prerender never touches window.
 */
export default function IcelandDayMap({
  stops,
  color,
  label,
}: {
  stops: MapStop[];
  color: string;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current || stops.length === 0) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        center: [stops[0].lat, stops[0].lng],
        zoom: 9,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 18,
        }
      ).addTo(map);

      L.polyline(
        stops.map((s) => [s.lat, s.lng]),
        { color, weight: 4, opacity: 0.85, dashArray: "1 8", lineCap: "round" }
      ).addTo(map);

      // One numbered pin per distinct location; loop returns merge into it.
      const seen = new Map<string, { n: number; names: string[]; notes: string[] }>();
      let n = 0;
      for (const s of stops) {
        const key = `${s.lat},${s.lng}`;
        const entry = seen.get(key);
        if (entry) {
          if (s.note && !entry.notes.includes(s.note)) entry.notes.push(s.note);
          continue;
        }
        n += 1;
        seen.set(key, { n, names: [s.name], notes: s.note ? [s.note] : [] });
        L.marker([s.lat, s.lng], {
          icon: L.divIcon({
            className: "",
            html: `<div class="iceland-map-pin" style="background:${color}">${n}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        })
          .bindPopup(`<b>${s.name}</b>${s.note ? `<br/>${s.note}` : ""}`)
          .addTo(map);
      }

      map.fitBounds(
        stops.map((s) => [s.lat, s.lng] as [number, number]),
        { padding: [34, 34], maxZoom: 12 }
      );
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="isolate overflow-hidden rounded-xl shadow-sm ring-1 ring-sea-900/10">
      <div
        ref={containerRef}
        aria-label={label}
        className="h-60 w-full bg-sand-100 sm:h-64"
      />
    </div>
  );
}
