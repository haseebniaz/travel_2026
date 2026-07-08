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
];
