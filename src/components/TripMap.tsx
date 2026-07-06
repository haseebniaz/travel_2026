"use client";

import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { trips } from "@/data/trips";
import { routes, tripColors, airports } from "@/data/routes";

type LMap = Leaflet.Map;
type LLayerGroup = Leaflet.LayerGroup;

const allVisible = () => Object.fromEntries(trips.map((t) => [t.slug, true]));
const noneVisible = () => Object.fromEntries(trips.map((t) => [t.slug, false]));

/**
 * Interactive Leaflet map of all 10 itineraries (one color each) with
 * per-trip show/hide toggles and a switch for major airports.
 * Leaflet is imported dynamically on mount, so nothing touches `window`
 * during prerender.
 */
export default function TripMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const tripLayersRef = useRef<Record<string, LLayerGroup>>({});
  const airportLayerRef = useRef<LLayerGroup | null>(null);
  const prevVisibleRef = useRef<string>("");

  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(allVisible);
  const [showAirports, setShowAirports] = useState(true);

  // Create the map + all layers once on mount.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [42.5, 12.5],
        zoom: 5,
        scrollWheelZoom: true,
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

      // One layer group per trip: colored polyline + stop markers.
      for (const trip of trips) {
        const stops = routes[trip.slug] ?? [];
        const color = tripColors[trip.slug] ?? "#333";
        const group = L.layerGroup();

        L.polyline(
          stops.map((s) => [s.lat, s.lng]),
          { color, weight: 3.5, opacity: 0.85 }
        ).addTo(group);

        stops.forEach((s, i) => {
          const isStart = i === 0;
          L.circleMarker([s.lat, s.lng], {
            radius: isStart ? 7 : 5,
            color,
            weight: 2,
            fillColor: isStart ? color : "#ffffff",
            fillOpacity: 1,
          })
            .bindPopup(
              `<b>${s.name}</b><br/>` +
                `${isStart ? "Fly-in base" : `Stop ${i + 1} of ${stops.length}`} · ` +
                `<a href="/trips/${trip.slug}">${trip.title} →</a>`
            )
            .addTo(group);
        });

        tripLayersRef.current[trip.slug] = group;
      }

      // Airports layer.
      const airportGroup = L.layerGroup();
      for (const a of airports) {
        L.marker([a.lat, a.lng], {
          icon: L.divIcon({
            className: "",
            html: `<div class="airport-pin" title="${a.code}">✈<span>${a.code}</span></div>`,
            iconSize: [46, 22],
            iconAnchor: [23, 11],
          }),
        })
          .bindPopup(`<b>${a.code}</b> — ${a.name}<br/>${a.country}`)
          .addTo(airportGroup);
      }
      airportLayerRef.current = airportGroup;

      setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      tripLayersRef.current = {};
      airportLayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync layers with toggle state.
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;

    for (const trip of trips) {
      const group = tripLayersRef.current[trip.slug];
      if (!group) continue;
      if (visible[trip.slug]) group.addTo(map);
      else map.removeLayer(group);
    }

    const airportGroup = airportLayerRef.current;
    if (airportGroup) {
      if (showAirports) airportGroup.addTo(map);
      else map.removeLayer(airportGroup);
    }

    // Re-fit only when the set of visible trips changes (not on airport toggle).
    const key = trips.map((t) => (visible[t.slug] ? "1" : "0")).join("");
    if (key !== prevVisibleRef.current) {
      prevVisibleRef.current = key;
      const pts: [number, number][] = trips
        .filter((t) => visible[t.slug])
        .flatMap((t) => (routes[t.slug] ?? []).map((s) => [s.lat, s.lng] as [number, number]));
      if (pts.length > 1) {
        map.fitBounds(pts, { padding: [30, 30] });
      }
    }
  }, [ready, visible, showAirports]);

  const visibleCount = trips.filter((t) => visible[t.slug]).length;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px,1fr]">
      {/* Control panel */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sea-900/5 lg:self-start">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-sea-900">
            Itineraries{" "}
            <span className="text-sm font-normal text-sea-700/70">
              {visibleCount}/{trips.length}
            </span>
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => setVisible(allVisible())}
              className="rounded-full bg-sea-500/10 px-2.5 py-1 text-xs font-semibold text-sea-700 transition hover:bg-sea-500/20"
            >
              All
            </button>
            <button
              onClick={() => setVisible(noneVisible())}
              className="rounded-full bg-sea-500/10 px-2.5 py-1 text-xs font-semibold text-sea-700 transition hover:bg-sea-500/20"
            >
              None
            </button>
          </div>
        </div>

        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 lg:grid-cols-1">
          {trips.map((t) => (
            <li key={t.slug}>
              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sea-800 transition hover:bg-sand-50">
                <input
                  type="checkbox"
                  checked={!!visible[t.slug]}
                  onChange={(e) =>
                    setVisible((v) => ({ ...v, [t.slug]: e.target.checked }))
                  }
                  className="h-4 w-4 shrink-0 accent-sea-700"
                />
                <span
                  className="h-3 w-3 shrink-0 rounded-full ring-1 ring-sea-900/10"
                  style={{ backgroundColor: tripColors[t.slug] }}
                />
                <span className="truncate">
                  {t.flag} {t.title}
                </span>
              </label>
            </li>
          ))}
        </ul>

        {/* Airports switch */}
        <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-sand-50 px-3 py-2.5 ring-1 ring-sea-900/5">
          <span className="text-sm font-semibold text-sea-900">✈️ Major airports</span>
          <span className="relative inline-block h-6 w-11 shrink-0">
            <input
              type="checkbox"
              checked={showAirports}
              onChange={(e) => setShowAirports(e.target.checked)}
              className="peer sr-only"
              aria-label="Show major airports"
            />
            <span className="absolute inset-0 rounded-full bg-sand-200 transition peer-checked:bg-sea-700" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>

        <p className="mt-3 text-xs leading-relaxed text-sea-700/70">
          Tap a stop for its trip; tap ✈ for the airport. Toggle itineraries to compare
          clusters and pick the fly-in.
        </p>
      </div>

      {/* Map */}
      <div className="isolate overflow-hidden rounded-2xl shadow-sm ring-1 ring-sea-900/10">
        <div ref={containerRef} className="h-[52vh] min-h-[380px] w-full bg-sand-100 lg:h-[72vh]" />
      </div>
    </div>
  );
}
