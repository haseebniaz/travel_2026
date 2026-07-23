// Content for the Sicily one-stop guide (/sicily). The trip is decided — this
// page is the full menu of what the island offers, so the pair can pick and
// choose without researching anywhere else. Reuses the Place card shape; images
// mix existing sicily-east-* photos with sicily-guide-* ones fetched for this page.

import type { Place } from "./trips";

export type SicilyRouteStop = { name: string; lat: number; lng: number };

export type SicilyRoute = {
  id: string;
  name: string;
  days: string;
  color: string;
  pace: string;
  bestFor: string;
  summary: string;
  chain: string; // human-readable route string
  stops: SicilyRouteStop[];
};

export type PracticalNote = { title: string; icon: string; detail: string };

export type TownGuide = {
  name: string;
  area: string;
  time: string; // how long it deserves
  image?: string;
  dontMiss: string[];
  eatDrink: string[]; // named, long-standing venues — check hours / book ahead
  parking: string;
};

export type PerfectDay = {
  title: string;
  blurb: string;
  steps: { time: string; what: string }[];
};

export type DriveLeg = { from: string; to: string; time: string; note?: string };

export type BudgetItem = { item: string; range: string; note?: string };

export type Booking = {
  icon: string;
  title: string;
  when: string;
  status: "booked" | "todo" | "optional";
  detail: string;
};

export type TimelineDay = {
  date: string; // e.g. "Sat 31 Oct"
  title: string;
  detail: string;
  night: string; // where you sleep
  flight?: boolean; // travel day styling
};

const img = (file: string) => `/images/${file}.jpg`;

// ---------------------------------------------------------------------------
// 1 · The island at a glance — how to think about Sicily's regions
// ---------------------------------------------------------------------------
export const regions: Place[] = [
  {
    name: "The East Coast",
    area: "Catania · Taormina · Etna — the spine · 3–4 days",
    blurb:
      "Where you land and where the drama lives: Taormina's theatre balcony, Etna's smoking summit, and Catania's lava-black streets. Everything is within 1h of Catania airport.",
    image: img("sicily-east-day2"),
  },
  {
    name: "The Baroque Southeast",
    area: "Val di Noto — the heart of your loop · 3–4 days",
    blurb:
      "Siracusa/Ortigia, Noto, Ragusa, Modica, Scicli — a constellation of honey-stone towns rebuilt in one glorious style after the 1693 quake. Short hops, endless wandering. 1.5h from Catania.",
    image: img("sicily-east-g4"),
  },
  {
    name: "Palermo & the North",
    area: "Palermo · Cefalù · Monreale · 2–3 days (option)",
    blurb:
      "The island's wild, magnificent capital — markets, mosaics, street food — plus Cefalù's beach-town old quarter under its rock. 2.5h motorway from Catania; pairs with a west-side finale.",
    image: img("sicily-guide-cefalu"),
  },
  {
    name: "The West",
    area: "Trapani · Erice · salt pans · Egadi · 2–3 days (option)",
    blurb:
      "Sicily at its most North-African: windmill-studded salt pans, the medieval mountain town of Erice in the clouds, couscous in Trapani, and ferries to the Egadi islands. 3h+ from Catania — only with 11+ days.",
    image: img("sicily-guide-erice"),
  },
  {
    name: "The South Coast",
    area: "Agrigento · Scala dei Turchi · 1–2 days (option)",
    blurb:
      "The Valley of the Temples — Greece's grandest ruins outside Greece — and the surreal white marl staircase of Scala dei Turchi. 2h15 from Catania; an easy add to the SE loop.",
    image: img("sicily-guide-scala-dei-turchi"),
  },
  {
    name: "The Aeolian Islands",
    area: "Lipari · Salina · Stromboli · 2–3 days (option)",
    blurb:
      "Seven volcanic islands off the north coast — hydrofoil from Milazzo (1h from Taormina). Lipari for base, Salina for green calm, Stromboli for a live volcano show after dark.",
    image: img("sicily-guide-aeolian"),
  },
];

