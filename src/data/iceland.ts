// Content for the Iceland family trip page (/iceland). Unlike the October
// dashboard (a menu of options), this is a booked plan: SEA ⇄ KEF on Icelandair,
// Aug 26–31 2026, two adults + a 7-year-old + a 2-year-old, one Reykjavík base.
// All photos are self-hosted iceland-* files (scripts/fetch-photos.mjs --iceland).

export type SegmentKind = "flight" | "transfer" | "sightseeing" | "flexible" | "sleep";

/** One block of a day's vertical capacity meter (pct of the full day). */
export type DaySegment = {
  kind: SegmentKind;
  label: string;
  pct: number;
};

/** One block of a day's horizontal flow strip, with clock-time bounds. */
export type FlowSegment = {
  kind: SegmentKind;
  label: string;
  /** Compact label for the bar itself; `label` is always used in the legend. */
  short?: string;
  from: string;
  to: string;
  pct: number;
};

export type CapacityDay = {
  id: string; // anchors to the matching day card, e.g. "day-thu"
  date: string;
  status: string;
  segments: DaySegment[];
  verdict: string;
  detail: string;
};

export type FlightLeg = {
  number: string;
  label: string;
  heading: string;
  rows: { time: string; place: string; note: string }[];
  note: string;
};

export type SummaryStat = { label: string; value: string; detail: string };

export type MapStop = {
  name: string;
  lat: number;
  lng: number;
  note?: string; // popup detail, e.g. "Land 9:25 AM"
};

export type PlanDay = {
  id: string; // "day-wed" … also the section anchor
  weekday: string; // "Wed"
  date: string; // "Aug 26"
  title: string;
  badge: string;
  intro: string;
  flowSpan: string; // human label for the flow strip's clock range
  flow: FlowSegment[];
  photos: { file: string; caption: string }[];
  schedule: { time: string; title: string; detail: string }[];
  stops: MapStop[]; // real geography for the day's mini map ([] = no map)
  mapNote?: string;
  notes: { title: string; detail: string; tone?: "default" | "safety" | "family" | "tip" }[];
  driveSummary?: string;
};

export type DayRoute = {
  id: string;
  name: string;
  color: string;
  summary: string;
  stops: MapStop[];
};

export type RouteFlowStep = { title: string; detail: string; drive: string };
export type ChecklistGroup = { title: string; icon: string; items: string[] };
export type SourceLink = { title: string; detail: string; href: string };
export type PracticalNote = { title: string; icon: string; detail: string };

export type StayArea = {
  name: string;
  tag: string; // one-line verdict shown as the card's kicker
  blurb: string;
  image?: string;
  lat: number;
  lng: number;
};

const img = (file: string) => `/images/${file}.jpg`;

// ---------------------------------------------------------------------------
// Flights — booked pair the whole plan is built around
// ---------------------------------------------------------------------------
export const flights: FlightLeg[] = [
  {
    number: "FI 682",
    label: "Outbound · Wed, Aug 26",
    heading: "Seattle → Keflavík",
    rows: [
      {
        time: "7:00 PM",
        place: "SEA departure",
        note: "Overnight · Icelandair Boeing 737 MAX 8 · economy",
      },
      {
        time: "9:25 AM +1",
        place: "KEF arrival Thursday",
        note: "Flight time 7 hr 25 min · lands Thursday morning",
      },
    ],
    note: "The overnight timing is the whole strategy: kids sleep (some) on board, and Thursday starts in Iceland with the Blue Lagoon as the only fixed plan. Book the lagoon for about 12:00 PM — that leaves a real buffer for immigration, bags, car seats, and the short drive.",
  },
  {
    number: "FI 685",
    label: "Return · Mon, Aug 31",
    heading: "Keflavík → Seattle",
    rows: [
      {
        time: "10:40 AM",
        place: "KEF departure",
        note: "Target being inside the terminal around 7:30 AM",
      },
      {
        time: "11:45 AM",
        place: "SEA arrival",
        note: "Flight time 8 hr 5 min · same calendar day",
      },
    ],
    note: "Leave Reykjavík about 6:30 AM: drive, fuel stop, rental return, check-in, security, and the extra passport control for North America flights all fit without running. The Monday return is what buys the whole of Sunday.",
  },
];

// ---------------------------------------------------------------------------
// What the flight pair gives you — summary stats
// ---------------------------------------------------------------------------
export const summary: SummaryStat[] = [
  { label: "Iceland dates", value: "5", detail: "Thursday through Monday" },
  { label: "Hotel nights", value: "4", detail: "All based in Reykjavík" },
  { label: "Full days", value: "3", detail: "Friday, Saturday, Sunday" },
  { label: "Partial day", value: "1", detail: "Thursday arrival + lagoon" },
  { label: "Departure day", value: "0 usable", detail: "Monday is airport-only" },
];

