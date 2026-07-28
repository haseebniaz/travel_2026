import Link from "next/link";
import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import IcelandCapacityTimeline from "@/components/IcelandCapacityTimeline";
import IcelandDayFlow from "@/components/IcelandDayFlow";
import IcelandPhotoRow from "@/components/IcelandPhotoRow";
import IcelandDayMap from "@/components/IcelandDayMap";
import IcelandRoutes from "@/components/IcelandRoutes";
import IcelandChecklist from "@/components/IcelandChecklist";
import {
  flights,
  summary,
  capacityDays,
  days,
  dayRoutes,
  routeFlow,
  practicalNotes,
  stayAreas,
  stayTips,
  checklists,
  sources,
  bottomLine,
} from "@/data/iceland";
import { dayGuides } from "@/data/iceland-guides";

export const metadata: Metadata = {
  title: "Iceland family trip — Aug 26–31, 2026 · Drive & Explore",
  description:
    "The booked family plan: SEA ⇄ KEF on Icelandair, Blue Lagoon on arrival, Golden Circle, a measured South Coast day, and a Reykjavík finale — paced for a 7- and a 2-year-old.",
};

const sections = [
  { id: "flights", label: "Flights" },
  { id: "math", label: "The math" },
  { id: "timeline", label: "Trip timeline" },
  { id: "map", label: "Route map" },
  { id: "days", label: "Day by day" },
  { id: "logic", label: "Route logic" },
  { id: "practical", label: "Practical" },
  { id: "stay", label: "Stay" },
  { id: "checklists", label: "Checklists" },
];

/** Map each plan day to its drill-down guide slug. */
const guideSlug: Record<string, string> = Object.fromEntries(
  dayGuides.map((g) => [g.dayId, g.slug])
);

/** Map each day card to its overview-route color for the mini maps. */
const dayColor: Record<string, string> = Object.fromEntries(
  dayRoutes.map((r) => [`day-${r.id}`, r.color])
);

const noteTone: Record<string, string> = {
  default: "bg-sand-50 ring-sea-900/10",
  safety: "bg-orange-50 ring-orange-200",
  family: "bg-teal-50 ring-teal-200",
  tip: "bg-amber-50 ring-amber-200",
};

function SectionHeading({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div id={id} className="scroll-mt-24 pt-14">
      <h2 className="font-display text-2xl font-semibold text-sea-900 sm:text-3xl">{title}</h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-sea-700/80 sm:text-[15px]">{sub}</p>
    </div>
  );
}

