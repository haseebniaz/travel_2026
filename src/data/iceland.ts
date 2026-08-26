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
  route: string; // "SEA – KEF"
  date: string; // full booked date as it reads on the ticket
  fare: string; // fare family, e.g. "Economy Light"
  conditions: string; // e.g. "Non-refundable"
  duration: string;
  stops: string;
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

export type Hotel = {
  name: string;
  address: string;
  area: string;
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  nights: number;
  rating: string;
  locationScore: string;
  amenities: string[];
  lat: number;
  lng: number;
  image: string;
  why: string;
};

/** A walkable spot near the hotel, with door-to-door walking minutes. */
export type HoodSpot = {
  name: string;
  category: "Coffee & bakery" | "Eat" | "See & do" | "Kids" | "Shops";
  walk: string;
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
    route: "SEA – KEF",
    date: "Wednesday, August 26, 2026",
    fare: "Economy Light",
    conditions: "Non-refundable",
    duration: "7h 25m",
    stops: "Non-stop",
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
    note: "The overnight timing is the whole strategy: kids sleep (some) on board, and Thursday starts in Iceland with the Blue Lagoon as the only fixed plan. The lagoon is booked for 12:00 — a real buffer after immigration, bags, car seats, and the short drive.",
  },
  {
    number: "FI 685",
    label: "Return · Mon, Aug 31",
    heading: "Keflavík → Seattle",
    route: "KEF – SEA",
    date: "Monday, August 31, 2026",
    fare: "Economy Light",
    conditions: "Non-refundable",
    duration: "8h 05m",
    stops: "Non-stop",
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

// Booked on an Economy Light fare — the cheapest Icelandair bundle, which is
// where the family-of-four gotchas live (bags and seating are extras). These
// are the follow-ups to settle now rather than at the airport; confirm each
// against the actual booking, since fare rules change.
export const fareActions: PracticalNote[] = [
  {
    title: "Checked bags are not included",
    icon: "🧳",
    detail:
      "Economy Light is a cabin-baggage fare: a personal item plus a carry-on. For four people and five days — with swimsuits, waterproofs and toddler kit — add checked bags in Manage Booking. Buying them online ahead of time is materially cheaper than at the airport counter.",
  },
  {
    title: "Seats are assigned unless you buy them",
    icon: "💺",
    detail:
      "On the Light fare seats are allocated at check-in, and a family of four can be split across the cabin. Pay to pre-select four seats together — with a 2-year-old this is the single most valuable add-on on the whole booking. Failing that, check in the moment the window opens (24h before).",
  },
  {
    title: "Non-refundable, and changes cost",
    icon: "🔒",
    detail:
      "Both legs are non-refundable and Light fares are the most restrictive to change. Treat the dates as fixed, and make sure any travel insurance or credit-card trip protection is in place now rather than later.",
  },
  {
    title: "Cabin-bag reality with two kids",
    icon: "🎒",
    detail:
      "Check the exact carry-on size and weight allowance on the booking before packing. Strollers and car seats are normally carried free on top of the baggage allowance — gate-check the stroller at the door and collect it on the jet bridge at KEF.",
  },
];

// ---------------------------------------------------------------------------
// Blue Lagoon — booked, Thursday's one fixed appointment
// ---------------------------------------------------------------------------
export const blueLagoon = {
  status: "Booked",
  package: "Blue Lagoon Premium",
  date: "Thu, 27 Aug 2026",
  time: "12:00",
  guests: "2 adults, 2 children",
  includes: [
    "Three face masks from the in-water mask bar",
    "One complimentary drink",
    "Bathrobe and towel to use during the visit",
    "A skincare gift to take home",
  ],
  note: "The only appointment on arrival day, and the whole reason the day is shaped the way it is: land 9:25, car at 10:30, lagoon at noon, Reykjavík by mid-afternoon.",
};

/** How the 12:00 slot lines up with the flight and the car. */
export const lagoonFit: { label: string; detail: string; ok: boolean }[] = [
  {
    label: "12:00 entry vs. a 9:25 AM landing",
    detail:
      "Two and a half hours to clear immigration, collect bags, pick the car up at 10:30 and drive the 20 minutes over — comfortable even if the flight is late.",
    ok: true,
  },
  {
    label: "Both children are on the booking",
    detail:
      "Two adults and two children are ticketed. The 2-year-old just makes the minimum age of 2; under-8s wear the provided floaties and stay within arm's reach.",
    ok: true,
  },
  {
    label: "Out by ~2:30 PM for the hotel",
    detail:
      "A 90–120 minute soak plus generous changing time still lands you at Þórsgata around 3:40 PM, right after the 3:00 PM check-in opens.",
    ok: true,
  },
];

/** Premium-specific things worth knowing before Thursday. */
export const lagoonNotes: PracticalNote[] = [
  {
    title: "Premium means fewer things to pack",
    icon: "🧖",
    detail:
      "Bathrobe and towel come with the admission, so the lagoon bag is really just swimsuits, dry clothes for the kids, and hair ties. Worth confirming what the two children's tickets include, since robes are usually an adult perk.",
  },
  {
    title: "Use all three masks and the drink",
    icon: "🍹",
    detail:
      "Premium includes three masks at the in-water bar and one drink each — the silica mask first, then the others while you soak. The wristband charges anything extra to the room, so one parent's band can cover everyone.",
  },
  {
    title: "Save the voucher offline",
    icon: "📩",
    detail:
      "Download the voucher and screenshot it before you fly — the booking number lives in your confirmation email, deliberately not on this page. Airport WiFi and a jet-lagged phone are not where you want to be hunting through email.",
  },
  {
    title: "If the flight is badly delayed",
    icon: "⏱️",
    detail:
      "The booking can be edited from the confirmation page. Check volcanic activity on safetravel.is before driving — Reykjanes eruptions have closed the lagoon at short notice, and Sky Lagoon near Reykjavík is the fallback.",
  },
];

// ---------------------------------------------------------------------------
// The rental car — booked at KEF, both ends
// ---------------------------------------------------------------------------
export const carRental = {
  status: "Booked",
  pickUpDate: "Thu, Aug 27, 2026",
  pickUpTime: "10:30 AM",
  pickUpPlace: "Keflavík Airport (KEF)",
  dropOffDate: "Mon, Aug 31, 2026",
  dropOffTime: "9:30 AM",
  dropOffPlace: "Keflavík Airport (KEF)",
  duration: "4 days",
  childSeats: "1 child seat included",
  note: "Collected straight off the flight and returned on the way home, so the car covers exactly the days that need it — the two road-trip days plus the short local hops. It sits parked in Reykjavík on Sunday.",
};

/** How the rental window lines up with the flights and the plan. */
export const carFit: { label: string; detail: string; ok: boolean }[] = [
  {
    label: "10:30 AM pick-up vs. a 9:25 AM landing",
    detail:
      "About 65 minutes for immigration, bags and the desk — matching the plan's ≈10:45 AM departure from KEF, and leaving the noon Blue Lagoon slot intact.",
    ok: true,
  },
  {
    label: "Return window ends 9:30 AM Monday",
    detail:
      "The plan hands the car back around 7:15 AM, comfortably inside the booked window — returning early is fine, and it protects the 7:30 AM terminal target.",
    ok: true,
  },
  {
    label: "4 days covers both road days",
    detail: "Golden Circle Friday and the South Coast Saturday both fall inside the rental period, with Sunday's local hops on top.",
    ok: true,
  },
];

/** Open items on the car — the seat count is the one that actually matters. */
export const carActions: PracticalNote[] = [
  {
    title: "You have two kids and one seat",
    icon: "🚨",
    detail:
      "The booking includes a single child seat, but both children need a restraint: a forward-facing seat for the 2-year-old and a booster for the 7-year-old. Iceland requires children under 135 cm to use a restraint suited to their size. Add a second seat to the booking now, or plan to bring your own booster — they're light, and airlines carry them free alongside a stroller.",
  },
  {
    title: "Say which seat the included one is",
    icon: "💺",
    detail:
      "Confirm in writing whether the included seat is the toddler seat or the booster, so the one you add is the other. Ask them to have both fitted or ready at the desk — installing seats in the KEF car park with two tired kids is the worst possible time to discover a missing part.",
  },
  {
    title: "Read the drop-off instructions",
    icon: "🕖",
    detail:
      "You'll return the car around 7:15 AM, earlier than most desks expect. Check the return location (on-airport vs. a shuttle lot) and the early-morning key-drop procedure before Monday — this is the single tightest link in the departure chain.",
  },
  {
    title: "Insurance, fuel and the wind",
    icon: "📋",
    detail:
      "Check what the rate includes: gravel and sand-and-ash damage are the classic Icelandic exclusions, and wind-caught doors are the classic claim. Photograph the car from all sides at pick-up, and note the fuel policy so Sunday's top-up matches it.",
  },
];

// ---------------------------------------------------------------------------
// The base — booked hotel, and the neighbourhood you can walk out into
// ---------------------------------------------------------------------------
export const hotel: Hotel = {
  name: "Hotel Óðinsvé",
  address: "Þórsgata 1, 101 Reykjavík",
  area: "Þingholt · on Óðinstorg square, a block above Skólavörðustígur",
  checkIn: "Thu, Aug 27, 2026",
  checkInTime: "from 3:00 PM",
  checkOut: "Mon, Aug 31, 2026",
  checkOutTime: "until 11:00 AM",
  nights: 4,
  rating: "8.4 Very Good · 1,320 reviews",
  locationScore: "Location 9.5 — Excellent",
  amenities: ["Free WiFi", "Restaurant on site", "Airport shuttle"],
  lat: 64.1437,
  lng: -21.933,
  image: img("iceland-guide-thingholt"),
  why: "One base for all four nights, on a quiet square one block uphill from the Laugavegur noise. Everything in Thursday's arrival walk starts at the front door, Sunday's harbour finale is walkable rather than a drive, and the 3:00 PM check-in lands just as you arrive from the Blue Lagoon.",
};

/** Timing checks against the plan — all confirmed to fit. */
export const hotelFit: { label: string; detail: string; ok: boolean }[] = [
  {
    label: "Dates match the flights",
    detail: "Thu 27 → Mon 31 is exactly the 4 nights between landing and the Monday flight home.",
    ok: true,
  },
  {
    label: "3:00 PM check-in vs. your arrival",
    detail: "The plan reaches Reykjavík ≈3:40 PM after the lagoon — the room is ready when you get there.",
    ok: true,
  },
  {
    label: "11:00 AM check-out vs. departure",
    detail: "You leave at 6:30 AM Monday, four and a half hours inside the deadline. Arrange the early key drop the night before.",
    ok: true,
  },
  {
    label: "One base, no moves",
    detail: "Bags stay put all four nights, exactly as the itinerary assumes.",
    ok: true,
  },
];

/** Still open with the hotel — worth an email before travel. */
export const hotelConfirm: PracticalNote[] = [
  {
    title: "Room sleeps four + a cot",
    icon: "🛏️",
    detail:
      "The one that can bite: plenty of Reykjavík boutique rooms are sized for 2 adults + 1 child. Get it in writing that the booking covers 2 adults, a 7-year-old and a 2-year-old, and request a travel cot for the toddler.",
  },
  {
    title: "Parking for the rental",
    icon: "🅿️",
    detail:
      "Þórsgata sits in a paid downtown zone and the car mostly sits still for four days. Ask what the hotel offers and what it costs, or which nearby garage they recommend.",
  },
  {
    title: "Breakfast — included or not?",
    icon: "🥐",
    detail:
      "There's a restaurant on site. If breakfast for four isn't included, the grocery-run plan stands and one morning goes to a bakery instead.",
  },
  {
    title: "Elevator, and early check-in",
    icon: "🛗",
    detail:
      "Older building: confirm there's an elevator for the stroller and luggage. Also ask about early check-in — if the overnight flight goes badly and you skip the lagoon, you'd otherwise be waiting until 3:00 PM (they will store bags regardless).",
  },
];

// The 101 doorstep — everything here is a walk, no car, no bus. Walking times
// are door-to-door estimates from Þórsgata 1; hours change seasonally, so check
// before making a special trip.
export const hoodSpots: HoodSpot[] = [
  {
    name: "Óðinstorg",
    category: "See & do",
    walk: "0 min",
    blurb:
      "The little square the hotel sits on — benches, a fountain, and the neighbourhood's calm centre of gravity. This is the 'we made it' first photo.",
    image: img("iceland-guide-thingholt"),
    lat: 64.1437,
    lng: -21.9332,
  },
  {
    name: "Skólavörðustígur (Rainbow Street)",
    category: "See & do",
    walk: "4 min",
    blurb:
      "The painted rainbow climbing to Hallgrímskirkja, lined with design shops, wool, and ice cream. Your default stroll in any spare half hour.",
    image: img("iceland-rainbow-street"),
    lat: 64.1424,
    lng: -21.9268,
  },
  {
    name: "Hallgrímskirkja + tower",
    category: "See & do",
    walk: "5 min",
    blurb:
      "The rocket church at the top of the hill. The elevator up the tower is the best 20-minute view in the city and works even in bad weather.",
    image: img("iceland-hallgrimskirkja"),
    lat: 64.1417,
    lng: -21.9266,
  },
  {
    name: "Einar Jónsson sculpture garden",
    category: "See & do",
    walk: "6 min",
    blurb:
      "A free, walled garden of dreamlike bronzes behind the church — quiet, uncrowded, and small enough that kids can roam without anyone losing anyone.",
    image: img("iceland-guide-einar-jonsson"),
    lat: 64.1412,
    lng: -21.9256,
  },
  {
    name: "Mokka Kaffi",
    category: "Coffee & bakery",
    walk: "4 min",
    blurb:
      "Reykjavík's oldest café, unchanged since 1958 — waffles with jam and cream, and the kind of room that makes a rainy hour pleasant.",
    image: img("iceland-guide-cafe"),
    lat: 64.1437,
    lng: -21.9283,
  },
  {
    name: "Reykjavík Roasters",
    category: "Coffee & bakery",
    walk: "5 min",
    blurb:
      "The city's serious coffee, in a tiny corner house by the church. Grab it and drink it on the church steps if the queue is deep.",
    image: img("iceland-guide-coffee"),
    lat: 64.1425,
    lng: -21.9284,
  },
  {
    name: "Brauð & Co",
    category: "Coffee & bakery",
    walk: "7 min",
    blurb:
      "The graffiti-wrapped bakery behind Hallgrímskirkja — cinnamon buns worth setting an alarm for. Sells out; go early.",
    image: img("iceland-guide-cinnamon-bun"),
    lat: 64.1443,
    lng: -21.9245,
  },
  {
    name: "Sandholt Bakery",
    category: "Coffee & bakery",
    walk: "6 min",
    blurb:
      "A proper sit-down bakery on Laugavegur: pastries, sourdough, and a full breakfast if the hotel's isn't included.",
    image: img("iceland-guide-bakery"),
    lat: 64.1436,
    lng: -21.9235,
  },
  {
    name: "Snaps Bistro",
    category: "Eat",
    walk: "0 min",
    blurb:
      "The bistro on the hotel's own square — French-Icelandic, busy with locals, and the zero-effort answer on the jet-lagged first night. Book ahead for dinner.",
    image: img("iceland-guide-bistro"),
    lat: 64.1437,
    lng: -21.9331,
  },
  {
    name: "Noodle Station",
    category: "Eat",
    walk: "4 min",
    blurb:
      "One thing done well: a big bowl of beef noodle soup for pocket change. Fast, warm, and a reliable win with kids.",
    image: img("iceland-guide-noodles"),
    lat: 64.1428,
    lng: -21.9273,
  },
  {
    name: "Svarta Kaffið",
    category: "Eat",
    walk: "7 min",
    blurb:
      "Soup served inside a hollowed-out bread loaf — two choices daily, nothing else. The most Icelandic cheap lunch in the centre.",
    image: img("iceland-guide-lamb-soup"),
    lat: 64.1441,
    lng: -21.9216,
  },
  {
    name: "Eldur & Ís",
    category: "Kids",
    walk: "5 min",
    blurb:
      "Crêpes and ice cream at the bottom of Rainbow Street — the bribe that gets everyone up the hill in the first place.",
    image: img("iceland-guide-ice-cream"),
    lat: 64.1445,
    lng: -21.9295,
  },
  {
    name: "Sundhöllin",
    category: "Kids",
    walk: "8 min",
    blurb:
      "The city's oldest pool, and the best-kept family secret downtown: indoor lanes, a shallow kids' pool, and outdoor hot pots on the roof terrace. Walkable in a swimsuit under your clothes.",
    image: img("iceland-guide-sundhollin"),
    lat: 64.1435,
    lng: -21.921,
  },
  {
    name: "Tjörnin + Hljómskálagarður",
    category: "Kids",
    walk: "5 min",
    blurb:
      "The duck pond, then the park along its south side with the neighbourhood's best playground. Bring bread ends from the grocery run.",
    image: img("iceland-tjornin"),
    lat: 64.1445,
    lng: -21.94,
  },
  {
    name: "Reykjavík City Hall",
    category: "Kids",
    walk: "7 min",
    blurb:
      "Free, warm, and quietly brilliant: a room-sized 3D relief map of Iceland where the 7-year-old can find every place you're driving to. The rainy-afternoon ace.",
    image: img("iceland-guide-city-hall"),
    lat: 64.1466,
    lng: -21.9421,
  },
  {
    name: "Handknitting Association of Iceland",
    category: "Shops",
    walk: "4 min",
    blurb:
      "The lopapeysa shop locals point you to — real hand-knitted sweaters at fair prices, plus kid sizes that survive being outgrown.",
    image: img("iceland-guide-lopapeysa"),
    lat: 64.143,
    lng: -21.9276,
  },
  {
    name: "Mál og Menning bookstore",
    category: "Shops",
    walk: "6 min",
    blurb:
      "Open late, with a café upstairs and a big children's section — the classic Reykjavík rainy-evening move.",
    image: img("iceland-guide-bookstore"),
    lat: 64.1434,
    lng: -21.925,
  },
  {
    name: "Kolaportið flea market",
    category: "Shops",
    walk: "11 min",
    blurb:
      "Weekends only, down by the harbour: woollens, old records, Icelandic sweets, and the fermented-shark dare counter. A perfect Sunday-morning add-on.",
    image: img("iceland-guide-kolaportid"),
    lat: 64.1487,
    lng: -21.9385,
  },
  {
    name: "Klambratún park",
    category: "Kids",
    walk: "12 min",
    blurb:
      "A big open park with a proper playground and the Kjarvalsstaðir art museum on its edge — worth it if you need the kids to run somewhere green.",
    image: img("iceland-guide-klambratun"),
    lat: 64.1409,
    lng: -21.9145,
  },
  {
    name: "Old Harbour, Harpa & Sun Voyager",
    category: "See & do",
    walk: "9 min",
    blurb:
      "Downhill to the water: the honeycomb glass of Harpa, the steel ship sculpture, and the harbour boats — Sunday's finale, on foot from the door.",
    image: img("iceland-sun-voyager"),
    lat: 64.15,
    lng: -21.932,
  },
];

/** A ready-made evening loop from the hotel door — roughly an hour with kids. */
export const doorstepLoop: { step: string; detail: string }[] = [
  { step: "Óðinstorg", detail: "Out the door onto the square — 0 min" },
  { step: "Up Skólavörðustígur", detail: "The rainbow, shop windows, ice cream if needed — 4 min" },
  { step: "Hallgrímskirkja", detail: "Church steps, tower if it's open — 5 min" },
  { step: "Einar Jónsson garden", detail: "Free sculpture garden behind the church — 6 min" },
  { step: "Down to Tjörnin", detail: "Ducks, then the playground in Hljómskálagarður — 10 min" },
  { step: "Back up to the hotel", detail: "Via Þingholt's quiet lanes — 8 min" },
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
          "Allow 60–90 minutes for immigration, bags, restroom rounds, and the 10:30 AM rental pick-up — including fitting the child seats before you drive off.",
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
          "Booked: 12:00 entry on the Premium package (robes and towels included). Allow generous changing time with two children and keep actual water time to 90–120 minutes.",
      },
      {
        time: "2:45–3:40 PM",
        title: "Drive to Reykjavík",
        detail: "About 50 minutes to Þórsgata 1. Rooms are ready from 3:00 PM, so check in, unpack only what's needed tonight, and give everyone quiet time.",
      },
      {
        time: "5:30 PM",
        title: "Early dinner",
        detail: "Rainbow Street and Hallgrímskirkja are 4–5 min from the hotel door — add them after dinner only if the kids are genuinely still going.",
      },
    ],
    stops: [
      { name: "KEF — Keflavík Airport", lat: 63.985, lng: -22.605, note: "Land 9:25 AM · bags + rental car" },
      { name: "Blue Lagoon", lat: 63.88, lng: -22.449, note: "Noon entry · ~2.5 hours" },
      { name: "Hotel Óðinsvé, Þórsgata 1", lat: 64.1437, lng: -21.933, note: "Check-in from 3:00 PM · dinner · early night" },
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
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 8:30 AM" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "9:15–10:30 · one short walk" },
      { name: "Geysir / Strokkur", lat: 64.311, lng: -20.302, note: "11:30–12:30 + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "2:00–3:00 · main overlooks" },
      { name: "Reykjavík (return)", lat: 64.1437, lng: -21.933, note: "Back ~5:00 PM" },
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
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 8:00 AM" },
      { name: "Seljalandsfoss", lat: 63.616, lng: -19.989, note: "9:45–10:45 · spray + wet paths" },
      { name: "Skógafoss", lat: 63.532, lng: -19.511, note: "11:15–12:15 · base viewpoint" },
      { name: "Vík (lunch)", lat: 63.419, lng: -19.006, note: "1:00–2:00 PM · seated reset" },
      { name: "Dyrhólaey", lat: 63.402, lng: -19.126, note: "2:20–3:15 · viewpoint from above" },
      { name: "Reykjavík (return)", lat: 64.1437, lng: -21.933, note: "Back ~6:00 PM" },
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
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Base for the day" },
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
        detail: "About 45–50 minutes to KEF, then the rental return (booked window runs to 9:30 AM, so ~7:15 AM is early — check the key-drop procedure).",
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
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 6:30 AM" },
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
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Hotel + dinner" },
    ],
  },
  {
    id: "fri",
    name: "Fri · Golden Circle",
    color: "#f77f00",
    summary: "Þingvellir → Geysir → Gullfoss loop",
    stops: [
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Start / finish" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "Short walk" },
      { name: "Geysir", lat: 64.311, lng: -20.302, note: "Strokkur + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "Main overlook" },
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Return" },
    ],
  },
  {
    id: "sat",
    name: "Sat · South Coast",
    color: "#1e6fd9",
    summary: "Seljalandsfoss → Skógafoss → Vík → Dyrhólaey",
    stops: [
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Start / finish" },
      { name: "Seljalandsfoss", lat: 63.616, lng: -19.989, note: "Waterfall" },
      { name: "Skógafoss", lat: 63.532, lng: -19.511, note: "Waterfall" },
      { name: "Vík", lat: 63.419, lng: -19.006, note: "Lunch" },
      { name: "Dyrhólaey", lat: 63.402, lng: -19.126, note: "Coast viewpoint" },
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Return" },
    ],
  },
  {
    id: "sun",
    name: "Sun · Reykjavík local",
    color: "#9d4edd",
    summary: "Perlan → harbour → pool, all in town",
    stops: [
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Base" },
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
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 6:30 AM" },
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
      "Sunrise 05:56 and sunset 21:02 on arrival day, drifting to 06:08 / 20:48 by Monday — about 15 hours of usable light, losing 4 minutes a day. Nothing in this itinerary races the sun, and blackout curtains matter more than headlamps.",
  },
  {
    title: "Car seats, the rental & parking",
    icon: "🚗",
    detail:
      "The car is booked at KEF for the four days — but with one child seat, so a second restraint for the 7-year-old still needs adding. A compact SUV swallows the stroller, and rural speed cameras are unforgiving, so set the cruise control. The car sits parked most of the trip: Þórsgata is a paid downtown zone, so settle parking with the hotel.",
  },
  {
    title: "Food with kids",
    icon: "🥪",
    detail:
      "Stock a grocery run on Thursday evening (Bónus or Krónan): breakfast things, road snacks, and toddler staples. Restaurant dinners stay easy — Icelandic hot dogs are a legitimate food group.",
  },
];

// ---------------------------------------------------------------------------
// Weather — real forecast pulled per trip day, for the place you'll actually be
// ---------------------------------------------------------------------------
export type DayWeather = {
  dayId: string;
  weekday: string;
  date: string;
  place: string; // where the numbers are measured — the day's actual location
  summary: string;
  high: number;
  low: number;
  feelsLike: number; // apparent minimum — the number that decides the jacket
  precipMm: number;
  rainChance: number;
  wind: number; // max sustained, km/h
  gust: number; // max gust, km/h
  daylight?: string;
  verdict: string;
  tone: "good" | "mixed" | "watch";
};

export const weatherMeta = {
  source: "Open-Meteo forecast",
  fetched: "26 Aug 2026",
  note: "Pulled per day for the place you'll actually be that day — the lagoon on Thursday, the Golden Circle on Friday, the South Coast on Saturday, Reykjavík for the city days. A six-day forecast drifts, so re-check the back half of the trip midweek; vedur.is is the Icelandic source, and road conditions live on road.is.",
};

export const dayWeather: DayWeather[] = [
  {
    dayId: "day-thu",
    weekday: "Thu",
    date: "Aug 27",
    place: "Blue Lagoon & Reykjavík",
    summary: "Light drizzle, very windy",
    high: 11,
    low: 6,
    feelsLike: 2,
    precipMm: 0.1,
    rainChance: 20,
    wind: 29,
    gust: 43,
    daylight: "05:56 – 21:02",
    verdict:
      "Barely any rain, but the windiest day of the trip — gusts near 43 km/h at the lagoon. Warm water is no problem; the walk from the car park and the moment you get out are. Hold the car doors, and have the kids' coats ready at the exit rather than in the boot.",
    tone: "watch",
  },
  {
    dayId: "day-fri",
    weekday: "Fri",
    date: "Aug 28",
    place: "Golden Circle (Geysir)",
    summary: "Overcast, dry, calm",
    high: 12,
    low: 3,
    feelsLike: -0.4,
    precipMm: 0,
    rainChance: 16,
    wind: 11,
    gust: 19,
    daylight: "05:59 – 20:58",
    verdict:
      "The best day of the week for this route: no rain, the lightest wind of the trip, and the mildest afternoon. The catch is the start — it feels below freezing first thing, so hats and gloves for the 9:15 Þingvellir walk, then peel layers off as it warms.",
    tone: "good",
  },
  {
    dayId: "day-sat",
    weekday: "Sat",
    date: "Aug 29",
    place: "South Coast (Vík)",
    summary: "Overcast, dry, breezy",
    high: 11,
    low: 5,
    feelsLike: 3,
    precipMm: 0,
    rainChance: 39,
    wind: 17,
    gust: 32,
    daylight: "06:02 – 20:55",
    verdict:
      "Dry for the waterfalls, which is what matters — but 32 km/h gusts on an exposed coast. Dyrhólaey will be blowy at the railing, and the spray at Seljalandsfoss will find you anyway. Keep hoods up and hold onto hats and the 2-year-old.",
    tone: "good",
  },
  {
    dayId: "day-sun",
    weekday: "Sun",
    date: "Aug 30",
    place: "Reykjavík",
    summary: "Cloudy, showers possible",
    high: 10,
    low: 5,
    feelsLike: 3,
    precipMm: 0,
    rainChance: 53,
    wind: 8,
    gust: 21,
    daylight: "06:05 – 20:51",
    verdict:
      "The calmest day of the trip — barely any wind — but a coin-flip chance of a shower passing through. Perfect for the local plan: Perlan indoors in the morning, and the harbour walk or the pool whenever the sky looks friendly. Good news for staying in town: the South Coast gets 8 mm of rain today.",
    tone: "mixed",
  },
  {
    dayId: "day-mon",
    weekday: "Mon",
    date: "Aug 31",
    place: "Reykjavík → Keflavík",
    summary: "Drizzle, windy",
    high: 11,
    low: 5,
    feelsLike: 3,
    precipMm: 0.8,
    rainChance: 30,
    wind: 21,
    gust: 37,
    daylight: "06:08 – 20:48",
    verdict:
      "Wet roads and gusts to 37 km/h for the 6:30 AM airport run — dark, damp and blowy, so add a few minutes to the drive rather than trimming the buffer. Wind that strong catches car doors at the rental return, too.",
    tone: "mixed",
  },
];

/** Does the plan's Fri/Sat order still hold? The forecast says yes, emphatically. */
export const weatherCall = {
  headline: "Keep Friday and Saturday exactly as planned",
  detail:
    "The itinerary says to give the South Coast the better forecast, so here is the check: on Friday the South Coast gets 2.9 mm of rain with a 70% chance, while Saturday there is dry at 39%. The Golden Circle is dry on both days. Swapping them would move the waterfall day into the only real rain of the week — so don't.",
};

// ---------------------------------------------------------------------------
// Footwear — what this specific itinerary asks of your shoes
// ---------------------------------------------------------------------------
export const footwear = {
  verdict: "Waterproof shoes with grip — not hiking boots",
  summary:
    "Nothing in this plan is a hike. The longest walks are Almannagjá at Þingvellir, the 15 minutes to Kvernufoss and the flat gravel to the Sólheimajökull viewpoint — all well-made paths, none of them steep or long. Stiff hiking boots would be dead weight you carry through an airport. But plain joggers are the wrong call too, because the ground at every waterfall is permanently wet from spray whether or not it rains, and this week is windy enough to blow that spray sideways. The sweet spot is a waterproof low hiker or trail shoe with a lugged sole. If you only own joggers, they'll do — just pack spare socks in the car and accept wet feet at Seljalandsfoss.",
  perPerson: [
    {
      who: "You & your wife",
      pick: "Waterproof trail/low hiking shoes",
      why: "One pair each, worn on Friday and Saturday. Ankle-height boots are unnecessary — there's no scrambling, no loose scree, no pack weight. Grip matters more than ankle support on wet basalt and boardwalks.",
    },
    {
      who: "The 7-year-old",
      pick: "Waterproof sneakers or light kids' hikers",
      why: "Whatever they can run in. Cold wet feet end a day faster for a 7-year-old than for anyone else, so waterproof beats fashionable — and bring a second pair of shoes in case day one soaks them.",
    },
    {
      who: "The 2-year-old",
      pick: "Rain boots + warm socks",
      why: "Mostly carried or in the stroller, so puddle-stomping capability is the whole spec. Rain boots are also the easiest thing to pull off a sleeping toddler in the car.",
    },
    {
      who: "Everyone, in town",
      pick: "Your normal joggers",
      why: "Reykjavík is pavement. Sunday's harbour walk, the evening strolls and the doorstep loop are all ordinary-shoe territory — this is what the second pair is for.",
    },
  ],
  notes: [
    {
      title: "The one wet-feet moment",
      icon: "💦",
      detail:
        "Gljúfrabúi, the hidden waterfall by Seljalandsfoss, is reached by wading a shallow stream into a canyon slot. Nothing keeps feet dry there. Either accept it, wear the rain boots, or admire it from the entrance.",
    },
    {
      title: "Skip the boots you'd have to buy",
      icon: "💸",
      detail:
        "Buying stiff new boots for this trip would be a mistake twice over: they need breaking in, and this itinerary never asks for them. Spend it on waterproof layers instead — that's what the week's wind actually calls for.",
    },
    {
      title: "Blue Lagoon footwear",
      icon: "🩴",
      detail:
        "Flip-flops or slides for the changing rooms are worth the space on Thursday. Everything else that day is a car-to-door dash.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Book & pack checklists
// ---------------------------------------------------------------------------
export const checklists: ChecklistGroup[] = [
  {
    title: "Book first",
    icon: "📌",
    items: [
      "✅ Flights — FI 682 / FI 685, Economy Light, booked",
      "Add checked bags to the booking (not in the Light fare)",
      "Pay to pre-select four seats together on both legs",
      "✅ Blue Lagoon — Premium, Thu 27 Aug 12:00, 2 adults + 2 children, booked",
      "Download the Blue Lagoon voucher and save it offline",
      "✅ Hotel — Óðinsvé, Þórsgata 1, 4 nights, booked",
      "Confirm the room sleeps 4 + request a cot for the toddler",
      "Ask the hotel about parking for the rental car",
      "✅ Rental car — KEF pick-up Thu 10:30 AM, 4 days, booked",
      "⚠️ Add a SECOND child seat — the booking has only one",
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

export const bottomLine =
  "The Monday return is what makes this itinerary work: Blue Lagoon Thursday, Golden Circle Friday, South Coast Saturday, and a real Reykjavík family day Sunday — one hotel, no rushed mornings, and both kids get a trip paced for them.";