// ---------------------------------------------------------------------------
// 2 · Route options — four ways to shape the ~9 days
// ---------------------------------------------------------------------------
export const sicilyRoutes: SicilyRoute[] = [
  {
    id: "classic",
    name: "The Classic (your itinerary)",
    days: "9 days",
    color: "#2e7d32",
    pace: "Relaxed — two bases, short hops",
    bestFor: "First-timers who want depth over distance. This is the plan on the trip page.",
    summary:
      "The east coast + Baroque southeast loop: Taormina and Etna in the north, then Ortigia and the golden towns. Maximum Sicily per mile, minimum repacking.",
    chain: "Catania → Taormina → Etna → Siracusa → Noto → Ragusa → Modica → Catania",
    stops: [
      { name: "Catania", lat: 37.508, lng: 15.083 },
      { name: "Taormina", lat: 37.853, lng: 15.288 },
      { name: "Mount Etna", lat: 37.7, lng: 14.999 },
      { name: "Siracusa (Ortigia)", lat: 37.063, lng: 15.293 },
      { name: "Noto", lat: 36.891, lng: 15.069 },
      { name: "Ragusa Ibla", lat: 36.925, lng: 14.74 },
      { name: "Modica", lat: 36.858, lng: 14.761 },
    ],
  },
  {
    id: "grand-loop",
    name: "Grand Island Loop",
    days: "11–12 days",
    color: "#e63946",
    pace: "Ambitious — new bed every 1–2 nights",
    bestFor: "Seeing it all once: Palermo's chaos, the west's salt pans, the temples, and the Baroque.",
    summary:
      "The full circle. Only worth it if you can stretch past 10 days — otherwise it turns into windshield time. Clockwise keeps the sea on your right.",
    chain: "Catania → Taormina → Cefalù → Palermo → Erice → Agrigento → Piazza Armerina → Ragusa → Siracusa → Catania",
    stops: [
      { name: "Catania", lat: 37.508, lng: 15.083 },
      { name: "Taormina", lat: 37.853, lng: 15.288 },
      { name: "Cefalù", lat: 38.04, lng: 14.02 },
      { name: "Palermo", lat: 38.116, lng: 13.361 },
      { name: "Erice", lat: 38.037, lng: 12.588 },
      { name: "Agrigento", lat: 37.29, lng: 13.6 },
      { name: "Piazza Armerina", lat: 37.38, lng: 14.37 },
      { name: "Ragusa Ibla", lat: 36.925, lng: 14.74 },
      { name: "Siracusa (Ortigia)", lat: 37.063, lng: 15.293 },
    ],
  },
  {
    id: "aeolian",
    name: "East + Aeolian Escape",
    days: "9–10 days",
    color: "#1e6fd9",
    pace: "Split — road trip + island time",
    bestFor: "Adding a live-volcano island chapter; leave the car in Milazzo for 2–3 nights.",
    summary:
      "Compress the Baroque loop slightly and hydrofoil out to Lipari and Stromboli. October sailings still run daily and the sea is usually kind early in the month.",
    chain: "Catania → Taormina → Milazzo ⇄ Lipari/Stromboli → Etna → Siracusa → Noto → Catania",
    stops: [
      { name: "Catania", lat: 37.508, lng: 15.083 },
      { name: "Taormina", lat: 37.853, lng: 15.288 },
      { name: "Milazzo (hydrofoil)", lat: 38.221, lng: 15.24 },
      { name: "Lipari", lat: 38.467, lng: 14.954 },
      { name: "Stromboli", lat: 38.789, lng: 15.213 },
      { name: "Mount Etna", lat: 37.7, lng: 14.999 },
      { name: "Siracusa (Ortigia)", lat: 37.063, lng: 15.293 },
      { name: "Noto", lat: 36.891, lng: 15.069 },
    ],
  },
  {
    id: "western-finale",
    name: "East + Western Finale",
    days: "10 days",
    color: "#f77f00",
    pace: "One-way — no backtracking",
    bestFor: "Ending on temples, white cliffs, and Palermo street food; fly home from PMO.",
    summary:
      "Your east/SE loop, then push west along the south coast: Roman mosaics, the Valley of the Temples, Scala dei Turchi, and two Palermo nights. Open-jaw flights (CTA in, PMO out) make it seamless.",
    chain: "Catania → Taormina → Etna → Siracusa → Noto → Ragusa → Piazza Armerina → Agrigento → Palermo (fly out)",
    stops: [
      { name: "Catania", lat: 37.508, lng: 15.083 },
      { name: "Taormina", lat: 37.853, lng: 15.288 },
      { name: "Mount Etna", lat: 37.7, lng: 14.999 },
      { name: "Siracusa (Ortigia)", lat: 37.063, lng: 15.293 },
      { name: "Noto", lat: 36.891, lng: 15.069 },
      { name: "Ragusa Ibla", lat: 36.925, lng: 14.74 },
      { name: "Piazza Armerina", lat: 37.38, lng: 14.37 },
      { name: "Agrigento & Scala dei Turchi", lat: 37.29, lng: 13.6 },
      { name: "Palermo", lat: 38.116, lng: 13.361 },
    ],
  },
];

// ---------------------------------------------------------------------------
// 3 · Can't-miss experiences
// ---------------------------------------------------------------------------
export const mustDos: Place[] = [
  {
    name: "Etna at first light",
    area: "book a summit guide",
    blurb:
      "Cable car + 4x4 (or guided hike) into the summit crater zone while the morning air is glass-clear. Walk warm lava, peer into steaming vents, and see half the island below you.",
    image: img("sicily-east-day3"),
  },
  {
    name: "Taormina's Greek theatre",
    area: "go at opening or sunset",
    blurb:
      "The most theatrical view in the Mediterranean: a Greek stage framing Etna's smoke and the Ionian blue. Corso Umberto and a granita afterward complete the ritual.",
    image: img("sicily-east-g1"),
  },
  {
    name: "Ortigia's market & passeggiata",
    area: "Siracusa",
    blurb:
      "Morning: the raucous street market — swordfish, capers, oregano by the bunch. Evening: the island-wide stroll ending with a spritz on the Duomo's glowing Baroque square.",
    image: img("sicily-east-day5"),
  },
  {
    name: "Noto at golden hour",
    area: "Val di Noto",
    blurb:
      "The world capital of Baroque turns amber as the sun drops down Corso Vittorio Emanuele. Climb the Chiesa di San Carlo bell tower for the rooftop view.",
    image: img("sicily-east-day7"),
  },
  {
    name: "Valley of the Temples",
    area: "Agrigento · south coast option",
    blurb:
      "Eight Greek temples on a ridge above the sea — the Temple of Concordia is as complete as anything in Greece. Evening opening hours make it magical (and cool).",
    image: img("sicily-guide-agrigento"),
  },
  {
    name: "Villa Romana del Casale",
    area: "Piazza Armerina · central option",
    blurb:
      "A Roman hunting villa with the finest floor mosaics in existence — 3,500 m² of chariot races, exotic beasts, and the famous 'bikini girls'. Worth the inland detour alone.",
    image: img("sicily-guide-villa-casale"),
  },
  {
    name: "Palermo street-food crawl",
    area: "Ballarò & Vucciria · west option",
    blurb:
      "Panelle, crocchè, sfincione, pani ca meusa if you dare — grazed standing up in Europe's oldest street markets, between Arab domes and Norman gold mosaics.",
    image: img("sicily-guide-palermo-market"),
  },
  {
    name: "Stromboli after dark",
    area: "Aeolian option",
    blurb:
      "A boat idles off the Sciara del Fuoco at dusk while the volcano throws orange arcs into the night sky, on schedule, every twenty minutes. Nature's best fireworks.",
    image: img("sicily-guide-stromboli"),
  },
];

