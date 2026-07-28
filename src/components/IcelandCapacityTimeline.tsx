import type { CapacityDay, SegmentKind } from "@/data/iceland";
import { capacityCallout } from "@/data/iceland";

/** Shared segment styling for the trip timeline and the per-day flow strips. */
export const segmentStyles: Record<SegmentKind, string> = {
  flight: "bg-sea-900 text-sand-50",
  transfer: "bg-amber-400 text-sea-900",
  sightseeing: "bg-emerald-600 text-white",
  flexible: "bg-teal-200 text-sea-800",
  sleep: "bg-slate-200 text-slate-500",
};

export const segmentLegend: { kind: SegmentKind; label: string }[] = [
  { kind: "flight", label: "Flight" },
  { kind: "transfer", label: "Airport / transfer" },
  { kind: "sightseeing", label: "Full sightseeing" },
  { kind: "flexible", label: "Light / flexible" },
  { kind: "sleep", label: "Sleep / down time" },
];

/**
 * The visual trip timeline: one vertical meter per calendar day, each block
 * sized to its share of the day. Clicking a day jumps to its detail card.
 */
export default function IcelandCapacityTimeline({ days }: { days: CapacityDay[] }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-sea-900">
            Day capacity by local calendar date
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-sea-700/80">
            The Monday return is the whole story — it protects a proper Reykjavík family day
            on Sunday. Tap a day to jump to its plan.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-sea-700">
          {segmentLegend.map((l) => (
            <span key={l.kind} className="inline-flex items-center gap-1.5">
              <i className={`h-3 w-3 rounded ${segmentStyles[l.kind].split(" ")[0]}`} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {days.map((d) => {
          let acc = 0;
          return (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="group flex flex-col rounded-xl bg-sand-50/60 p-3 ring-1 ring-sea-900/5 transition hover:bg-sand-50 hover:shadow-md"
            >
              <div className="text-sm font-bold text-sea-900">{d.date}</div>
              <div className="mt-0.5 text-[10px] font-extrabold uppercase tracking-wider text-terracotta-600">
                {d.status}
              </div>

              <div className="relative mt-3 h-56 overflow-hidden rounded-lg ring-1 ring-sea-900/10">
                {d.segments.map((s, i) => {
                  const top = acc;
                  acc += s.pct;
                  return (
                    <div
                      key={i}
                      title={`${s.label} · ${s.pct}%`}
                      className={`absolute inset-x-0 flex items-center justify-center overflow-hidden px-1 text-center text-[10px] font-bold leading-tight ${segmentStyles[s.kind]}`}
                      style={{ top: `${top}%`, height: `${s.pct}%` }}
                    >
                      {s.pct >= 8 ? s.label : ""}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2.5 text-xs leading-snug text-sea-700">
                <span className="font-bold text-sea-900">{d.verdict}</span>
                <br />
                {d.detail}
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-white px-4 py-3.5 ring-1 ring-amber-200/70">
        <div>
          <div className="font-semibold text-sea-900">{capacityCallout.title}</div>
          <div className="text-sm text-sea-700/80">{capacityCallout.detail}</div>
        </div>
        <div className="rounded-full bg-sea-900 px-4 py-2 text-sm font-extrabold text-sand-50">
          {capacityCallout.score}
        </div>
      </div>
    </div>
  );
}
