import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Places from "@/components/Places";
import IcelandDayFlow from "@/components/IcelandDayFlow";
import IcelandDayMap from "@/components/IcelandDayMap";
import { days, dayRoutes } from "@/data/iceland";
import { dayGuides, getDayGuide } from "@/data/iceland-guides";

export function generateStaticParams() {
  return dayGuides.map((g) => ({ day: g.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }): Metadata {
  const guide = getDayGuide(params.day);
  if (!guide) return {};
  return {
    title: `${guide.weekday} ${guide.date} — ${guide.title} · Iceland family trip`,
    description: guide.intro,
  };
}

const dayColor: Record<string, string> = Object.fromEntries(
  dayRoutes.map((r) => [`day-${r.id}`, r.color])
);

const noteTone: Record<string, string> = {
  default: "bg-sand-50 ring-sea-900/10",
  safety: "bg-orange-50 ring-orange-200",
  family: "bg-teal-50 ring-teal-200",
  tip: "bg-amber-50 ring-amber-200",
};

export default function IcelandDayGuidePage({ params }: { params: { day: string } }) {
  const guide = getDayGuide(params.day);
  if (!guide) notFound();

  const day = days.find((d) => d.id === guide.dayId);
  const idx = dayGuides.findIndex((g) => g.slug === guide.slug);
  const prev = idx > 0 ? dayGuides[idx - 1] : null;
  const next = idx < dayGuides.length - 1 ? dayGuides[idx + 1] : null;

  return (
    <main className="pb-20">
      {/* Header */}
      <header className="border-b border-sand-200 bg-gradient-to-b from-teal-50/70 to-transparent">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
          <Link
            href={`/iceland#${guide.dayId}`}
            className="text-sm font-semibold text-terracotta-600 transition hover:text-terracotta-500"
          >
            ← Iceland family trip
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                {guide.weekday}, {guide.date} · day guide
              </div>
              <h1 className="mt-1.5 font-display text-3xl font-bold leading-tight text-sea-900 sm:text-4xl">
                {guide.title}
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-sea-700">
                {guide.intro}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-sea-500/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sea-700">
              {guide.badge}
            </span>
          </div>
        </div>
      </header>

      {/* Section index */}
      <div className="sticky top-[49px] z-30 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {guide.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-sea-700 transition hover:bg-sea-500/10"
            >
              {s.title}
            </a>
          ))}
          <a
            href="#notes"
            className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-sea-700 transition hover:bg-sea-500/10"
          >
            Good to know
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Day context: flow strip + route map from the main plan */}
        {day && (
          <section className="mt-6 grid gap-4 lg:grid-cols-[3fr,2fr]">
            <IcelandDayFlow flow={day.flow} span={day.flowSpan} />
            {day.stops.length > 0 && (
              <div className="rounded-xl bg-sand-50/60 p-3.5 ring-1 ring-sea-900/5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-terracotta-600">
                    Today&apos;s route
                  </div>
                  {day.driveSummary && (
                    <div className="text-[11px] font-semibold text-sea-700/70">🚗 {day.driveSummary}</div>
                  )}
                </div>
                <div className="mt-2.5">
                  <IcelandDayMap
                    stops={day.stops}
                    color={dayColor[day.id] ?? "#1d4f5c"}
                    label={`Map of the ${guide.weekday} route`}
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Guide sections */}
        {guide.sections.map((s) => (
          <section key={s.id}>
            <div id={s.id} className="scroll-mt-24 pt-12">
              <h2 className="font-display text-2xl font-semibold text-sea-900 sm:text-3xl">{s.title}</h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-sea-700/80 sm:text-[15px]">
                {s.sub}
              </p>
            </div>
            <div className="mt-5">
              <Places places={s.places} />
            </div>
          </section>
        ))}

        {/* Notes */}
        {guide.notes.length > 0 && (
          <section>
            <div id="notes" className="scroll-mt-24 pt-12">
              <h2 className="font-display text-2xl font-semibold text-sea-900 sm:text-3xl">Good to know</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {guide.notes.map((n) => (
                <div key={n.title} className={`rounded-xl p-4 ring-1 ${noteTone[n.tone ?? "default"]}`}>
                  <div className="text-sm font-bold text-sea-900">
                    {n.tone === "safety" ? "⚠️ " : ""}
                    {n.title}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-sea-700/90">{n.detail}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next day nav */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-sand-200 pt-6">
          {prev ? (
            <Link
              href={`/iceland/${prev.slug}`}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sea-700 ring-1 ring-sea-900/10 transition hover:bg-sand-50"
            >
              ← {prev.weekday}: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={`/iceland#${guide.dayId}`}
            className="rounded-full bg-sea-700 px-5 py-2.5 text-sm font-semibold text-sand-50 transition hover:bg-sea-800"
          >
            Full trip plan
          </Link>
          {next ? (
            <Link
              href={`/iceland/${next.slug}`}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sea-700 ring-1 ring-sea-900/10 transition hover:bg-sand-50"
            >
              {next.weekday}: {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