// ---------------------------------------------------------------------------
// 4 · Off the beaten path
// ---------------------------------------------------------------------------
export const hiddenGems: Place[] = [
  {
    name: "Gole dell'Alcantara",
    area: "20 min from Taormina",
    blurb:
      "A slot canyon of hexagonal black basalt columns carved by an ice-cold river. Wade in (thigh-deep, bracing) or view from the stairs — an alien half-day between Taormina and Etna.",
    image: img("sicily-guide-alcantara"),
  },
  {
    name: "Marzamemi",
    area: "30 min from Noto",
    blurb:
      "A tiny tuna-fishery village turned golden-hour aperitivo spot: one piazza of weathered stone, fishing boats, and tables spilling toward the water. Perfect sunset dinner after Noto.",
    image: img("sicily-guide-marzamemi"),
  },
  {
    name: "Vendicari reserve",
    area: "between Noto & Marzamemi",
    blurb:
      "Coastal wetlands with flamingos in autumn, empty walking trails, and the romantic ruin of an old tuna factory (tonnara) right on the shore.",
    image: img("sicily-guide-vendicari"),
  },
  {
    name: "Cavagrande del Cassibile",
    area: "40 min from Siracusa",
    blurb:
      "A huge green canyon with a chain of natural swimming pools at the bottom — a proper hike down (45 min) rewarded by the freshest swim in Sicily.",
    image: img("sicily-guide-cavagrande"),
  },
  {
    name: "Pantalica necropolis",
    area: "1h from Siracusa",
    blurb:
      "Five thousand Bronze-Age tombs honeycombed into a silent river gorge — a UNESCO site you'll likely have to yourselves. Walk in from Sortino for the best rim views.",
    image: img("sicily-guide-pantalica"),
  },
  {
    name: "Caltagirone's staircase",
    area: "1h inland from Ragusa",
    blurb:
      "142 steps, every riser faced in different hand-painted majolica — the ceramic capital of Sicily climbing its own artwork. Studios and kilns line the lanes around it.",
    image: img("sicily-guide-caltagirone"),
  },
  {
    name: "Scicli",
    area: "15 min from Modica",
    blurb:
      "The Baroque town the crowds skip — palazzi with grinning stone balconies, a cliff-side church, and the film set of TV's Inspector Montalbano's police station.",
    image: img("sicily-guide-scicli"),
  },
  {
    name: "Punta Secca",
    area: "30 min from Ragusa",
    blurb:
      "A whitewashed fishing hamlet with a lighthouse and 'Montalbano's house' on the beach — swim where the inspector swims, then eat seafood at a table on the sand.",
    image: img("sicily-guide-punta-secca"),
  },
  {
    name: "Savoca",
    area: "40 min from Taormina",
    blurb:
      "The Godfather's Sicily: Bar Vitelli (where Michael asked for Apollonia's hand) and the wedding church still stand unchanged above the coast. Granita on the terrace, obligatory.",
    image: img("sicily-guide-savoca"),
  },
  {
    name: "Forza d'Agrò",
    area: "next to Savoca",
    blurb:
      "The other Godfather village — a crumbling, gorgeous hilltop maze with cinematic views down the coast toward Taormina. Almost no tourists, all atmosphere.",
    image: img("sicily-guide-forza-dagro"),
  },
  {
    name: "Castelmola",
    area: "10 min above Taormina",
    blurb:
      "The village on the crag above Taormina — castle ruins, a bar famous for almond wine, and the theatre-and-Etna view from even higher up.",
    image: img("sicily-guide-castelmola"),
  },
  {
    name: "Randazzo",
    area: "Etna's north flank",
    blurb:
      "A medieval town built entirely of black lava stone, gateway to Etna's wilder northern craters and the best wineries of the Etna DOC. Superb lunch stop on a volcano circuit.",
    image: img("sicily-guide-randazzo"),
  },
  {
    name: "Isola delle Correnti",
    area: "Sicily's southern tip",
    blurb:
      "Where the Ionian and Mediterranean visibly meet at a tied island with a ruined lighthouse — the 'end of Italy'. Wild, windswept, and wonderful after Marzamemi.",
    image: img("sicily-guide-isola-correnti"),
  },
  {
    name: "Castello di Donnafugata",
    area: "20 min from Ragusa",
    blurb:
      "A theatrical 19th-century castle with 122 rooms, a Venetian loggia, and a stone hedge-maze in the gardens — plus a costume museum. A great half-day pairing with Punta Secca.",
    image: img("sicily-guide-donnafugata"),
  },
  {
    name: "Palazzolo Acreide",
    area: "40 min from Siracusa",
    blurb:
      "A UNESCO Baroque town the tour buses miss entirely, with the small Greek theatre of ancient Akrai on its hilltop and two of the southeast's best salumerie for lunch.",
    image: img("sicily-guide-palazzolo"),
  },
  {
    name: "Noto Antica",
    area: "15 min above Noto",
    blurb:
      "The ghost of pre-earthquake Noto — a ruined gate, overgrown streets, and silence on a plateau above the new town. Haunting, free, and completely empty.",
    image: img("sicily-guide-noto-antica"),
  },
  {
    name: "Plemmirio marine reserve",
    area: "15 min from Ortigia",
    blurb:
      "The rocky Maddalena peninsula south of Siracusa: protected turquoise coves, snorkeling over seagrass and amphora fragments, and locals-only swim ladders off the rocks.",
    image: img("sicily-guide-plemmirio"),
  },
  {
    name: "Chiaramonte Gulfi",
    area: "30 min from Ragusa",
    blurb:
      "The 'balcony of Sicily' — a hill town with views from Etna to the sea, famous island-wide for its pork: lunch at a rustic macelleria-trattoria here is a pilgrimage.",
    image: img("sicily-guide-chiaramonte"),
  },
  {
    name: "Militello in Val di Catania",
    area: "1h from Catania",
    blurb:
      "One of the eight UNESCO Baroque towns, wholly untouristed — extravagant church facades, a sleepy piazza, and the feeling of having Sicily to yourselves.",
    image: img("sicily-guide-militello"),
  },
];