// ---------------------------------------------------------------------------
// Visual trip timeline — day capacity by local calendar date
// ---------------------------------------------------------------------------
export const capacityDays: CapacityDay[] = [
  {
    id: "day-wed",
    date: "Wed, Aug 26",
    status: "Seattle travel",
    segments: [
      { kind: "flexible", label: "Home / prep", pct: 79 },
      { kind: "flight", label: "SEA departure 7:00 PM", pct: 21 },
    ],
    verdict: "No Iceland time.",
    detail: "Overnight flight.",
  },
  {
    id: "day-thu",
    date: "Thu, Aug 27",
    status: "Partial + lagoon",
    segments: [
      { kind: "flight", label: "In flight until 9:25 AM", pct: 39 },
      { kind: "transfer", label: "Airport + car", pct: 11 },
      { kind: "sightseeing", label: "Blue Lagoon", pct: 17 },
      { kind: "transfer", label: "To Reykjavík", pct: 8 },
      { kind: "flexible", label: "Dinner / walk", pct: 11 },
      { kind: "sleep", label: "Early night", pct: 14 },
    ],
    verdict: "≈ half a day.",
    detail: "Lagoon is the main event.",
  },
  {
    id: "day-fri",
    date: "Fri, Aug 28",
    status: "Full day 1",
    segments: [
      { kind: "sleep", label: "Sleep / breakfast", pct: 31 },
      { kind: "sightseeing", label: "Golden Circle", pct: 45 },
      { kind: "flexible", label: "Dinner", pct: 10 },
      { kind: "sleep", label: "Night", pct: 14 },
    ],
    verdict: "Full day.",
    detail: "Main classic route.",
  },
  {
    id: "day-sat",
    date: "Sat, Aug 29",
    status: "Full day 2",
    segments: [
      { kind: "sleep", label: "Sleep / breakfast", pct: 29 },
      { kind: "sightseeing", label: "South Coast", pct: 53 },
      { kind: "flexible", label: "Easy dinner", pct: 7 },
      { kind: "sleep", label: "Night", pct: 11 },
    ],
    verdict: "Longest day.",
    detail: "Waterfalls + Dyrhólaey.",
  },
  {
    id: "day-sun",
    date: "Sun, Aug 30",
    status: "Full day 3",
    segments: [
      { kind: "sleep", label: "Sleep / breakfast", pct: 31 },
      { kind: "sightseeing", label: "Perlan", pct: 22 },
      { kind: "flexible", label: "Nap / reset", pct: 15 },
      { kind: "sightseeing", label: "Harbour / pool", pct: 17 },
      { kind: "sleep", label: "Pack / sleep", pct: 15 },
    ],
    verdict: "Full day.",
    detail: "Light family finale.",
  },
  {
    id: "day-mon",
    date: "Mon, Aug 31",
    status: "Departure morning",
    segments: [
      { kind: "sleep", label: "Sleep", pct: 27 },
      { kind: "transfer", label: "6:30 AM drive + rental return", pct: 18 },
      { kind: "flight", label: "Airport + flight 10:40 AM", pct: 55 },
    ],
    verdict: "No sightseeing.",
    detail: "Airport-only morning.",
  },
];

export const capacityCallout = {
  title: "Trip reality: a comfortable Reykjavík-based sampler",
  detail:
    "Blue Lagoon + two nature days + one lighter family day, without changing hotels once.",
  score: "3.5 usable days",
};

