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
  status: "Rebooked",
  package: "Blue Lagoon Premium",
  date: "Fri, 28 Aug 2026",
  time: "12:00",
  guests: "2 adults, 2 children",
  includes: [
    "Three face masks from the in-water mask bar",
    "One complimentary drink",
    "Bathrobe and towel to use during the visit",
    "A skincare gift to take home",
  ],
  note: "Originally Thursday at noon, lost to a two-hour queue at the rental desk and rebooked for the same time on Friday. It is still the only fixed appointment of the trip — Friday is built around it, and the rest of the week reshuffled to suit.",
};

/** How the 12:00 slot lines up with the flight and the car. */
export const lagoonFit: { label: string; detail: string; ok: boolean }[] = [
  {
    label: "12:00 entry vs. an 11:00 departure",
    detail:
      "Fifty minutes door-to-door from Þórsgata, so leaving at 11:00 gives a real buffer for parking and check-in. Leave on time — this booking has already been lost once.",
    ok: true,
  },
  {
    label: "The morning stays free",
    detail:
      "Nothing before 11:00, so Hallgrímskirkja, Rainbow Street and Tjörnin fill the gap — the local time the replan otherwise costs you.",
    ok: true,
  },
  {
    label: "Out by 2:30, home by 3:20",
    detail: "Leaves a soft afternoon for Perlan or the neighbourhood pool, and an early night before Saturday's 8:00 AM start.",
    ok: true,
  },
  {
    label: "Both children are on the booking",
    detail:
      "Two adults and two children. The 2-year-old just makes the minimum age of 2; under-8s wear the provided floaties and stay within arm's reach.",
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
  { label: "Hotel nights", value: "4", detail: "All at Hotel Óðinsvé" },
  { label: "Full days", value: "2", detail: "South Coast, Golden Circle" },
  { label: "Lagoon + city day", value: "1", detail: "Friday, after the replan" },
  { label: "Lost to the rental queue", value: "½", detail: "Thursday afternoon" },
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
    status: "Arrival — eaten by the rental",
    segments: [
      { kind: "flight", label: "In flight until 9:25 AM", pct: 39 },
      { kind: "transfer", label: "Airport + 2-hour rental queue", pct: 22 },
      { kind: "transfer", label: "Drive to Reykjavík", pct: 8 },
      { kind: "flexible", label: "Check in / evening", pct: 17 },
      { kind: "sleep", label: "Early night", pct: 14 },
    ],
    verdict: "Lagoon lost.",
    detail: "Rebooked to Friday noon.",
  },
  {
    id: "day-fri",
    date: "Fri, Aug 28",
    status: "Lagoon + city",
    segments: [
      { kind: "sleep", label: "Sleep / breakfast", pct: 24 },
      { kind: "flexible", label: "Free morning in 101", pct: 12 },
      { kind: "transfer", label: "Drive to lagoon", pct: 8 },
      { kind: "sightseeing", label: "Blue Lagoon", pct: 19 },
      { kind: "transfer", label: "Back to town", pct: 7 },
      { kind: "sightseeing", label: "Perlan or the pool", pct: 15 },
      { kind: "flexible", label: "Dinner / evening", pct: 15 },
    ],
    verdict: "Recovery day.",
    detail: "The lagoon, then nothing hard.",
  },
  {
    id: "day-sat",
    date: "Sat, Aug 29",
    status: "Full day 1",
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
    status: "Full day 2",
    segments: [
      { kind: "sleep", label: "Sleep / breakfast", pct: 27 },
      { kind: "sightseeing", label: "Golden Circle", pct: 45 },
      { kind: "transfer", label: "Fuel + pack", pct: 10 },
      { kind: "flexible", label: "Dinner", pct: 8 },
      { kind: "sleep", label: "Night", pct: 10 },
    ],
    verdict: "Moved from Friday.",
    detail: "Home by 5 to pack.",
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
  title: "Replanned around the rebooked lagoon",
  detail:
    "Thursday's rental queue cost the lagoon, so it moved to Friday noon and the Golden Circle moved to Sunday. Both nature days survive; the local Reykjavík day is what paid for it.",
  score: "3 usable days",
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
    title: "Arrival — and the day the rental ate",
    badge: "Lagoon missed · rebooked",
    intro:
      "Landed on time, then lost more than two hours at the rental desk — which cost the noon Blue Lagoon slot. It has been rebooked for Friday at 12:00, and the rest of the trip reshuffles around that. Thursday ends up as a quiet arrival evening in Reykjavík, which after a red-eye is no bad thing.",
    flowSpan: "Thursday · landed 9:25 AM → early night",
    flow: [
      { kind: "transfer", label: "Land · immigration · bags", short: "Land · bags", from: "9:25", to: "10:15", pct: 8 },
      { kind: "transfer", label: "Rental desk — 2+ hours", short: "Rental desk", from: "10:15", to: "12:30", pct: 20 },
      { kind: "transfer", label: "Drive to Reykjavík", short: "Drive", from: "12:30", to: "13:30", pct: 9 },
      { kind: "flexible", label: "Bag drop · check-in · reset", short: "Check-in · reset", from: "13:30", to: "16:30", pct: 26 },
      { kind: "flexible", label: "Doorstep loop · dinner", short: "Walk · dinner", from: "16:30", to: "19:30", pct: 26 },
      { kind: "sleep", label: "Early night", from: "19:30", to: "21:00", pct: 11 },
    ],
    photos: [
      { file: "iceland-kef-airport", caption: "Keflavík — where the two hours went" },
      { file: "iceland-rainbow-street", caption: "Skólavörðustígur, four minutes from the hotel door" },
      { file: "iceland-tjornin", caption: "Tjörnin — ducks, and a gentle first evening" },
    ],
    schedule: [
      {
        time: "9:25 AM",
        title: "Landed at KEF",
        detail: "On time, through immigration and bags without drama.",
      },
      {
        time: "10:15–12:30",
        title: "The rental desk",
        detail:
          "Over two hours in the queue — long enough to lose the noon lagoon booking. Rebooked on the spot for Friday 12:00.",
      },
      {
        time: "≈ 1:30 PM",
        title: "Reykjavík",
        detail:
          "Fifty minutes to Þórsgata 1. Rooms open at 3:00 PM, so drop bags at reception if you're early and go find lunch.",
      },
      {
        time: "Afternoon",
        title: "Reset, then the doorstep loop",
        detail:
          "Sleep if anyone needs it, then the hour-long loop from the front door: Óðinstorg, Rainbow Street, Hallgrímskirkja, Tjörnin. All within five minutes.",
      },
      {
        time: "Evening",
        title: "Grocery run + early dinner",
        detail:
          "Bónus or Krónan for breakfasts, skyr and road snacks — Saturday and Sunday are both driving days. Snaps is on your own square if nobody wants to walk.",
      },
    ],
    stops: [
      { name: "KEF — Keflavík Airport", lat: 63.985, lng: -22.605, note: "Landed 9:25 AM" },
      { name: "Hotel Óðinsvé, Þórsgata 1", lat: 64.1437, lng: -21.933, note: "Arrived ~1:30 PM" },
    ],
    mapNote: "Straight to town — the lagoon detour moves to Friday.",
    driveSummary: "KEF → Reykjavík ~50 min",
    notes: [
      {
        title: "What the delay actually cost",
        detail:
          "Only the lagoon slot, and it was rebookable. Nothing else on Thursday was booked — which is exactly why the plan put a single fixed thing on arrival day.",
        tone: "tip",
      },
      {
        title: "Tonight is the local evening you'd have lost",
        detail:
          "With the Golden Circle moving to Sunday, this is your unhurried Reykjavík evening. Use it: the walk loop, an early dinner, and bed.",
        tone: "family",
      },
      {
        title: "Do the grocery run tonight",
        detail: "Both weekend days leave early. Breakfasts and car snacks bought now save two rushed mornings.",
      },
    ],
  },
  {
    id: "day-fri",
    weekday: "Fri",
    date: "Aug 28",
    title: "Blue Lagoon + an easy Reykjavík afternoon",
    badge: "Rebooked lagoon · 12:00",
    intro:
      "The rescued day. You don't need to leave town until 11:00, so the morning is genuinely free, the lagoon takes the middle, and the afternoon stays deliberately soft — this is the recovery the rough arrival earned you.",
    flowSpan: "Friday · slow morning → lagoon 12:00 → home by 3:20",
    flow: [
      { kind: "sleep", label: "Sleep in · breakfast", short: "Breakfast", from: "8:00", to: "9:30", pct: 12 },
      { kind: "flexible", label: "Free morning in 101", short: "In town", from: "9:30", to: "11:00", pct: 12 },
      { kind: "transfer", label: "Drive to the lagoon", short: "Drive", from: "11:00", to: "12:00", pct: 8 },
      { kind: "sightseeing", label: "Blue Lagoon", from: "12:00", to: "14:30", pct: 19 },
      { kind: "transfer", label: "Drive back", from: "14:30", to: "15:20", pct: 7 },
      { kind: "sightseeing", label: "Perlan or Sundhöllin", short: "Perlan / pool", from: "15:30", to: "17:30", pct: 15 },
      { kind: "flexible", label: "Early dinner", from: "17:30", to: "19:00", pct: 12 },
      { kind: "sleep", label: "Evening · bed", from: "19:00", to: "21:00", pct: 15 },
    ],
    photos: [
      { file: "iceland-blue-lagoon", caption: "The rebooked noon slot — 4% chance of rain on Friday" },
      { file: "iceland-guide-lagoon-bridge", caption: "The boardwalk loop, for after you've changed" },
      { file: "iceland-perlan", caption: "Perlan — the afternoon option, moved here from Sunday" },
      { file: "iceland-guide-sundhollin", caption: "Sundhöllin: the local pool, 8 minutes' walk from the hotel" },
    ],
    schedule: [
      {
        time: "8:00–9:30",
        title: "Sleep in, properly",
        detail:
          "Nothing needs you before 11:00. Breakfast from last night's grocery run, or a bakery run to Brauð & Co or Sandholt.",
      },
      {
        time: "9:30–11:00",
        title: "The free morning",
        detail:
          "Hallgrímskirkja and the tower lift, Rainbow Street, or the ducks at Tjörnin — all four to five minutes from the door. This is the local time the reshuffle otherwise costs you.",
      },
      {
        time: "11:00",
        title: "Leave for the lagoon",
        detail:
          "Fifty minutes door-to-door. Leaving at 11:00 lands you with a comfortable buffer for the 12:00 entry.",
      },
      {
        time: "12:00–2:30 PM",
        title: "Blue Lagoon (Premium)",
        detail:
          "Robes and towels are included, so the bag is just swimsuits, dry clothes and hair ties. Conditioner in everyone's hair before the water, three masks at the in-water bar, one drink each.",
      },
      {
        time: "2:30–3:20",
        title: "Back to Þórsgata",
        detail: "The drive is the toddler's nap. Everyone showered, warm and slightly wrecked in a good way.",
      },
      {
        time: "3:30–5:30",
        title: "Pick one, gently",
        detail:
          "Perlan's ice cave and observation deck, Whales of Iceland if the sky turns, or simply Sundhöllin — the neighbourhood pool eight minutes' walk away, with a kids' pool and rooftop hot pots.",
      },
      {
        time: "5:30 PM",
        title: "Early dinner, early night",
        detail: "Saturday is the trip's longest drive and leaves at 8:00. Protect tonight's sleep.",
      },
    ],
    stops: [
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Free morning · leave 11:00" },
      { name: "Blue Lagoon", lat: 63.88, lng: -22.449, note: "12:00 entry · out by 2:30" },
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Back ~3:20" },
      { name: "Perlan", lat: 64.129, lng: -21.919, note: "Afternoon option · 7 min from the hotel" },
    ],
    mapNote: "Out and back on the same road — no other driving today.",
    driveSummary: "Reykjavík → Blue Lagoon ~50 min each way",
    notes: [
      {
        title: "Kids at the lagoon",
        detail:
          "Minimum age is 2, so both are in — the 2-year-old just makes it. Under-8s must wear the provided floaties and stay within arm's reach; the water is milky-opaque and you cannot see the bottom.",
        tone: "family",
      },
      {
        title: "Leave by 11:00, not 11:20",
        detail:
          "Fifty minutes of driving plus parking and check-in. You have already lost this booking once — this is the one time today worth being strict about.",
        tone: "tip",
      },
      {
        title: "Don't add a second thing",
        detail:
          "The afternoon option is one item, not two. Tomorrow is 380 km and Sunday is the Golden Circle; today's job is to make those possible.",
      },
    ],
  },
  {
    id: "day-sat",
    weekday: "Sat",
    date: "Aug 29",
    title: "Measured South Coast day",
    badge: "Longest drive · rain likely",
    intro:
      "The longest outing of the trip, kept deliberately selective: two big waterfalls, a real sit-down lunch near Vík, and one elevated coastal viewpoint — then home. Expect rain today; the waterfalls soak you regardless, so it changes comfort more than plans.",
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
        detail: "Full waterproofs today, not just jackets. Snack kit, spare socks, and dry clothes within reach in the car.",
      },
      {
        time: "9:45–10:45",
        title: "Seljalandsfoss",
        detail:
          "See it from the front; the walk behind the falls is optional and will be genuinely soaking in this weather with a toddler.",
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
        detail: "A proper seated reset and a chance to dry off — worth an hour, especially if the morning was wet.",
      },
      {
        time: "2:20–3:15",
        title: "Dyrhólaey viewpoint",
        detail:
          "Elevated black-sand and sea-arch views without putting the children near the surf. Gusts near 32 km/h up there — hold hats and hands.",
      },
      {
        time: "3:15–6:00",
        title: "Return to Reykjavík",
        detail: "One restroom stop max. Dinner casual and close to the hotel; everyone down early.",
      },
    ],
    stops: [
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 8:00 AM" },
      { name: "Seljalandsfoss", lat: 63.616, lng: -19.989, note: "9:45–10:45 · spray + wet paths" },
      { name: "Skógafoss", lat: 63.532, lng: -19.511, note: "11:15–12:15 · base viewpoint" },
      { name: "Vík (lunch)", lat: 63.419, lng: -19.006, note: "1:00–2:00 PM · seated reset" },
      { name: "Dyrhólaey", lat: 63.402, lng: -19.126, note: "2:20–3:15 · viewpoint from above" },
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Back ~6:00 PM" },
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
        title: "Rain plan, not a rain cancellation",
        detail:
          "Roughly 1.5 mm with a 43% chance. Waterfalls are a wet activity anyway; the difference is comfort. Dry socks in the car and a long lunch turn a damp day into a good one.",
        tone: "family",
      },
      {
        title: "Optional cut",
        detail: "If the family is fading after lunch, drop the coastal stop and head home — two waterfalls is already a great day.",
        tone: "tip",
      },
    ],
  },
  {
    id: "day-sun",
    weekday: "Sun",
    date: "Aug 30",
    title: "Golden Circle",
    badge: "Moved from Friday",
    intro:
      "The classic loop, now on the last full day: broad landscape change, low decision fatigue, and the return drive as the toddler's nap. Home by five so the evening can absorb fuelling the car and packing for a 5:45 AM start.",
    flowSpan: "Sunday · out 8:15 AM → home ~5:00 PM, pack tonight",
    flow: [
      { kind: "flexible", label: "Breakfast", from: "7:45", to: "8:15", pct: 4 },
      { kind: "transfer", label: "Drive", from: "8:15", to: "9:00", pct: 6 },
      { kind: "sightseeing", label: "Þingvellir", from: "9:00", to: "10:15", pct: 10 },
      { kind: "transfer", label: "Drive", from: "10:15", to: "11:15", pct: 8 },
      { kind: "sightseeing", label: "Geysir + lunch", from: "11:15", to: "1:15", pct: 15 },
      { kind: "transfer", label: "Drive", from: "1:15", to: "1:45", pct: 4 },
      { kind: "sightseeing", label: "Gullfoss", from: "1:45", to: "2:45", pct: 8 },
      { kind: "transfer", label: "Return — car nap", short: "Return · car nap", from: "2:45", to: "5:00", pct: 17 },
      { kind: "flexible", label: "Fuel · pack · dinner", short: "Fuel · pack", from: "5:00", to: "7:30", pct: 19 },
      { kind: "sleep", label: "Early night", short: "Night", from: "7:30", to: "9:00", pct: 9 },
    ],
    photos: [
      { file: "iceland-thingvellir", caption: "Þingvellir — walk the rift between two tectonic plates" },
      { file: "iceland-geysir", caption: "Strokkur erupts every few minutes — the fastest kid payoff in Iceland" },
      { file: "iceland-gullfoss", caption: "Gullfoss — the two-step waterfall that ends the loop" },
      { file: "iceland-guide-kerid", caption: "Kerið — the optional crater on the way home, if energy allows" },
    ],
    schedule: [
      {
        time: "8:15 AM",
        title: "Leave Reykjavík",
        detail:
          "Earlier than it feels like you need, because tonight has jobs in it. Carrier, compact stroller, waterproof layers and snacks.",
      },
      {
        time: "9:00–10:15",
        title: "Þingvellir",
        detail:
          "One short developed walk — Almannagjá down from the visitor centre — instead of trying to cover the park. Öxarárfoss is a 15-minute add-on if the mood is good.",
      },
      {
        time: "11:15–12:15",
        title: "Geysir",
        detail: "Strokkur erupts every 5–10 minutes. Stand upwind, let the kids call the burst, watch two or three.",
      },
      {
        time: "12:15–1:15",
        title: "Lunch at the Geysir centre",
        detail:
          "Fast and predictable, right across the road. Friðheimar is the memorable alternative but needs a reservation — call ahead this morning if you want it.",
      },
      {
        time: "1:45–2:45",
        title: "Gullfoss",
        detail: "Upper platform for the full two-step canyon view; skip the lower path if it's wet or windy.",
      },
      {
        time: "2:45–5:00",
        title: "Home, via Kerið if you like",
        detail:
          "The drive back is the nap. Kerið's red crater is a 15-minute stop on Route 35 if everyone's still bright — otherwise straight home.",
      },
      {
        time: "5:00 PM onward",
        title: "Fuel, pack, early dinner",
        detail:
          "Fill the tank tonight, not tomorrow. Stage every bag by the door, lay out airport clothes, and pack a breakfast bag for the car.",
      },
    ],
    stops: [
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Leave 8:15 AM" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "9:00–10:15 · one short walk" },
      { name: "Geysir / Strokkur", lat: 64.311, lng: -20.302, note: "11:15–12:15 + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "1:45–2:45 · main overlooks" },
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Back ~5:00 PM to pack" },
    ],
    mapNote: "A clean loop — about 230 km, and the shortest way home of the two nature days.",
    driveSummary: "Reykjavík → Þingvellir ~45 min · → Geysir ~50 min · → Gullfoss ~10 min · → home ~1 hr 50",
    notes: [
      {
        title: "Why this day moved here",
        detail:
          "The lagoon owns Friday noon, and the Golden Circle is the shorter drive home of the two big days — so it belongs on the night you have to pack, not the South Coast.",
        tone: "tip",
      },
      {
        title: "Tomorrow starts at 5:45 AM",
        detail:
          "Everything that can be done tonight should be: fuel, bags by the door, airport clothes out, breakfast packed. The morning is then just driving.",
        tone: "family",
      },
      {
        title: "Sunday hours",
        detail: "Check Friðheimar and the Fontana rye-bread times before counting on either — Sunday schedules differ.",
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
      { file: "iceland-old-harbour", caption: "Last look at Reykjavík — the city time belonged to Thursday and Friday" },
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
        detail: "About 45–50 minutes to KEF on wet roads, then the rental return.",
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
        title: "Wet and dark at 6:30",
        detail:
          "Drizzle and gusts to 26 km/h forecast, and sunrise isn't until 06:08. Add a few minutes rather than trimming the buffer.",
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
    name: "Thu · Arrival",
    color: "#00897b",
    summary: "KEF → Reykjavík (lagoon missed)",
    stops: [
      { name: "KEF", lat: 63.985, lng: -22.605, note: "Landed 9:25 AM · 2 hours at the rental desk" },
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Straight to town" },
    ],
  },
  {
    id: "fri",
    name: "Fri · Blue Lagoon + city",
    color: "#f77f00",
    summary: "Reykjavík → Blue Lagoon → Reykjavík",
    stops: [
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Leave 11:00" },
      { name: "Blue Lagoon", lat: 63.88, lng: -22.449, note: "12:00 entry · rebooked" },
      { name: "Hotel Óðinsvé", lat: 64.1437, lng: -21.933, note: "Back ~3:20" },
      { name: "Perlan", lat: 64.129, lng: -21.919, note: "Afternoon option" },
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
    name: "Sun · Golden Circle",
    color: "#9d4edd",
    summary: "Þingvellir → Geysir → Gullfoss (moved from Friday)",
    stops: [
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Start / finish" },
      { name: "Þingvellir", lat: 64.256, lng: -21.13, note: "Short walk" },
      { name: "Geysir", lat: 64.311, lng: -20.302, note: "Strokkur + lunch" },
      { name: "Gullfoss", lat: 64.327, lng: -20.121, note: "Main overlook" },
      { name: "Reykjavík", lat: 64.1437, lng: -21.933, note: "Back ~5:00 to pack" },
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
    title: "Thursday: KEF → Reykjavík",
    detail: "Two hours at the rental desk cost the lagoon slot",
    drive: "~50 min",
  },
  {
    title: "Friday: Reykjavík → Blue Lagoon → Reykjavík",
    detail: "Free morning in town, rebooked noon entry",
    drive: "50 min each way",
  },
  {
    title: "Saturday: South Coast",
    detail: "Seljalandsfoss → Skógafoss → Vík → Dyrhólaey",
    drive: "Longest day",
  },
  {
    title: "Sunday: Golden Circle",
    detail: "Þingvellir → Geysir → Gullfoss, home by 5 to pack",
    drive: "~3.5 hr total",
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
  fetched: "28 Aug 2026",
  note: "Re-pulled after the replan, for the place you'll actually be each day — the lagoon on Friday, the South Coast on Saturday, the Golden Circle on Sunday, the airport road on Monday. Forecasts drift; vedur.is is the Icelandic source and road conditions live on road.is.",
};

export const dayWeather: DayWeather[] = [
  {
    dayId: "day-fri",
    weekday: "Fri",
    date: "Aug 28",
    place: "Blue Lagoon & Reykjavík",
    summary: "Dry and bright, breezy",
    high: 11,
    low: 4,
    feelsLike: 0.7,
    precipMm: 0,
    rainChance: 4,
    wind: 22,
    gust: 31,
    daylight: "05:59 – 20:58",
    verdict:
      "As good as a lagoon day gets — a 4% chance of rain. Cold first thing, so the free morning wants proper coats, and the wind still catches car doors at the lagoon car park.",
    tone: "good",
  },
  {
    dayId: "day-sat",
    weekday: "Sat",
    date: "Aug 29",
    place: "South Coast (Vík)",
    summary: "Showers, windy",
    high: 10,
    low: 7,
    feelsLike: 3.6,
    precipMm: 1.5,
    rainChance: 43,
    wind: 20,
    gust: 32,
    daylight: "05:53 – 20:40",
    verdict:
      "The wettest day of what's left, and it lands on the longest drive — but the South Coast is wet on every remaining day, and waterfalls soak you regardless. Full waterproofs, a long lunch in Vík, and hold hats at Dyrhólaey.",
    tone: "watch",
  },
  {
    dayId: "day-sun",
    weekday: "Sun",
    date: "Aug 30",
    place: "Golden Circle (Geysir)",
    summary: "Mostly dry, calm",
    high: 11,
    low: 4,
    feelsLike: 1.4,
    precipMm: 0.5,
    rainChance: 37,
    wind: 11,
    gust: 22,
    daylight: "05:57 – 20:45",
    verdict:
      "The calmest day inland and largely dry — a good draw for the loop that moved here. Cold start again near freezing, so hats and gloves for the 9:00 Þingvellir walk.",
    tone: "good",
  },
  {
    dayId: "day-mon",
    weekday: "Mon",
    date: "Aug 31",
    place: "Reykjavík → Keflavík",
    summary: "Drizzle, dark start",
    high: 11,
    low: 2,
    feelsLike: -1.6,
    precipMm: 0.6,
    rainChance: 43,
    wind: 10,
    gust: 26,
    daylight: "06:08 – 20:48",
    verdict:
      "Wet roads for the 6:30 AM airport run, and sunrise isn't until 06:08 — you'll drive the first stretch in the dark. Add a few minutes; don't trim the buffer.",
    tone: "mixed",
  },
];

/** Does the plan's Fri/Sat order still hold? The forecast says yes, emphatically. */
export const weatherCall = {
  headline: "Why the Golden Circle moved to Sunday",
  detail:
    "With the lagoon rebooked to Friday noon, the Golden Circle had to become a weekend day. The South Coast is wet whichever day it lands on (Fri 87%, Sat 43%, Sun 55%), so the deciding factor was the drive home: Gullfoss is 1 hr 50 from the hotel, Vík is 2 hr 40. Putting the shorter loop on Sunday keeps the long haul away from the night you have to pack for a 5:45 AM start.",
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
      "Perlan tickets — Friday afternoon, if you choose it over the pool",
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
