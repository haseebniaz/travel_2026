// Single source of truth for all trip options shown on the dashboard and detail pages.
// Images use LoremFlickr keyword URLs (locked seeds for stable results); every <img>
// falls back to a labeled gradient via the SmartImage component if a photo fails to load.

export type GalleryImage = {
  url: string;
  caption: string;
};

export type ItineraryDay = {
  day: string;
  title: string;
  detail: string;
};

export type Weather = {
  high: number; // avg daytime high, °C
  low: number; // avg overnight low, °C
  rainDays: number; // approx rainy days in October
  sky: string; // qualitative sky tendency
  seaTemp?: number; // sea temp °C, coastal trips
  verdict: string; // one-line October verdict
};

export type Trip = {
  slug: string;
  title: string;
  region: string;
  country: string;
  flag: string;
  tagline: string;
  days: number;
  loop: string; // fly-in / route summary
  feel: string[];
  highlights: string[];
  driving: string;
  bikeScooter: string;
  itinerary: ItineraryDay[];
  weather: Weather;
  tags: string[];
  heroImage: string;
  gallery: GalleryImage[];
};

const img = (keyword: string, lock: number) =>
  `https://loremflickr.com/1600/1000/${keyword}?lock=${lock}`;

export const trips: Trip[] = [
  {
    slug: "amalfi-campania",
    title: "Amalfi Coast & Bay of Naples",
    region: "Campania",
    country: "Italy",
    flag: "🇮🇹",
    tagline:
      "Cliff-hugging corniche drives, lemon groves, and the Vespa buzz of Sorrento & Positano.",
    days: 8,
    loop: "Fly into Naples → Sorrento → Amalfi → Ravello → Naples",
    feel: [
      "This is the closest cousin to your Riviera trip: a serpentine coast road carved into vertical cliffs, pastel villages spilling toward a cobalt sea, and that same rhythm of driving a stretch, parking, and wandering until you're hungry. The SS163 Amalfitana is one of the great drives of the world — terrifying and gorgeous in equal measure.",
      "The pace is sensory and a little chaotic in the best way. Mornings smell of espresso and sea salt; afternoons are lemon granita in a shaded piazza; evenings are long dinners where nobody's in a hurry. Sorrento makes a relaxed base, Ravello a quiet high-altitude one, and Positano the postcard you'll keep coming back to.",
      "You'll ditch the car constantly. Scooters rule the towns here — it's the natural way to zip between Sorrento's clifftop lidos, and ferries fill the gaps to Capri and Positano when the coast road clogs up. October thins the summer crowds without cooling the sea.",
    ],
    highlights: [
      "Driving the Amalfitana between Positano and Amalfi at golden hour",
      "Day-tripping to Capri by ferry, scooter around the island",
      "Ravello's Villa Cimbrone terrace high above the sea",
      "Backstreet pizza and sfogliatella in Naples' old center",
      "Paestum's Greek temples on the plain south of Salerno",
    ],
    driving:
      "The star is the SS163 — narrow, cliff-edge, and slow (budget 90+ min for Sorrento–Amalfi). Rent the smallest car you can; big cars are a liability on the coast road. Consider basing yourself and using ferries/scooters for the tightest stretches rather than driving every day.",
    bikeScooter:
      "Scooter is the local idiom — rent one in Sorrento or on Capri to reach hidden lidos and viewpoints the buses skip. E-bikes work for the Sorrentine peninsula's gentler lanes, but the main coast road is steep and traffic-heavy, so save cycling for quieter side valleys.",
    itinerary: [
      { day: "Day 1", title: "Land in Naples", detail: "Pick up the car, but leave it parked. Dive into the Centro Storico for pizza, espresso, and the raw energy of the old city." },
      { day: "Day 2", title: "Naples → Sorrento", detail: "Short drive around the bay. Settle into Sorrento, walk the clifftop marina, and rent a scooter for the peninsula." },
      { day: "Day 3", title: "Capri day trip", detail: "Ferry from Sorrento. Scooter or chairlift to Monte Solaro, swim off the rocks, aperitivo in the piazzetta." },
      { day: "Day 4", title: "The Amalfitana drive", detail: "The big one: Sorrento to Positano to Amalfi along the SS163. Stop constantly. Base in Amalfi or Praiano." },
      { day: "Day 5", title: "Ravello & the highlands", detail: "Climb to Ravello for Villa Rufolo and Villa Cimbrone terraces, then quiet hilltop lanes above the coast." },
      { day: "Day 6", title: "Paestum & the south", detail: "Drive south past Salerno to Paestum's astonishing Greek temples, with buffalo-mozzarella farms en route." },
      { day: "Day 7", title: "Positano slow day", detail: "Beach morning, boat trip to hidden coves, long lunch. No agenda — pure coast." },
      { day: "Day 8", title: "Back to Naples", detail: "Coast drive back, a last archaeological stop at Pompeii or Herculaneum, then fly out." },
    ],
    weather: { high: 22, low: 14, rainDays: 7, sky: "Mostly sunny", seaTemp: 22, verdict: "Warm and still swimmable in early October, with summer crowds gone." },
    tags: ["Coastal", "Scooter towns", "Food", "Classic"],
    heroImage: img("positano,amalfi", 21),
    gallery: [
      { url: img("positano", 22), caption: "Positano tumbling toward the sea" },
      { url: img("amalfi,coast", 23), caption: "The SS163 coast road" },
      { url: img("capri,italy", 24), caption: "Capri's cliffs and blue water" },
      { url: img("ravello", 25), caption: "Ravello's terraces above the coast" },
      { url: img("naples,pizza", 26), caption: "Naples: espresso, pizza, chaos" },
      { url: img("sorrento", 27), caption: "Sorrento's clifftop marina" },
    ],
  },
  {
    slug: "tuscany-val-dorcia",
    title: "Tuscany & Val d'Orcia",
    region: "Tuscany",
    country: "Italy",
    flag: "🇮🇹",
    tagline:
      "Cypress-lined backroads, hilltop wine towns, and slow golden-hour cycling.",
    days: 7,
    loop: "Fly into Florence or Pisa → Siena → Montepulciano → Val d'Orcia → Chianti",
    feel: [
      "If the Riviera was about the sea, this is its inland mirror: rolling gold-and-green hills stitched together by white gravel 'strade bianche', each ridge crowned with a medieval town. The driving is the destination — every bend frames another cypress avenue you'll want to stop and photograph.",
      "The tempo is unhurried and indulgent. You base in a stone farmhouse or a walled town, drive 30–40 minutes to the next hilltop, taste wine you can't pronounce, and roll home at dusk. Pienza, Montalcino, and Montepulciano form a perfect triangle of piazzas, pecorino, and Brunello.",
      "This is genuinely the most bike-friendly of the Italian options. The Val d'Orcia and Chianti are cycling heartland — e-bikes flatten the hills and let you thread the vineyards, and the towns are compact enough to explore entirely on foot or two wheels.",
    ],
    highlights: [
      "Sunrise over the cypress rows of the Val d'Orcia",
      "Wine tasting in Montalcino (Brunello) and Montepulciano",
      "The fan-shaped Piazza del Campo in Siena",
      "Renaissance-perfect Pienza and its pecorino",
      "E-biking the strade bianche between vineyards",
    ],
    driving:
      "Gentle, scenic, low-stress — the opposite of the Amalfitana. Roads are well-kept and quiet; the famous white gravel strade bianche are drivable in any rental. Distances are short, so you can wander without a plan. Watch for ZTL restricted zones in town centers — park outside the walls.",
    bikeScooter:
      "The strongest cycling pick. Rent e-bikes in Montalcino, Pienza, or the Chianti and ride vineyard lanes and gravel roads between tastings. Towns are walkable in 20 minutes end to end; a bike is all you need once you've parked the car.",
    itinerary: [
      { day: "Day 1", title: "Land & drive to Siena", detail: "Collect the car, head to Siena. Evening in the Piazza del Campo as the light goes amber." },
      { day: "Day 2", title: "Siena & the Chianti", detail: "Morning in Siena, then a lazy drive south through Chianti vineyards with a tasting stop." },
      { day: "Day 3", title: "Into the Val d'Orcia", detail: "Base near Pienza or Montepulciano. Afternoon cypress-avenue photo drive around San Quirico." },
      { day: "Day 4", title: "Montalcino & Brunello", detail: "Wine day: Montalcino's fortress and cellars, lunch with a view, back roads home." },
      { day: "Day 5", title: "E-bike the valley", detail: "Ditch the car — e-bike the strade bianche between Pienza and the vineyards, picnic in the hills." },
      { day: "Day 6", title: "Montepulciano & Bagno Vignoni", detail: "Explore Montepulciano's steep lanes, then soak the evening at the thermal village of Bagno Vignoni." },
      { day: "Day 7", title: "Slow return", detail: "Meander back toward Florence/Pisa with a final hill-town stop and fly out." },
    ],
    weather: { high: 20, low: 10, rainDays: 7, sky: "Sun and cloud mix", verdict: "Crisp, golden, and ideal for driving and cycling; harvest season energy." },
    tags: ["Countryside", "Wine", "Cycling", "Slow travel"],
    heroImage: img("val,orcia,tuscany", 31),
    gallery: [
      { url: img("tuscany,cypress", 32), caption: "Cypress avenues of the Val d'Orcia" },
      { url: img("siena,italy", 33), caption: "Siena's Piazza del Campo" },
      { url: img("montepulciano", 34), caption: "Hilltop Montepulciano" },
      { url: img("chianti,vineyard", 35), caption: "Chianti vineyards in autumn" },
      { url: img("pienza", 36), caption: "Renaissance-perfect Pienza" },
      { url: img("tuscany,wine", 37), caption: "Brunello country" },
    ],
  },
  {
    slug: "sicily-east",
    title: "Sicily — East & Baroque Southeast",
    region: "Eastern Sicily",
    country: "Italy",
    flag: "🇮🇹",
    tagline:
      "Etna's smoke, Taormina's balconies, honey-stone Baroque towns, and a still-warm sea.",
    days: 9,
    loop: "Fly into Catania → Taormina → Etna → Siracusa → Baroque SE → Catania",
    feel: [
      "Sicily turns everything up a notch — the landscape is more dramatic, the history deeper, the food bolder. You have a live volcano on one side and a wine-dark sea on the other, and a coast road that runs between them. It feels less polished and more alive than mainland Italy.",
      "The rhythm splits in two: high theatrical Taormina and smoking Etna in the north, then the golden Baroque southeast — Siracusa, Noto, Ragusa, Modica — where entire towns were rebuilt in honey-colored stone after a 17th-century earthquake. Chocolate in Modica, granita for breakfast, seafood everywhere.",
      "October is arguably the best month: the sea is still warm, the summer heat has broken, and Etna is snow-dusted at the top while it's beach weather below. Scooters are perfect for the Baroque towns; the driving between them is easy and gorgeous.",
    ],
    highlights: [
      "Taormina's Greek theatre framing Etna and the sea",
      "Standing on Etna's lava fields, cable car to the craters",
      "Ortigia, Siracusa's island old town at aperitivo hour",
      "The golden Baroque of Noto, Ragusa Ibla, and Modica",
      "Chocolate tasting in Modica",
    ],
    driving:
      "Easy and rewarding once you're out of Catania's traffic. Good roads link the Baroque towns; the coast and Etna approaches are scenic. Distances are moderate (Taormina–Siracusa ~1.5h). Park outside the historic centers and walk in — the old towns are pedestrianized.",
    bikeScooter:
      "Scooter the compact old towns of Ortigia and Ragusa Ibla, or rent one in Taormina to reach the coves below town. Etna has guided e-bike and 4x4 tours on the lower slopes. The Baroque towns themselves are best on foot and two wheels.",
    itinerary: [
      { day: "Day 1", title: "Land in Catania", detail: "Explore Catania's lava-stone Baroque center and fish market. Easy first night." },
      { day: "Day 2", title: "North to Taormina", detail: "Coast drive up to Taormina. Greek theatre at sunset with Etna smoking behind." },
      { day: "Day 3", title: "Mount Etna", detail: "Drive up the volcano, cable car and jeep to the summit craters, walk old lava flows." },
      { day: "Day 4", title: "Taormina beaches", detail: "Isola Bella, scooter the coves, or a wine tasting on Etna's volcanic slopes." },
      { day: "Day 5", title: "South to Siracusa", detail: "Drive to Siracusa. Evening on Ortigia island — the best passeggiata in Sicily." },
      { day: "Day 6", title: "Siracusa & Ortigia", detail: "Greek ruins at the Neapolis park by day, seafood and spritz on Ortigia by night." },
      { day: "Day 7", title: "Baroque triangle", detail: "Noto's golden main street, then base in Ragusa Ibla among the honey-stone lanes." },
      { day: "Day 8", title: "Modica & Ragusa", detail: "Chocolate in Modica, wander Ragusa Ibla, a slow day among the Baroque." },
      { day: "Day 9", title: "Return to Catania", detail: "Drive back with a final coastal or beach stop, then fly out." },
    ],
    weather: { high: 25, low: 17, rainDays: 5, sky: "Sunny", seaTemp: 24, verdict: "The warmest option — full beach weather and a warm sea well into the month." },
    tags: ["Coastal", "Volcano", "Baroque", "Warmest"],
    heroImage: img("taormina,sicily", 41),
    gallery: [
      { url: img("taormina", 42), caption: "Taormina above the Ionian Sea" },
      { url: img("etna,volcano", 43), caption: "Mount Etna's craters" },
      { url: img("siracusa,ortigia", 44), caption: "Ortigia, Siracusa's old island" },
      { url: img("noto,sicily", 45), caption: "Baroque Noto in golden stone" },
      { url: img("ragusa,sicily", 46), caption: "Ragusa Ibla" },
      { url: img("modica,chocolate", 47), caption: "Modica, town of chocolate" },
    ],
  },
  {
    slug: "dalmatian-coast",
    title: "Dalmatian Coast",
    region: "Dalmatia",
    country: "Croatia",
    flag: "🇭🇷",
    tagline:
      "Adriatic island-hopping, walled old towns, and pine-and-limestone coast roads.",
    days: 8,
    loop: "Fly into Split → Trogir → Hvar → Korčula → Dubrovnik",
    feel: [
      "Croatia's coast is the Mediterranean stripped back to its cleanest form: white limestone, dark pines, and impossibly clear water, with Venetian-walled towns dropped along it. The Adriatic Highway hugs the shore the whole way south, and ferries lace out to a chain of islands you can car-hop between.",
      "The feel is relaxed and swimmy — you'll be in and out of the sea constantly, off rocky coves rather than sand. Split's Diocletian's Palace is a living Roman ruin full of bars and laundry lines; Hvar is chic and sunny; Korčula is a mini walled Dubrovnik; and Dubrovnik itself is the showstopper finale.",
      "It's easy driving with dramatic sea views, and the old towns are all pedestrian mazes made for wandering. Bring a mix of car and ferry, and rent bikes or a scooter on the islands where the pace slows right down.",
    ],
    highlights: [
      "Living inside Split's Diocletian's Palace",
      "Car ferry to Hvar for lavender fields and clear coves",
      "Korčula's walled old town, said to be Marco Polo's birthplace",
      "Walking Dubrovnik's city walls at golden hour",
      "Swimming off the Pakleni islands",
    ],
    driving:
      "The Adriatic Highway (D8) is a beautiful, easy coastal drive. Ferries connect the islands — book car spots ahead in shoulder season for the big crossings. Note the short border hop through Neum (Bosnia) en route to Dubrovnik; bring passports. Old towns are car-free, so park at the edges.",
    bikeScooter:
      "Islands are scooter country — rent one on Hvar or Korčula to reach hidden coves and hilltop villages. Bike paths run along parts of the coast and around the islands. The walled towns (Trogir, Korčula, Dubrovnik) are compact, pedestrian, and made for wandering on foot.",
    itinerary: [
      { day: "Day 1", title: "Land in Split", detail: "Lose yourself inside Diocletian's Palace; sunset drinks on the Riva waterfront." },
      { day: "Day 2", title: "Trogir & Split", detail: "Morning in tiny walled Trogir, afternoon swimming and exploring around Split." },
      { day: "Day 3", title: "Ferry to Hvar", detail: "Car ferry across. Base in Hvar town, scooter to coves and lavender-scented villages." },
      { day: "Day 4", title: "Pakleni islands", detail: "Boat out to the Pakleni islets for the clearest swimming, back for Hvar's nightlife or a quiet konoba." },
      { day: "Day 5", title: "On to Korčula", detail: "Island-hop south to Korčula. Evening in its Venetian old town on the water." },
      { day: "Day 6", title: "Korčula & Pelješac", detail: "Wine tasting on the Pelješac peninsula (Plavac Mali), quiet coves, oysters at Ston." },
      { day: "Day 7", title: "South to Dubrovnik", detail: "Drive down the coast to Dubrovnik. Evening walk of the illuminated old town." },
      { day: "Day 8", title: "Dubrovnik walls", detail: "Walk the city walls early, cable car to Srđ for the view, then fly out." },
    ],
    weather: { high: 21, low: 13, rainDays: 7, sky: "Mostly sunny", seaTemp: 21, verdict: "Mild and swimmable early on; rain chances rise later in the month." },
    tags: ["Coastal", "Islands", "Walled towns", "Swimming"],
    heroImage: img("dubrovnik", 51),
    gallery: [
      { url: img("split,croatia", 52), caption: "Split's Diocletian's Palace" },
      { url: img("hvar,croatia", 53), caption: "Hvar and the Pakleni islands" },
      { url: img("korcula", 54), caption: "Walled Korčula" },
      { url: img("dubrovnik,walls", 55), caption: "Dubrovnik's old town" },
      { url: img("croatia,coast", 56), caption: "The Adriatic Highway" },
      { url: img("trogir", 57), caption: "Tiny walled Trogir" },
    ],
  },
  {
    slug: "peloponnese",
    title: "Peloponnese Loop",
    region: "Peloponnese",
    country: "Greece",
    flag: "🇬🇷",
    tagline:
      "Ancient ruins on empty beaches, stone mountain villages, and warm October light.",
    days: 8,
    loop: "Fly into Athens → Nafplio → Monemvasia → Mani → Olympia → Athens",
    feel: [
      "The Peloponnese is Greece's uncrowded heart — a big peninsula where you can have a 2,500-year-old theatre almost to yourself in the morning and a deserted beach in the afternoon. It rewards exactly your style: drive a mountain road, drop into a stone village, wander, swim, eat, repeat.",
      "The mood is warm, slow, and deeply Greek. Nafplio is an elegant seaside town of Venetian forts and neoclassical lanes; Monemvasia is a Byzantine town hidden on the far side of a giant sea rock; the Mani is wild and tower-studded; and Olympia and Mycenae bring the ancient world close.",
      "October light in Greece is golden and forgiving, the sea still warm, the tavernas relaxed now the summer rush is over. Driving is easy on quiet roads, and the compact old towns are perfect for scooters and evening strolls.",
    ],
    highlights: [
      "Nafplio's Venetian old town and Palamidi fortress",
      "The perfectly preserved theatre at Epidaurus",
      "Monemvasia — a whole town hidden behind a sea rock",
      "The wild tower-houses of the Mani peninsula",
      "Ancient Olympia, birthplace of the Games",
    ],
    driving:
      "Quiet, scenic, and easy — a mix of coastal roads and mountain passes with little traffic. Distances are moderate; the toll motorway speeds the Athens legs, while the Mani and Arcadia are slow, twisty, and worth it. A small car is plenty.",
    bikeScooter:
      "Scooter Nafplio and the coastal towns to reach nearby beaches and viewpoints. The old towns — Nafplio, Monemvasia — are pedestrian and made for wandering. E-bikes suit the flatter coastal stretches; the mountains are better by car.",
    itinerary: [
      { day: "Day 1", title: "Athens → Nafplio", detail: "Collect the car, drive over the Corinth Canal to elegant Nafplio. Sunset from Palamidi fortress." },
      { day: "Day 2", title: "Mycenae & Epidaurus", detail: "Ancient Mycenae in the morning, the astonishing theatre of Epidaurus in the afternoon." },
      { day: "Day 3", title: "South to Monemvasia", detail: "Drive down the east coast to the hidden rock-town of Monemvasia; stay in the walls." },
      { day: "Day 4", title: "Into the Mani", detail: "Cross to the wild Mani peninsula — tower villages, empty coves, Gerolimenas or Areopoli base." },
      { day: "Day 5", title: "Deep Mani & caves", detail: "Cape Tenaro (the mythical gate to Hades), the Diros sea caves, slow coastal swims." },
      { day: "Day 6", title: "Mountains to Olympia", detail: "Drive north through Arcadia's stone villages toward Olympia, stopping in Dimitsana or Stemnitsa." },
      { day: "Day 7", title: "Ancient Olympia", detail: "Walk the original stadium and sanctuary early, then a relaxed final coastal evening." },
      { day: "Day 8", title: "Return to Athens", detail: "Motorway back, optional stop at Corinth, fly out." },
    ],
    weather: { high: 24, low: 14, rainDays: 5, sky: "Sunny", seaTemp: 23, verdict: "Warm, quiet, and excellent — arguably the sweet-spot climate of the list." },
    tags: ["Ancient sites", "Coastal", "Mountains", "Uncrowded"],
    heroImage: img("nafplio,greece", 61),
    gallery: [
      { url: img("nafplio", 62), caption: "Nafplio and its harbor fortress" },
      { url: img("monemvasia", 63), caption: "Monemvasia's hidden rock-town" },
      { url: img("mani,greece", 64), caption: "Tower villages of the Mani" },
      { url: img("epidaurus,theatre", 65), caption: "The theatre at Epidaurus" },
      { url: img("olympia,greece", 66), caption: "Ancient Olympia" },
      { url: img("greece,beach", 67), caption: "Empty Peloponnese coves" },
    ],
  },
  {
    slug: "crete",
    title: "Crete Road Trip",
    region: "Crete",
    country: "Greece",
    flag: "🇬🇷",
    tagline:
      "Big-island freedom — gorges, palm beaches, mountain tavernas, and swim season.",
    days: 8,
    loop: "Fly into Chania → Rethymno → Heraklion → Lasithi → east coast",
    feel: [
      "Crete is big enough to feel like its own country, and a car unlocks all of it: Venetian harbor towns on the north coast, a wild mountainous spine down the middle, and hidden south-coast beaches you can only reach by winding switchback roads. It's the road-trip island par excellence.",
      "The feel is rugged and generous — fierce mountain scenery, ferociously good food, and a fierce local pride. You'll drive from a lively harbor lined with tavernas, over a mountain pass dotted with villages that press their own raki, down to a lagoon that looks tropical. Chania and Rethymno are the atmospheric old-town bases.",
      "October keeps Crete warm and swimmable while the crowds fade, and the light softens. The famous gorges are cooler and more comfortable to hike now. Scooter the old towns, and use the car for the big dramatic drives across the island.",
    ],
    highlights: [
      "Chania's Venetian harbor at sunset",
      "The pink-tinged sands and lagoon of Elafonisi or Balos",
      "Driving the mountain roads of the Lasithi plateau",
      "Rethymno's old town and Fortezza",
      "A long mountain-village lunch with local raki",
    ],
    driving:
      "The heart of the trip. The north-coast highway is fast; the real joy is the twisting mountain and south-coast roads to remote beaches (Preveli, Elafonisi). Some approaches are slow and narrow — allow time and enjoy them. A compact car handles it all.",
    bikeScooter:
      "Scooter the old towns of Chania and Rethymno and their nearby beaches. E-bike tours run on the Lasithi plateau and gentler valleys. The big cross-island and south-coast routes are car territory; two wheels are for the towns and flat coastal pockets.",
    itinerary: [
      { day: "Day 1", title: "Land in Chania", detail: "Settle into the Venetian old town; dinner along the harbor as the light drops." },
      { day: "Day 2", title: "West-coast beaches", detail: "Drive to Elafonisi's pink-sand lagoon or Balos; swim and back to Chania for the evening." },
      { day: "Day 3", title: "Chania → Rethymno", detail: "Short coastal hop. Explore Rethymno's old town and Venetian Fortezza." },
      { day: "Day 4", title: "South coast & Preveli", detail: "Wind down to the palm-fringed beach at Preveli, a mountain-village lunch on the way back." },
      { day: "Day 5", title: "Into the mountains", detail: "Drive toward Heraklion via mountain villages; visit the Minoan palace of Knossos." },
      { day: "Day 6", title: "Lasithi plateau", detail: "Loop up to the high Lasithi plateau — windmills, orchards, the Dikteon cave." },
      { day: "Day 7", title: "East coast", detail: "Agios Nikolaos and the Elounda coast, or the palm beach at Vai in the far east." },
      { day: "Day 8", title: "Return & fly out", detail: "Coast drive back west with a final swim, then fly from Chania or Heraklion." },
    ],
    weather: { high: 25, low: 17, rainDays: 4, sky: "Very sunny", seaTemp: 24, verdict: "Still full swim season, dry and bright — one of the warmest, driest picks." },
    tags: ["Island", "Beaches", "Mountains", "Warmest"],
    heroImage: img("chania,crete", 71),
    gallery: [
      { url: img("chania,harbor", 72), caption: "Chania's Venetian harbor" },
      { url: img("elafonisi,crete", 73), caption: "Elafonisi's pink-sand lagoon" },
      { url: img("rethymno", 74), caption: "Rethymno old town" },
      { url: img("crete,mountains", 75), caption: "Crete's mountain interior" },
      { url: img("balos,crete", 76), caption: "The Balos lagoon" },
      { url: img("crete,village", 77), caption: "A mountain village taverna" },
    ],
  },
  {
    slug: "montenegro-kotor",
    title: "Bay of Kotor & Montenegro",
    region: "Adriatic Montenegro",
    country: "Montenegro",
    flag: "🇲🇪",
    tagline:
      "A fjord-like bay, serpentine mountain drives, medieval Kotor — dramatic and cheap.",
    days: 7,
    loop: "Fly into Tivat/Podgorica → Kotor → Lovćen → Durmitor → coast",
    feel: [
      "Montenegro packs an outrageous amount of drama into a tiny country. The Bay of Kotor coils inland like a Norwegian fjord, ringed by mountains that plunge straight into the water, with a medieval walled town tucked at its head. Then the land rears up into a serious mountain range behind.",
      "The signature experience is the drive: the Kotor Serpentine, 25 hairpin switchbacks climbing the wall of the bay to a jaw-dropping panorama, then over to the old royal capital of Cetinje and up Mount Lovćen. Inland, the Durmitor massif and the Tara canyon (Europe's deepest) offer alpine wildness. It feels raw, uncrowded, and remarkable value.",
      "October is quiet and mild on the coast, cooler and possibly wetter in the mountains — pack layers. Kotor and the bayside towns (Perast) are compact and walkable; a scooter is fun for the shoreline, and the mountains are pure driving country.",
    ],
    highlights: [
      "Driving the Kotor Serpentine to the bay panorama",
      "Walking Kotor's walls and old town below the fjord",
      "Perast and the island church of Our Lady of the Rocks",
      "Mount Lovćen's mausoleum and 360° views",
      "The Tara Canyon and Durmitor peaks inland",
    ],
    driving:
      "Spectacular and demanding. The Serpentine and the old Kotor–Lovćen road are narrow and hairpin-heavy — go slow, go early. The bay road can be busy; inland routes to Durmitor are long and mountainous. A small car is ideal for the tight sections.",
    bikeScooter:
      "Scooter the bay shoreline between Kotor, Perast, and the beaches — the flat waterside road is the fun part. The walled towns are pedestrian. Serious cycling and hiking live inland around Durmitor; the mountain passes themselves are best left to the car.",
    itinerary: [
      { day: "Day 1", title: "Arrive at the bay", detail: "Fly into Tivat, settle in Kotor. Evening wander of the walled old town." },
      { day: "Day 2", title: "Kotor walls & Perast", detail: "Climb Kotor's fortifications early, then boat to Our Lady of the Rocks off pretty Perast." },
      { day: "Day 3", title: "The Serpentine & Lovćen", detail: "Drive the 25 switchbacks up the bay wall, on to Njegoš's mausoleum atop Mount Lovćen." },
      { day: "Day 4", title: "Cetinje & Lake Skadar", detail: "The old royal capital, then the vineyards and birdlife of Lake Skadar's shores." },
      { day: "Day 5", title: "North to Durmitor", detail: "Long scenic drive inland to Žabljak, past the Tara Canyon bridge — alpine change of scene." },
      { day: "Day 6", title: "Durmitor & Tara", detail: "Black Lake walk, mountain viewpoints, optional Tara canyon rafting or zipline." },
      { day: "Day 7", title: "Back to the coast", detail: "Return drive to the bay, a last swim or Kotor dinner, fly out." },
    ],
    weather: { high: 21, low: 13, rainDays: 10, sky: "Partly cloudy", seaTemp: 21, verdict: "Warm on the coast but one of the wetter picks; the mountains are cooler and crisp." },
    tags: ["Fjord", "Mountains", "Walled towns", "Value"],
    heroImage: img("kotor,montenegro", 81),
    gallery: [
      { url: img("kotor,bay", 82), caption: "The Bay of Kotor" },
      { url: img("perast", 83), caption: "Perast and its island churches" },
      { url: img("lovcen", 84), caption: "Mount Lovćen views" },
      { url: img("durmitor", 85), caption: "The Durmitor massif" },
      { url: img("tara,canyon", 86), caption: "The Tara Canyon" },
      { url: img("montenegro,coast", 87), caption: "Montenegro's Adriatic" },
    ],
  },
  {
    slug: "slovenia-julian-alps",
    title: "Slovenia — Julian Alps & Istria",
    region: "Julian Alps → Adriatic",
    country: "Slovenia",
    flag: "🇸🇮",
    tagline:
      "Emerald lakes, alpine autumn color, then the Adriatic — the most bike-friendly pick.",
    days: 8,
    loop: "Fly into Ljubljana → Bled → Bohinj → Soča Valley → Piran",
    feel: [
      "Slovenia is where the Alps, the Mediterranean, and central Europe collide in a country the size of a large city. In a week you can drive from a storybook alpine lake, over a legendary mountain pass, down a turquoise river valley, to a Venetian town on the sea — the variety per mile is unmatched on this list.",
      "The feel is fresh, green, and active. Lake Bled with its island church and cliff-top castle is the postcard; Bohinj is its wilder, quieter neighbor; the Vršič Pass and the Soča Valley are spectacular driving and adventure country; and Piran on the coast is a tiny sun-warmed Venetian gem. Ljubljana is one of Europe's most likeable, walkable little capitals.",
      "This is the standout for bikes: Slovenia is laced with cycle routes, and Bled, Bohinj, and Ljubljana are all superb on two wheels. October brings golden larches and autumn color to the Alps — cooler and a bit wetter than the southern options, so pack layers, but stunning.",
    ],
    highlights: [
      "Rowing to the island church on Lake Bled",
      "Driving the hairpins of the Vršič Pass",
      "The impossibly turquoise Soča River",
      "Cycling around quiet Lake Bohinj",
      "Sunset in Venetian Piran on the Adriatic",
    ],
    driving:
      "Excellent and varied — smooth motorways plus thrilling alpine passes. The Vršič Pass (50 hairpins) is the driving highlight, open in October but check conditions late in the month. Distances are short; you can cross the whole country in a few hours. A vignette toll sticker is required on motorways.",
    bikeScooter:
      "The most bike-friendly trip here. Dedicated cycle paths ring Lake Bled and Lake Bohinj and thread the valleys; Ljubljana is a cycling capital. Rent bikes at each base. The coast around Piran is flat and rideable; the high passes are for the car.",
    itinerary: [
      { day: "Day 1", title: "Ljubljana", detail: "Land and explore the car-free old town, riverside cafés, and castle. Easy start on foot and bike." },
      { day: "Day 2", title: "To Lake Bled", detail: "Short drive north. Row to the island church, walk or cycle the lakeshore, climb to the castle." },
      { day: "Day 3", title: "Lake Bohinj", detail: "Bled's wilder neighbor — cycle the lake, ride the cable car up Vogel for alpine views." },
      { day: "Day 4", title: "Vršič Pass & Soča", detail: "Drive the 50 hairpins of the Vršič Pass into the turquoise Soča Valley; base in Bovec or Kobarid." },
      { day: "Day 5", title: "Soča Valley", detail: "Emerald river walks, gorges, WWI history at Kobarid, optional rafting or zipline." },
      { day: "Day 6", title: "Down to Istria", detail: "Long scenic drive to the coast, perhaps via the Škocjan or Postojna caves." },
      { day: "Day 7", title: "Piran & the coast", detail: "Venetian Piran's old town, salt pans, and Adriatic sunsets; cycle the flat coast." },
      { day: "Day 8", title: "Return to Ljubljana", detail: "Drive back to the capital for a final evening or fly out." },
    ],
    weather: { high: 15, low: 6, rainDays: 9, sky: "Cloud and sun, crisp", seaTemp: 19, verdict: "Cooler alpine autumn with golden color; pack layers and a rain shell." },
    tags: ["Alpine", "Lakes", "Cycling", "Variety"],
    heroImage: img("lake,bled,slovenia", 91),
    gallery: [
      { url: img("bled,slovenia", 92), caption: "Lake Bled and its island" },
      { url: img("bohinj", 93), caption: "Quiet Lake Bohinj" },
      { url: img("soca,valley", 94), caption: "The turquoise Soča River" },
      { url: img("vrsic,pass", 95), caption: "Hairpins of the Vršič Pass" },
      { url: img("piran,slovenia", 96), caption: "Venetian Piran on the Adriatic" },
      { url: img("ljubljana", 97), caption: "Ljubljana's riverside" },
    ],
  },
  {
    slug: "corsica",
    title: "Corsica",
    region: "Corsica",
    country: "France",
    flag: "🇫🇷",
    tagline:
      "Mountains crashing into the sea, hairpin drives, hidden coves, and GR20 country.",
    days: 8,
    loop: "Fly into Bastia/Ajaccio → Cap Corse → Balagne → Calanques → south",
    feel: [
      "Corsica is France's wild, mountainous island — imagine the drama of the Alps rising straight out of a turquoise Mediterranean. It's the most rugged and least tamed of the coastal options: granite peaks, dense maquis scrub scenting the air, and a fierce island identity that feels closer to Italy than to Nice.",
      "The driving is the whole point and genuinely thrilling: coastal corniches, the wild Cap Corse loop, and mountain roads over passes between the two coasts. Between drives you drop into Genoese port towns — Bonifacio perched on white chalk cliffs, Calvi with its citadel, Porto beneath the flaming red Calanques rocks — and swim off coves the color of a swimming pool.",
      "October is mild and uncrowded, the sea still warm from summer, the light long and golden. It's a step wilder than your Riviera trip but with the same DNA. Scooter the port towns; the passes and corniches are for the car.",
    ],
    highlights: [
      "Bonifacio's old town on sheer white cliffs",
      "The fiery red rocks of the Calanques de Piana at sunset",
      "Driving the wild Cap Corse peninsula loop",
      "Calvi's citadel and crescent beach",
      "Hidden turquoise coves along the coast",
    ],
    driving:
      "Some of the Mediterranean's most thrilling — and slowest — roads. Coastal corniches and mountain passes are narrow and winding; average speeds are low, so plan short hops. The Calanques de Piana and Cap Corse are unmissable drives. A small, nimble car is a big advantage.",
    bikeScooter:
      "Scooter the compact port towns — Calvi, Porto, Bonifacio — to reach nearby beaches and coves. E-bikes suit the flatter eastern plain and coastal pockets, but Corsica's mountainous roads are demanding, so keep serious cycling for the fit and save the passes for the car.",
    itinerary: [
      { day: "Day 1", title: "Land in Bastia", detail: "Settle in, wander the old port, and loop part of the wild Cap Corse peninsula." },
      { day: "Day 2", title: "Cap Corse to the Balagne", detail: "Finish the cape drive, cross to the Balagne region; base in seaside Calvi or L'Île-Rousse." },
      { day: "Day 3", title: "Calvi & hill villages", detail: "Calvi's citadel and beach, then a loop of the perched Balagne craft villages inland." },
      { day: "Day 4", title: "To Porto & the Calanques", detail: "Drive the coast to Porto; time the red Calanques de Piana for golden hour." },
      { day: "Day 5", title: "Mountains & Corte", detail: "Cross inland over the passes to Corte, the island's rugged heart, and the Restonica valley." },
      { day: "Day 6", title: "South to Bonifacio", detail: "Drive down to Bonifacio, its clifftop old town glowing over the straits at sunset." },
      { day: "Day 7", title: "Bonifacio & beaches", detail: "Boat under the chalk cliffs, then the white-sand coves around Santa Giulia or Palombaggia." },
      { day: "Day 8", title: "Return north", detail: "Scenic drive back toward Ajaccio or Bastia, final coastal stop, fly out." },
    ],
    weather: { high: 22, low: 13, rainDays: 7, sky: "Mostly sunny", seaTemp: 21, verdict: "Mild, uncrowded shoulder season with a still-warm sea and long golden light." },
    tags: ["Island", "Coastal", "Mountains", "Wild"],
    heroImage: img("bonifacio,corsica", 101),
    gallery: [
      { url: img("corsica,coast", 102), caption: "Corsica's mountains meet the sea" },
      { url: img("bonifacio", 103), caption: "Bonifacio's cliff-top old town" },
      { url: img("calvi,corsica", 104), caption: "Calvi's citadel and bay" },
      { url: img("piana,calanques", 105), caption: "The red Calanques de Piana" },
      { url: img("corsica,beach", 106), caption: "Turquoise southern coves" },
      { url: img("corte,corsica", 107), caption: "Corte and the mountain interior" },
    ],
  },
  {
    slug: "dordogne-perigord",
    title: "Dordogne & Périgord",
    region: "Dordogne / Périgord",
    country: "France",
    flag: "🇫🇷",
    tagline:
      "Medieval clifftop villages, river valleys, canoe and bike, foie-gras-and-castles.",
    days: 7,
    loop: "Fly into Bordeaux → Sarlat → Dordogne valley → Lot valley → Bordeaux",
    feel: [
      "This is the gentlest, most pastoral option — inland southwest France, where honey-stone villages cling to river cliffs, châteaux face each other across the water, and the whole valley smells of walnut and woodsmoke in autumn. If the Riviera was coastal glamour, the Dordogne is deep-country romance.",
      "The rhythm is slow and delicious in the most literal sense — this is the heartland of duck, walnut, truffle, and Bergerac wine. You base in golden Sarlat, drive 20 minutes to the next perched village (Domme, La Roque-Gageac, Beynac), paddle a canoe past castles, and eat extraordinarily well. Prehistory is layered underneath it all at Lascaux.",
      "It's the easiest driving of the list and superb for cycling — quiet lanes and river-valley bike paths link the villages. October is mild and autumnal with the occasional rainy spell, harvest markets in full swing, and the summer crowds long gone.",
    ],
    highlights: [
      "Golden medieval Sarlat and its Saturday market",
      "Canoeing the Dordogne past the castles of Beynac and Castelnaud",
      "The perched village of Rocamadour",
      "The prehistoric cave art of Lascaux",
      "The clifftop 'most beautiful villages' of the valley",
    ],
    driving:
      "The easiest and most relaxing of all — quiet, well-kept rural roads through gentle river valleys, short distances between villages. No hairpins, no stress. A perfect wander-without-a-plan region; park at the edge of the medieval villages and walk in.",
    bikeScooter:
      "Excellent cycling country. Greenway paths (voies vertes) follow the river valleys, and quiet backroads link the villages — rent bikes or e-bikes in Sarlat. Add canoeing on the Dordogne as the signature 'town-exploration' twist. The perched villages are compact and best on foot.",
    itinerary: [
      { day: "Day 1", title: "Bordeaux → Sarlat", detail: "Collect the car, drive east into the Périgord. Evening in golden, lamplit Sarlat." },
      { day: "Day 2", title: "Sarlat & markets", detail: "Explore Sarlat's medieval core and food markets; a first easy bike loop into the countryside." },
      { day: "Day 3", title: "Castles of the Dordogne", detail: "Beynac and Castelnaud face off across the river; the perched village of Domme above it all." },
      { day: "Day 4", title: "Canoe the river", detail: "Paddle the Dordogne past cliffs and châteaux, lunch in La Roque-Gageac, lazy afternoon." },
      { day: "Day 5", title: "Prehistory & Rocamadour", detail: "The cave art of Lascaux, then the dramatic pilgrimage village of Rocamadour clinging to its cliff." },
      { day: "Day 6", title: "Into the Lot valley", detail: "Drive south to the Lot: Saint-Cirq-Lapopie, the Pont Valentré at Cahors, Bergerac-country wine." },
      { day: "Day 7", title: "Back to Bordeaux", detail: "Meander back with a vineyard or bastide-town stop, then fly out." },
    ],
    weather: { high: 18, low: 8, rainDays: 8, sky: "Sun and cloud mix", verdict: "Mild and autumnal with harvest markets; the occasional rainy spell, so bring a layer." },
    tags: ["Countryside", "Rivers", "Cycling", "Food & wine"],
    heroImage: img("dordogne,france", 111),
    gallery: [
      { url: img("sarlat", 112), caption: "Golden medieval Sarlat" },
      { url: img("beynac,castle", 113), caption: "Château de Beynac over the river" },
      { url: img("laroquegageac", 114), caption: "La Roque-Gageac on the Dordogne" },
      { url: img("rocamadour", 115), caption: "Clifftop Rocamadour" },
      { url: img("dordogne,canoe", 116), caption: "Canoeing past the châteaux" },
      { url: img("saintcirqlapopie", 117), caption: "Saint-Cirq-Lapopie in the Lot" },
    ],
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);