// ---------------------------------------------------------------------------
// Day-by-day plan — the detailed cards
// ---------------------------------------------------------------------------
export const days: PlanDay[] = [
  {
    id: "day-wed",
    weekday: "Wed",
    date: "Aug 26",
    title: "Seattle departure",
    badge: "Overnight flight",
    intro:
      "A travel evening designed around getting the children settled after meal service — nothing on this day needs to be efficient except bedtime.",
    flowSpan: "Wednesday in Seattle · 8:00 AM → wheels-up 7:00 PM (PDT)",
    flow: [
      { kind: "flexible", label: "Home / final pack", from: "8:00", to: "3:30", pct: 47 },
      { kind: "transfer", label: "To SEA · bags · security · dinner", short: "To SEA · security", from: "3:30", to: "7:00", pct: 22 },
      { kind: "flight", label: "FI 682 departs — overnight", short: "FI 682 · overnight", from: "7:00", to: "12:00", pct: 31 },
    ],
    photos: [],
    schedule: [
      {
        time: "4:00–5:00 PM",
        title: "Arrive at SEA",
        detail:
          "Allow a family-sized buffer for bags, security, dinner, and toddler movement time before boarding.",
      },
      {
        time: "7:00 PM",
        title: "Depart on FI 682",
        detail:
          "Pajamas on before boarding and familiar sleep items in reach; shift everyone toward Iceland nighttime right after the first meal service.",
      },
    ],
    stops: [],
    notes: [
      {
        title: "Carry-on kit",
        detail: "Pajamas, a spare outfit per kid, snacks, kids' headphones, and any medication in the cabin bags — never checked.",
        tone: "family",
      },
      {
        title: "Protect Thursday",
        detail: "Book nothing for arrival day except the lagoon. If the flight goes badly, Thursday can shrink gracefully.",
        tone: "tip",
      },
    ],
  },
  {
    id: "day-thu",
    weekday: "Thu",
    date: "Aug 27",
    title: "Arrival + Blue Lagoon + Reykjavík",
    badge: "Partial day",
    intro:
      "The most efficient place for the Blue Lagoon is between KEF and the city, immediately after landing — no backtracking, and the warm water resets everyone after the overnight flight.",
    flowSpan: "Thursday in Iceland · lands 9:25 AM → kids down ~9:00 PM",
    flow: [
      { kind: "transfer", label: "Land · immigration · bags · car", short: "Land · bags", from: "9:25", to: "10:45", pct: 12 },
      { kind: "transfer", label: "Drive + buffer", short: "Drive", from: "10:45", to: "12:00", pct: 11 },
      { kind: "sightseeing", label: "Blue Lagoon", from: "12:00", to: "2:30", pct: 22 },
      { kind: "transfer", label: "To Reykjavík · check-in", short: "To Reykjavík", from: "2:30", to: "4:00", pct: 13 },
      { kind: "flexible", label: "Quiet time", from: "4:00", to: "5:30", pct: 13 },
      { kind: "flexible", label: "Early dinner · short stroll", short: "Dinner · stroll", from: "5:30", to: "7:30", pct: 17 },
      { kind: "sleep", label: "Early night", from: "7:30", to: "9:00", pct: 12 },
    ],
    photos: [
      { file: "iceland-blue-lagoon", caption: "The Blue Lagoon — milky-blue water against black lava, 20 minutes from the airport" },
      { file: "iceland-reykjavik", caption: "Reykjavík's colorful rooftops — home base for all four nights" },
      { file: "iceland-hallgrimskirkja", caption: "Hallgrímskirkja — an easy evening add-on only if everyone still has energy" },
    ],
    schedule: [
      {
        time: "9:25 AM",
        title: "Land at KEF",
        detail:
          "Allow 60–90 minutes for immigration, bags, restroom rounds, and rental-car pickup with two car seats to install.",
      },
      {
        time: "≈ 10:45 AM",
        title: "Leave the airport",
        detail: "The Blue Lagoon is roughly 20 minutes away — there's slack here for a snack stop.",
      },
      {
        time: "12:00–2:30 PM",
        title: "Blue Lagoon",
        detail:
          "Book noon admission. Allow generous changing time with two children and keep actual water time to 90–120 minutes.",
      },
      {
        time: "2:45–3:40 PM",
        title: "Drive to Reykjavík",
        detail: "About 50 minutes. Check in, unpack only what's needed tonight, and give everyone quiet time.",
      },
      {
        time: "5:30 PM",
        title: "Early dinner",
        detail: "Add Hallgrímskirkja and Rainbow Street after dinner only if the kids are genuinely still going.",
      },
    ],
    stops: [
      { name: "KEF — Keflavík Airport", lat: 63.985, lng: -22.605, note: "Land 9:25 AM · bags + rental car" },
      { name: "Blue Lagoon", lat: 63.88, lng: -22.449, note: "Noon entry · ~2.5 hours" },
      { name: "Reykjavík — hotel", lat: 64.146, lng: -21.94, note: "Check-in ~3:40 PM · dinner · early night" },
    ],
    mapNote: "Airport → lagoon → city, all in one forward direction.",
    driveSummary: "KEF → Blue Lagoon ~20 min · Blue Lagoon → Reykjavík ~50 min",
    notes: [
      {
        title: "Kids at the lagoon",
        detail:
          "Minimum age is 2, so both kids are in — the 2-year-old just makes the cutoff. Children under 8 must wear the provided floaties and stay within arm's reach the whole time.",
        tone: "family",
      },
      {
        title: "Pack a lagoon bag",
        detail:
          "Swimsuits, towels access, and a full dry change for both kids in one separate bag on top of the luggage — never dig through the car at the lagoon.",
        tone: "tip",
      },
      {
        title: "If the flight went badly",
        detail:
          "The lagoon can shrink to an hour or be skipped — go straight to the hotel and move nothing else, since nothing else is booked.",
      },
    ],
  },
  {
    id: "day-fri",
    weekday: "Fri",
    date: "Aug 28",
    title: "Golden Circle family day",
    badge: "Full day 1",
    intro:
      "The classic starter loop: three major stops, controlled pacing, and the return drive doubling as the toddler's nap. Big landscape payoff for very manageable driving.",
    flowSpan: "Friday · out 8:30 AM → home ~5:00 PM, kids down ~9:00 PM",
    flow: [
      { kind: "flexible", label: "Breakfast", from: "8:00", to: "8:30", pct: 4 },
      { kind: "transfer", label: "Drive", from: "8:30", to: "9:15", pct: 6 },
      { kind: "sightseeing", label: "Þingvellir", from: "9:15", to: "10:30", pct: 10 },
      { kind: "transfer", label: "Drive", from: "10:30", to: "11:30", pct: 8 },
      { kind: "sightseeing", label: "Geysir + lunch", from: "11:30", to: "1:30", pct: 15 },
      { kind: "transfer", label: "Drive", from: "1:30", to: "2:00", pct: 4 },
      { kind: "sightseeing", label: "Gullfoss", from: "2:00", to: "3:00", pct: 8 },
      { kind: "transfer", label: "Return — car nap", short: "Return · car nap", from: "3:00", to: "5:00", pct: 15 },
      { kind: "flexible", label: "Dinner + easy evening", short: "Dinner + evening", from: "5:00", to: "8:30", pct: 26 },
      { kind: "sleep", label: "Kids down", from: "8:30", to: "9:00", pct: 4 },
    ],
    photos: [
      { file: "iceland-thingvellir", caption: "Þingvellir — walk the rift between two tectonic plates" },
      { file: "iceland-geysir", caption: "Strokkur erupts every few minutes — the fastest kid payoff in Iceland" },
      { file: "iceland-gullfoss", caption: "Gullfoss — the two-step waterfall that ends the loop" },
    ],
    schedule: [
      {
        time: "8:30 AM",
        title: "Leave Reykjavík",
        detail: "Bring the carrier, compact stroller, waterproof layers, snacks, and dry clothes for everyone.",
      },
      {
        time: "9:15–10:30",
        title: "Þingvellir",
        detail: "Pick one short developed walk (Almannagjá gorge from the visitor center) instead of trying to cover the park.",
      },
      {
        time: "11:30–12:30",
        title: "Geysir",
        detail: "Strokkur erupts every 5–10 minutes — watch several from a safe upwind spot before lunch.",
      },
      {
        time: "12:30–1:30",
        title: "Lunch nearby",
        detail: "The Geysir center across the road is fast and predictable — speed beats destination dining today.",
      },
      {
        time: "2:00–3:00",
        title: "Gullfoss",
        detail: "Use the main viewing platforms; skip the lower spray-soaked path if it's wet or windy.",
      },
      {
        time: "3:00–5:00",
        title: "Return to Reykjavík",
        detail: "The 90-minute drive back is the built-in toddler nap. Keep dinner easy and close to the hotel.",
      },
    ],
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Leave 8:30 AM" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "9:15–10:30 · one short walk" },
      { name: "Geysir / Strokkur", lat: 64.311, lng: -20.302, note: "11:30–12:30 + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "2:00–3:00 · main overlooks" },
      { name: "Reykjavík (return)", lat: 64.146, lng: -21.94, note: "Back ~5:00 PM" },
    ],
    mapNote: "A clean loop — about 230 km / 3.5 hours of total driving.",
    driveSummary: "Reykjavík → Þingvellir ~45 min · → Geysir ~50 min · → Gullfoss ~10 min · → home ~1 hr 50",
    notes: [
      {
        title: "Do not add",
        detail: "Kerið crater, a second lagoon, or an evening tour. The day is calibrated; extras break the nap math.",
        tone: "tip",
      },
      {
        title: "Weather rule",
        detail: "Friday and Saturday are swappable — give the South Coast the better forecast, it needs it more.",
      },
    ],
  },
  {
    id: "day-sat",
    weekday: "Sat",
    date: "Aug 29",
    title: "Measured South Coast day",
    badge: "Full day 2 · longest",
    intro:
      "The longest outing of the trip, kept deliberately selective: two big waterfalls, a real sit-down lunch near Vík, and one elevated coastal viewpoint — then home.",
    flowSpan: "Saturday · out 8:00 AM → home ~6:00 PM, early night",
    flow: [
      { kind: "flexible", label: "Breakfast · load car", short: "Breakfast", from: "7:30", to: "8:00", pct: 4 },
      { kind: "transfer", label: "Drive out", from: "8:00", to: "9:45", pct: 13 },
      { kind: "sightseeing", label: "Seljalandsfoss", from: "9:45", to: "10:45", pct: 7 },
      { kind: "transfer", label: "Drive", from: "10:45", to: "11:15", pct: 4 },
      { kind: "sightseeing", label: "Skógafoss", from: "11:15", to: "12:15", pct: 7 },
      { kind: "transfer", label: "Drive to Vík", from: "12:15", to: "1:00", pct: 6 },
      { kind: "flexible", label: "Lunch in Vík", from: "1:00", to: "2:00", pct: 7 },
      { kind: "sightseeing", label: "Dyrhólaey", from: "2:20", to: "3:15", pct: 8 },
      { kind: "transfer", label: "Return — car nap", short: "Return · car nap", from: "3:15", to: "6:00", pct: 20 },
      { kind: "flexible", label: "Easy dinner", from: "6:00", to: "7:30", pct: 11 },
      { kind: "sleep", label: "Early night", from: "7:30", to: "9:00", pct: 13 },
    ],
    photos: [
      { file: "iceland-seljalandsfoss", caption: "Seljalandsfoss — the waterfall you can (optionally) walk behind" },
      { file: "iceland-skogafoss", caption: "Skógafoss — 60 m of thunder, best enjoyed from the base" },
      { file: "iceland-dyrholaey", caption: "Dyrhólaey — black-sand coast and sea arch from safely above" },
      { file: "iceland-reynisfjara", caption: "Reynisfjara's basalt columns — only in clearly safe conditions, well back from the water" },
    ],
    schedule: [
      {
        time: "8:00 AM",
        title: "Leave Reykjavík",
        detail: "Earlier start than Friday. Full snack kit, waterproofs, and spare clothes within reach.",
      },
      {
        time: "9:45–10:45",
        title: "Seljalandsfoss",
        detail:
          "See it from the front; the walk behind the falls is optional and often too wet and slippery with a toddler.",
      },
      {
        time: "11:15–12:15",
        title: "Skógafoss",
        detail:
          "The base viewpoint is the show. Skip the 500-step staircase unless one parent takes the 7-year-old separately.",
      },
      {
        time: "1:00–2:00 PM",
        title: "Lunch near Vík",
        detail: "A true seated reset, not a rushed refuel — this is what keeps the afternoon pleasant.",
      },
      {
        time: "2:20–3:15",
        title: "Dyrhólaey viewpoint",
        detail:
          "Elevated black-sand and sea-arch views without putting the children anywhere near the surf.",
      },
      {
        time: "3:15–6:00",
        title: "Return to Reykjavík",
        detail: "One restroom/snack stop max. Dinner casual and close to the hotel; everyone down early.",
      },
    ],
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Leave 8:00 AM" },
      { name: "Seljalandsfoss", lat: 63.616, lng: -19.989, note: "9:45–10:45 · spray + wet paths" },
      { name: "Skógafoss", lat: 63.532, lng: -19.511, note: "11:15–12:15 · base viewpoint" },
      { name: "Vík (lunch)", lat: 63.419, lng: -19.006, note: "1:00–2:00 PM · seated reset" },
      { name: "Dyrhólaey", lat: 63.402, lng: -19.126, note: "2:20–3:15 · viewpoint from above" },
      { name: "Reykjavík (return)", lat: 64.146, lng: -21.94, note: "Back ~6:00 PM" },
    ],
    mapNote: "About 380 km round trip — the trip's longest drive, paced around one proper lunch.",
    driveSummary: "Reykjavík → Seljalandsfoss ~1 hr 45 · → Skógafoss ~30 min · → Vík ~35 min · Dyrhólaey → home ~2 hr 40",
    notes: [
      {
        title: "Black-beach safety",
        detail:
          "Do not approach the waterline at Reynisfjara. Sneaker waves arrive without warning on calm days too — obey the warning-light system and any closures, and keep both kids far up the beach if you stop at all.",
        tone: "safety",
      },
      {
        title: "The family version",
        detail:
          "Dyrhólaey from above is the planned coastal stop; Reynisfjara itself is an optional extra only if conditions are clearly green.",
        tone: "family",
      },
      {
        title: "Optional cut",
        detail: "If the family is fading after lunch, drop the coastal stop entirely and head home — two waterfalls is already a great day.",
        tone: "tip",
      },
    ],
  },
  {
    id: "day-sun",
    weekday: "Sun",
    date: "Aug 30",
    title: "Perlan, harbour & pool — Reykjavík day",
    badge: "Full day 3 · local",
    intro:
      "The pressure-release day the Monday flight makes possible: an indoor museum morning, a real nap, one easy outing, and a calm pack-up — no long driving at all.",
    flowSpan: "Sunday · local all day, kids down by 8:00 PM",
    flow: [
      { kind: "flexible", label: "Slow breakfast", short: "Breakfast", from: "8:00", to: "9:30", pct: 12 },
      { kind: "sightseeing", label: "Perlan", from: "9:30", to: "12:00", pct: 19 },
      { kind: "flexible", label: "Lunch", from: "12:00", to: "1:30", pct: 12 },
      { kind: "sleep", label: "Nap + packing reset", short: "Nap + packing", from: "1:30", to: "3:30", pct: 15 },
      { kind: "sightseeing", label: "Harbour walk or pool", short: "Harbour / pool", from: "3:30", to: "5:30", pct: 15 },
      { kind: "flexible", label: "Early dinner", from: "5:30", to: "6:30", pct: 8 },
      { kind: "flexible", label: "Stage bags · fuel car", short: "Stage bags", from: "6:30", to: "8:00", pct: 12 },
      { kind: "sleep", label: "Everyone down early", short: "Down early", from: "8:00", to: "9:00", pct: 7 },
    ],
    photos: [
      { file: "iceland-perlan", caption: "The view from Perlan's observation deck — city, bay, and Esja" },
      { file: "iceland-harpa", caption: "Harpa's honeycomb glass — anchor of the Old Harbour walk" },
      { file: "iceland-sun-voyager", caption: "Sun Voyager on the waterfront — five minutes from Harpa" },
      { file: "iceland-laugardalslaug", caption: "Laugardalslaug — Reykjavík's big geothermal pool, the kids-favorite option" },
    ],
    schedule: [
      {
        time: "9:30 AM–12:00",
        title: "Perlan",
        detail:
          "Indoor ice cave, volcano and nature exhibits, the 360° observation deck, and a convenient café — the best weather-proof anchor in town.",
      },
      {
        time: "12:15 PM",
        title: "Lunch",
        detail: "Eat at Perlan or head downtown, depending entirely on toddler energy.",
      },
      {
        time: "1:30–3:30",
        title: "Nap + packing reset",
        detail: "Pack most bags, confirm the flight, and stage everything for Monday while the 2-year-old sleeps.",
      },
      {
        time: "3:30–5:30",
        title: "Choose one finale",
        detail:
          "Old Harbour + Harpa + Sun Voyager walk in good weather; Laugardalslaug's slides and warm pools if the kids need one last active outing; Whales of Iceland if it rains.",
      },
      {
        time: "5:30–6:30",
        title: "Early final dinner",
        detail: "Back to the hotel early — protect sleep before the 5:45 AM wake-up.",
      },
    ],
    stops: [
      { name: "Hotel (city center)", lat: 64.146, lng: -21.94, note: "Base for the day" },
      { name: "Perlan", lat: 64.129, lng: -21.919, note: "9:30–12:00 · ice cave + deck" },
      { name: "Old Harbour / Harpa", lat: 64.15, lng: -21.932, note: "Afternoon option 1" },
      { name: "Laugardalslaug", lat: 64.145, lng: -21.878, note: "Afternoon option 2 · pool" },
    ],
    mapNote: "Everything within a 10-minute drive of the hotel — zero highway time.",
    driveSummary: "Hotel → Perlan ~7 min · Perlan → harbour ~8 min · harbour → Laugardalslaug ~9 min",
    notes: [
      {
        title: "Why this day matters",
        detail: "It keeps the trip from being a chain of driving days — and it's the day the kids will actually remember fondly.",
        tone: "family",
      },
      {
        title: "Poor-weather version",
        detail: "Perlan expands to fill the morning and Whales of Iceland or the pool covers the afternoon — the day never depends on sky.",
      },
      {
        title: "Monday prep tonight",
        detail: "Fuel the car, stage all luggage by the door, pack a grab-bag breakfast, and lay out airport clothes for everyone.",
        tone: "tip",
      },
    ],
  },
  {
    id: "day-mon",
    weekday: "Mon",
    date: "Aug 31",
    title: "Airport morning",
    badge: "Departure only",
    intro:
      "Intentionally boring: hotel → KEF → flight. Every piece of complexity was removed on Sunday night, so the morning is just execution.",
    flowSpan: "Monday · wake 5:45 AM → land Seattle 11:45 AM local",
    flow: [
      { kind: "flexible", label: "Wake · dress · load", short: "Wake · load", from: "5:45", to: "6:30", pct: 6 },
      { kind: "transfer", label: "Drive + fuel + rental return", short: "Drive + rental", from: "6:30", to: "7:30", pct: 8 },
      { kind: "transfer", label: "Check-in · security · passport", short: "Check-in · security", from: "7:30", to: "10:40", pct: 24 },
      { kind: "flight", label: "FI 685 → SEA · lands 11:45 AM", short: "FI 685 → SEA", from: "10:40", to: "6:45", pct: 62 },
    ],
    photos: [
      { file: "iceland-old-harbour", caption: "Last look at Reykjavík — the city day belonged to Sunday, not this morning" },
      { file: "iceland-kef-airport", caption: "Keflavík from above — car back, bags dropped, three hours of buffer" },
    ],
    schedule: [
      {
        time: "5:45 AM",
        title: "Wake and load",
        detail: "Grab-bag breakfast in the car, not restaurant service. Bags were staged Sunday night.",
      },
      {
        time: "6:30 AM",
        title: "Leave Reykjavík",
        detail: "About 45–50 minutes to KEF, then the rental return shuttle-or-walk.",
      },
      {
        time: "≈ 7:30 AM",
        title: "Enter the terminal",
        detail:
          "Three hours covers bag drop, security, the extra North America passport control, and two kids' worth of friction.",
      },
      {
        time: "10:40 AM",
        title: "Depart on FI 685",
        detail: "Scheduled into Seattle at 11:45 AM the same morning — the whole afternoon to land softly at home.",
      },
    ],
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Leave 6:30 AM" },
      { name: "KEF — Keflavík Airport", lat: 63.985, lng: -22.605, note: "Terminal ~7:30 AM · FI 685 at 10:40" },
    ],
    mapNote: "One 50-minute drive — that's the whole day in Iceland.",
    driveSummary: "Reykjavík → KEF ~50 min + rental return",
    notes: [
      {
        title: "Don't move the lagoon here",
        detail: "A 10:40 AM flight is far too early for a pre-flight Blue Lagoon visit — it lives on Thursday for a reason.",
        tone: "tip",
      },
      {
        title: "Hidden time sinks",
        detail: "Rental-car return and the North America passport queue reliably eat more time than expected — the 7:30 AM terminal target absorbs both.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Map overlays — one colored route per day for the overview map
// ---------------------------------------------------------------------------
export const dayRoutes: DayRoute[] = [
  {
    id: "thu",
    name: "Thu · Arrival + Blue Lagoon",
    color: "#00897b",
    summary: "KEF → Blue Lagoon → Reykjavík",
    stops: [
      { name: "KEF", lat: 63.985, lng: -22.605, note: "Land 9:25 AM" },
      { name: "Blue Lagoon", lat: 63.88, lng: -22.449, note: "Noon entry" },
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Hotel + dinner" },
    ],
  },
  {
    id: "fri",
    name: "Fri · Golden Circle",
    color: "#f77f00",
    summary: "Þingvellir → Geysir → Gullfoss loop",
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Start / finish" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "Short walk" },
      { name: "Geysir", lat: 64.311, lng: -20.302, note: "Strokkur + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "Main overlook" },
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Return" },
    ],
  },
  {
    id: "sat",
    name: "Sat · South Coast",
    color: "#1e6fd9",
    summary: "Seljalandsfoss → Skógafoss → Vík → Dyrhólaey",
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Start / finish" },
      { name: "Seljalandsfoss", lat: 63.616, lng: -19.989, note: "Waterfall" },
      { name: "Skógafoss", lat: 63.532, lng: -19.511, note: "Waterfall" },
      { name: "Vík", lat: 63.419, lng: -19.006, note: "Lunch" },
      { name: "Dyrhólaey", lat: 63.402, lng: -19.126, note: "Coast viewpoint" },
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Return" },
    ],
  },
  {
    id: "sun",
    name: "Sun · Reykjavík local",
    color: "#9d4edd",
    summary: "Perlan → harbour → pool, all in town",
    stops: [
      { name: "Hotel", lat: 64.146, lng: -21.94, note: "Base" },
      { name: "Perlan", lat: 64.129, lng: -21.919, note: "Morning" },
      { name: "Old Harbour / Harpa", lat: 64.15, lng: -21.932, note: "Afternoon" },
      { name: "Laugardalslaug", lat: 64.145, lng: -21.878, note: "Pool option" },
    ],
  },
  {
    id: "mon",
    name: "Mon · Departure",
    color: "#e63946",
    summary: "Reykjavík → KEF, 6:30 AM",
    stops: [
      { name: "Reykjavík", lat: 64.146, lng: -21.94, note: "Leave 6:30 AM" },
      { name: "KEF", lat: 63.985, lng: -22.605, note: "FI 685 at 10:40 AM" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Route logic — the driving flow in one glance
// ---------------------------------------------------------------------------
export const routeFlow: RouteFlowStep[] = [
  {
    title: "Thursday: KEF → Blue Lagoon → Reykjavík",
    detail: "Use the lagoon's airport-side location — zero backtracking",
    drive: "20 + 50 min",
  },
  {
    title: "Friday: Golden Circle loop",
    detail: "Þingvellir → Geysir → Gullfoss",
    drive: "~3.5 hr total",
  },
  {
    title: "Saturday: South Coast",
    detail: "Seljalandsfoss → Skógafoss → Vík → Dyrhólaey",
    drive: "Longest day",
  },
  {
    title: "Sunday: Reykjavík only",
    detail: "Perlan, nap, harbour or pool",
    drive: "Minimal",
  },
  {
    title: "Monday: Reykjavík → KEF",
    detail: "Leave around 6:30 AM",
    drive: "~50 min",
  },
];

// ---------------------------------------------------------------------------
// Practical notes — late-August specifics for a family of four
// ---------------------------------------------------------------------------
export const practicalNotes: PracticalNote[] = [
  {
    title: "Late-August weather",
    icon: "🌦️",
    detail:
      "Highs around 12–14 °C, lows near 8 °C, and any day can serve sun, wind, and rain in one afternoon. Waterproof shells and warm layers for everyone — there is no bad-weather day in this plan, only bad clothing.",
  },
  {
    title: "Daylight",
    icon: "🌅",
    detail:
      "Sunrise ~6:10 AM, sunset ~8:45 PM by trip week — about 14.5 hours of usable light. Nothing in this itinerary races the sun, and blackout curtains matter more than headlamps.",
  },
  {
    title: "Car seats & the rental",
    icon: "🚗",
    detail:
      "Reserve a toddler seat and a booster with the car — confirm both in writing. A compact SUV swallows the stroller, and Iceland's rural speed cameras are unforgiving, so set the cruise control.",
  },
  {
    title: "Food with kids",
    icon: "🥪",
    detail:
      "Stock a grocery run on Thursday evening (Bónus or Krónan): breakfast things, road snacks, and toddler staples. Restaurant dinners stay easy — Icelandic hot dogs are a legitimate food group.",
  },
];

// ---------------------------------------------------------------------------
// Book & pack checklists
// ---------------------------------------------------------------------------
export const checklists: ChecklistGroup[] = [
  {
    title: "Book first",
    icon: "📌",
    items: [
      "Blue Lagoon · Thu Aug 27 around noon (children registered too)",
      "Four-night family room or one-bedroom suite in Reykjavík",
      "Rental car with toddler seat + booster confirmed in writing",
      "Perlan tickets for Sunday morning",
    ],
  },
  {
    title: "Blue Lagoon bag",
    icon: "🧜",
    items: [
      "Swimsuits accessible outside the main luggage",
      "Full dry change of clothes for both children",
      "Hair ties and leave-in conditioner (the silica is brutal on hair)",
      "Reusable water bottles",
    ],
  },
  {
    title: "Road-day kit",
    icon: "🎒",
    items: [
      "Waterproof shells and warm layers for all four",
      "Baby carrier plus the compact stroller",
      "Snack arsenal, water, and spare clothes in the car",
      "SafeTravel.is and road.is checks each morning",
    ],
  },
];

// ---------------------------------------------------------------------------
// Official planning links baked into the plan
// ---------------------------------------------------------------------------
export const sources: SourceLink[] = [
  {
    title: "Blue Lagoon opening hours",
    detail: "Open 8:00 AM–10:00 PM in late August",
    href: "https://www.bluelagoon.com/opening-hours",
  },
  {
    title: "Blue Lagoon with children",
    detail: "Minimum age 2 · mandatory floaties under 8",
    href: "https://support.bluelagoon.com/hc/en-us/articles/360005869277-Children-and-the-Blue-Lagoon",
  },
  {
    title: "Official Golden Circle guide",
    detail: "Þingvellir, Geysir, and Gullfoss",
    href: "https://www.visiticeland.com/article/the-golden-circle/",
  },
  {
    title: "Visit South Iceland",
    detail: "Waterfalls, Vík, and the coastal viewpoints",
    href: "https://www.south.is/en/destinations/travel-routes/the-south-coast",
  },
  {
    title: "Black-beach safety (SafeTravel)",
    detail: "Live warning lights, closures, and sneaker-wave rules",
    href: "https://safetravel.is/travel-conditions/blackbeach-safety/",
  },
  {
    title: "Icelandair · Keflavík airport guide",
    detail: "Timing and passport-control notes for KEF",
    href: "https://www.icelandair.com/support/airports/keflavik-kef/",
  },
];

// ---------------------------------------------------------------------------
// Where to stay — Reykjavík hotel-search guide
// ---------------------------------------------------------------------------
export const stayAreas: StayArea[] = [
  {
    name: "Miðborg core — Skólavörðustígur & the Þingholt side streets",
    tag: "The pick · walk out to everything",
    blurb:
      "The blocks between Rainbow Street, Hallgrímskirkja, and Tjörnin put every evening stroll on your doorstep: bakeries at breakfast, the church tower after dinner, duck-feeding at the pond. Book on a side street (Óðinsgata, Njarðargata, Bergstaðastræti…) rather than on Laugavegur itself and weekend bar noise disappears.",
    image: img("iceland-rainbow-street"),
    lat: 64.1424,
    lng: -21.9268,
  },
  {
    name: "Old Harbour & Grandi",
    tag: "Flat, quiet & stroller-friendly",
    blurb:
      "Waterfront walking with zero hills: Harpa, the Sun Voyager, food halls, Valdís ice cream, and the whale museum all within ten flat minutes. Evenings are calmer than downtown, and you're closest to Sunday's harbour finale. Slightly fewer grocery options — check the map for a Krambúð.",
    image: img("iceland-old-harbour"),
    lat: 64.1522,
    lng: -21.9466,
  },
  {
    name: "East Laugavegur & Hlemmur",
    tag: "Value · still very walkable",
    blurb:
      "The quieter end of the main street, anchored by the Hlemmur food hall: apartments here run cheaper and bigger — great for a family needing two rooms — and the city core is still a 10–12 minute stroller push. The trade-off is a busier road outside and a little less charm.",
    image: img("iceland-laugavegur"),
    lat: 64.1432,
    lng: -21.9153,
  },
  {
    name: "Vesturbær",
    tag: "Local-neighborhood Reykjavík",
    blurb:
      "Where Reykjavík families actually live: corner bakeries, the beloved Vesturbæjarlaug pool, and seafront paths out toward Grótta lighthouse. It's a 15-minute walk into the center — fine with the stroller, quiet at night, and the most 'live like a local' option of the bunch.",
    image: img("iceland-grotta"),
    lat: 64.1445,
    lng: -21.9584,
  },
  {
    name: "Laugardalur",
    tag: "Space & value · needs the car or bus",
    blurb:
      "Next to the city's biggest pool, the family park & zoo, and the botanical garden — a kid paradise with larger, cheaper rooms. But it's a drive or bus into the center, so evening strolls happen in the park rather than downtown. Works because you have the rental anyway; pick it only if space wins over walkability.",
    image: img("iceland-laugardalslaug"),
    lat: 64.1414,
    lng: -21.8801,
  },
];

export const stayTips: PracticalNote[] = [
  {
    title: "Book for four, explicitly",
    icon: "🛏️",
    detail:
      "Standard Icelandic hotel rooms genuinely fit 2 adults + 1 child; a family of four usually needs a family room, connecting rooms, or an apartment. Aparthotels (Room With A View, Reykjavík Residence–style) add a kitchen for toddler breakfasts and a washer for lagoon-day laundry.",
  },
  {
    title: "The walk-out test",
    icon: "🚶",
    detail:
      "Aim for: a bakery within 5 minutes, a playground within 10 (Hljómskálagarður by Tjörnin and Klambratún are the good ones), and Laugavegur or the harbour within 10–12. That's what turns evenings and the free Sunday into effortless family time.",
  },
  {
    title: "Parking reality",
    icon: "🅿️",
    detail:
      "Downtown streets are paid zones (P1–P4, ~9:00–18:00 or later); free hotel parking is rare in 101. Confirm parking when booking or budget for the Traðarkot/Kolaport garages. The car mostly sits parked except on the two road-trip days, so a garage two blocks away is fine.",
  },
  {
    title: "Noise & light at night",
    icon: "🌙",
    detail:
      "Laugavegur, Austurstræti, and Bankastræti are loud until 3–4 AM on Friday and Saturday — your Thursday and Saturday nights. One block off the strip is genuinely quiet. Also check reviews for blackout curtains: late-August sunset is ~8:45 PM and the 2-year-old will notice.",
  },
  {
    title: "Stroller & stairs",
    icon: "🛗",
    detail:
      "A lot of charming 101 guesthouses are third-floor walk-ups in old timber houses. With a toddler, luggage, and a stroller, filter for an elevator or ground-floor unit — future-you at 6:00 AM on departure day will be grateful.",
  },
  {
    title: "Breakfast strategy",
    icon: "🥐",
    detail:
      "Skip paying four hotel breakfasts: grab skyr, fruit, and bread in a Bónus/Krónan run on arrival day, then let one morning be a bakery treat (Brauð & Co or Sandholt). Faster with kids, cheaper, and better.",
  },
];

export const bottomLine =
  "The Monday return is what makes this itinerary work: Blue Lagoon Thursday, Golden Circle Friday, South Coast Saturday, and a real Reykjavík family day Sunday — one hotel, no rushed mornings, and both kids get a trip paced for them.";
