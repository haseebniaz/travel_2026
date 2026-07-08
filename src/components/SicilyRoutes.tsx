"use client";

import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { sicilyRoutes } from "@/data/sicily";

/**
 * Mini Leaflet map for the Sicily guide: one colored polyline per route
 * option, toggled by chip buttons. Leaflet loads dynamically on mount.
 */
export default function SicilyRoutes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const layersRef = useRef<Record<string, Leaflet.LayerGroup>>({});
  const prevKeyRef = useRef("");

  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(sicilyRoutes.map((r) => [r.id, true]))
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [37.6, 14.2],
        zoom: 8,
        scrollWheelZoom: false, // page-scroll friendly; zoom via controls
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

      for (const route of sicilyRoutes) {
        const group = L.layerGroup();
        L.polyline(
          route.stops.map((s) => [s.lat, s.lng]),
          { color: route.color, weight: 4, opacity: 0.85 }
        ).addTo(group);
        route.stops.forEach((s, i) => {
          L.circleMarker([s.lat, s.lng], {
            radius: i === 0 ? 7 : 5,
            color: route.color,
            weight: 2,
            fillColor: i === 0 ? route.color : "#ffffff",
            fillOpacity: 1,
          })
            .bindPopup(`<b>${s.name}</b><br/>${route.name} · ${route.days}`)
            .addTo(group);
        });
        layersRef.current[route.id] = group;
      }

      setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;

    for (const route of sicilyRoutes) {
      const group = layersRef.current[route.id];
      if (!group) continue;
      if (visible[route.id]) group.addTo(map);
      else map.removeLayer(group);
    }

    const key = sicilyRoutes.map((r) => (visible[r.id] ? "1" : "0")).join("");
    if (key !== prevKeyRef.current) {
      prevKeyRef.current = key;
      const pts: [number, number][] = sicilyRoutes
        .filter((r) => visible[r.id])
        .flatMap((r) => r.stops.map((s) => [s.lat, s.lng] as [number, number]));
      if (pts.length > 1) map.fitBounds(pts, { padding: [28, 28] });
    }
  }, [ready, visible]);

  return (
    <div>
      {/* Route chips */}
      <div className="flex flex-wrap gap-2">
        {sicilyRoutes.map((r) => {
          const on = !!visible[r.id];
          return (
            <button
              key={r.id}
              onClick={() => setVisible((v) => ({ ...v, [r.id]: !v[r.id] }))}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 transition ${
                on
                  ? "bg-white text-sea-900 shadow-sm ring-sea-900/10"
                  : "bg-sand-100/60 text-sea-700/50 ring-transparent"
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full transition ${on ? "" : "opacity-30"}`}
                style={{ backgroundColor: r.color }}
              />
              {r.name}
            </button>
          );
        })}
      </div>

      <div className="isolate mt-3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-sea-900/10">
        <div ref={containerRef} className="h-[46vh] min-h-[340px] w-full bg-sand-100" />
      </div>
    </div>
  );
}
