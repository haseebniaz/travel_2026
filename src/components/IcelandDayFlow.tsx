import type { FlowSegment } from "@/data/iceland";
import { segmentStyles } from "./IcelandCapacityTimeline";

/**
 * The per-day version of the trip timeline: a horizontal strip of the day's
 * blocks, sized to their share of the waking day, with a time-chip legend.
 */
export default function IcelandDayFlow({
  flow,
  span,
}: {
  flow: FlowSegment[];
  span: string;
}) {
  return (
    <div className="rounded-xl bg-sand-50/60 p-3.5 ring-1 ring-sea-900/5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
          Day flow
        </div>
        <div className="text-xs font-medium text-sea-700/70">{span}</div>
      </div>

      <div className="mt-2.5 flex h-9 overflow-hidden rounded-lg ring-1 ring-sea-900/10">
        {flow.map((s, i) => (
          <div
            key={i}
            title={`${s.from}–${s.to} · ${s.label}`}
            className={`flex items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-bold ${segmentStyles[s.kind]}`}
            style={{ width: `${s.pct}%` }}
          >
            {/* Only label segments the text actually fits in, and only on sm+ */}
            {s.pct * 1.8 >= s.label.length + 2 && (
              <span className="hidden sm:inline">{s.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1">
        {flow.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-sea-700">
            <i className={`h-2.5 w-2.5 shrink-0 rounded-sm ${segmentStyles[s.kind].split(" ")[0]}`} />
            <span className="font-semibold text-sea-900">
              {s.from}–{s.to}
            </span>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