// ---------------------------------------------------------------------------
// 5 · Eat & drink like a Sicilian
// ---------------------------------------------------------------------------
export const foodAndDrink: Place[] = [
  {
    name: "Granita + brioche",
    area: "breakfast, non-negotiable",
    blurb:
      "Almond or pistachio granita with a warm brioche col tuppo for dunking — the Sicilian breakfast. Best on the east coast; Taormina and Catania take it very seriously.",
    image: img("sicily-guide-granita"),
  },
  {
    name: "Arancini",
    area: "everywhere, always",
    blurb:
      "Saffron rice spheres (cones in Catania — arancinI vs arancinE is a real war) stuffed with ragù or butter-ham. The benchmark street snack; eat one per town, minimum.",
    image: img("sicily-guide-arancini"),
  },
  {
    name: "Cannoli",
    area: "filled while you wait",
    blurb:
      "Crisp shells piped to order with sheep's-milk ricotta — never pre-filled. Piana degli Albanesi and Dattilo are pilgrimage-grade; any good pasticceria will change your life slightly.",
    image: img("sicily-guide-cannoli"),
  },
  {
    name: "Pasta alla Norma",
    area: "Catania's own",
    blurb:
      "Fried eggplant, tomato, basil, and a snowfall of salted ricotta — named after Bellini's opera and best eaten in his hometown, Catania.",
    image: img("sicily-guide-pasta-norma"),
  },
  {
    name: "Modica chocolate",
    area: "Modica",
    blurb:
      "Cold-worked to an Aztec recipe the Spanish brought — grainy, intense, spiked with vanilla, cinnamon, or chilli. Bonajuto (est. 1880) is the mandatory stop.",
    image: img("sicily-guide-modica-chocolate"),
  },
  {
    name: "Etna wines",
    area: "cellar doors on the volcano",
    blurb:
      "Nerello Mascalese reds and Carricante whites grown in black ash at altitude — Italy's most exciting wine region right now. Tastings around Randazzo, Passopisciaro, and Milo.",
    image: img("sicily-guide-etna-wine"),
  },
  {
    name: "Palermo street food",
    area: "Ballarò · Vucciria",
    blurb:
      "Pane e panelle (chickpea fritter sandwiches), crocchè, sfincione, and stigghiola off the grill — a walking dinner through thousand-year-old markets.",
    image: img("sicily-guide-street-food"),
  },
  {
    name: "La Pescheria",
    area: "Catania's fish market",
    blurb:
      "Operatic morning theatre: swordfish heads, urchins, shouted prices, and tiny bars that grill your pick on the spot. Go hungry, before 11am.",
    image: img("sicily-guide-pescheria"),
  },
  {
    name: "Caponata",
    area: "the island on a plate",
    blurb:
      "Sweet-and-sour eggplant stew with celery, capers, and olives — every kitchen's own version, eaten warm or cold. Order it everywhere and argue about whose nonna wins.",
    image: img("sicily-guide-caponata"),
  },
  {
    name: "Pistachio di Bronte",
    area: "Etna's west flank",
    blurb:
      "The emerald-green DOP pistachio grown in lava soil — in pesto over pasta, crusted on swordfish, in gelato and granita. Anything labelled 'Bronte' is worth ordering.",
    image: img("sicily-guide-pistachio"),
  },
];

// ---------------------------------------------------------------------------
// 6 · Beaches & swims (October sea: ~24°C)
// ---------------------------------------------------------------------------
export const beaches: Place[] = [
  {
    name: "Isola Bella",
    area: "below Taormina",
    blurb:
      "A pebble tombolo tied to a tiny nature-reserve island — cable car down from town, swim in a marine reserve with the cliffs above you.",
    image: img("sicily-east-day4"),
  },
  {
    name: "Calamosche",
    area: "Vendicari reserve",
    blurb:
      "A 20-minute walk through the reserve ends at a perfect cove pinched between rocky headlands — often ranked Sicily's best beach, blissfully quiet in October.",
    image: img("sicily-guide-calamosche"),
  },
  {
    name: "Fontane Bianche",
    area: "15 min from Siracusa",
    blurb:
      "Ortigia's local beach: white sand, shallow transparent water, and enough beach bars still open in early October for a long lazy lunch.",
    image: img("sicily-guide-fontane-bianche"),
  },
  {
    name: "San Vito Lo Capo",
    area: "the west (Grand Loop only)",
    blurb:
      "A Caribbean-white crescent under Monte Monaco, considered the island's most beautiful sand. Pair with the Zingaro reserve's cove-to-cove coastal walk.",
    image: img("sicily-guide-san-vito"),
  },
  {
    name: "Marina di Ragusa & Sampieri",
    area: "SE coast",
    blurb:
      "The Baroque towns' seaside: long golden strands, a palm-lined lungomare, and the photogenic ruined brickworks at Punta Pisciotto near Sampieri.",
    image: img("sicily-guide-marina-ragusa"),
  },
  {
    name: "Scala dei Turchi",
    area: "south coast",
    blurb:
      "A blinding-white marl staircase rising from turquoise water — you swim beneath a natural sculpture. Best in late-day light (access from the Majata beach side).",
    image: img("sicily-guide-scala-dei-turchi"),
  },
  {
    name: "San Lorenzo",
    area: "between Noto & Marzamemi",
    blurb:
      "Fine white sand and shallow Caribbean-clear water minutes from Vendicari — the SE corner's favorite proper sandy beach, with lidos that stay open into early October.",
    image: img("sicily-guide-san-lorenzo"),
  },
];

// ---------------------------------------------------------------------------
// 7 · Practical notes for October
// ---------------------------------------------------------------------------
export const practicalNotes: PracticalNote[] = [
  {
    title: "October, by coast",
    icon: "🌤️",
    detail:
      "East coast: 24–26°C days, sea ~24°C, swimmable all month. Inland Baroque towns: warm days, cool evenings — bring a layer. Etna summit: winter up top (0–5°C), rent jackets at the cable car. Rain arrives as short bursts, not lost days.",
  },
  {
    title: "Driving & ZTL",
    icon: "🚗",
    detail:
      "Every historic center is a camera-enforced ZTL — never drive past the sign; fines find your rental company. Park in the lots ringing each old town (Ortigia: Talete garage; Ragusa: Piazza della Repubblica side; Taormina: Porta Catania/Lumbi) and walk in. Blue lines = paid, white = free.",
  },
  {
    title: "Etna logistics",
    icon: "🌋",
    detail:
      "South side (Rifugio Sapienza): cable car + 4x4 to ~2,900m, book the morning slot. North side (Piano Provenzana, via Randazzo): quieter guided hikes. Summit-crater access requires a guide and changes with activity — check a few days out, not months.",
  },
  {
    title: "Aeolian hydrofoils",
    icon: "⛴️",
    detail:
      "Liberty Lines from Milazzo: ~1h to Lipari, frequent in early October (reduced but reliable late month). Leave the car at a garage by the port (~€10–15/day). Stromboli night-boat trips run from Lipari while seas allow.",
  },
  {
    title: "Market days & timing",
    icon: "🧺",
    detail:
      "Ortigia and Catania markets run Mon–Sat mornings, done by 13:30 — go before 11. Sunday everything sleeps. Evening passeggiata is 18:00–20:00; restaurants genuinely open at 19:30–20:00, and the best tables in Ortigia/Marzamemi deserve a same-day booking in October.",
  },
  {
    title: "Booking ahead (the short list)",
    icon: "📝",
    detail:
      "Only a handful of things need advance booking in October: an Etna summit guide, Villa Romana del Casale timed entry (optional but wise), a Stromboli night boat, and Bonajuto's chocolate tasting in Modica. Everything else — wander in.",
  },
  {
    title: "Money & tipping",
    icon: "💶",
    detail:
      "Cards work almost everywhere now, but keep €50–100 in cash for market stalls, small bars, beach lidos, and parking meters. Tipping is not expected — round up or leave a couple of euros for great service; 'coperto' (€1–3/person) on the bill is normal, not a scam.",
  },
  {
    title: "Fuel & tolls",
    icon: "⛽",
    detail:
      "Self-service ('fai da te') pumps are noticeably cheaper than served lanes. The A18 Messina–Catania and Catania–Siracusa motorways have small tolls (€2–4); the SE Baroque towns are toll-free state roads. Fill up before Etna and before the Noto–Marzamemi corner — stations thin out.",
  },
];

