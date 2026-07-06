import type { Weather } from "@/data/trips";

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-4 text-center ring-1 ring-sea-900/5">
      <div className="text-[11px] uppercase tracking-wide text-sea-700/70">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold text-sea-900">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-sea-700/80">{sub}</div>}
    </div>
  );
}

/** Pick a weather glyph from the qualitative sky description. */
function skyEmoji(sky: string): string {
  const s = sky.toLowerCase();
  if (s.includes("very sunny") || s === "sunny") return "☀️";
  if (s.includes("mostly sunny")) return "🌤️";
  if (s.includes("partly") || (s.includes("cloud") && s.includes("sun"))) return "⛅";
  if (s.includes("cloud")) return "🌥️";
  if (s.includes("sun")) return "☀️";
  return "🌤️";
}

/** Full October weather breakdown for a trip detail page. */
export default function WeatherPanel({ weather }: { weather: Weather }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Avg high" value={`${weather.high}°C`} sub={`low ${weather.low}°C`} />
        <Tile label="Sky" value={skyEmoji(weather.sky)} sub={weather.sky} />
        <Tile label="Rain" value={`~${weather.rainDays}`} sub="days in October" />
        <Tile
          label="Sea"
          value={weather.seaTemp != null ? `${weather.seaTemp}°C` : "—"}
          sub={weather.seaTemp != null ? "swimmable" : "inland"}
        />
      </div>
      <p className="mt-4 rounded-xl bg-terracotta-500/10 px-4 py-3 text-sm text-sea-800">
        <span className="font-semibold text-terracotta-600">October verdict — </span>
        {weather.verdict}
      </p>
    </div>
  );
}
