// Single source of truth for all trip options shown on the dashboard and detail pages.
// Real photos are self-hosted in public/images (downloaded by scripts/fetch-photos.mjs).
// Hero, gallery, itinerary-day and place image paths are wired by slug in the loop at
// the bottom, so the trip literals below carry only text.

export type GalleryImage = {
  url: string;
  caption: string;
};

export type ItineraryDay = {
  day: string;
  title: string;
  detail: string;
  stops?: string[]; // short chips of key spots/food for the day
  image?: string; // wired by slug below
};

export type Place = {
  name: string;
  area?: string;
  blurb: string;
  image?: string; // wired by slug below
};

export type Experience = {
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
  places: Place[];
  experiences: Experience[];
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
      { day: "Day 1", title: "Land in Naples", detail: "Pick the car up but leave it in the garage — Naples is best on foot. Dive into the Centro Storico along Spaccanapoli, eat a Margherita where pizza was invented, and chase it with a sfogliatella and an espresso. First night in the raw, operatic energy of the old city.", stops: ["Spaccanapoli", "Pizza", "Sfogliatella"] },
      { day: "Day 2", title: "Naples → Sorrento", detail: "Short drive around the bay (or hop the Circumvesuviana train). Settle into clifftop Sorrento, walk down to Marina Grande for lunch, and rent a scooter for the Sorrentine peninsula's lemon-grove lanes. Sunset aperitivo over the Bay of Naples.", stops: ["Marina Grande", "Scooter hire", "Limoncello"] },
      { day: "Day 3", title: "Capri day trip", detail: "Early ferry from Sorrento to beat the crowds. Chairlift up Monte Solaro for the island's best view, swim off the rocks at the Faraglioni, and time an aperitivo in the Piazzetta. Boat around to the Blue/Green Grotto if the sea is calm.", stops: ["Monte Solaro", "Faraglioni", "La Piazzetta"] },
      { day: "Day 4", title: "The Amalfitana drive", detail: "The big one: Sorrento → Positano → Amalfi along the SS163, stopping constantly for photos and granita. Wander Positano's stepped lanes down to the beach, then push on to Amalfi and its striped cathedral. Base in Amalfi or Praiano.", stops: ["Positano", "Praiano", "Amalfi Duomo"] },
      { day: "Day 5", title: "Ravello & the highlands", detail: "Climb the switchbacks to serene, high-altitude Ravello for the garden terraces of Villa Rufolo and Villa Cimbrone's Terrace of Infinity. Afternoon on quiet hilltop lanes, or hike a stretch of the Path of the Gods above the coast.", stops: ["Villa Cimbrone", "Villa Rufolo", "Path of the Gods"] },
      { day: "Day 6", title: "Paestum & the south", detail: "Drive south past Salerno to Paestum, where three colossal Greek temples stand almost intact on an empty plain. Lunch at a buffalo farm for mozzarella made that morning, then back to the coast for an evening swim.", stops: ["Greek temples", "Buffalo mozzarella", "Cilento coast"] },
      { day: "Day 7", title: "Positano slow day", detail: "No agenda — pure coast. Beach morning under the umbrellas, a boat trip to hidden coves and the Emerald Grotto, a long seafood lunch, and shopping the linen-and-sandal boutiques. Watch the town light up gold at dusk.", stops: ["Boat coves", "Emerald Grotto", "Spiaggia Grande"] },
      { day: "Day 8", title: "Back to Naples", detail: "Coast drive back with a last archaeological stop at Pompeii or Herculaneum — a whole Roman town frozen by Vesuvius. Final pizza in Naples, then fly out.", stops: ["Pompeii", "Herculaneum", "Fly out"] },
    ],
    places: [
      { name: "Positano", area: "Amalfi Coast", blurb: "The vertical postcard — pastel houses cascading down the cliff to a pebble beach and a striped-dome church. Steep, photogenic, and made for slow wandering." },
      { name: "Ravello", area: "Above Amalfi", blurb: "A serene garden town high above the coast. Villa Cimbrone's Terrace of Infinity and Villa Rufolo's belvedere are the finest sea views on the whole coast." },
      { name: "Capri", area: "Bay of Naples", blurb: "Glamorous island of limestone stacks and turquoise grottoes. Chairlift up Monte Solaro, swim under the Faraglioni, and people-watch in the Piazzetta." },
      { name: "Amalfi & the Duomo", area: "Amalfi Coast", blurb: "The coast's namesake — a once-mighty maritime republic wrapped around a dramatic striped cathedral reached by a sweep of stone steps." },
      { name: "Sorrento", area: "Sorrentine Peninsula", blurb: "The relaxed base: clifftop piazzas, lemon groves, and a working marina, with easy ferries to Capri and Naples and a scooter-friendly hinterland." },
      { name: "Pompeii", area: "Bay of Naples", blurb: "An entire Roman city frozen by Vesuvius in AD 79 — frescoed villas, streets, and plaster casts. Go early and wear real shoes." },
      { name: "Paestum", area: "Cilento", blurb: "Three of the best-preserved Greek temples anywhere, standing on a quiet plain south of Salerno amid buffalo-mozzarella farms." },
    ],
    experiences: [
      { title: "Drive the SS163 at golden hour", detail: "Time the Positano–Amalfi stretch for late afternoon when the light turns the cliffs amber and the tour buses thin out." },
      { title: "Hike the Path of the Gods", detail: "The Sentiero degli Dei from Bomerano to Nocelle — a cliff-top trail with the coast's most jaw-dropping views." },
      { title: "Chairlift up Monte Solaro", detail: "Capri's highest point: a slow single-seat chairlift to a 589 m panorama over the whole Bay of Naples." },
      { title: "Boat to hidden coves", detail: "Hire a small boat in Positano or Amalfi to reach sea caves, the Emerald Grotto, and swim spots the buses can't touch." },
      { title: "Eat pizza in Naples", detail: "A wood-fired Margherita in the Centro Storico where it was born — Da Michele, Sorbillo, or wherever the queue is." },
      { title: "Lemon everything in Sorrento", detail: "Tour a lemon grove, taste limoncello, and cool off with a lemon granita the size of your head." },
      { title: "Aperitivo on a Ravello terrace", detail: "Sunset spritz high above the sea — the calm, cultured antidote to the coast-road bustle." },
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
      { day: "Day 1", title: "Land & drive to Siena", detail: "Collect the car at Florence or Pisa and drive south to Siena. Check into a place inside the walls, then let the evening unfold on the shell-shaped Piazza del Campo as the brick glows amber and the swifts wheel overhead.", stops: ["Piazza del Campo", "Duomo", "Aperitivo"] },
      { day: "Day 2", title: "Siena & the Chianti", detail: "Morning in Siena — the striped cathedral and the medieval lanes — then a lazy drive south through the Chianti hills on the SR222, stopping at a family winery for a Sangiovese tasting and a long lunch among the vines.", stops: ["Siena Duomo", "Chianti wineries", "Greve"] },
      { day: "Day 3", title: "Into the Val d'Orcia", detail: "Move to a farmhouse near Pienza or Montepulciano, the heart of the storybook Val d'Orcia. Spend the afternoon on the classic cypress-avenue photo drive around San Quirico d'Orcia and the chapel of Vitaleta at golden hour.", stops: ["San Quirico", "Vitaleta chapel", "Cypress avenues"] },
      { day: "Day 4", title: "Montalcino & Brunello", detail: "A wine day: Montalcino's hilltop fortress and the cellars that make Italy's most prestigious red, Brunello. Detour to the honey-stone Romanesque Abbey of Sant'Antimo, and lunch with a valley view.", stops: ["Montalcino fortress", "Brunello", "Sant'Antimo"] },
      { day: "Day 5", title: "E-bike the valley", detail: "Ditch the car and e-bike the white strade bianche between Pienza and the vineyards — the Val d'Orcia at cycling pace is the trip's quiet highlight. Picnic of pecorino, salami, and bread in the hills.", stops: ["Strade bianche", "Pecorino", "Picnic"] },
      { day: "Day 6", title: "Montepulciano & Bagno Vignoni", detail: "Explore Montepulciano's steep lanes and Vino Nobile cellars, then unwind in the evening at Bagno Vignoni, the thermal village where the main 'square' is a steaming Renaissance pool.", stops: ["Vino Nobile", "Bagno Vignoni", "Thermal soak"] },
      { day: "Day 7", title: "Slow return", detail: "Meander back toward Florence or Pisa with a final hill-town stop — perhaps Monteriggioni's perfect ring of walls or a last Pienza pecorino run — then fly out.", stops: ["Monteriggioni", "Pienza pecorino", "Fly out"] },
    ],
    places: [
      { name: "Siena", area: "Central Tuscany", blurb: "A medieval city built around the fan-shaped Piazza del Campo, with a dazzling black-and-white striped cathedral and steep brick lanes made for aimless wandering." },
      { name: "Pienza", area: "Val d'Orcia", blurb: "A tiny Renaissance 'ideal city' with a panoramic wall walk over the valley and a main street lined with shops selling its famous pecorino cheese." },
      { name: "Montepulciano", area: "Val d'Orcia", blurb: "A dramatic hilltop wine town of steep streets and grand palazzi, home to the bold Vino Nobile and a maze of ancient underground cellars." },
      { name: "Montalcino", area: "Val d'Orcia", blurb: "Fortress town and cradle of Brunello, Italy's most prestigious red. Taste in the cellars and take in the sweep of vineyards from the ramparts." },
      { name: "Val d'Orcia viewpoints", area: "San Quirico d'Orcia", blurb: "The postcard Tuscany of cypress avenues, lone farmhouses, and the Vitaleta chapel — a UNESCO landscape best at sunrise and golden hour." },
      { name: "Bagno Vignoni", area: "Val d'Orcia", blurb: "A thermal hamlet whose central 'piazza' is a steaming Renaissance bathing pool; soak in the hot springs at the edge of town come evening." },
      { name: "Abbey of Sant'Antimo", area: "near Montalcino", blurb: "A serene 12th-century Romanesque abbey of pale travertine set alone among olive groves — worth the short detour for the calm and the acoustics." },
    ],
    experiences: [
      { title: "Brunello tasting in Montalcino", detail: "Book a cellar visit for Italy's benchmark red, ideally with a vineyard-view lunch." },
      { title: "E-bike the strade bianche", detail: "Ride the white gravel roads between Pienza, San Quirico, and the vineyards — flat-ish on an e-bike, unforgettable." },
      { title: "Golden-hour cypress drive", detail: "Chase the light around San Quirico and the Vitaleta chapel for the classic Val d'Orcia shots." },
      { title: "Pecorino tasting in Pienza", detail: "Sample the aged, herb-wrapped, and truffle pecorini the town is famous for, straight from the source." },
      { title: "Soak at Bagno Vignoni", detail: "End a day in the thermal pools at the edge of the medieval spa village, valley spread out below." },
      { title: "Aperitivo on Piazza del Campo", detail: "A spritz on Siena's great sloping square as the light fades — pure Tuscan theatre." },
      { title: "A long pici-and-truffle lunch", detail: "Hand-rolled pici pasta, wild boar ragù, and local wine at an agriturismo — the whole point of the region." },
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
      { day: "Day 1", title: "Land in Catania", detail: "Ease in with Catania's lava-stone Baroque center and La Pescheria, the theatrical morning fish market. Street-food dinner — arancini, pasta alla Norma — under Etna's silhouette.", stops: ["La Pescheria", "Arancini", "Pasta alla Norma"] },
      { day: "Day 2", title: "North to Taormina", detail: "Coast drive up to clifftop Taormina. Wander Corso Umberto, then time the ancient Greek theatre for sunset, when Etna smokes behind the ruined stage and the sea glows below.", stops: ["Greek theatre", "Corso Umberto", "Isola Bella"] },
      { day: "Day 3", title: "Mount Etna", detail: "Drive up Europe's biggest active volcano to Rifugio Sapienza, then cable car and 4x4 to the summit-crater zone. Walk across old lava flows and steaming ground, then taste volcanic wine on the slopes on the way down.", stops: ["Summit craters", "Lava flows", "Etna wine"] },
      { day: "Day 4", title: "Taormina beaches", detail: "A slower day: descend by cable car to Isola Bella, the tiny nature-reserve islet, and scooter to quiet coves. Or take a boat along the coast to sea caves and swim spots.", stops: ["Isola Bella", "Scooter coves", "Boat trip"] },
      { day: "Day 5", title: "South to Siracusa", detail: "Drive south to Siracusa and cross onto Ortigia, its island old town of Baroque piazzas and sea-lapped lanes. Evening passeggiata, spritz on the Duomo square, seafood by the water.", stops: ["Ortigia", "Piazza Duomo", "Passeggiata"] },
      { day: "Day 6", title: "Siracusa & Ortigia", detail: "The Neapolis archaeological park by day — the vast Greek theatre and the Ear of Dionysius cave — then back to Ortigia for the Fonte Aretusa, a swim off the rocks, and a long lazy dinner.", stops: ["Neapolis park", "Ear of Dionysius", "Fonte Aretusa"] },
      { day: "Day 7", title: "Baroque triangle", detail: "Into the golden Baroque hills. Noto's Corso is a parade of honey-stone palaces and churches; wander it in the late-day glow, then base among the lanes of Ragusa Ibla.", stops: ["Noto Corso", "Ragusa Ibla", "Baroque churches"] },
      { day: "Day 8", title: "Modica & Ragusa", detail: "Modica for cold-worked, Aztec-style chocolate and the soaring San Giorgio staircase; back to Ragusa Ibla to wander and eat. A slow, indulgent day among the Baroque.", stops: ["Modica chocolate", "San Giorgio", "Ragusa Ibla"] },
      { day: "Day 9", title: "Return to Catania", detail: "Drive back with a final coastal or beach stop — maybe the Vendicari nature reserve's beaches en route — then fly out.", stops: ["Vendicari", "Beach stop", "Fly out"] },
    ],
    places: [
      { name: "Taormina", area: "Ionian coast", blurb: "A glamorous balcony town on a cliff, famous for its ancient Greek theatre that frames Mount Etna and the sea — the single most iconic view in Sicily." },
      { name: "Mount Etna", area: "above Catania", blurb: "Europe's largest active volcano — a moonscape of craters, black lava fields, and steaming ground up top, and lush volcanic vineyards on the slopes." },
      { name: "Ortigia (Siracusa)", area: "Siracusa", blurb: "The honey-stone island heart of ancient Syracuse: Baroque piazzas, a temple-turned-cathedral, a freshwater spring by the sea, and the best evening passeggiata around." },
      { name: "Noto", area: "Baroque SE", blurb: "The showpiece of Sicilian Baroque — an entire town rebuilt in golden limestone after the 1693 quake, its main corso a procession of palaces and churches." },
      { name: "Ragusa Ibla", area: "Baroque SE", blurb: "A tumble of honey-colored houses and Baroque churches on a rocky spur, laced with staircases and tiny piazzas — endlessly wanderable." },
      { name: "Modica", area: "Baroque SE", blurb: "A dramatic town draped across a gorge, known for grainy, cold-worked chocolate made by an old Aztec method and the monumental San Giorgio staircase." },
      { name: "Catania", area: "Ionian coast", blurb: "A gritty, vibrant lava-stone city with a raucous fish market, superb street food, and Etna looming over every rooftop." },
    ],
    experiences: [
      { title: "Summit Mount Etna", detail: "Cable car plus 4x4 (or a guided hike) to the high crater zone — walk on fresh lava and peer into steaming vents." },
      { title: "Granita & brioche breakfast", detail: "The Sicilian ritual: almond or pistachio granita scooped into a warm brioche, ideally by the sea." },
      { title: "Etna wine tasting", detail: "Taste mineral reds and whites from vineyards on the volcano's black slopes — some of Italy's most exciting wines." },
      { title: "Passeggiata on Ortigia", detail: "Join the evening stroll across Siracusa's island old town, ending with a spritz on the floodlit Duomo square." },
      { title: "Modica chocolate tasting", detail: "Sample the town's grainy, spice-laced chocolate at a historic chocolatier like Bonajuto." },
      { title: "Swim below Taormina", detail: "Cable car down to Isola Bella and swim off the pebble coves in a marine reserve." },
      { title: "Catania street food crawl", detail: "Arancini, cartocciata, and horse-meat sandwiches around the clamorous Pescheria fish market." },
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
      { day: "Day 1", title: "Land in Split", detail: "Lose yourself inside Diocletian's Palace — a living Roman ruin where cafés and apartments fill the emperor's 1,700-year-old walls. Climb the cathedral bell tower, then sunset drinks along the Riva waterfront.", stops: ["Diocletian's Palace", "Bell tower", "Riva"] },
      { day: "Day 2", title: "Trogir & Split", detail: "Morning in tiny walled Trogir, a UNESCO gem of marble streets just up the coast. Back to Split to swim beneath the Marjan pines and eat grilled fish by the harbor.", stops: ["Trogir old town", "Marjan hill", "Grilled fish"] },
      { day: "Day 3", title: "Ferry to Hvar", detail: "Car ferry across to sunny Hvar. Base in Hvar Town below its hilltop Spanish fortress, and scooter out to lavender-scented villages and hidden swimming coves.", stops: ["Hvar Town", "Fortica fortress", "Lavender villages"] },
      { day: "Day 4", title: "Pakleni islands", detail: "Water-taxi out to the Pakleni islets for the clearest swimming of the trip — Palmižana's coves and beach-bar lunches. Back for Hvar's lively nightlife or a quiet konoba in the hills.", stops: ["Palmižana", "Snorkeling", "Konoba dinner"] },
      { day: "Day 5", title: "On to Korčula", detail: "Island-hop south to green, wine-making Korčula. Its walled old town juts into the sea on a little peninsula — arrive for the evening light and a seafront dinner.", stops: ["Korčula old town", "Marco Polo house", "Seafront dinner"] },
      { day: "Day 6", title: "Korčula & Pelješac", detail: "Cross to the Pelješac peninsula for Plavac Mali reds at cellar-door wineries, then fresh oysters and mussels pulled straight from the water at Ston, behind its great medieval walls.", stops: ["Pelješac wineries", "Ston oysters", "Ston walls"] },
      { day: "Day 7", title: "South to Dubrovnik", detail: "Drive the coast down to Dubrovnik (passports out for the short Neum border hop). Evening walk of the illuminated, marble-paved Stradun before the day-trippers return.", stops: ["Stradun", "Old harbor", "Neum crossing"] },
      { day: "Day 8", title: "Dubrovnik walls", detail: "Walk the mighty city walls at opening time for the classic rooftop-and-sea panorama, ride the cable car up Mount Srđ for the big view, then fly out.", stops: ["City walls", "Mount Srđ", "Fly out"] },
    ],
    places: [
      { name: "Split & Diocletian's Palace", area: "Dalmatian coast", blurb: "A Roman emperor's retirement palace that became a living old town — its ancient walls now packed with cafés, shops, and apartments. The Riva waterfront runs alongside." },
      { name: "Trogir", area: "near Split", blurb: "A jewel-box walled town on its own islet, all marble lanes, a Romanesque cathedral, and a Venetian fortress — a UNESCO site you can cross in ten minutes." },
      { name: "Hvar", area: "Central Dalmatia", blurb: "Croatia's chic, sun-drenched island: a Venetian harbor town under a hilltop fortress, lavender fields inland, and clear coves all around." },
      { name: "Pakleni Islands", area: "off Hvar", blurb: "A scatter of pine-covered islets a short water-taxi from Hvar Town, ringed by the clearest turquoise coves and easygoing beach bars." },
      { name: "Korčula", area: "Southern Dalmatia", blurb: "A mini walled Dubrovnik on a green, wine-making island — a fishbone of medieval lanes on a sea-girt peninsula, and (locals claim) Marco Polo's birthplace." },
      { name: "Ston & Pelješac", area: "Pelješac peninsula", blurb: "Great medieval salt-pan walls, celebrated oysters pulled from the bay, and the cellar doors of Croatia's best Plavac Mali reds." },
      { name: "Dubrovnik", area: "Southern Dalmatia", blurb: "The 'Pearl of the Adriatic' — a walled marble city above the sea. Walk the ramparts at golden hour for the definitive rooftop-and-water panorama." },
    ],
    experiences: [
      { title: "Walk Dubrovnik's walls", detail: "Do the 2 km rampart circuit at opening time or golden hour for the rooftops-and-sea shots, before the crowds." },
      { title: "Swim the Pakleni Islands", detail: "Water-taxi from Hvar to the clearest coves of the trip; snorkel, laze, and lunch at a beach bar." },
      { title: "Oysters at Ston", detail: "Eat oysters and mussels pulled straight from the bay, in the shadow of Europe's second-longest defensive walls." },
      { title: "Pelješac wine tasting", detail: "Cellar-door Plavac Mali reds (Dingač, Postup) on the steep coastal vineyards of the peninsula." },
      { title: "Scooter Hvar's coves", detail: "Buzz out to lavender villages and hidden swimming spots the tour boats miss." },
      { title: "Sunset on Split's Riva", detail: "Aperitivo on the palm-lined waterfront as the old town's stone turns gold." },
      { title: "Kayak the old-town coast", detail: "Sea-kayak beneath Dubrovnik's walls to a hidden cove and cave at dusk." },
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
      { day: "Day 1", title: "Athens → Nafplio", detail: "Collect the car, cross the dramatic Corinth Canal, and drive to elegant Nafplio, Greece's first capital. Wander the neoclassical old town and climb (or drive) to Palamidi fortress for a sunset over the gulf.", stops: ["Corinth Canal", "Palamidi", "Old town"] },
      { day: "Day 2", title: "Mycenae & Epidaurus", detail: "Bronze-Age Mycenae in the morning — the Lion Gate and Agamemnon's citadel — then the astonishing 4th-century-BC theatre at Epidaurus, where a coin dropped on stage is heard in the top row. Back to Nafplio for dinner.", stops: ["Lion Gate", "Epidaurus theatre", "Acoustics test"] },
      { day: "Day 3", title: "South to Monemvasia", detail: "Drive down the east coast to Monemvasia, a Byzantine town completely hidden on the seaward side of a vast rock, invisible until you round it. Stay inside the walls and wander the car-free lanes by lamplight.", stops: ["Monemvasia rock", "Byzantine lanes", "Sea walls"] },
      { day: "Day 4", title: "Into the Mani", detail: "Cross into the wild, stark Mani peninsula — tower-house villages, empty coves, and a fierce history. Base in Areopoli or seaside Gerolimenas and swim off the rocks in the low-season quiet.", stops: ["Areopoli", "Tower villages", "Gerolimenas"] },
      { day: "Day 5", title: "Deep Mani & caves", detail: "Drive to Cape Tenaro, the mythical gate to the underworld at Greece's southern tip, and glide through the Diros sea caves by boat. Slow coastal swims and a taverna lunch in between.", stops: ["Cape Tenaro", "Diros caves", "Coastal swim"] },
      { day: "Day 6", title: "Mountains to Olympia", detail: "Drive north through Arcadia's forested mountains, pausing in the stone villages of Dimitsana and Stemnitsa perched above the Lousios gorge, then on toward Olympia.", stops: ["Dimitsana", "Stemnitsa", "Lousios gorge"] },
      { day: "Day 7", title: "Ancient Olympia", detail: "Walk the sanctuary and the original Olympic stadium early — you can still sprint the ancient track — then a relaxed final coastal afternoon on the Ionian side.", stops: ["Olympia sanctuary", "Ancient stadium", "Ionian beach"] },
      { day: "Day 8", title: "Return to Athens", detail: "Motorway back with an optional stop at Ancient Corinth beneath the Acrocorinth citadel, then fly out.", stops: ["Ancient Corinth", "Acrocorinth", "Fly out"] },
    ],
    places: [
      { name: "Nafplio", area: "Argolis", blurb: "Greece's most elegant town — Venetian forts, neoclassical facades, and a little island fortress in the bay. Climb Palamidi's 900+ steps for the view." },
      { name: "Epidaurus", area: "Argolis", blurb: "The best-preserved ancient theatre in Greece, with acoustics so perfect a whisper on stage carries to the back of 14,000 seats." },
      { name: "Mycenae", area: "Argolis", blurb: "The Bronze-Age citadel of Agamemnon — the monumental Lion Gate, cyclopean walls, and beehive tombs of Homer's world." },
      { name: "Monemvasia", area: "Laconia", blurb: "A Byzantine 'Gibraltar of Greece' hidden on the far side of a colossal sea rock — a car-free warren of stone lanes, churches, and sea walls." },
      { name: "The Mani", area: "Laconia/Messenia", blurb: "A wild, arid peninsula of stone tower-houses, empty coves, and the mythical cave-gate to Hades at Cape Tenaro." },
      { name: "Ancient Olympia", area: "Elis", blurb: "Birthplace of the Olympic Games — a green sanctuary of temples, the workshop of Pheidias, and the original stadium you can still run." },
      { name: "Voidokilia Beach", area: "Messenia", blurb: "A near-perfect Omega-shaped bay of pale sand and shallow turquoise water, backed by a lagoon and a Mycenaean tomb — one of Greece's finest beaches." },
    ],
    experiences: [
      { title: "Climb Palamidi's steps", detail: "The 900-odd steps up Nafplio's Venetian fortress reward you with the trip's best town-and-bay panorama." },
      { title: "Test the Epidaurus acoustics", detail: "Stand center-stage in the ancient theatre and hear a whisper reach the very back row." },
      { title: "Wander Monemvasia at dusk", detail: "Explore the hidden rock-town's car-free lanes by lamplight, then dine on the sea walls." },
      { title: "Drive the Mani's towers", detail: "A slow loop of stone tower-villages, ending at Cape Tenaro's lighthouse at the tip of the mainland." },
      { title: "Boat the Diros caves", detail: "Glide by rowboat through a lamplit river-cave of stalactites near Areopoli." },
      { title: "Swim at Voidokilia", detail: "Float in the shallow turquoise crescent, then hike up to Nestor's Cave and the Mycenaean tomb above." },
      { title: "Run the Olympia stadium", detail: "Line up on the original stone start line and sprint the track of the first Olympics." },
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
      { day: "Day 1", title: "Land in Chania", detail: "Settle into Chania's beautiful Venetian old town, a tangle of lanes around a horseshoe harbor and its landmark lighthouse. Dinner along the water as the light drops.", stops: ["Venetian harbor", "Lighthouse", "Old town lanes"] },
      { day: "Day 2", title: "West-coast beaches", detail: "Drive out to Elafonisi's pink-tinged sand and shallow lagoon at the island's southwest tip — or the wild Balos lagoon in the northwest. Swim, then back to Chania for the evening.", stops: ["Elafonisi", "Pink sand", "Lagoon swim"] },
      { day: "Day 3", title: "Chania → Rethymno", detail: "Short coastal hop east to Rethymno, whose old town is crowned by a huge Venetian Fortezza. Wander the Ottoman-and-Venetian lanes, minarets over the rooftops, and swim off the town beach.", stops: ["Fortezza", "Old town", "Town beach"] },
      { day: "Day 4", title: "South coast & Preveli", detail: "Wind over the mountains to the south coast and the palm-fringed river beach at Preveli. A mountain-village taverna lunch — village greens, cheese, raki — on the way back.", stops: ["Preveli palm beach", "Kourtaliotiko gorge", "Village raki"] },
      { day: "Day 5", title: "Into the mountains & Knossos", detail: "Drive east toward Heraklion, detouring through mountain villages, and tour Knossos, the sprawling Minoan palace of the Bronze-Age labyrinth myth. City museum for the frescoes if time allows.", stops: ["Knossos", "Minoan frescoes", "Mountain villages"] },
      { day: "Day 6", title: "Lasithi plateau", detail: "Loop up to the high Lasithi plateau, a ring of farming villages and old stone windmills cupped by mountains. Visit the Dikteon Cave, mythical birthplace of Zeus, and lunch on the plateau.", stops: ["Lasithi windmills", "Dikteon Cave", "Plateau lunch"] },
      { day: "Day 7", title: "East coast", detail: "Explore Agios Nikolaos and the chic Elounda coast, with a boat out to the old Venetian-leper-island fortress of Spinalonga. Or push on to the far-east palm grove of Vai.", stops: ["Elounda", "Spinalonga", "Vai palms"] },
      { day: "Day 8", title: "Return & fly out", detail: "Coast drive back west with a final swim, then fly from Chania or Heraklion.", stops: ["Final swim", "Coast drive", "Fly out"] },
    ],
    places: [
      { name: "Chania old town", area: "West Crete", blurb: "The island's loveliest town — a Venetian harbor ringed by pastel houses and a lighthouse, backed by a maze of Ottoman-era lanes, craft shops, and tavernas." },
      { name: "Elafonisi", area: "SW Crete", blurb: "A shallow lagoon of pink-tinged sand and clear, waist-deep turquoise water at the island's southwest tip — surreal and swimmable well into autumn." },
      { name: "Balos lagoon", area: "NW Crete", blurb: "A wild, brilliant-white sandbar and lagoon reached by a rough track and short walk (or boat) on the remote Gramvousa peninsula." },
      { name: "Rethymno", area: "North coast", blurb: "A handsome old town of Venetian and Ottoman streets under a giant seaside Fortezza, with minarets, fountains, and a long town beach." },
      { name: "Samaria Gorge", area: "White Mountains", blurb: "Europe's longest gorge — a 16 km one-way hike from the highlands down to the Libyan Sea through soaring rock walls and the famous 'Iron Gates'." },
      { name: "Knossos", area: "near Heraklion", blurb: "The vast Minoan palace behind the labyrinth-and-Minotaur myth, with restored frescoes and Europe's oldest throne room." },
      { name: "Lasithi plateau", area: "East Crete", blurb: "A high, fertile mountain bowl of farming hamlets and old stone windmills, with the Dikteon Cave — mythic birthplace of Zeus — on its rim." },
    ],
    experiences: [
      { title: "Hike the Samaria Gorge", detail: "The classic 16 km descent through the White Mountains to a black-sand beach on the Libyan Sea (cooler and quieter in October)." },
      { title: "Swim Elafonisi's pink sands", detail: "Wade the shallow turquoise lagoon at the island's dreamy southwest corner." },
      { title: "Boat to Balos", detail: "Reach the wild white sandbar-lagoon by 4x4 track or a cruise from Kissamos." },
      { title: "Raki & meze in the hills", detail: "A long, generous mountain-village lunch — horta, cheese, snails, and endless raki." },
      { title: "Explore Minoan Knossos", detail: "Walk the labyrinthine palace and see the frescoes of Europe's first great civilization." },
      { title: "Sunset on Chania's harbor", detail: "A waterside meal as the Venetian lighthouse and pastel facades glow." },
      { title: "Drive the Lasithi plateau", detail: "Loop the high ring of windmills and villages, and duck into the Dikteon Cave." },
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
      { day: "Day 1", title: "Arrive at the bay", detail: "Fly into Tivat and settle in Kotor, at the head of its fjord-like bay. Evening wander of the walled old town's marble squares and Romanesque churches, dinner under the mountains.", stops: ["Kotor old town", "Sea Gate", "St Tryphon"] },
      { day: "Day 2", title: "Kotor walls & Perast", detail: "Climb the city walls early — 1,350 steps up to San Giovanni fortress for the classic bay view. Afternoon in pretty baroque Perast and a boat to the man-made island church of Our Lady of the Rocks.", stops: ["San Giovanni fortress", "Perast", "Our Lady of the Rocks"] },
      { day: "Day 3", title: "The Serpentine & Lovćen", detail: "Drive the old Kotor Serpentine — 25 hairpins up the bay wall to a heart-stopping panorama — then on to Lovćen National Park and the Njegoš mausoleum on its 1,660 m summit.", stops: ["Kotor Serpentine", "Lovćen summit", "Njegoš mausoleum"] },
      { day: "Day 4", title: "Cetinje & Lake Skadar", detail: "The old royal capital of Cetinje, then down to Lake Skadar, the Balkans' largest lake — a boat trip among lilies and birdlife, and a tasting at a shoreline winery.", stops: ["Cetinje", "Lake Skadar boat", "Crmnica wine"] },
      { day: "Day 5", title: "North to Durmitor", detail: "A long, spectacular drive inland to alpine Žabljak, crossing the Tara Canyon on the sweeping Đurđevića Tara bridge — Europe's deepest canyon far below.", stops: ["Tara bridge", "Žabljak", "Mountain drive"] },
      { day: "Day 6", title: "Durmitor & Tara", detail: "Walk the trail around the glassy Black Lake beneath Durmitor's peaks, take in mountain viewpoints, and — for the brave — raft or zipline the turquoise Tara River.", stops: ["Black Lake", "Durmitor peaks", "Tara rafting"] },
      { day: "Day 7", title: "Back to the coast", detail: "Return drive to the bay with a last swim or a seafood dinner in Kotor or Perast, then fly out.", stops: ["Coast return", "Final swim", "Fly out"] },
    ],
    places: [
      { name: "Kotor old town", area: "Bay of Kotor", blurb: "A medieval walled maze of marble squares and churches at the head of the bay, with city walls climbing 260 m up the cliff to San Giovanni fortress." },
      { name: "The Kotor Serpentine", area: "above Kotor", blurb: "The old road up the bay wall — 25 tight hairpins to a viewpoint over the entire fjord-like bay. One of Europe's great short drives." },
      { name: "Perast", area: "Bay of Kotor", blurb: "A jewel of a baroque town on the water, with two islets offshore — the man-made Our Lady of the Rocks and its church a short boat ride away." },
      { name: "Mount Lovćen", area: "Lovćen NP", blurb: "The black mountain at Montenegro's symbolic heart, topped by the Njegoš mausoleum and a 360° panorama from the bay to the inland ranges." },
      { name: "Lake Skadar", area: "inland south", blurb: "The Balkans' largest lake — a serene national park of lily fields, birdlife, island monasteries, and lakeside wineries, best seen by boat." },
      { name: "Durmitor & the Tara Canyon", area: "North Montenegro", blurb: "An alpine national park of jagged peaks and glacial lakes above Europe's deepest river canyon, with world-class rafting on the turquoise Tara." },
      { name: "Sveti Stefan", area: "Budva Riviera", blurb: "An impossibly photogenic fortified islet of terracotta roofs linked to the mainland by a sandy causeway — the emblem of the Montenegrin coast." },
    ],
    experiences: [
      { title: "Drive the Kotor Serpentine", detail: "Go early and slow up the 25 hairpins for the definitive view over the whole bay." },
      { title: "Climb Kotor's walls", detail: "1,350 steps up to San Giovanni fortress at dawn, before the heat and the cruise crowds." },
      { title: "Boat to Our Lady of the Rocks", detail: "A short hop from Perast to the man-made island church, built on centuries of sunken ballast stones." },
      { title: "Raft the Tara Canyon", detail: "Run the turquoise rapids at the bottom of Europe's deepest canyon (gentler water in autumn)." },
      { title: "Boat Lake Skadar", detail: "Drift among water lilies and pelicans, with a stop at a shoreline winery." },
      { title: "Njegoš mausoleum on Lovćen", detail: "Climb the final steps to the mountaintop tomb for a 360° panorama across the country." },
      { title: "Swim the Budva Riviera", detail: "Cool off at the beaches around photogenic Sveti Stefan on the drive back to the coast." },
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
      { day: "Day 1", title: "Ljubljana", detail: "Land and explore the car-free old town along the Ljubljanica river — the Triple Bridge, riverside cafés, the dragon bridge, and a funicular up to the castle. Easy start on foot and bike.", stops: ["Triple Bridge", "Ljubljana Castle", "Riverside cafés"] },
      { day: "Day 2", title: "To Lake Bled", detail: "Short drive north to fairytale Lake Bled. Row a traditional pletna boat to the island church, ring its wishing bell, then walk or cycle the lakeshore and climb to the cliff-top castle for the view.", stops: ["Bled island", "Bled Castle", "Cream cake"] },
      { day: "Day 3", title: "Vintgar & Lake Bohinj", detail: "Morning on the Vintgar Gorge's cliff-hugging boardwalk, then on to Bled's wilder, quieter neighbor, Lake Bohinj. Cycle the lake and ride the Vogel cable car up for alpine views.", stops: ["Vintgar Gorge", "Lake Bohinj", "Vogel cable car"] },
      { day: "Day 4", title: "Vršič Pass & Soča", detail: "Drive the 50 hairpins of the Vršič Pass, Slovenia's highest road, down into the turquoise Soča Valley. Base in adventure-town Bovec or riverside Kobarid.", stops: ["Vršič Pass", "Soča Valley", "Bovec"] },
      { day: "Day 5", title: "Soča Valley", detail: "A day on the emerald Soča — riverside walks and gorges, the Great Kozjak waterfall, WWI history at the Kobarid museum, and optional rafting, kayaking, or a zipline.", stops: ["Kozjak falls", "Kobarid museum", "Rafting"] },
      { day: "Day 6", title: "Down to Istria", detail: "Long scenic drive to the coast, stopping at the vast Postojna Cave (by underground train) or the UNESCO Škocjan Caves, and the cliff-top Predjama Castle en route.", stops: ["Postojna Cave", "Predjama Castle", "Karst drive"] },
      { day: "Day 7", title: "Piran & the coast", detail: "Venetian Piran packed onto its little headland — Tartini Square, sea walls, and a bell tower over terracotta roofs. Salt pans, seafood, and Adriatic sunsets; cycle the flat coast.", stops: ["Tartini Square", "Sea walls", "Salt pans"] },
      { day: "Day 8", title: "Return to Ljubljana", detail: "Drive back to the capital for a final riverside evening, or straight to the airport to fly out.", stops: ["Ljubljana return", "Riverside dinner", "Fly out"] },
    ],
    places: [
      { name: "Lake Bled", area: "Julian Alps", blurb: "Slovenia's postcard — an island church on an emerald lake beneath a cliff-top castle and Alpine peaks. Row out, ring the wishing bell, and eat the famous cream cake." },
      { name: "Vintgar Gorge", area: "near Bled", blurb: "A dramatic 1.6 km wooden boardwalk pinned to the cliffs above the rushing turquoise Radovna river, ending at a waterfall." },
      { name: "Lake Bohinj", area: "Triglav NP", blurb: "Bled's bigger, wilder, quieter sibling deep in Triglav National Park — ringed by peaks and cycle paths, with the Vogel cable car for high views." },
      { name: "Vršič Pass", area: "Julian Alps", blurb: "Slovenia's highest mountain road — 50 cobbled and paved hairpins over the Alps into the Soča Valley, with knockout views at every turn." },
      { name: "Soča Valley", area: "Bovec / Kobarid", blurb: "A valley of impossibly turquoise water framed by peaks — Europe's adventure playground for rafting, kayaking, and riverside hikes, plus poignant WWI history." },
      { name: "Ljubljana", area: "Central Slovenia", blurb: "A green, car-free little capital along a willow-lined river, with a hilltop castle, buzzing café terraces, and some of Europe's best-value city dining." },
      { name: "Piran", area: "Slovenian Istria", blurb: "A tiny, perfectly-preserved Venetian town crammed onto a headland — marble Tartini Square, sea walls, and a bell tower over red roofs and the Adriatic." },
    ],
    experiences: [
      { title: "Row to Bled's island", detail: "Take a traditional pletna boat (or row yourself) to the island church and ring the bell for a wish." },
      { title: "Walk the Vintgar Gorge", detail: "The cliff-side boardwalk over the roaring turquoise river is a short, spectacular leg-stretch." },
      { title: "Drive the Vršič Pass", detail: "Slovenia's highest road — 50 hairpins over the Julian Alps into the Soča Valley (check late-October conditions)." },
      { title: "Raft or zipline the Soča", detail: "Bovec is the adventure hub: whitewater rafting, kayaking, canyoning, and ziplines over the emerald river." },
      { title: "Cycle Lake Bohinj", detail: "An easy, gorgeous loop of the quiet lake in Triglav National Park, then the Vogel cable car up top." },
      { title: "Tour Postojna & Predjama", detail: "Ride the underground train through Postojna Cave, then see the castle built into a cliff at Predjama." },
      { title: "Sunset seafood in Piran", detail: "Fresh Adriatic fish on the sea wall as the sun drops behind Tartini Square's bell tower." },
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
      { day: "Day 1", title: "Land in Bastia", detail: "Settle into the salty old port of Bastia and wander its faded-grand Genoese quarter. Start the wild Cap Corse loop north along the corniche if there's light.", stops: ["Vieux Port", "Terra Vecchia", "Cap Corse"] },
      { day: "Day 2", title: "Cap Corse to the Balagne", detail: "Finish the spectacular Cap Corse peninsula drive — sheer coast, Genoese towers, tiny marinas — then cross west to the Balagne. Base in seaside Calvi or L'Île-Rousse.", stops: ["Genoese towers", "Nonza", "Calvi"] },
      { day: "Day 3", title: "Calvi & hill villages", detail: "Calvi's Genoese citadel and crescent beach in the morning, then a loop of the perched Balagne craft villages — Sant'Antonino, Pigna — with olive oil, pottery, and long views.", stops: ["Calvi citadel", "Sant'Antonino", "Pigna"] },
      { day: "Day 4", title: "To Porto & the Calanques", detail: "Drive the dramatic coast to the Gulf of Porto and time the flaming red Calanques de Piana rock spires for golden hour. Optional boat to the Scandola marine reserve and Girolata.", stops: ["Calanques de Piana", "Gulf of Porto", "Scandola boat"] },
      { day: "Day 5", title: "Mountains & Corte", detail: "Cross inland over forested passes to Corte, the island's rugged mountain heart and old capital, then up the Restonica valley for glacial peaks and pools.", stops: ["Corte citadel", "Restonica valley", "Mountain pools"] },
      { day: "Day 6", title: "South to Bonifacio", detail: "Drive down to Bonifacio, its old town impossibly perched on white chalk cliffs above the straits toward Sardinia — glowing gold at sunset.", stops: ["Bonifacio clifftop", "Haute Ville", "Sunset"] },
      { day: "Day 7", title: "Bonifacio & beaches", detail: "Boat under the chalk cliffs and grottoes in the morning, then the white-sand, turquoise coves of Santa Giulia and Palombaggia in the afternoon.", stops: ["Cliff boat trip", "Palombaggia", "Santa Giulia"] },
      { day: "Day 8", title: "Return north", detail: "Scenic drive back toward Ajaccio or Bastia with a final coastal swim, then fly out.", stops: ["Coastal drive", "Final swim", "Fly out"] },
    ],
    places: [
      { name: "Bonifacio", area: "South Corsica", blurb: "A medieval old town perched impossibly on sheer white chalk cliffs above a fjord-like harbor, gazing across the straits to Sardinia." },
      { name: "Calanques de Piana", area: "Gulf of Porto", blurb: "A UNESCO landscape of flaming red-granite spires and towers plunging into a blue sea — a hair-raising, unforgettable coastal drive, best at sunset." },
      { name: "Calvi", area: "Balagne", blurb: "A Genoese citadel above a long crescent of sand and a lively marina, with the Balagne's perched craft-villages in the hills behind." },
      { name: "Cap Corse", area: "North Corsica", blurb: "The wild finger of land pointing north — a loop of sheer corniche, Genoese watchtowers, sleepy marinas, and the black-pebble village of Nonza." },
      { name: "Corte & the Restonica", area: "Central Corsica", blurb: "The island's mountain heart and historic capital, with a cliff-top citadel and the glacial pools and peaks of the Restonica valley on its doorstep." },
      { name: "Palombaggia & Santa Giulia", area: "near Porto-Vecchio", blurb: "Corsica's most beautiful beaches — white sand, umbrella pines, and shallow turquoise water in sheltered southern bays." },
      { name: "Scandola & Girolata", area: "Gulf of Porto", blurb: "A UNESCO marine reserve of red cliffs and sea caves reachable only by boat, with the roadless fishing hamlet of Girolata alongside." },
    ],
    experiences: [
      { title: "Boat under Bonifacio's cliffs", detail: "A short cruise beneath the chalk cliffs and sea grottoes, with the old town teetering overhead." },
      { title: "Drive the Calanques de Piana", detail: "Thread the flaming red rock spires above the Gulf of Porto — go at golden hour for the glow." },
      { title: "Loop the wild Cap Corse", detail: "A day of sheer corniche, Genoese towers, and tiny harbors around the island's northern finger." },
      { title: "Swim Palombaggia's coves", detail: "White sand and shallow turquoise water backed by umbrella pines in the sheltered south." },
      { title: "Hike the Restonica valley", detail: "From Corte up to glacial lakes and peaks — a taste of the legendary GR20 without the full trek." },
      { title: "Boat to Scandola & Girolata", detail: "Cruise the red-cliff marine reserve to the roadless fishing hamlet of Girolata for lunch." },
      { title: "Charcuterie & Corsican wine", detail: "Taste the island's chestnut-fed charcuterie, brocciu cheese, and maquis-scented wines." },
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
      { day: "Day 1", title: "Bordeaux → Sarlat", detail: "Collect the car and drive east into the Périgord Noir. Settle into golden, lamplit Sarlat — the best-preserved medieval town in France — and dine on duck and walnut in a candlelit courtyard.", stops: ["Sarlat old town", "Duck confit", "Walnut everything"] },
      { day: "Day 2", title: "Sarlat & markets", detail: "Explore Sarlat's honey-stone core and, if it's Saturday, its legendary food market — foie gras, cheeses, truffles in season. A first easy bike loop along a voie verte into the countryside.", stops: ["Saturday market", "Foie gras", "Voie verte ride"] },
      { day: "Day 3", title: "Castles of the Dordogne", detail: "The great river castles: Beynac and Castelnaud glare at each other across the water, and the clifftop bastide of Domme looks down the whole valley. Add the hanging gardens of Marqueyssac.", stops: ["Château de Beynac", "Castelnaud", "Marqueyssac gardens"] },
      { day: "Day 4", title: "Canoe the river", detail: "The signature day: paddle a canoe down the Dordogne past cliffs and châteaux, pulling in at La Roque-Gageac — a village pressed between the river and an ochre cliff — for a lazy lunch.", stops: ["Dordogne canoe", "La Roque-Gageac", "Riverside lunch"] },
      { day: "Day 5", title: "Prehistory & Rocamadour", detail: "The Ice-Age cave art of Lascaux (via the exact Lascaux IV replica), then east to Rocamadour, a pilgrimage village stacked vertically up a sheer cliff above a gorge.", stops: ["Lascaux IV", "Rocamadour", "Padirac chasm"] },
      { day: "Day 6", title: "Into the Lot valley", detail: "Drive south to the Lot: Saint-Cirq-Lapopie clinging to a cliff above a river bend, the fortified Pont Valentré at Cahors, and a tasting in the inky-red Cahors wine country.", stops: ["Saint-Cirq-Lapopie", "Pont Valentré", "Cahors wine"] },
      { day: "Day 7", title: "Back to Bordeaux", detail: "Meander back with a final bastide town or a Bergerac vineyard stop, then fly out.", stops: ["Bastide town", "Bergerac wine", "Fly out"] },
    ],
    places: [
      { name: "Sarlat-la-Canéda", area: "Périgord Noir", blurb: "The golden capital of the Périgord — a beautifully preserved medieval town of honey-stone lanes and a famous food market piled with duck, walnut, and truffle." },
      { name: "Beynac & Castelnaud", area: "Dordogne valley", blurb: "Two mighty medieval castles glaring at each other across the river from opposing cliffs — the classic Dordogne face-off, best seen from a canoe below." },
      { name: "La Roque-Gageac", area: "Dordogne valley", blurb: "One of France's 'most beautiful villages', a single line of ochre houses pressed between the river and a sheer sun-warmed cliff." },
      { name: "Domme", area: "Dordogne valley", blurb: "A honey-stone hilltop bastide with a panoramic terrace over the whole loop of the Dordogne valley — and caves beneath the market hall." },
      { name: "Rocamadour", area: "Lot / Quercy", blurb: "A sacred village stacked vertically up a cliff face above a gorge — a great medieval pilgrimage site, dramatic from every angle." },
      { name: "Lascaux", area: "near Montignac", blurb: "The most famous Ice-Age painted cave in the world; the exact Lascaux IV facsimile lets you walk through the 17,000-year-old bulls and horses." },
      { name: "Saint-Cirq-Lapopie", area: "Lot valley", blurb: "A jaw-dropping village of stone and timber clinging to a cliff high above a bend in the River Lot — often called France's prettiest village." },
    ],
    experiences: [
      { title: "Canoe past the châteaux", detail: "Paddle the gentle Dordogne beneath Beynac and Castelnaud to La Roque-Gageac — the region's signature outing." },
      { title: "Sarlat's Saturday market", detail: "Graze foie gras, walnut everything, cheeses, and (in season) black truffle in the medieval streets." },
      { title: "Tour Lascaux IV", detail: "Walk the exact replica of the painted cave — the Ice-Age masterpiece you can no longer enter for real." },
      { title: "Walk Marqueyssac's gardens", detail: "Hand-clipped boxwood on a clifftop with sweeping views over the castle-studded valley." },
      { title: "Descend the Gouffre de Padirac", detail: "A lift and boat ride 100 m down into a vast underground river-cave near Rocamadour." },
      { title: "Cycle a voie verte", detail: "Rent bikes in Sarlat and ride the flat greenway paths along the old railway lines." },
      { title: "Bergerac & Cahors wine", detail: "Taste the region's reds and sweet whites at cellar doors between the villages." },
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

// Wire every trip to its self-hosted photos (real Wikimedia Commons images,
// downloaded by scripts/fetch-photos.mjs) so they always load from Vercel.
// Credits: public/images/CREDITS.md
for (const t of trips) {
  t.heroImage = `/images/${t.slug}-hero.jpg`;
  t.gallery = t.gallery.map((g, i) => ({ ...g, url: `/images/${t.slug}-g${i + 1}.jpg` }));
  t.itinerary = t.itinerary.map((d, i) => ({ ...d, image: `/images/${t.slug}-day${i + 1}.jpg` }));
  t.places = t.places.map((p, i) => ({ ...p, image: `/images/${t.slug}-place${i + 1}.jpg` }));
}

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);