// ---------------------------------------------------------------------------
// 8 · Town-by-town — what to do, where to eat, where to park
// ---------------------------------------------------------------------------
export const towns: TownGuide[] = [
  {
    name: "Catania",
    area: "arrival city, under Etna",
    time: "1 easy day (first + last night)",
    image: img("sicily-east-day1"),
    dontMiss: [
      "La Pescheria fish market in full voice (before 11am)",
      "Piazza del Duomo & the lava-stone elephant fountain",
      "Via Etnea passeggiata with Etna dead ahead",
      "Benedictine monastery of San Nicolò (one of Europe's largest)",
    ],
    eatDrink: [
      "Osteria Antica Marina — fish-market trattoria, book it",
      "Pasticceria Savia (1897) — arancini & cassatelle opposite the Bellini garden",
      "Prestipino Duomo — granita on the cathedral square",
    ],
    parking: "Use a garage near Piazza Repubblica or your hotel's deal; the center is ZTL.",
  },
  {
    name: "Taormina",
    area: "the balcony of Sicily",
    time: "2 nights",
    image: img("sicily-east-day2"),
    dontMiss: [
      "The Greek theatre at sunset, Etna smoking behind the stage",
      "Corso Umberto & the Piazza IX Aprile terrace",
      "Cable car down to Isola Bella for a swim",
      "Castelmola for almond wine above it all",
    ],
    eatDrink: [
      "Bam Bar — the island's most famous granita, worth the queue",
      "Osteria RossoDiVino — small courtyard, honest cooking",
      "Wunderbar on the piazza for one overpriced, perfect aperitivo",
    ],
    parking: "Porta Catania or Lumbi multi-storey, then walk/shuttle — never drive the Corso.",
  },
  {
    name: "Siracusa / Ortigia",
    area: "the island old town",
    time: "2 nights",
    image: img("sicily-east-day5"),
    dontMiss: [
      "Piazza Duomo — a temple wrapped in Baroque, glowing at dusk",
      "The morning street market on Via de Benedictis",
      "Neapolis: the Greek theatre & Ear of Dionysius",
      "A rock-ladder swim off the Lungomare di Levante",
    ],
    eatDrink: [
      "Caseificio Borderi — cult market sandwiches (go early, share one)",
      "Fratelli Burgio — deli platters on the market corner",
      "Cortile Verga for dinner in a courtyard; Gelateria Voglia Matta after",
    ],
    parking: "Talete garage on Ortigia's north edge — then everything is on foot.",
  },
  {
    name: "Noto",
    area: "Baroque's front page",
    time: "half a day + golden hour",
    image: img("sicily-east-day7"),
    dontMiss: [
      "Corso Vittorio Emanuele end-to-end at golden hour",
      "The cathedral staircase & Palazzo Ducezio terrace",
      "Palazzo Nicolaci's grotesque balconies",
      "Climb San Carlo's tower for the rooftop line-up",
    ],
    eatDrink: [
      "Caffè Sicilia (1892) — Assenza's legendary granita & cassata",
      "Anche gli Angeli — dinner in a converted church nave",
      "Cannolia for a filled-to-order cannolo on the corso",
    ],
    parking: "Free-ish streets below Porta Reale gardens; the corso is pedestrian.",
  },
  {
    name: "Modica",
    area: "chocolate in a canyon",
    time: "half a day + dinner",
    image: img("sicily-east-day8"),
    dontMiss: [
      "San Giorgio's 250-step staircase from Modica Bassa",
      "The view over the gorge-town from Pizzo Belvedere",
      "Chocolate tasting the 400-year-old cold-worked way",
      "Corso Umberto's evening stroll",
    ],
    eatDrink: [
      "Antica Dolceria Bonajuto (1880) — the chocolate pilgrimage",
      "Accursio Radici — casual offshoot of the town's Michelin kitchen",
      "Caffè dell'Arte for mpanatigghi (chocolate-and-meat pastries, trust us)",
    ],
    parking: "Along Corso Umberto's lower end or the Piazza Falcone-Borsellino lots.",
  },
  {
    name: "Ragusa Ibla",
    area: "the honey-stone maze",
    time: "1–2 nights",
    image: img("sicily-east-g5"),
    dontMiss: [
      "The Duomo di San Giorgio & its wedding-cake piazza",
      "Giardino Ibleo gardens at the town's prow",
      "The staircase path from Ragusa Superiore (Santa Maria delle Scale)",
      "Blue-hour wandering when the lanes empty out",
    ],
    eatDrink: [
      "I Banchi — Ciccio Sultano's bakery-bistro, book dinner",
      "Gelati DiVini — gelato in wine & olive-oil flavors on the piazza",
      "A rustic pork feast up the hill in Chiaramonte Gulfi",
    ],
    parking: "Lots by Giardino Ibleo or under Piazza della Repubblica; Ibla's lanes are car-hostile.",
  },
  {
    name: "Scicli",
    area: "the quiet one",
    time: "2–3 hours",
    image: img("sicily-guide-scicli"),
    dontMiss: [
      "Via Francesco Mormino Penna — a film set of a street",
      "Palazzo Beneventano's monstrous Moorish heads",
      "San Matteo church terrace above the rooftops",
      "'Montalbano's police station' (the town hall)",
    ],
    eatDrink: [
      "Caffè Sicilia's little rivals on Via Penna for granita",
      "Nivera or a gelato stop before the drive on",
    ],
    parking: "Easy free parking along the river boulevard — the joy of untouristed towns.",
  },
  {
    name: "Palermo",
    area: "if you go west",
    time: "2 nights (option)",
    image: img("sicily-guide-palermo"),
    dontMiss: [
      "The Palatine Chapel's gold + Monreale's mosaic Christ",
      "Ballarò & Capo markets in full theatre",
      "Quattro Canti, the Cathedral & Teatro Massimo",
      "Sunset seafood at Mondello's Liberty pier",
    ],
    eatDrink: [
      "Antica Focacceria San Francesco (1834) — panelle & the brave pani ca meusa",
      "Bar Marocco by the cathedral for iris pastries",
      "Enoteca Buttitta for Sicilian wines by the glass",
    ],
    parking: "Garage it and forget it — Palermo traffic is a contact sport. Walk + taxis.",
  },
];

