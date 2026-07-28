// Day-guide content for the Iceland drill-down pages (/iceland/<weekday>).
// One extensive "field guide" per day, meant to be opened ON that day: options
// for stops, off-the-beaten-path finds, photo spots, things to try, and places
// to eat, so decisions take seconds instead of searches. Cards reuse the Place
// shape and render with the existing Places grid. Every card carries a photo
// that is self-hosted in public/images (scripts/fetch-photos.mjs --iceland);
// cards about a procedure rather than a place reuse the most apt trip photo.

import type { Place } from "./trips";

export type GuideSection = {
  id: string;
  title: string;
  sub: string;
  places: Place[];
};

export type GuideNote = {
  title: string;
  detail: string;
  tone?: "default" | "safety" | "family" | "tip";
};

export type DayGuide = {
  slug: string; // /iceland/<slug>
  dayId: string; // joins days[] in ./iceland for the flow strip + route map
  weekday: string;
  date: string;
  title: string;
  badge: string;
  intro: string;
  sections: GuideSection[];
  notes: GuideNote[];
};

const g = (file: string) => `/images/iceland-guide-${file}.jpg`;
const i = (file: string) => `/images/iceland-${file}.jpg`;

export const dayGuides: DayGuide[] = [
  // -------------------------------------------------------------------------
  // WEDNESDAY — Seattle travel day (compact)
  // -------------------------------------------------------------------------
  {
    slug: "wednesday",
    dayId: "day-wed",
    weekday: "Wed",
    date: "Aug 26",
    title: "Travel-day playbook",
    badge: "Seattle → overnight flight",
    intro:
      "Nothing to sightsee today — this page is the checklist-brain so nobody has to think at the airport. The single goal: both kids asleep somewhere over Canada.",
    sections: [
      {
        id: "airport",
        title: "Make SEA easy",
        sub: "A 7:00 PM departure with a 2-year-old is genuinely good timing — here's how to keep it that way.",
        places: [
          {
            name: "Arrive 4:00–4:30",
            area: "Buffer beats speed",
            blurb:
              "Three hours sounds long until you add bag drop, security with a stroller, a diaper change, and a sit-down dinner. Arriving early converts stress into wandering time.",
            image: g("sea-airport"),
          },
          {
            name: "Gate-check the stroller",
            area: "At the Icelandair desk",
            blurb:
              "Tag the stroller (and car seats if you bring your own) at check-in. Keep the stroller to the gate — you'll want it through the terminal — then collect it at the KEF jet bridge.",
            image: g("airport-checkin"),
          },
          {
            name: "Find the play area",
            area: "Burn energy on purpose",
            blurb:
              "SEA has children's play areas — ask any agent for the nearest one to your gate and let the kids go hard. A tired 2-year-old at boarding is the whole strategy.",
            image: g("playground"),
          },
          {
            name: "Water + snacks after security",
            area: "Refill culture",
            blurb:
              "Empty bottles through security, refill at fountains, and buy backup snacks. Icelandair's kids' meal exists but never bet a toddler's mood on airline catering.",
            image: g("departure-board"),
          },
          {
            name: "Sit-down dinner, not gate snacks",
            area: "Eat before boarding",
            blurb:
              "A real table dinner around 5:00 means the flight's meal service can be skipped for sleep. Everyone boards fed and calm.",
            image: g("burger"),
          },
          {
            name: "Pajamas before boarding",
            area: "The bedtime signal",
            blurb:
              "Change both kids into pajamas at the gate and brush teeth in the bathroom by the gate. On board, it's story → lights out — the routine says 'night', even at 35,000 ft.",
            image: g("plane-cabin"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "Seat plan",
        detail:
          "Window for the 7-year-old, middle for the toddler's car seat or lap, aisle for the parent doing laps. The other parent takes the row's other aisle if you can get it.",
        tone: "family",
      },
      {
        title: "First service, then dark",
        detail:
          "Icelandair dims the cabin after the first pass. Ride that: screens off, seats back, white noise on. Even 4–5 hours of kid sleep transforms Thursday.",
        tone: "tip",
      },
      {
        title: "Don't over-plan the landing",
        detail: "Tomorrow has exactly one fixed thing (the noon lagoon). If the night goes badly, the plan flexes — that's by design.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // THURSDAY — arrival, Blue Lagoon, first Reykjavík evening
  // -------------------------------------------------------------------------
  {
    slug: "thursday",
    dayId: "day-thu",
    weekday: "Thu",
    date: "Aug 27",
    title: "Arrival day field guide",
    badge: "Blue Lagoon + first evening",
    intro:
      "One anchor (the noon lagoon), then a soft landing in Reykjavík. Everything below is optional menu, ordered by how likely you are to want it — pick by energy, not ambition.",
    sections: [
      {
        id: "lagoon",
        title: "Blue Lagoon, done well",
        sub: "2.5 hours door-to-door is the sweet spot with kids. The moves that make it smooth:",
        places: [
          {
            name: "Arrive 15 early, not 45",
            area: "12:00 slot",
            blurb:
              "Check-in queues clear fast; too early just adds waiting. Wristbands work the lockers and charge drinks — one parent's band pays for everything.",
            image: i("blue-lagoon"),
          },
          {
            name: "Conditioner first, then hair up",
            area: "Silica survival",
            blurb:
              "Slather the free conditioner in everyone's hair BEFORE the water and leave it in. Hair ties for anyone with length — silica takes days to wash out otherwise.",
            image: g("lagoon-bridge"),
          },
          {
            name: "Claim a shallow corner",
            area: "With the floaties",
            blurb:
              "The lagoon has shallow edges near the silica bar where the 2-year-old can stand. Both kids wear the provided floaties, always within arm's reach — the water is milky-opaque.",
            image: i("blue-lagoon"),
          },
          {
            name: "Silica mask family photo",
            area: "The classic",
            blurb:
              "Free silica mud at the swim-up bar: white faces, steam, black lava behind — this is the trip's first keeper photo. A phone in a ziplock works fine.",
            image: i("hero"),
          },
          {
            name: "In-water drinks break",
            area: "Kids' slush exists",
            blurb: "The swim-up bar does smoothies/slush for kids and a beer or skyr smoothie for adults. One round, mid-soak, is the perfect reset.",
            image: i("hero"),
          },
          {
            name: "The lava boardwalk after",
            area: "15 min · dry clothes on",
            blurb:
              "Once changed, the boardwalk loop around the lagoon's outflow ponds gives the otherworldly blue-on-black photos without anyone getting wet again.",
            image: g("lava-flow"),
          },
        ],
      },
      {
        id: "first-walk",
        title: "The first-evening walk loop",
        sub: "≈1 hour, stroller-friendly, from any central hotel — do the whole loop or bail at any point.",
        places: [
          {
            name: "Rainbow Street",
            area: "Skólavörðustígur",
            blurb:
              "The painted rainbow runs straight up to Hallgrímskirkja — gift shops, ice cream, and the trip's easiest 'we're here!' photo, kids mid-rainbow, church behind.",
            image: i("rainbow-street"),
          },
          {
            name: "Hallgrímskirkja",
            area: "Top of the rainbow",
            blurb:
              "The rocket-shaped church. If the tower is open (small fee, elevator), the view over the colored rooftops is the best in town and takes 20 minutes total.",
            image: i("hallgrimskirkja"),
          },
          {
            name: "Tjörnin pond",
            area: "5 min downhill",
            blurb:
              "The city pond swarms with ducks, geese, and swans — a guaranteed toddler hit. Hljómskálagarður park at its south end has a playground if dinner needs earning.",
            image: i("tjornin"),
          },
          {
            name: "Sun Voyager → Harpa",
            area: "Waterfront finish",
            blurb:
              "Down to the steel ship sculpture on the water, then along the bay to Harpa's honeycomb glass. Mountains across the water, wide sidewalks, zero cars.",
            image: i("sun-voyager"),
          },
        ],
      },
      {
        id: "still-going",
        title: "If everyone's somehow still going",
        sub: "Bonus options for a miracle evening — none worth waking anyone up for.",
        places: [
          {
            name: "Harpa from the inside",
            area: "Free to wander",
            blurb:
              "The honeycomb glass from inside, with light bouncing everywhere — free, warm, and has good bathrooms. Kids love the mirrored ceilings on the upper floors.",
            image: g("harpa-inside"),
          },
          {
            name: "Old Harbour stroll",
            area: "Boats + ice cream",
            blurb: "Fishing boats, whale-tour rigs, and Valdís ice cream on the pier. Short, flat, and photogenic in evening light.",
            image: i("old-harbour"),
          },
          {
            name: "Grótta lighthouse",
            area: "15 min drive · Seltjarnarnes",
            blurb:
              "Wind-blown seafront walk to a lighthouse on a tidal island (check the tide before crossing). Locals' sunset spot — save it for another evening if tonight runs short.",
            image: i("grotta"),
          },
        ],
      },
      {
        id: "try",
        title: "Things to try today",
        sub: "Day-one food culture, all within a few blocks of the center.",
        places: [
          {
            name: "The Icelandic hot dog",
            area: "Bæjarins Beztu · since 1937",
            blurb:
              "Order 'eina með öllu' — one with everything (crispy onions below, remoulade on top). The famous stand is by the harbour; a kid-sized dinner costs pocket change.",
            image: g("hot-dog"),
          },
          {
            name: "Skyr",
            area: "Any grocery store",
            blurb:
              "Iceland's yogurt-that-isn't-yogurt. Grab a rainbow of cups in tonight's Bónus run — instant breakfasts and the toddler's new favorite food group.",
            image: g("skyr"),
          },
          {
            name: "A proper cinnamon bun",
            area: "Brauð & Co · Frakkastígur",
            blurb:
              "The graffiti-wrapped bakery by Hallgrímskirkja does Iceland's best snúður. If it's closed by evening, that's your Friday-morning errand.",
            image: g("cinnamon-bun"),
          },
          {
            name: "Appelsín + Kristall",
            area: "The local sodas",
            blurb: "Orange Appelsín for the kids, flavored Kristall sparkling water for the adults — the road-trip drinks sorted for the whole week.",
            image: g("bonus-store"),
          },
        ],
      },
      {
        id: "eat",
        title: "Easy first-night dinners",
        sub: "All casual, all used to strollers, all done in under an hour.",
        places: [
          {
            name: "Icelandic Street Food",
            area: "Lækjargata",
            blurb:
              "Lamb soup or fish stew served in a bread bowl, with free refills — warm, fast, and the friendliest room in town for tired kids.",
            image: g("lamb-soup"),
          },
          {
            name: "Hamborgarabúllan",
            area: "Old Harbour",
            blurb: "Tommi's burger joint: simple burgers, crinkle fries, milkshakes. Zero-risk with a 7-year-old and steps from the harbour walk.",
            image: g("burger"),
          },
          {
            name: "Reykjavík Fish",
            area: "Tryggvagata",
            blurb: "Casual fish & chips done properly (try the plokkfiskur — Icelandic fish mash). Quick counter service, kids' portions.",
            image: g("fish-chips"),
          },
          {
            name: "Grocery-run dinner",
            area: "Bónus / Krónan",
            blurb:
              "Nobody would judge: skyr, bread, fruit, and bed by 8. Do the shop tonight regardless — breakfasts and road snacks for the whole trip.",
            image: g("bonus-store"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "Check before you drive",
        detail:
          "Reykjanes has had recurring volcanic episodes near Grindavík — the lagoon closes when activity spikes. Glance at safetravel.is and the Blue Lagoon site while waiting for bags; if it's shut, swap in Sky Lagoon (10 min from Reykjavík) and the day still works.",
        tone: "safety",
      },
      {
        title: "The lagoon bag rides up front",
        detail: "Swimsuits, towels are provided, dry outfits, hair ties, ziplock for the phone — one bag on top of the luggage, nothing else unpacked.",
        tone: "family",
      },
      {
        title: "Jet-lag rule for kids",
        detail: "Daylight and motion until 7 PM local, then hard bedtime. Tonight's early night buys the whole week.",
        tone: "tip",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // FRIDAY — Golden Circle
  // -------------------------------------------------------------------------
  {
    slug: "friday",
    dayId: "day-fri",
    weekday: "Fri",
    date: "Aug 28",
    title: "Golden Circle field guide",
    badge: "Þingvellir · Geysir · Gullfoss",
    intro:
      "The plan holds the three anchors; this page holds everything you might bolt on. Rule of thumb: add at most two extras, and let the toddler's mood pick which.",
    sections: [
      {
        id: "anchors",
        title: "The three anchors, upgraded",
        sub: "What to actually do at each stop so it lands with kids.",
        places: [
          {
            name: "Almannagjá rift walk",
            area: "Þingvellir · 30–40 min",
            blurb:
              "Walk the path DOWN the gorge from the visitor center — you're literally between North America and Europe. Tell the 7-year-old the ground is tearing 2 cm a year; watch the walk improve instantly.",
            image: i("thingvellir"),
          },
          {
            name: "Öxarárfoss",
            area: "Þingvellir · +15 min",
            blurb:
              "The waterfall inside the rift, reached by an easy boardwalk off Almannagjá. Most tour groups skip it, which makes it the calmest waterfall you'll see all week.",
            image: g("oxararfoss"),
          },
          {
            name: "Strokkur, timed right",
            area: "Geysir · every 5–10 min",
            blurb:
              "Stand upwind (watch where the steam blows), count eruptions, and let the kids predict the burst — the pre-blast blue bubble is the photo. Two or three eruptions is plenty.",
            image: i("geysir"),
          },
          {
            name: "Gullfoss upper platform",
            area: "20–30 min",
            blurb:
              "Start at the top platform for the full two-step canyon view (rainbows on sunny days), walk the lower path only if wind and spray allow. Hold hats — literally.",
            image: i("gullfoss"),
          },
        ],
      },
      {
        id: "addons",
        title: "Worthwhile add-on stops",
        sub: "All on or just off the loop, ordered roughly along your route. Pick two, max.",
        places: [
          {
            name: "Silfra viewing point",
            area: "Þingvellir · +10 min",
            blurb:
              "Peer into the glass-clear fissure where divers float between continents. With kids you just look from the walkway — five minutes, wildly memorable water.",
            image: g("silfra"),
          },
          {
            name: "Laugarvatn Fontana rye bread dig",
            area: "On Route 37 · ~45 min",
            blurb:
              "Staff dig a pot of geothermal rye bread out of the hot black sand and serve it steaming with butter (usually ~11:30 & 14:30 — confirm times). Kids watching bread come out of the ground: unbeatable.",
            image: g("laugarvatn"),
          },
          {
            name: "Kerið crater",
            area: "Route 35 south · +10 min detour",
            blurb:
              "A red-walled volcanic crater with a teal lake; the rim loop takes 15–20 minutes with kids. Small entry fee, big 'we walked on a volcano' payoff — best slotted on the drive home.",
            image: g("kerid"),
          },
          {
            name: "Faxi waterfall",
            area: "5 min off Route 35",
            blurb:
              "A wide, gentle waterfall with a picnic-friendly bank and almost no crowds — the perfect legs-stretch if the car nap ends early.",
            image: g("faxi"),
          },
          {
            name: "Skálholt cathedral",
            area: "Route 31 · 20 min stop",
            blurb: "A thousand years of Icelandic history in one quiet white church — plus reliable bathrooms and space to run.",
            image: g("skalholt"),
          },
          {
            name: "Brúarfoss",
            area: "Only on a miracle day",
            blurb:
              "The bluest waterfall in Iceland — but it's a 3.5 km each-way riverside walk. With a 2-year-old, admire the photo and drive on; it's a future-trip promise.",
            image: g("bruarfoss"),
          },
        ],
      },
      {
        id: "kid-magnets",
        title: "Kid magnets",
        sub: "The stops that exist purely to make the day theirs.",
        places: [
          {
            name: "Efstidalur farm ice cream",
            area: "Route 37 · between Laugarvatn & Geysir",
            blurb:
              "Ice cream made on the farm, eaten at a window looking into the cow barn. The single highest kid-joy-per-minute stop on the Golden Circle.",
            image: g("efstidalur"),
          },
          {
            name: "Roadside Icelandic horses",
            area: "Anywhere along Route 36/37",
            blurb:
              "Shaggy, friendly, mane-in-the-wind horses at fence lines all day. Use marked pull-offs only, and don't feed them — they're charming beggars.",
            image: g("icelandic-horse"),
          },
          {
            name: "Geysir's bubbling pools",
            area: "The walk to Strokkur",
            blurb:
              "The path passes steaming vents and boiling blue pools — hold hands here (it's genuinely hot) and let the sulfur smell become the day's running joke.",
            image: g("geysir-pool"),
          },
        ],
      },
      {
        id: "eat",
        title: "Lunch & treats",
        sub: "The realistic options, in route order.",
        places: [
          {
            name: "Friðheimar greenhouse",
            area: "Reykholt · book ahead",
            blurb:
              "Lunch inside a glowing tomato greenhouse — endless tomato soup + bread buffet, and they welcome kids (there's often a horse show outside). The one Golden Circle meal worth reserving; book online today if you want it.",
            image: g("fridheimar"),
          },
          {
            name: "Geysir Center food court",
            area: "Across from Strokkur",
            blurb: "Cafeteria speed: soup, sandwiches, kids' plates, clean bathrooms. Not memorable, perfectly efficient — the default if Friðheimar is full.",
            image: g("food-hall"),
          },
          {
            name: "Picnic at Faxi",
            area: "Grocery-run version",
            blurb: "If the weather's kind, yesterday's Bónus haul on Faxi's grassy bank beats any restaurant queue.",
            image: g("faxi"),
          },
          {
            name: "Efstidalur upstairs",
            area: "The bigger farm meal",
            blurb: "Above the ice-cream barn there's a proper farm restaurant (burgers from their own herd) — works as either lunch or the treat stop.",
            image: g("efstidalur"),
          },
        ],
      },
      {
        id: "camera",
        title: "Camera stops",
        sub: "Where today's keepers happen.",
        places: [
          {
            name: "Mid-rift on Almannagjá",
            area: "Þingvellir",
            blurb: "Family on the path, rift walls on both sides — the 'standing between continents' shot.",
            image: g("almannagja"),
          },
          {
            name: "Strokkur's blue bubble",
            area: "Geysir",
            blurb: "Burst photos are luck; the swelling turquoise dome a half-second before is skill. Burst mode, kids' reaction faces in frame.",
            image: i("geysir"),
          },
          {
            name: "Gullfoss from the upper trail",
            area: "Rainbow hour",
            blurb: "Late morning to midday sun puts rainbows in the spray. Shoot from the upper platform with the canyon running away to the right.",
            image: i("gullfoss"),
          },
          {
            name: "Kerið's red rim",
            area: "If you stop",
            blurb: "Red slopes, teal lake, tiny people on the rim path — phone-wide from the entrance stairs gets it all.",
            image: g("kerid"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "Parking & bathrooms",
        detail:
          "Þingvellir parking is paid (card machines, covers all lots); bathrooms there, at Geysir, and at Gullfoss are the reliable three — use each. Fuel exists at Laugarvatn and on Route 35.",
        tone: "tip",
      },
      {
        title: "The two-extra rule",
        detail: "Three anchors + two extras fills 8:30–5:00 exactly. A third extra is how great days turn into carried-to-bed meltdowns.",
        tone: "family",
      },
      {
        title: "Weather swap stands",
        detail: "If the forecast flipped overnight, this loop and Saturday's coast swap cleanly — nothing here is booked except (maybe) Friðheimar.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // SATURDAY — South Coast
  // -------------------------------------------------------------------------
  {
    slug: "saturday",
    dayId: "day-sat",
    weekday: "Sat",
    date: "Aug 29",
    title: "South Coast field guide",
    badge: "Waterfalls · glacier · black sand",
    intro:
      "The longest day, so this page is deliberately over-stocked: the anchors, the two-minute detours that feel like secrets, and honest notes on what to skip with a toddler.",
    sections: [
      {
        id: "anchors",
        title: "The planned anchors",
        sub: "The backbone from the main plan, with the on-the-ground details.",
        places: [
          {
            name: "Seljalandsfoss",
            area: "Stop 1 · 9:45",
            blurb:
              "See it from the front path — the walk BEHIND the curtain is dramatic but soaks everyone and gets slippery; with the toddler, front-row spray is plenty. Waterproofs on before leaving the car.",
            image: i("seljalandsfoss"),
          },
          {
            name: "Skógafoss",
            area: "Stop 2 · 11:15",
            blurb:
              "Walk right up the black gravel to the base — rainbows live in the spray on any sunny moment. The 500-step staircase is optional; one parent + the 7-year-old can race it while the others throw rocks in the river.",
            image: i("skogafoss"),
          },
          {
            name: "Lunch in Vík",
            area: "Stop 3 · 1:00",
            blurb: "A real sit-down reset under the red-roofed church hill. Options below — pick by queue length, not reviews.",
            image: g("vik-town"),
          },
          {
            name: "Dyrhólaey viewpoint",
            area: "Stop 4 · 2:20",
            blurb:
              "The upper viewpoint gives the arch, the endless black beach, and (sometimes into August) puffins — all from a safe clifftop railing. Watch the wind at the car doors.",
            image: i("dyrholaey"),
          },
        ],
      },
      {
        id: "detours",
        title: "Two-minute detours, huge payoff",
        sub: "Each of these is essentially at a planned stop already — the difference between seeing the coast and feeling like you found it.",
        places: [
          {
            name: "Gljúfrabúi",
            area: "300 m from Seljalandsfoss parking",
            blurb:
              "The hidden waterfall inside a mossy canyon slot — you wade a shallow stream between cliff walls into a chamber of spray. The 7-year-old's favorite ten minutes of the trip; toddler watches from the entrance with a parent.",
            image: g("gljufrabui"),
          },
          {
            name: "Kvernufoss",
            area: "15-min walk behind Skógar museum",
            blurb:
              "Skógafoss's secret sibling: a gentle meadow path to a fall you can walk behind WITHOUT the crowds or the soaking. If the family has one bonus walk in them, spend it here.",
            image: g("kvernufoss"),
          },
          {
            name: "Skógar folk museum",
            area: "Next to Skógafoss",
            blurb:
              "Turf-roofed farmhouses, a sod church, and a hall of fishing-age relics — 30–45 mins, brilliant for kids, and a warm escape if a squall rolls through.",
            image: g("skogar-museum"),
          },
          {
            name: "Sólheimajökull glacier tongue",
            area: "4 km side road + 20-min flat walk",
            blurb:
              "Park, walk the gravel path, and stand in front of an actual glacier — blue ice, black ash stripes, calving lagoon. The 'is that really a glacier?!' moment of the trip, stroller-rollable to the overlook.",
            image: g("solheimajokull"),
          },
          {
            name: "Dyrhólaey lighthouse",
            area: "Upper road from the viewpoint",
            blurb: "The stubby 1927 lighthouse on the headland's top — five extra minutes of driving for the widest coast panorama of the day.",
            image: g("dyrholaey-lighthouse"),
          },
          {
            name: "Vík church hill",
            area: "5 min up from town",
            blurb: "The red-roofed church framed by Reynisdrangar sea stacks — Iceland's most photographed small church, and a two-minute stop.",
            image: g("vik-church"),
          },
        ],
      },
      {
        id: "maybe",
        title: "Know what you're skipping",
        sub: "Famous spots that don't fit a toddler day — so the FOMO is informed.",
        places: [
          {
            name: "Reynisfjara black beach",
            area: "Conditions-dependent",
            blurb:
              "The basalt columns are real-life Minecraft — but sneaker waves here are genuinely lethal. Go ONLY if the safetravel.is light is green/yellow-low, stay high on the beach, kids' hands held the entire time. Skipping is a fine choice.",
            image: i("reynisfjara"),
          },
          {
            name: "Sólheimasandur plane wreck",
            area: "8 km round-trip walk",
            blurb:
              "The famous DC-3 skeleton sits an hour's flat, featureless walk from the road (or a paid shuttle). Iconic photo, terrible toddler math — enjoy the picture here and keep driving.",
            image: g("plane-wreck"),
          },
          {
            name: "Seljavallalaug hidden pool",
            area: "20-min rough path",
            blurb:
              "A 1923 pool built into a mountainside — atmospheric, but unheated changing shed + slippery algae + toddler = next trip. It'll still be there.",
            image: g("seljavallalaug"),
          },
          {
            name: "Eyjafjallajökull viewpoint",
            area: "Route 1 pull-off",
            blurb:
              "The volcano that grounded Europe in 2010, seen from the Þorvaldseyri farm pull-off. Thirty seconds of 'that one, kids' — worth exactly that.",
            image: g("eyjafjallajokull"),
          },
        ],
      },
      {
        id: "try",
        title: "Things to try today",
        sub: "Road-day culture, warm and mostly edible.",
        places: [
          {
            name: "Icelandic Lava Show",
            area: "Vík · book if weather turns",
            blurb:
              "Real molten lava poured in front of you, indoors — the only place on Earth doing it. ~50 minutes, kids gasp audibly. The perfect Plan B if the coast blows sideways.",
            image: g("lava-flow"),
          },
          {
            name: "Skool Beans",
            area: "Vík · a yellow school bus",
            blurb: "Hot chocolate served from a converted American school bus with a resident cat. The kids will talk about the bus, not the waterfalls.",
            image: g("cinnamon-bun"),
          },
          {
            name: "Kleina at a bakery stop",
            area: "Anywhere en route",
            blurb: "Iceland's twisted doughnut — dense, cardamom-y, made for car consumption. Buy six, regret buying six, buy six more.",
            image: g("kleina"),
          },
          {
            name: "Kjötsúpa somewhere warm",
            area: "The lamb soup ritual",
            blurb: "Every South Coast café ladles lamb soup. After a spray-soaked waterfall it stops being lunch and becomes medicine.",
            image: g("lamb-soup"),
          },
        ],
      },
      {
        id: "eat",
        title: "Places to eat",
        sub: "Ordered along the route home.",
        places: [
          {
            name: "Gamla Fjósið",
            area: "Below Eyjafjallajökull",
            blurb:
              "'The Old Cowshed' — a farm restaurant in the actual 1919 barn, burgers and stews from their own cattle. The most character per kid-friendly seat on the coast.",
            image: g("efstidalur"),
          },
          {
            name: "Black Crust Pizzeria",
            area: "Vík",
            blurb: "Lava-black pizza dough the kids will demand to photograph before eating. Quick, warm, right on the main street.",
            image: g("pizza"),
          },
          {
            name: "The Soup Company",
            area: "Vík",
            blurb: "Hearty soups in bread bowls (the 'lava' beef soup is the move). Fast service built for road-trippers.",
            image: g("lamb-soup"),
          },
          {
            name: "Suður-Vík",
            area: "Vík · the sit-down option",
            blurb: "The proper restaurant in the old house on the hill — book-ish on summer weekends, worth it if the day is running ahead of schedule.",
            image: g("vik-church"),
          },
        ],
      },
      {
        id: "camera",
        title: "Camera stops",
        sub: "The shots this coastline owes you.",
        places: [
          {
            name: "Inside Gljúfrabúi's chamber",
            area: "Waterproof the phone",
            blurb: "Spray + the light shaft from above = the trip's most atmospheric picture. Ziplock bag, wipe the lens, shoot up.",
            image: g("gljufrabui"),
          },
          {
            name: "Skógafoss rainbow, people for scale",
            area: "From the river gravel",
            blurb: "Put the family small in frame at the base — the 60 m curtain does the rest.",
            image: i("skogafoss"),
          },
          {
            name: "Reynisdrangar from Dyrhólaey",
            area: "The safe black-sand shot",
            blurb: "The sea stacks and infinite black beach, photographed from above with zero wave risk. This is the postcard, minus the danger.",
            image: g("reynisdrangar"),
          },
          {
            name: "Glacier blue at Sólheimajökull",
            area: "Overlook rail",
            blurb: "Ash-striped ice and the meltwater lagoon — zoom past the people at the rail and it looks like an expedition.",
            image: g("solheimajokull"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "Reynisfjara is a real hazard",
        detail:
          "Sneaker waves take people every year, on calm-looking days. Check the warning-light system on safetravel.is before deciding, never turn your back to the water, and treat the wet sand as off-limits with kids.",
        tone: "safety",
      },
      {
        title: "Paid parking twice",
        detail: "Seljalandsfoss and Skógafoss both charge for parking (card machines). Have one card ready and count it as waterfall admission.",
        tone: "tip",
      },
      {
        title: "Wind doors",
        detail: "South Coast gusts bend car doors backwards — a real rental-damage classic. Adults open all doors today, kids released only on the sheltered side.",
        tone: "family",
      },
      {
        title: "Fuel logic",
        detail: "Top up in Hvolsvöllur or at Vík's N1 — stations are sparse between them and the detours burn more than the map suggests.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // SUNDAY — Reykjavík family day
  // -------------------------------------------------------------------------
  {
    slug: "sunday",
    dayId: "day-sun",
    weekday: "Sun",
    date: "Aug 30",
    title: "Reykjavík family-day field guide",
    badge: "Perlan + pick-your-finale",
    intro:
      "Today runs on a weather router: rain pushes you indoors to world-class museums, sun pushes you to the zoo and the harbour. Either way, pick ONE morning thing and ONE afternoon thing — the nap in between is non-negotiable.",
    sections: [
      {
        id: "perlan",
        title: "Perlan, maxed",
        sub: "The morning anchor — here's what's inside the dome so you don't miss the good rooms.",
        places: [
          {
            name: "The ice cave",
            area: "Real 350-ton glacier ice",
            blurb:
              "A 100-metre tunnel of actual ice, kept at −10°C — jackets are provided-ish but bring your own layers. The 2-year-old's face at the entrance is the photo.",
            image: g("ice-cave"),
          },
          {
            name: "Látrabjarg cliff wall",
            area: "Forces of Nature hall",
            blurb: "A ten-metre replica bird cliff with projected puffins and a floor that rumbles for earthquakes — the room kids refuse to leave.",
            image: g("latrabjarg"),
          },
          {
            name: "Áróra planetarium show",
            area: "Timed entries",
            blurb:
              "The northern-lights dome film is the closest August gets to auroras. Check the schedule at the desk on arrival and build the visit around it.",
            image: g("aurora"),
          },
          {
            name: "The observation deck",
            area: "360° over the city",
            blurb:
              "Walk the open-air ring: colored rooftops, Esja, the bay, and this week's two road trips on the horizon. The café behind it handles second breakfast.",
            image: i("perlan"),
          },
        ],
      },
      {
        id: "kids-rvk",
        title: "The kids' Reykjavík",
        sub: "Sunday-afternoon candidates, all ≤10 minutes' drive. Rank them with the kids at lunch.",
        places: [
          {
            name: "Húsdýragarðurinn family park & zoo",
            area: "Laugardalur",
            blurb:
              "Seals, arctic foxes, reindeer, and every Icelandic farm animal, plus a small ride park — the whole thing is toddler-scaled. Sunny-day first choice.",
            image: g("husdyragardurinn"),
          },
          {
            name: "Whales of Iceland",
            area: "Grandi",
            blurb:
              "Life-size models of every whale in Icelandic waters hanging in blue light — walking under a 25 m blue whale recalibrates a 7-year-old permanently. Rainy-day first choice.",
            image: g("whales-of-iceland"),
          },
          {
            name: "Árbær open-air museum",
            area: "10 min east",
            blurb:
              "A preserved turf-house village with costumed guides, old-time toys, and farm animals — Iceland's past at running-around scale. Sundays often add demonstrations.",
            image: g("arbaer"),
          },
          {
            name: "Botanical garden + Café Flóra",
            area: "Laugardalur",
            blurb: "Ponds, ducks, lawns to roll down, and a greenhouse café — pairs perfectly with the zoo next door for a full Laugardalur afternoon.",
            image: g("botanical-garden"),
          },
          {
            name: "Viðey island micro-voyage",
            area: "5-min ferry",
            blurb:
              "A tiny boat to a car-free island of trails, seabirds, and Yoko Ono's Peace Tower base. The ferry ride IS the attraction for kids — check return times, bring the carrier.",
            image: g("videy"),
          },
          {
            name: "Laugardalslaug",
            area: "The classic finale",
            blurb:
              "Already in the main plan as the pool option: slides, a shallow kids' lagoon, and hot pots for the adults, in the same park as the zoo.",
            image: i("laugardalslaug"),
          },
        ],
      },
      {
        id: "harbour",
        title: "The harbour finale (option B)",
        sub: "If the afternoon goes maritime instead of Laugardalur.",
        places: [
          {
            name: "Grandi district stroll",
            area: "Old Harbour's working end",
            blurb: "Fishing boats, street art on the fish-packing houses, and the food hall — a flat 30-minute wander with ice cream at the end.",
            image: i("old-harbour"),
          },
          {
            name: "Omnom chocolate",
            area: "Grandi flagship",
            blurb: "Iceland's bean-to-bar star — the shop pours hot chocolate and sells the wrappers-too-pretty-to-open bars that solve every gift obligation at once.",
            image: g("chocolate"),
          },
          {
            name: "Valdís",
            area: "Grandi's ice-cream queue",
            blurb: "The city's favorite scoop shop. A queue out the door in any weather; the Turkish pepper flavor is a dare, the caramel is the answer.",
            image: g("ice-cream"),
          },
          {
            name: "Harpa's honeycomb, again",
            area: "Golden hour",
            blurb: "If Thursday's visit was rushed, Sunday evening light through the glass is the version worth the second look.",
            image: g("harpa-inside"),
          },
        ],
      },
      {
        id: "try",
        title: "Things to try today",
        sub: "Sunday-specific culture.",
        places: [
          {
            name: "Sunday-morning bakery run",
            area: "Brauð & Co or Sandholt",
            blurb: "The one morning without an early departure — spend it on warm snúðar and let the hotel breakfast lose on merit.",
            image: g("cinnamon-bun"),
          },
          {
            name: "Rúgbrauð with butter",
            area: "Any café or the grocery haul",
            blurb: "The dark, sweet geothermal rye — dense as cake, best under too much butter. (The Fontana version was Friday's; this is the everyday one.)",
            image: g("rye-bread"),
          },
          {
            name: "Sundlaug etiquette",
            area: "If the pool wins",
            blurb: "Icelandic pools require a proper naked pre-swim shower (attendants enforce it kindly). Brief the 7-year-old in advance and it becomes cultural anthropology, not embarrassment.",
            image: i("laugardalslaug"),
          },
        ],
      },
      {
        id: "eat",
        title: "Easy dinners for the last night",
        sub: "Close to the hotel, done by 6:30, zero drama.",
        places: [
          {
            name: "Grandi Mathöll",
            area: "Food hall · everyone picks",
            blurb: "A converted fish factory where the 7-year-old gets fish & chips, the toddler gets fries, and the adults get lamb — no negotiation required.",
            image: g("food-hall"),
          },
          {
            name: "Flatey Pizza",
            area: "Grandi",
            blurb: "Neapolitan pizza in a bright room, out in 40 minutes — the reliable last-supper pick.",
            image: g("pizza"),
          },
          {
            name: "Hlemmur Mathöll",
            area: "If you stayed east",
            blurb: "The original food hall: bánh mì, tacos, and Skál's Icelandic plates under one roof, five minutes from east-end apartments.",
            image: g("hlemmur"),
          },
          {
            name: "The grocery finale",
            area: "Krónan run",
            blurb: "Dinner-lite plus tomorrow's plane snacks and the last skyr load-out in one stop — honestly the correct choice before a 5:45 wake-up.",
            image: g("bonus-store"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "The weather router",
        detail: "Rain: Perlan + Whales of Iceland. Sun: Perlan early + zoo/pool afternoon. Mixed: Perlan + Árbær. Decide at breakfast, not before.",
        tone: "tip",
      },
      {
        title: "Souvenirs without a mission",
        detail:
          "Omnom bars, a wool-shop lopapeysa if budget allows, and a Bónus bag of Icelandic candy (Þristur, Draumur, Appolo licorice) covers everyone back home in 20 minutes.",
      },
      {
        title: "Tonight is Monday's dress rehearsal",
        detail: "Fuel the car, stage the bags, lay out airport clothes, pack the breakfast bag — all from the main plan's Sunday notes. Then sleep.",
        tone: "family",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // MONDAY — departure morning (compact)
  // -------------------------------------------------------------------------
  {
    slug: "monday",
    dayId: "day-mon",
    weekday: "Mon",
    date: "Aug 31",
    title: "Departure-morning playbook",
    badge: "KEF → Seattle",
    intro:
      "No sights today — this page exists so the airport morning runs on rails and the only decisions left are duty-free flavored.",
    sections: [
      {
        id: "kef",
        title: "KEF with kids",
        sub: "The 7:30-in-the-terminal plan, in order.",
        places: [
          {
            name: "Fuel + rental return",
            area: "6:30 depart · ~7:15 at the lot",
            blurb:
              "Fill up at the N1/Orkan by the airport roundabout (receipts matter for some rentals), then the return lot + shuttle or walk. Photograph the car from all sides at drop-off.",
            image: i("kef-airport"),
          },
          {
            name: "Bag drop + family lane",
            area: "Icelandair counters",
            blurb: "Online check-in done last night means bag-drop only. KEF security usually waves strollers and car-seat families into the wider lane — ask.",
            image: g("airport-checkin"),
          },
          {
            name: "US passport control",
            area: "After main security",
            blurb: "North America flights clear an extra passport check deeper in the terminal — don't linger shopping before it. Shop on the far side instead.",
            image: g("departure-board"),
          },
          {
            name: "The play corner + water refill",
            area: "Near the D/A gates",
            blurb: "Let the toddler run the last energy out at the small play area, refill bottles, then board calm. Stroller goes at the jet bridge.",
            image: g("playground"),
          },
        ],
      },
      {
        id: "treats",
        title: "Last treats & gifts",
        sub: "Duty-free decisions, pre-made.",
        places: [
          {
            name: "Omnom + licorice load-out",
            area: "Duty-free",
            blurb: "Omnom bars for gifts, Opal/Appolo licorice for the brave, Nóa Kropp for the plane — one basket, done.",
            image: g("licorice"),
          },
          {
            name: "Blue Lagoon minis",
            area: "Duty-free skincare",
            blurb: "The silica/algae minis are the lagoon in carry-on form — the wife-approved souvenir if Thursday's visit landed.",
            image: g("lagoon-bridge"),
          },
          {
            name: "One last skyr",
            area: "Joe & the Juice / 10-11 airside",
            blurb: "Breakfast round two at the gate: skyr cups and kleinur beat anything served at 36,000 feet.",
            image: g("skyr"),
          },
          {
            name: "The wool question",
            area: "66°North / Icewear",
            blurb: "Airport lopapeysa prices sting ~15% over downtown — buy only if Sunday's wool-shop window is still haunting you.",
            image: g("lopapeysa"),
          },
        ],
      },
    ],
    notes: [
      {
        title: "Timing truth",
        detail: "Rental return + passport control are the two queues that blow up. The 7:30 terminal target absorbs both; don't trade it for ten more minutes of sleep.",
        tone: "tip",
      },
      {
        title: "Landing plan",
        detail: "You land at 11:45 AM Seattle time with the whole afternoon ahead — daylight, unpacking, early dinner, normal bedtime. Jet lag handled by design.",
        tone: "family",
      },
    ],
  },
];

export const getDayGuide = (slug: string) => dayGuides.find((d) => d.slug === slug);