export default function IcelandTripPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <header className="relative flex min-h-[420px] flex-col justify-end overflow-hidden">
        <SmartImage
          src="/images/iceland-hero.jpg"
          alt="The Blue Lagoon's milky-blue water against black lava"
          fallbackLabel="Iceland"
          eager
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/40 to-sea-900/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sand-100">
            🇮🇸 Family trip · flights booked · Aug 26–31, 2026
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-white [text-wrap:balance] sm:text-5xl">
            Iceland with the kids
          </h1>
          <p className="mt-3 max-w-2xl text-base text-sand-50/90 sm:text-lg">
            Three full days plus the Blue Lagoon, from one Reykjavík base — an itinerary paced
            for two adults, a 7-year-old, and a 2-year-old, built around the Icelandair
            overnight out and the Monday-morning flight home.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["SEA ⇄ KEF nonstop", "4 nights · one hotel", "2 adults + kids 7 & 2", "≈ 3.5 usable days"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-sand-50 backdrop-blur-sm"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </header>

      {/* Section index */}
      <div className="sticky top-[49px] z-30 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-sea-700 transition hover:bg-sea-500/10"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Flights */}
        <SectionHeading
          id="flights"
          title="The flights everything hangs on"
          sub="Booked and locked. The overnight outbound sets up a noon Blue Lagoon reservation on arrival day; the Monday return is what protects a full family Sunday."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {flights.map((f) => (
            <article key={f.number} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                    {f.label}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-sea-900">{f.heading}</h3>
                </div>
                <span className="shrink-0 rounded-full bg-sea-500/10 px-3 py-1.5 text-xs font-extrabold text-sea-700">
                  ✈ {f.number}
                </span>
              </div>
              <div className="mt-4 divide-y divide-sand-100">
                {f.rows.map((r) => (
                  <div key={r.time} className="grid grid-cols-[92px,1fr] gap-3 py-3">
                    <time className="font-bold text-sea-700">{r.time}</time>
                    <div>
                      <div className="font-semibold text-sea-900">{r.place}</div>
                      <div className="text-sm text-sea-700/80">{r.note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="border-t border-sand-100 pt-3.5 text-sm leading-relaxed text-sea-700">
                {f.note}
              </p>
            </article>
          ))}
        </div>

        {/* Summary stats */}
        <SectionHeading
          id="math"
          title="What the flight pair gives you"
          sub="Compared with a Sunday return, the Monday flight adds an entire usable day: Thursday afternoon plus three complete sightseeing days."
        />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {summary.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sea-900/5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
                {s.label}
              </div>
              <div className="mt-1.5 font-display text-3xl font-bold text-sea-900">{s.value}</div>
              <div className="mt-1 text-sm text-sea-700/80">{s.detail}</div>
            </div>
          ))}
        </div>

        {/* Visual trip timeline */}
        <SectionHeading
          id="timeline"
          title="Visual trip timeline"
          sub="Green and aqua are realistic usable time in Iceland; navy is time in the air and Monday stays a pure travel morning."
        />
        <div className="mt-6">
          <IcelandCapacityTimeline days={capacityDays} />
        </div>

        {/* Route map */}
        <SectionHeading
          id="map"
          title="The week on the map"
          sub="One color per day on the real map — toggle days to see how the plan alternates a big drive with a light day, and never moves the hotel."
        />
        <div className="mt-6">
          <IcelandRoutes />
        </div>

        {/* Day by day */}
        <SectionHeading
          id="days"
          title="Day by day"
          sub="Each day gets its own flow strip — the same language as the trip timeline — plus its route map, hour-by-hour plan, and the family notes that make it work. The day-guide button on each card opens that day's full menu of stops, food, and photo spots — built to be used on the day itself. Friday and Saturday swap freely on weather."
        />
        <div className="mt-8 space-y-8">
          {days.map((d) => (
            <article
              key={d.id}
              id={d.id}
              className="scroll-mt-28 grid gap-4 sm:grid-cols-[64px,1fr]"
            >
              {/* Date disc */}
              <div className="hidden sm:block">
                <div className="sticky top-28 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-sea-800 text-sand-50 shadow-md">
                  <span className="text-lg font-bold leading-none">{d.weekday}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide opacity-80">
                    {d.date}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5">
                <div className="bg-gradient-to-b from-teal-50/70 to-transparent px-5 pb-4 pt-5 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-terracotta-600 sm:hidden">
                        {d.weekday} · {d.date}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-sea-900 sm:text-2xl">
                        {d.title}
                      </h3>
                      <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-sea-700/90">
                        {d.intro}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="rounded-full bg-sea-500/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sea-700">
                        {d.badge}
                      </span>
                      {guideSlug[d.id] && (
                        <Link
                          href={`/iceland/${guideSlug[d.id]}`}
                          className="rounded-full bg-terracotta-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-terracotta-500"
                        >
                          Open the day guide →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
                  {/* Per-day timeline strip */}
                  <IcelandDayFlow flow={d.flow} span={d.flowSpan} />

                  {/* Photos */}
                  <IcelandPhotoRow photos={d.photos} />

                  {/* Map + schedule */}
                  <div className={`grid gap-4 ${d.stops.length > 0 ? "lg:grid-cols-2" : ""}`}>
                    {d.stops.length > 0 && (
                      <div className="rounded-xl bg-sand-50/60 p-3.5 ring-1 ring-sea-900/5 lg:self-start">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
                            The route
                          </div>
                          {d.driveSummary && (
                            <div className="text-[11px] font-semibold text-sea-700/70">
                              🚗 {d.driveSummary}
                            </div>
                          )}
                        </div>
                        <div className="mt-2.5">
                          <IcelandDayMap
                            stops={d.stops}
                            color={dayColor[d.id] ?? "#1d4f5c"}
                            label={`Map of the ${d.weekday} route`}
                          />
                        </div>
                        {d.mapNote && (
                          <p className="mt-2.5 text-xs leading-relaxed text-sea-700/80">{d.mapNote}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
                        The plan
                      </div>
                      <ol className="mt-1 divide-y divide-sand-100">
                        {d.schedule.map((s) => (
                          <li key={s.time} className="grid gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[110px,1fr]">
                            <span className="text-sm font-bold text-sea-700">{s.time}</span>
                            <div>
                              <div className="text-sm font-semibold text-sea-900">{s.title}</div>
                              <div className="mt-0.5 text-sm leading-relaxed text-sea-700/85">
                                {s.detail}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Notes */}
                  {d.notes.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {d.notes.map((n) => (
                        <div
                          key={n.title}
                          className={`rounded-xl p-3.5 ring-1 ${noteTone[n.tone ?? "default"]}`}
                        >
                          <div className="text-sm font-bold text-sea-900">
                            {n.tone === "safety" ? "⚠️ " : ""}
                            {n.title}
                          </div>
                          <div className="mt-1 text-sm leading-relaxed text-sea-700/90">{n.detail}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Route logic + sources */}
        <SectionHeading
          id="logic"
          title="Route logic & official links"
          sub="The structure minimizes backtracking and keeps the most tiring day away from both flights. The links are the plan's primary sources — check them again the week of travel."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
            <h3 className="font-display text-lg font-semibold text-sea-900">Core driving flow</h3>
            <ol className="mt-4 space-y-3">
              {routeFlow.map((r, i) => (
                <li key={r.title} className="grid grid-cols-[38px,1fr,auto] items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sea-500/10 text-sm font-extrabold text-sea-700">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-sea-900">{r.title}</div>
                    <div className="text-xs text-sea-700/75">{r.detail}</div>
                  </div>
                  <span className="text-xs font-extrabold text-terracotta-600">{r.drive}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-sea-700/60">
              Drive times are approximate — wind, parking, and toddler stops all stretch them.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm ring-1 ring-amber-200/60">
            <h3 className="font-display text-lg font-semibold text-sea-900">
              Official resources baked into the plan
            </h3>
            <div className="mt-4 space-y-2.5">
              {sources.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-amber-200/70 transition hover:shadow-sm"
                >
                  <div className="text-sm font-semibold text-sea-900">{s.title} ↗</div>
                  <div className="text-xs text-sea-700/75">{s.detail}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Practical */}
        <SectionHeading
          id="practical"
          title="Practical notes for late August"
          sub="The handful of logistics that actually matter for this week with these kids. Everything else can be decided over breakfast."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {practicalNotes.map((n) => (
            <div key={n.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
                <span>{n.icon}</span> {n.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-sea-700">{n.detail}</p>
            </div>
          ))}
        </div>

        {/* Where to stay */}
        <SectionHeading
          id="stay"
          title="Where to stay: the hotel search guide"
          sub="One base for all four nights, so the neighborhood IS the decision. Aim for somewhere you can walk out of after dinner and be somewhere lovely in five minutes — these are the areas that deliver that, best first."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stayAreas.map((a, idx) => (
            <article
              key={a.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sea-900/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-sand-100">
                <SmartImage
                  src={a.image ?? ""}
                  alt={a.name}
                  fallbackLabel={a.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-sea-900/85 text-xs font-extrabold text-sand-50">
                  {idx + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
                  {a.tag}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-sea-900">
                  {a.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sea-700">{a.blurb}</p>
              </div>
            </article>
          ))}
          <div className="rounded-2xl bg-sand-50/60 p-3.5 ring-1 ring-sea-900/5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
              The areas on the map
            </div>
            <div className="mt-2.5">
              <IcelandDayMap
                stops={stayAreas.map((a) => ({ name: a.name, lat: a.lat, lng: a.lng, note: a.tag }))}
                color="#1d4f5c"
                label="Map of recommended Reykjavík neighborhoods"
                showLine={false}
                maxZoom={13}
              />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-sea-700/80">
              Numbers match the cards. Everything except Laugardalur keeps you in evening-stroll
              range of the center.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stayTips.map((t) => (
            <div key={t.title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-sea-900/5">
              <div className="flex items-center gap-2 text-sm font-bold text-sea-900">
                <span>{t.icon}</span> {t.title}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-sea-700">{t.detail}</p>
            </div>
          ))}
        </div>

        {/* Checklists */}
        <SectionHeading
          id="checklists"
          title="Book & pack around the plan"
          sub="The key reservations are the noon Blue Lagoon entry, the four-night Reykjavík base, and a correctly equipped rental car. Ticks save on this device."
        />
        <div className="mt-6">
          <IcelandChecklist groups={checklists} />
        </div>

        {/* Bottom line */}
        <div className="mt-16 rounded-2xl bg-sea-800 p-6 text-sand-50 shadow-md sm:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sand-100/80">
            Bottom line
          </div>
          <p className="mt-2 max-w-3xl leading-relaxed text-sand-50/95">{bottomLine}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sea-800 transition hover:bg-sand-50"
            >
              ← All trips
            </Link>
            <Link
              href="/map"
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-sand-50 ring-1 ring-white/25 transition hover:bg-white/20"
            >
              October route map
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