// ---------------------------------------------------------------------------
// 9 · Etna, properly — five ways at the volcano
// ---------------------------------------------------------------------------
export const etnaGuide: Place[] = [
  {
    name: "The summit from the south",
    area: "Rifugio Sapienza · half day",
    blurb:
      "The classic: drive to 1,900m, cable car to 2,500m, then 4x4 bus + guide toward the summit craters (~2,900m). Book a morning slot for clear air; jackets rentable at the base. This is the route in your Day 3.",
    image: img("sicily-east-day3"),
  },
  {
    name: "The quiet north side",
    area: "Piano Provenzana · half day",
    blurb:
      "Etna without the coach parties: guided 4x4 or hikes from Piano Provenzana through the 2002 lava field and birch woods. Pair with lunch in lava-stone Randazzo — the connoisseur's choice.",
    image: img("sicily-east-g2"),
  },
  {
    name: "Ride the Circumetnea",
    area: "Catania ⇄ Randazzo · half day",
    blurb:
      "A narrow-gauge railway that circles the volcano through lava fields, pistachio groves, and prickly pears — a slow-travel gem locals use for shopping runs. Ride a scenic leg one-way and loop back by car.",
    image: img("sicily-guide-circumetnea"),
  },
  {
    name: "Wineries on the lava",
    area: "Randazzo–Passopisciaro–Milo · half day",
    blurb:
      "Etna DOC is Italy's most exciting wine story — Nerello Mascalese reds and Carricante whites from century-old vines in black ash. Cellar doors around the north-flank wine road take walk-ins; book one proper tasting.",
    image: img("sicily-guide-etna-wine"),
  },
  {
    name: "Bronte & the Simeto",
    area: "west flank · 2–3 hours",
    blurb:
      "Pistachio country: the town of Bronte above the Simeto valley and the medieval Ponte dei Saraceni arching over lava gorges. Stock up on pistachio everything at a town pasticceria.",
    image: img("sicily-guide-bronte"),
  },
];

// ---------------------------------------------------------------------------
// 10 · Further afield — west & islands (for the longer variants)
// ---------------------------------------------------------------------------
export const westAndIslands: Place[] = [
  {
    name: "Monreale",
    area: "20 min above Palermo",
    blurb:
      "A cathedral ceiling of 6,000 m² of golden Byzantine mosaics culminating in the great Christ Pantocrator — Norman Sicily's masterpiece and worth the Palermo detour alone.",
    image: img("sicily-guide-monreale"),
  },
  {
    name: "Mondello",
    area: "Palermo's beach",
    blurb:
      "A turquoise crescent under Monte Pellegrino with a fabulous Art Nouveau pier-pavilion — where Palermo swims, poses, and eats fried seafood cones on the lungomare.",
    image: img("sicily-guide-mondello"),
  },
  {
    name: "Riserva dello Zingaro",
    area: "NW coast",
    blurb:
      "Sicily's first nature reserve: a car-free 7 km coastal path linking pebble coves of absurdly clear water beneath dwarf-palm slopes. Walk in from Scopello, swim your way north.",
    image: img("sicily-guide-zingaro"),
  },
  {
    name: "Erice",
    area: "above Trapani",
    blurb:
      "A medieval triangle of stone lanes at 750m, often inside a cloud — castle views to the Egadi, and Maria Grammatico's convent-recipe pastries as the reason to linger.",
    image: img("sicily-guide-erice"),
  },
  {
    name: "Trapani's salt pans",
    area: "west coast",
    blurb:
      "Shimmering saline, windmills, and mountains of harvested salt along the lagoon road to Marsala — best at sunset with flamingos in the shallows. Taste Marsala in a historic baglio.",
    image: img("sicily-guide-salt-pans"),
  },
  {
    name: "Favignana & the Egadi",
    area: "30 min hydrofoil from Trapani",
    blurb:
      "Butterfly-shaped island of bike lanes, tuff quarries turned secret gardens, and the electric-blue Cala Rossa. Rent bikes at the port and circle it in a day.",
    image: img("sicily-guide-favignana"),
  },
  {
    name: "Salina",
    area: "Aeolians' green island",
    blurb:
      "Twin volcanic peaks, caper farms, and Malvasia vineyards — the lush, quiet Aeolian. Sunset at Pollara (of 'Il Postino' fame) is the archipelago's gentlest ritual.",
    image: img("sicily-guide-salina"),
  },
  {
    name: "San Vito Lo Capo",
    area: "NW tip",
    blurb:
      "The island's most beautiful sand — a white crescent under Monte Monaco, still warm in early October, with the Zingaro path starting just down the coast.",
    image: img("sicily-guide-san-vito"),
  },
];

