import type { Weather } from "@/data/trips";

/** Compact October weather summary shown on dashboard cards. */
export default function WeatherBadge({ weather }: { weather: Weather }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sea-700">
      <span className="font-semibold text-sea-900">{weather.high}°/{weather.low}°C</span>
      <span className="text-sea-700/70">·</span>
      <span>{weather.sky}</span>
      <span className="text-sea-700/70">·</span>
      <span>~{weather.rainDays} rain days</span>
      {weather.seaTemp != null && (
        <>
          <span className="text-sea-700/70">·</span>
          <span>sea {weather.seaTemp}°C</span>
        </>
      )}
    </div>
  );
}