// ---------------------------------------------------------------------------
// 11 · Perfect days — hour-by-hour samples to steal from
// ---------------------------------------------------------------------------
export const perfectDays: PerfectDay[] = [
  {
    title: "Ortigia, done right",
    blurb: "The island old town at its own tempo — market morning, sea afternoon, Baroque night.",
    steps: [
      { time: "08:30", what: "Coffee + cornetto standing at a bar on Piazza Archimede." },
      { time: "09:30", what: "The street market: Borderi sandwich being built, cheese & oregano shopping at Fratelli Burgio." },
      { time: "11:00", what: "Neapolis archaeological park — Greek theatre and the Ear of Dionysius before it heats up." },
      { time: "13:30", what: "Market-deli lunch you carried off, on the Lungomare wall." },
      { time: "15:00", what: "Swim + laze off the Forte Vigliena rock ladders (or Plemmirio's coves by car)." },
      { time: "18:00", what: "Duomo square as the stone goes gold; Aperol on the steps side." },
      { time: "20:30", what: "Courtyard dinner (book Cortile Verga), gelato stroll along Via Cavour." },
    ],
  },
  {
    title: "Etna & wine day",
    blurb: "Volcano in the morning, vineyards in the afternoon — the east coast's signature combo.",
    steps: [
      { time: "07:30", what: "Leave Taormina; coffee stop in Zafferana Etnea (Sunday? — it's Ottobrata festival)." },
      { time: "09:00", what: "Rifugio Sapienza: cable car + 4x4 + guide to the summit-crater zone." },
      { time: "12:30", what: "Descend; picnic or rifugio lunch among the lava." },
      { time: "14:30", what: "Drive the north flank wine road to Passopisciaro/Randazzo." },
      { time: "15:30", what: "Booked cellar tasting — Nerello reds in a black-ash vineyard." },
      { time: "18:00", what: "Golden-hour wander of lava-stone Randazzo; pistachio gelato." },
      { time: "20:00", what: "Back via the coast; late dinner in Taormina, legs pleasantly wrecked." },
    ],
  },
  {
    title: "The Baroque triangle",
    blurb: "Three UNESCO towns in one unhurried day — Modica, Scicli, Ragusa Ibla.",
    steps: [
      { time: "09:00", what: "Modica: San Giorgio's staircase before the light flattens; Bonajuto chocolate tasting." },
      { time: "11:30", what: "Scicli: Via Penna, Palazzo Beneventano's grotesques, San Matteo terrace." },
      { time: "13:30", what: "Long pork lunch up in Chiaramonte Gulfi ('the balcony of Sicily')." },
      { time: "16:00", what: "Ragusa Ibla: Duomo piazza, Giardino Ibleo, get purposefully lost." },
      { time: "18:30", what: "Gelati DiVini's wine-flavored scoops as the swifts come out." },
      { time: "20:30", what: "Dinner at I Banchi — you booked it two days ago, well done." },
    ],
  },
  {
    title: "The slow coast",
    blurb: "The southeast corner at sea level — reserve, beach, fishing village, land's end.",
    steps: [
      { time: "09:30", what: "Vendicari reserve: flamingo lagoons and the ruined tonnara walk." },
      { time: "11:30", what: "Calamosche cove — the 20-minute path earns you the swim." },
      { time: "14:00", what: "Late lunch in Marzamemi's piazza (Campisi for tuna everything)." },
      { time: "16:00", what: "Drive to Isola delle Correnti — stand where two seas meet." },
      { time: "17:30", what: "San Lorenzo beach for the last warm hour and a lido spritz." },
      { time: "20:00", what: "Sunset dinner back in Marzamemi, boats knocking in the little harbor." },
    ],
  },
];

// ---------------------------------------------------------------------------
// 12 · October on the island — what's on (confirm exact dates when booking)
// ---------------------------------------------------------------------------
export const octoberEvents: Place[] = [
  {
    name: "Ottobrata Zafferanese",
    area: "Zafferana Etnea · Sundays in October",
    blurb:
      "Etna's harvest festival takes over the town every Sunday of the month — mushrooms, honey, chestnuts, new wine, and pistachio everything, with the volcano smoking overhead.",
    image: img("sicily-guide-zafferana"),
  },
  {
    name: "Vendemmia on Etna",
    area: "wine country · late Sept–Oct",
    blurb:
      "Harvest season on the volcano — cellars are busy, vines turn gold, and tastings come with crush-time energy. The best month of the year to visit Etna DOC country.",
    image: img("sicily-guide-etna-wine"),
  },
  {
    name: "Bronte pistachio sagra",
    area: "Bronte · turn of Sept/Oct",
    blurb:
      "The pistachio town's annual blowout — stalls of green gold in every form. Dates shift year to year; if it aligns with your Etna day, detour without hesitation.",
    image: img("sicily-guide-pistachio"),
  },
  {
    name: "Le Vie dei Tesori",
    area: "Palermo, Catania & more · Oct weekends",
    blurb:
      "A brilliant open-monuments festival: palazzi, rooftops, crypts, and cloisters that are normally locked open for guided visits on autumn weekends. Check the program city by city.",
    image: img("sicily-guide-palermo"),
  },
  {
    name: "Rainy-day Plan B",
    area: "everywhere",
    blurb:
      "Opera dei Pupi puppet theatre (Siracusa or Palermo — UNESCO-listed knights-and-dragons), the Paolo Orsi archaeological museum, market grazing under cover, and long chocolate 'research' in Modica.",
    image: img("sicily-guide-pupi"),
  },
];

// ---------------------------------------------------------------------------
// 13 · Getting around — drive times & budget ballparks
// ---------------------------------------------------------------------------
export const driveLegs: DriveLeg[] = [
  { from: "Catania airport", to: "Taormina", time: "50 min", note: "A18 motorway" },
  { from: "Taormina", to: "Etna Sud (Rifugio Sapienza)", time: "1h 10m", note: "via Zafferana" },
  { from: "Taormina", to: "Savoca / Forza d'Agrò", time: "35–45 min", note: "Godfather loop" },
  { from: "Catania", to: "Siracusa", time: "50 min", note: "motorway" },
  { from: "Siracusa", to: "Noto", time: "35 min" },
  { from: "Noto", to: "Marzamemi", time: "25 min" },
  { from: "Noto", to: "Modica", time: "40 min" },
  { from: "Modica", to: "Ragusa Ibla", time: "25 min" },
  { from: "Ragusa", to: "Piazza Armerina (mosaics)", time: "1h 20m" },
  { from: "Piazza Armerina", to: "Agrigento", time: "1h 30m" },
  { from: "Agrigento", to: "Palermo", time: "2h" },
  { from: "Catania", to: "Milazzo (hydrofoils)", time: "1h 30m", note: "for the Aeolians" },
];

export const budget: BudgetItem[] = [
  { item: "Compact rental car", range: "€30–55 / day", note: "October rates; book the small one" },
  { item: "Fuel", range: "~€1.75–1.90 / L", note: "self-service is cheaper" },
  { item: "B&B / boutique room", range: "€70–130 / night", note: "Ortigia & Taormina at the top end" },
  { item: "Agriturismo (with breakfast)", range: "€80–140 / night", note: "great value in the SE" },
  { item: "Casual lunch", range: "€10–15 pp", note: "market grazing even less" },
  { item: "Dinner for two + wine", range: "€50–90", note: "I Banchi-tier ~€120+" },
  { item: "Etna summit (cable + 4x4 + guide)", range: "€75–95 pp" },
  { item: "Milazzo ⇄ Lipari hydrofoil", range: "€17–22 each way" },
  { item: "Major sites (Neapolis, Villa Casale, temples)", range: "€10–18 pp each" },
  { item: "Granita + brioche", range: "€4–6", note: "the most important line item" },
];

// ---------------------------------------------------------------------------
// 14 · The trip is real: timeline & bookings (flights booked Oct 30 – Nov 7)
// ---------------------------------------------------------------------------
export const timeline: TimelineDay[] = [
  {
    date: "Fri 30 Oct",
    title: "Fly out",
    detail: "Delta 142, Seattle 15:25 → Amsterdam (overnight). Sleep on the plane — tomorrow is a real day.",
    night: "In the air",
    flight: true,
  },
  {
    date: "Sat 31 Oct",
    title: "Arrive in Sicily",
    detail:
      "Land Amsterdam 09:25, connect on Delta 9294 (KLM) 12:40 → Catania 15:25. Grab the car and drive straight up to Taormina (50 min). First passeggiata on Corso Umberto, early jet-lag dinner.",
    night: "Taormina",
    flight: true,
  },
  {
    date: "Sun 1 Nov",
    title: "Taormina day",
    detail:
      "Greek theatre at opening, cable car down to Isola Bella for a swim, Castelmola and almond wine for sunset. It's All Saints' Day — sights are open and towns are out in their Sunday best; book dinner.",
    night: "Taormina",
  },
  {
    date: "Mon 2 Nov",
    title: "Etna → Siracusa",
    detail:
      "Summit morning from Rifugio Sapienza (guide booked, jackets rented there), lunch among the vines on the way down, then the drive south to Siracusa. Evening stroll onto Ortigia.",
    night: "Ortigia",
  },
  {
    date: "Tue 3 Nov",
    title: "Ortigia, done right",
    detail:
      "The 'perfect day' from above, verbatim: market morning and a Borderi sandwich, Neapolis ruins, a rock-ladder swim, Duomo square at golden hour, courtyard dinner.",
    night: "Ortigia",
  },
  {
    date: "Wed 4 Nov",
    title: "Noto & the slow coast",
    detail:
      "Noto's corso with a Caffè Sicilia granita, then Vendicari or Calamosche for the afternoon, sunset dinner in Marzamemi, and the hour's drive up to Ragusa.",
    night: "Ragusa Ibla",
  },
  {
    date: "Thu 5 Nov",
    title: "The Baroque triangle",
    detail:
      "Modica (Bonajuto tasting), Scicli's Via Penna, optional Chiaramonte pork lunch, then back to Ibla for blue hour and the I Banchi dinner you reserved.",
    night: "Ragusa Ibla",
  },
  {
    date: "Fri 6 Nov",
    title: "Wind back east",
    detail:
      "Slow Ibla morning, then one last pick en route north — Caltagirone's staircase or Donnafugata's castle — and a final seafood dinner by Catania's Pescheria.",
    night: "Catania",
  },
  {
    date: "Sat 7 Nov",
    title: "Fly home",
    detail:
      "Car back by ~08:30. Delta 245, Catania 10:55 → JFK 15:39, then Delta 688, 18:40 → Seattle 22:12. Granita withdrawal begins.",
    night: "Home",
    flight: true,
  },
];

export const bookings: Booking[] = [
  {
    icon: "✈️",
    title: "Flights",
    when: "Oct 30 → Nov 7",
    status: "booked",
    detail:
      "SEA→AMS Delta 142 (Oct 30, 15:25) · AMS→CTA Delta 9294/KLM (Oct 31, 12:40→15:25) · CTA→JFK Delta 245 (Nov 7, 10:55→15:39) · JFK→SEA Delta 688 (18:40→22:12).",
  },
  {
    icon: "🚗",
    title: "Rental car — Catania airport",
    when: "Oct 31 ~16:00 → Nov 7 ~08:30",
    status: "todo",
    detail:
      "Compact, full-to-full, both drivers named. Confirm the ZTL/toll handling policy and airport drop-off logistics for the early return.",
  },
  {
    icon: "🛏️",
    title: "Stay 1 — Taormina",
    when: "Oct 31 – Nov 2 · 2 nights",
    status: "todo",
    detail: "Old-town B&B with a terrace if possible; have the hotel sort parking (Porta Catania side).",
  },
  {
    icon: "🛏️",
    title: "Stay 2 — Ortigia, Siracusa",
    when: "Nov 2 – 4 · 2 nights",
    status: "todo",
    detail: "Sleep on the island itself — the evenings are the point. Talete garage for the car.",
  },
  {
    icon: "🛏️",
    title: "Stay 3 — Ragusa Ibla",
    when: "Nov 4 – 6 · 2 nights",
    status: "todo",
    detail: "Stay down in Ibla (not Superiore) so the lanes are yours after dark.",
  },
  {
    icon: "🛏️",
    title: "Stay 4 — Catania",
    when: "Nov 6 – 7 · 1 night",
    status: "todo",
    detail: "Center or airport-side, whatever makes the 10:55 departure painless.",
  },
  {
    icon: "🌋",
    title: "Etna summit guide",
    when: "Mon Nov 2, first morning slot",
    status: "todo",
    detail: "Cable car + 4x4 + guide from Rifugio Sapienza (~€75–95 pp). Book a few days out; check activity status.",
  },
  {
    icon: "🍽️",
    title: "Dinner reservations",
    when: "day-of or a day ahead",
    status: "optional",
    detail: "I Banchi (Ragusa, Nov 5) · Cortile Verga (Ortigia, Nov 3) · a Taormina table for All Saints' Sunday (Nov 1).",
  },
  {
    icon: "🍫",
    title: "Bonajuto chocolate tasting",
    when: "Thu Nov 5, midday",
    status: "optional",
    detail: "The guided tasting in the 1880 shop is worth the couple-of-days-ahead booking.",
  },
];
