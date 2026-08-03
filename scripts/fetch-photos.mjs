// Downloads real, freely-licensed destination photos from Wikimedia Commons
// into public/images (self-hosted, so they always load from Vercel), and writes
// attribution to public/images/CREDITS.md.
//
// Network is via curl (respects the sandbox proxy + CA bundle); Node's global
// fetch does not use the proxy.
//
//   node scripts/fetch-photos.mjs           download hero+gallery (GALLERY group)
//   node scripts/fetch-photos.mjs --extra   download place + day photos only
//   node scripts/fetch-photos.mjs --guide   download Sicily guide photos only
//   node scripts/fetch-photos.mjs --iceland  download Iceland family-trip photos only
//   node scripts/fetch-photos.mjs --all      download everything
//   node scripts/fetch-photos.mjs --credits  (re)write CREDITS.md only, no download
//
// New downloads are large; resize to ≤1600px q80 afterward (sharp, temporary).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, statSync, readdirSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const CREDITS_ONLY = args.includes("--credits");
const EXTRA = args.includes("--extra");
const GUIDE_FLAG = args.includes("--guide");
const ICELAND_FLAG = args.includes("--iceland");
const MISSING_ONLY = args.includes("--missing"); // skip slots whose file already exists
const ALL = args.includes("--all");
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const UA = "travel-2026-dashboard/1.0 (https://github.com/haseebniaz/travel_2026; haseebniaz@gmail.com)";
const BAD = /(\bmap\b|flag|coat[_ ]of[_ ]arms|locator|logo|\bseal\b|diagram|blazon|chart|icon|cheese|fromage|christmas|ornament|bauble|trinacria|padlock|lucchett|emblem|\bfood\b|dish|recipe|stamp|banknote|coin)/i;

// hero + 6 gallery per slug (first query = the one that produced the current file)
const GALLERY = {
  "amalfi-campania": [["Positano panorama", "Positano"], ["Positano", "Positano beach"], ["Amalfi Coast road", "Amalfitana coast road"], ["Capri Faraglioni", "Capri island Italy"], ["Ravello Villa Rufolo", "Ravello"], ["Naples Italy panorama", "Naples Italy skyline"], ["Sorrento Marina Grande", "Sorrento Italy"]],
  "tuscany-val-dorcia": [["Podere Belvedere Val d'Orcia", "Val d'Orcia"], ["Val d'Orcia cypress", "Cypress Val d'Orcia"], ["Piazza del Campo Siena", "Siena Italy"], ["Montepulciano", "Montepulciano Tuscany"], ["Chianti vineyard", "Chianti landscape Tuscany"], ["Pienza Val d'Orcia", "Pienza"], ["Montalcino", "Montalcino Tuscany"]],
  "sicily-east": [["Taormina", "Taormina Sicily"], ["Teatro antico di Taormina", "Taormina Greek Theatre"], ["Mount Etna", "Etna eruption"], ["Ortigia Syracuse", "Ortigia Siracusa"], ["Noto Sicily", "Noto cathedral Sicily"], ["Ragusa Ibla panorama", "Ragusa Ibla view"], ["Modica cathedral", "Modica Sicily panorama"]],
  "dalmatian-coast": [["Dubrovnik", "Dubrovnik old town"], ["Diocletian's Palace Split", "Split Croatia"], ["Hvar Croatia", "Hvar town"], ["Korčula", "Korcula town Croatia"], ["Dubrovnik city walls", "Dubrovnik panorama"], ["Makarska Riviera", "Dalmatia coast Croatia"], ["Trogir", "Trogir Croatia"]],
  "peloponnese": [["Nafplio panorama", "Nafplio town view"], ["Bourtzi Nafplio", "Nafplio harbour"], ["Monemvasia", "Monemvasia Greece"], ["Vathia Mani", "Mani peninsula Greece"], ["Theatre of Epidaurus", "Epidaurus theatre"], ["Ancient Olympia", "Olympia Greece archaeological"], ["Voidokilia beach", "Peloponnese beach"]],
  "crete": [["Chania", "Chania Crete"], ["Chania Venetian harbour", "Chania old harbour"], ["Elafonisi", "Elafonisi beach Crete"], ["Rethymno", "Rethymno Crete"], ["Samaria Gorge", "Crete mountains White Mountains"], ["Balos lagoon", "Balos beach Crete"], ["Anogeia Crete", "Crete village mountain"]],
  "montenegro-kotor": [["Kotor", "Kotor Montenegro"], ["Bay of Kotor", "Boka Kotorska"], ["Perast", "Our Lady of the Rocks Perast"], ["Mount Lovćen", "Lovcen Montenegro"], ["Durmitor", "Durmitor Montenegro"], ["Tara River Canyon", "Tara Canyon Montenegro"], ["Sveti Stefan", "Budva Montenegro"]],
  "slovenia-julian-alps": [["Lake Bled", "Bled Slovenia"], ["Bled Island", "Lake Bled island church"], ["Lake Bohinj", "Bohinj Slovenia"], ["Soča river Bovec", "Soča Trenta"], ["Vršič Pass road", "Vršič Pass"], ["Piran", "Piran Slovenia"], ["Ljubljana Triple Bridge", "Ljubljana Ljubljanica"]],
  "corsica": [["Bonifacio Corsica", "Bonifacio"], ["Golfe de Porto Corsica", "Corsica coast Scandola"], ["Bonifacio old town", "Bonifacio cliffs"], ["Calvi Corsica", "Calvi citadel"], ["Les Calanche Piana", "Calanche di Piana"], ["Palombaggia beach", "Corsica beach Palombaggia"], ["Corte citadel Corsica", "Corte Haute-Corse"]],
  "dordogne-perigord": [["Cingle de Trémolat Dordogne", "Dordogne valley meander"], ["Sarlat-la-Canéda old town", "Sarlat market square"], ["Château de Beynac", "Beynac-et-Cazenac"], ["La Roque-Gageac", "La Roque Gageac Dordogne"], ["Rocamadour village cliff", "Rocamadour cité"], ["Dordogne river", "Dordogne valley France"], ["Saint-Cirq-Lapopie village", "Saint-Cirq-Lapopie Lot"]],
};

// ~7 "places to visit" per slug
const PLACES = {
  "amalfi-campania": [["Positano beach", "Positano Spiaggia Grande"], ["Villa Cimbrone Ravello", "Ravello Terrace of Infinity"], ["Capri Marina Piccola", "Capri Faraglioni"], ["Amalfi Cathedral", "Amalfi Duomo"], ["Sorrento town", "Sorrento Marina Grande"], ["Pompeii Forum", "Pompeii ruins"], ["Paestum Temple of Neptune", "Paestum temples"]],
  "tuscany-val-dorcia": [["Siena Torre del Mangia", "Siena Italy"], ["Pienza panorama", "Pienza Val d'Orcia"], ["Montepulciano Piazza Grande", "Montepulciano"], ["Montalcino fortress", "Montalcino"], ["Cappella di Vitaleta", "Val d'Orcia cypress"], ["Bagno Vignoni", "Bagno Vignoni thermal pool"], ["Abbazia di Sant'Antimo", "Sant'Antimo abbey"]],
  "sicily-east": [["Taormina Greek Theatre", "Taormina"], ["Mount Etna crater", "Etna summit"], ["Ortigia Syracuse waterfront", "Ortigia"], ["Noto cathedral Sicily", "Noto Corso"], ["Ragusa Ibla view", "Ragusa Ibla"], ["Modica Sicily", "Modica gorge"], ["Catania Piazza Duomo", "Catania fish market"]],
  "dalmatian-coast": [["Split peristyle", "Split Croatia"], ["Trogir cathedral", "Trogir Croatia"], ["Hvar fortress view", "Hvar Croatia"], ["Palmižana Pakleni", "Pakleni islands"], ["Korčula peninsula", "Korčula town"], ["Ston walls Croatia", "Ston Pelješac"], ["Dubrovnik Stradun", "Dubrovnik old town"]],
  "peloponnese": [["Nafplio Bourtzi", "Nafplio"], ["Epidaurus theatre Greece", "Epidaurus"], ["Mycenae Lion Gate", "Mycenae"], ["Monemvasia lower town", "Monemvasia"], ["Areopoli Mani", "Mani tower houses"], ["Ancient Olympia stadium", "Olympia Greece"], ["Voidokilia beach", "Voidokilia"]],
  "crete": [["Chania Venetian harbour", "Chania Crete"], ["Elafonisi lagoon Crete", "Elafonisi"], ["Balos lagoon Crete", "Balos"], ["Rethymno Fortezza", "Rethymno"], ["Samaria Gorge Iron Gates", "Samaria Gorge"], ["Knossos palace", "Knossos Crete"], ["Lasithi plateau windmills", "Lasithi plateau"]],
  "montenegro-kotor": [["Kotor old town square", "Kotor Montenegro"], ["Kotor bay panorama", "Kotor serpentine"], ["Perast Our Lady of the Rocks", "Perast"], ["Lovćen mausoleum", "Mount Lovćen"], ["Lake Skadar", "Skadar lake Montenegro"], ["Tara Canyon bridge", "Durmitor Tara"], ["Sveti Stefan Montenegro", "Sveti Stefan"]],
  "slovenia-julian-alps": [["Lake Bled island church", "Lake Bled"], ["Vintgar Gorge", "Vintgar gorge boardwalk"], ["Lake Bohinj", "Bohinj Vogel"], ["Vršič Pass hairpin", "Vršič Pass"], ["Soča valley Bovec", "Soča river"], ["Ljubljana Ljubljanica river", "Ljubljana old town"], ["Piran Tartini Square", "Piran Slovenia"]],
  "corsica": [["Bonifacio Haute Ville", "Bonifacio Corsica"], ["Calanche di Piana", "Calanques de Piana"], ["Calvi citadel beach", "Calvi Corsica"], ["Nonza Corsica", "Cap Corse"], ["Corte Corsica citadel", "Restonica valley"], ["Palombaggia Corsica", "Santa Giulia Corsica"], ["Girolata Corsica", "Scandola reserve"]],
  "dordogne-perigord": [["Sarlat-la-Canéda old town", "Sarlat"], ["Château de Beynac", "Beynac castle Dordogne"], ["La Roque-Gageac village", "La Roque-Gageac"], ["Domme Dordogne", "Domme bastide"], ["Rocamadour village cliff", "Rocamadour"], ["Lascaux cave painting", "Lascaux Montignac"], ["Saint-Cirq-Lapopie village", "Saint-Cirq-Lapopie"]],
};

// one image per itinerary day (headline subject); lengths match the itineraries
const DAYS = {
  "amalfi-campania": [["Naples Spaccanapoli", "Naples historic centre"], ["Sorrento cliffs Italy", "Sorrento panorama"], ["Anacapri Monte Solaro", "Capri Piazzetta"], ["Amalfi Coast winding road", "Conca dei Marini"], ["Villa Rufolo Ravello", "Ravello coast view"], ["Paestum Temple of Hera", "Cilento coast"], ["Positano from the sea", "Positano evening"], ["Pompeii Vesuvius", "Herculaneum ruins"]],
  "tuscany-val-dorcia": [["Siena Torre del Mangia", "Siena panorama"], ["Chianti vineyards Tuscany", "Greve in Chianti"], ["Val d'Orcia San Quirico", "Val d'Orcia farmhouse"], ["Montalcino vineyards", "Brunello vineyard"], ["Crete Senesi road cypress", "Val d'Orcia dirt road"], ["Montepulciano Piazza Grande", "Bagno Vignoni pool"], ["Monteriggioni walls", "Tuscany hills autumn"]],
  "sicily-east": [["Catania Piazza del Duomo", "Catania fish market"], ["Taormina Greek theatre Etna", "Taormina panorama"], ["Mount Etna summit crater", "Etna lava field"], ["Isola Bella Taormina", "Taormina bay"], ["Ortigia Piazza Duomo", "Siracusa Ortigia"], ["Syracuse Greek theatre Neapolis", "Ear of Dionysius Syracuse"], ["Noto Corso Vittorio Emanuele", "Noto Sicily Baroque"], ["Modica San Giorgio", "Modica gorge town"], ["Vendicari nature reserve", "Sicily beach Vendicari"]],
  "dalmatian-coast": [["Split Riva waterfront", "Split peristyle"], ["Trogir waterfront", "Trogir cathedral"], ["Hvar harbour Croatia", "Hvar fortress"], ["Palmižana beach", "Pakleni islands Croatia"], ["Korčula sunset", "Korčula Croatia"], ["Ston Croatia walls", "Pelješac vineyards"], ["Dubrovnik Stradun street", "Dubrovnik night"], ["Dubrovnik city walls view", "Mount Srđ Dubrovnik"]],
  "peloponnese": [["Palamidi fortress Nafplio", "Corinth Canal"], ["Mycenae Lion Gate", "Epidaurus theatre Greece"], ["Monemvasia rock", "Monemvasia castle town"], ["Mani tower houses Vathia", "Areopoli"], ["Cape Tenaro lighthouse", "Diros caves Greece"], ["Dimitsana Arcadia", "Stemnitsa Lousios gorge"], ["Ancient Olympia ruins", "Olympia stadium Greece"], ["Acrocorinth", "Ancient Corinth temple of Apollo"]],
  "crete": [["Chania lighthouse harbour", "Chania old town"], ["Elafonisi lagoon", "Balos lagoon Crete"], ["Rethymno Fortezza", "Rethymno old town"], ["Preveli palm beach", "Kourtaliotiko gorge"], ["Knossos palace frescoes", "Knossos Crete"], ["Lasithi plateau windmills", "Dikteon cave"], ["Spinalonga island", "Agios Nikolaos Crete"], ["Crete north coast beach", "Crete coast"]],
  "montenegro-kotor": [["Kotor old town St Tryphon", "Kotor square"], ["Kotor city walls view", "Perast Montenegro"], ["Kotor serpentine road", "Lovćen Njegoš mausoleum"], ["Cetinje Montenegro", "Lake Skadar boat"], ["Đurđevića Tara bridge", "Žabljak Durmitor"], ["Black Lake Durmitor", "Tara river rafting"], ["Sveti Stefan island", "Budva old town"]],
  "slovenia-julian-alps": [["Ljubljana castle view", "Ljubljana dragon bridge"], ["Lake Bled pletna boat", "Bled Castle Slovenia"], ["Vintgar Gorge boardwalk", "Vogel Bohinj"], ["Vršič Pass serpentine", "Soča valley Bovec"], ["Kozjak waterfall Slovenia", "Soča Kobarid"], ["Postojna Cave", "Predjama Castle"], ["Piran Slovenia aerial", "Piran salt pans"], ["Ljubljana Ljubljanica riverside", "Ljubljana old town"]],
  "corsica": [["Bastia old port", "Bastia Corsica"], ["Nonza Corsica", "Cap Corse coast"], ["Calvi citadel beach", "Sant'Antonino Corsica"], ["Calanche di Piana sunset", "Gulf of Porto Corsica"], ["Restonica valley Corsica", "Corte Corsica"], ["Bonifacio harbour cliffs", "Bonifacio Haute Ville"], ["Palombaggia Corsica", "Santa Giulia Corsica"], ["Ajaccio Corsica", "Corsica coast road"]],
  "dordogne-perigord": [["Sarlat old town street", "Sarlat medieval"], ["Sarlat Place de la Liberté", "Sarlat market square"], ["Castelnaud castle Dordogne", "Marqueyssac gardens"], ["Dordogne river canoe", "La Roque-Gageac river"], ["Rocamadour panorama", "Gouffre de Padirac"], ["Saint-Cirq-Lapopie Lot", "Pont Valentré Cahors"], ["Bergerac vineyard", "Périgord bastide village"]],
};

// Sicily one-stop guide (/sicily) — named keys -> public/images/sicily-guide-<key>.jpg
const GUIDE = {
  // regions
  "palermo": ["Palermo cathedral", "Quattro Canti Palermo", "Palermo panorama"],
  "cefalu": ["Cefalù", "Cefalu Sicily beach", "Cefalù cathedral"],
  "erice": ["Erice Sicily", "Erice castle", "Erice medieval village"],
  "salt-pans": ["Trapani salt pans", "Saline di Trapani", "Marsala salt pans"],
  "scala-dei-turchi": ["Scala dei Turchi", "Scala dei Turchi Sicily cliff"],
  "agrigento": ["Valley of the Temples Agrigento", "Temple of Concordia Agrigento"],
  "aeolian": ["Lipari Aeolian Islands", "Aeolian Islands Sicily", "Vulcano island Aeolian"],
  "stromboli": ["Stromboli eruption", "Stromboli volcano", "Stromboli island night"],
  // must-dos (new subjects only; the rest reuse sicily-east-* photos)
  "villa-casale": ["Villa Romana del Casale mosaics", "Villa Romana del Casale", "Piazza Armerina mosaics"],
  "palermo-market": ["Ballarò market Palermo", "Vucciria Palermo", "Palermo market"],
  // off the beaten path
  "alcantara": ["Gole dell'Alcantara", "Alcantara Gorge Sicily", "Alcantara river gorge"],
  "marzamemi": ["Marzamemi", "Marzamemi Sicily piazza"],
  "vendicari": ["Tonnara di Vendicari", "Vendicari nature reserve"],
  "calamosche": ["Calamosche beach", "Calamosche Vendicari"],
  "cavagrande": ["Cavagrande del Cassibile", "Cavagrande laghetti", "Cassibile canyon"],
  "pantalica": ["Pantalica necropolis", "Pantalica Sicily rock tombs"],
  "caltagirone": ["Caltagirone staircase", "Scala Santa Maria del Monte Caltagirone", "Caltagirone"],
  "scicli": ["Scicli panorama", "Scicli Sicily baroque"],
  "punta-secca": ["Punta Secca lighthouse", "Punta Secca", "Santa Croce Camerina Punta Secca"],
  "savoca": ["Savoca Sicily", "Savoca village"],
  "forza-dagro": ["Forza d'Agrò", "Forza d'Agro Sicily"],
  "castelmola": ["Castelmola", "Castelmola Taormina"],
  "randazzo": ["Randazzo Sicily", "Randazzo basilica"],
  "isola-correnti": ["Isola delle Correnti", "Portopalo di Capo Passero"],
  // food & drink (fetched with the relaxed filter below)
  "granita": ["Granita brioche", "Granita siciliana", "Almond granita Sicily"],
  "arancini": ["Arancini", "Arancini siciliani", "Arancino"],
  "cannoli": ["Cannoli siciliani", "Cannolo siciliano", "Cannoli"],
  "pasta-norma": ["Pasta alla Norma", "Pasta alla Norma Sicilian"],
  "modica-chocolate": ["Cioccolato di Modica", "Modica chocolate bars"],
  "etna-wine": ["Etna vineyard", "Vineyard Mount Etna", "Etna DOC wine"],
  "street-food": ["Pane e panelle", "Palermo street food", "Sfincione"],
  "pescheria": ["Pescheria Catania market", "Catania fish market"],
  // beaches (new subjects only)
  "san-vito": ["San Vito Lo Capo beach", "San Vito lo Capo"],
  "fontane-bianche": ["Fontane Bianche", "Fontane Bianche beach Syracuse"],
  "marina-ragusa": ["Marina di Ragusa beach", "Sampieri beach Sicily"],
  // guide expansion — west & islands, Etna deep-dive, more gems, October, extras
  "monreale": ["Monreale cathedral mosaics", "Monreale Duomo interior", "Monreale cathedral"],
  "mondello": ["Antico Stabilimento Balneare Mondello", "Mondello beach Palermo"],
  "zingaro": ["Riserva dello Zingaro", "Zingaro nature reserve Sicily"],
  "favignana": ["Favignana Cala Rossa", "Favignana", "Egadi islands"],
  "salina": ["Salina Isole Eolie", "Salina island Pollara"],
  "circumetnea": ["Ferrovia Circumetnea", "Circumetnea railway", "Circumetnea train"],
  "bronte": ["Ponte dei Saraceni", "Bronte Catania veduta"],
  "zafferana": ["Zafferana Etnea", "Zafferana Etnea church"],
  "donnafugata": ["Castello di Donnafugata", "Donnafugata castle Ragusa"],
  "palazzolo": ["Palazzolo Acreide", "Akrai theatre Palazzolo", "Palazzolo Acreide Sicily"],
  "noto-antica": ["Noto Antica", "Noto Antica ruins"],
  "plemmirio": ["Plemmirio", "Plemmirio Syracuse coast", "Maddalena peninsula Syracuse"],
  "chiaramonte": ["Veduta di Chiaramonte Gulfi", "Chiaramonte Gulfi panorama"],
  "militello": ["Militello Val di Catania baroque", "Militello in Val di Catania"],
  "pupi": ["Opera dei Pupi", "Sicilian puppets", "Pupi siciliani"],
  "san-lorenzo": ["San Lorenzo beach Noto", "Spiaggia San Lorenzo Sicily", "San Lorenzo Marzamemi"],
  "caponata": ["Caponata", "Caponata siciliana"],
  "pistachio": ["Pistachio ice cream", "Pistachios", "Pistacchio di Bronte gelato"],
};
// Iceland family trip (/iceland) — named keys -> public/images/iceland-<key>.jpg
const ICELAND = {
  "hero": ["Blue Lagoon Grindavík", "Bláa lónið", "Blue Lagoon geothermal spa Iceland"],
  "blue-lagoon": ["Blue Lagoon Iceland swimmers", "Blue Lagoon geothermal spa bathers", "Blue Lagoon Iceland"],
  "reykjavik": ["Reykjavík colorful houses", "Reykjavik rooftops", "Reykjavík city centre"],
  "hallgrimskirkja": ["Hallgrímskirkja", "Hallgrimskirkja Reykjavik", "Hallgrímskirkja church Iceland"],
  "harpa": ["File:Reykjavik-42-vom Hallgrimskirchturm-Harpa-2018-gje.jpg", "Harpa (38859105685)"],
  "old-harbour": ["Reykjavik old harbour panorama", "Reykjavíkurhöfn", "Old harbour Reykjavik boats"],
  "sun-voyager": ["Aurora over the Sun Voyager", "Sun Voyager sculpture", "Sólfarið"],
  "perlan": ["Perlan Reykjavík", "Perlan museum Reykjavik", "Perlan building Iceland"],
  "laugardalslaug": ["Laugardalslaug pool", "Sundlaugin Laugardalslaug", "Laugardalslaug Reykjavík"],
  "thingvellir": ["Þingvellir National Park", "Thingvellir Almannagjá", "Þingvellir Iceland"],
  "geysir": ["Strokkur eruption", "Strokkur geyser Iceland", "Geysir geothermal area"],
  "gullfoss": ["Gullfoss", "Gullfoss waterfall Iceland", "Gullfoss canyon"],
  "seljalandsfoss": ["Seljalandsfoss", "Seljalandsfoss waterfall", "Seljalandsfoss Iceland"],
  "skogafoss": ["Skógafoss", "Skogafoss waterfall", "Skógafoss Iceland"],
  "dyrholaey": ["Dyrhólaey", "Dyrholaey arch Iceland", "Dyrhólaey viewpoint"],
  "reynisfjara": ["Reynisfjara", "Reynisfjara black sand beach", "Reynisdrangar Vík"],
  "kef-airport": ["Keflavík International Airport", "Keflavik airport terminal", "Keflavík Airport Leifur Eiríksson"],
  // where-to-stay section
  "rainbow-street": ["Skólavörðustígur rainbow", "Rainbow street Reykjavík", "Skólavörðustígur"],
  "laugavegur": ["Laugavegur street Reykjavík", "Laugavegur shopping street", "Laugavegur in Reykjavík"],
  "tjornin": ["Tjörnin lake, Reykjavík", "On the lake Tjörnin in Reykjavík", "Park at the Tjörnin lake in Reykjavík"],
  "grotta": ["Grótta", "Grotta lighthouse", "Grótta Seltjarnarnes"],
};

// Day-guide drill-down pages (/iceland/<day>) — keys -> iceland-guide-<key>.jpg
const ICELAND_GUIDE = {
  // Golden Circle extras (Friday)
  "oxararfoss": ["Öxarárfoss", "Öxarárfoss waterfall", "Oxararfoss Thingvellir"],
  "silfra": ["Silfra", "Silfra fissure", "Silfra Þingvellir"],
  "kerid": ["Kerið", "Kerid crater", "Kerið crater lake"],
  "faxi": ["Faxi waterfall", "Faxafoss", "Faxi Iceland Tungufljót"],
  "fridheimar": ["Friðheimar", "Fridheimar greenhouse", "Tomato greenhouse Iceland"],
  "efstidalur": ["Icelandic cattle", "Cows pasture Iceland", "Icelandic cow"],
  "laugarvatn": ["Laugarvatn", "Laugarvatn Iceland", "Laugarvatn Fontana"],
  "skalholt": ["Skálholt", "Skalholt cathedral", "Skálholt church Iceland"],
  "bruarfoss": ["Brúarfoss", "Bruarfoss waterfall", "Brúarfoss Iceland"],
  "icelandic-horse": ["Icelandic horses", "Icelandic horse", "Icelandic horse field"],
  // South Coast extras (Saturday)
  "gljufrabui": ["Gljúfrabúi", "Gljufrabui waterfall", "Gljúfrabúi Hamragarðar"],
  "kvernufoss": ["Kvernufoss", "Kvernufoss waterfall", "Kvernufoss Iceland"],
  "skogar-museum": ["Skógasafn", "Skogar museum turf houses", "Skógar folk museum"],
  "solheimajokull": ["Sólheimajökull", "Solheimajokull glacier", "Sólheimajökull glacier tongue"],
  "dyrholaey-lighthouse": ["Dyrhólaey lighthouse", "Dyrholaey lighthouse Iceland", "Dyrhólaeyjarviti"],
  "vik-church": ["Vík í Mýrdal church", "Vik church Iceland", "Víkurkirkja"],
  "eyjafjallajokull": ["File:201708 Road near Þorvaldseyri 01.jpg", "File:201708 Road near Þorvaldseyri 02.jpg", "Eyjafjallajökull"],
  "plane-wreck": ["Sólheimasandur plane wreck", "Solheimasandur DC-3", "DC-3 wreck Iceland"],
  "seljavallalaug": ["Seljavallalaug", "Seljavallalaug pool", "Seljavallalaug swimming pool"],
  // Reykjavík day extras (Thursday evening / Sunday)
  "whales-of-iceland": ["Whales of Iceland", "Whales of Iceland museum", "Whale museum Reykjavik"],
  "arbaer": ["Árbæjarsafn", "Arbaer open air museum", "Árbær museum turf"],
  "husdyragardurinn": ["Húsdýragarðurinn", "Reykjavik family park and zoo", "Reykjavik petting zoo"],
  "videy": ["Viðey", "Videy island", "Viðey Reykjavík"],
  "botanical-garden": ["Grasagarður Reykjavíkur", "Reykjavik botanic garden", "Reykjavík botanical garden"],
  "harpa-inside": ["File:Concert at the Harpa in Reykjavik.jpg", "The grand tour (7985879663)"],
  // food & treats (relaxed filter)
  "hot-dog": ["Bæjarins beztu pylsur", "Icelandic hot dog", "Pylsa"],
  "skyr": ["Skyr", "Skyr Iceland", "Skyr dessert"],
  "kleina": ["Kleinur pastry", "Icelandic kleinur", "Kleinur bakst"],
  "cinnamon-bun": ["Cinnamon roll", "Cinnamon bun bakery", "Kanelbulle"],
  // travel-day + procedural cards (every guide card gets a real photo)
  "sea-airport": ["Seattle–Tacoma International Airport", "Seattle Tacoma International Airport terminal", "SeaTac Airport"],
  "plane-cabin": ["Airliner cabin interior", "Boeing 737 cabin", "Aircraft cabin economy"],
  "departure-board": ["Airport departure board", "Flight information display", "Airport information board"],
  "airport-checkin": ["Airport check-in counter", "Airport security checkpoint", "Airport terminal check-in"],
  "lagoon-bridge": ["Blue Lagoon bridge", "Blue Lagoon Iceland walkway", "Blue Lagoon Iceland steam"],
  "bonus-store": ["Bónus", "Bonus supermarket Iceland", "Krónan supermarket"],
  "lopapeysa": ["Lopapeysa", "Icelandic sweater", "Icelandic wool sweater"],
  "licorice": ["Lakkrís", "Liquorice candy", "Icelandic liquorice"],
  "chocolate": ["Chocolate bars stacked", "Dark chocolate pieces", "Schokoladentafel"],
  "ice-cream": ["Ice cream cone", "Soft serve ice cream", "Ice cream shop"],
  "fish-chips": ["Fish and chips", "Fried fish and chips", "Plokkfiskur"],
  "burger": ["Hamburger and fries", "Cheeseburger", "Burger and chips"],
  "pizza": ["Neapolitan pizza", "Pizza margherita", "Wood fired pizza"],
  "hlemmur": ["Hlemmur", "Hlemmur Reykjavík", "Hlemmur square"],
  "almannagja": ["Almannagjá", "Almannagja Thingvellir", "Almannagjá rift"],
  "reynisdrangar": ["Reynisdrangar", "Reynisdrangar sea stacks", "Reynisdrangar Vík"],
  "aurora": ["Aurora borealis Iceland", "Northern lights Iceland", "Aurora over Iceland"],
  "ice-cave": ["Ice cave Iceland", "Glacier ice cave", "Ice cave Vatnajökull"],
  "latrabjarg": ["Látrabjarg", "Puffin Iceland cliff", "Latrabjarg cliffs"],
  "vik-town": ["Vík í Mýrdal village", "Vik Iceland town houses", "Vík í Mýrdal panorama"],
  "lava-flow": ["Fagradalsfjall eruption 2021", "Lava fountain Iceland", "Holuhraun lava"],
  "geysir-pool": ["Blesi hot spring", "Geysir hot spring blue", "Hot spring Haukadalur"],
  "playground": ["Playground Reykjavík", "Children's playground", "Playground equipment"],
  "food-hall": ["Market hall interior", "Mathallen Oslo", "Indoor food market stalls"],
  // hotel neighbourhood (Þingholt / Skólavörðustígur) walking guide
  "sundhollin": ["Sundhöllin Reykjavíkur", "Sundhollin swimming pool Reykjavik", "Sundhöllin"],
  "einar-jonsson": ["Einar Jónsson Museum", "Einar Jonsson sculpture garden", "Listasafn Einars Jónssonar"],
  "city-hall": ["Ráðhús Reykjavíkur", "Reykjavik City Hall", "Radhus Reykjavikur Tjörnin"],
  "kolaportid": ["Kolaportið", "Kolaportid flea market", "Kolaportið Reykjavík"],
  "cafe": ["Café interior Reykjavík", "Coffee shop interior", "Cafe latte cup table"],
  "coffee": ["Latte art coffee cup", "Espresso cup coffee", "Cappuccino cup"],
  "bistro": ["Bistro restaurant interior", "Restaurant dining room table setting", "Brasserie interior"],
  "noodles": ["Noodle soup bowl", "Beef noodle soup", "Ramen bowl"],
  "bakery": ["Bakery bread display", "Bakarí Reykjavík", "Bread bakery counter"],
  "bookstore": ["Bookstore interior", "Bókabúð", "Book shop shelves"],
  "klambratun": ["Klambratún", "Kjarvalsstaðir", "Klambratun park Reykjavik"],
  "thingholt": ["Skólavörðustígur", "Þingholt Reykjavík", "Reykjavik old town street houses"],
  "lamb-soup": ["Kjötsúpa", "Icelandic meat soup", "Icelandic lamb soup"],
  "rye-bread": ["Rúgbrauð", "Icelandic rye bread", "Rugbraud"],
};
const ICELAND_RELAXED = new Set([
  "hot-dog", "skyr", "kleina", "cinnamon-bun", "lamb-soup", "rye-bread", "fridheimar", "efstidalur",
  "lopapeysa", "licorice", "chocolate", "ice-cream", "fish-chips", "burger", "pizza",
  "bonus-store", "food-hall", "playground", "plane-cabin", "departure-board", "airport-checkin",
  "cafe", "bakery", "bookstore", "coffee", "bistro", "noodles",
]);

// Food photos would be excluded by BAD (it blocks generic food/dish noise), so those
// keys use a lighter filter that only strips maps/flags/logos and the like.
const RELAXED_BAD = /(\bmap\b|flag|coat[_ ]of[_ ]arms|locator|logo|\bseal\b|diagram|blazon|chart|icon|stamp|banknote|coin)/i;
const GUIDE_RELAXED = new Set(["granita", "arancini", "cannoli", "pasta-norma", "modica-chocolate", "street-food", "pescheria", "caponata", "pupi", "pistachio"]);

function curlJSON(query) {
  const a = [
    "-sS", "--compressed", "--max-time", "40", "--retry", "2", "--retry-delay", "1",
    "-H", `User-Agent: ${UA}`, "-G", "https://commons.wikimedia.org/w/api.php",
    "--data-urlencode", "action=query", "--data-urlencode", "format=json",
    "--data-urlencode", "generator=search",
    "--data-urlencode", `gsrsearch=${query} filetype:bitmap`,
    "--data-urlencode", "gsrnamespace=6", "--data-urlencode", "gsrlimit=15",
    "--data-urlencode", "prop=imageinfo",
    "--data-urlencode", "iiprop=url|size|mime|extmetadata", "--data-urlencode", "iiurlwidth=1600",
  ];
  return JSON.parse(execFileSync("curl", a, { maxBuffer: 64 * 1024 * 1024 }).toString());
}

// Exact-file lookup: a query written as "File:Some name.jpg" pins that Commons
// file instead of searching (search ranking can be wrong — e.g. "Harpa" matches
// a sea-snail species before the concert hall).
function curlExact(title) {
  const a = [
    "-sS", "--compressed", "--max-time", "40", "--retry", "2", "--retry-delay", "1",
    "-H", `User-Agent: ${UA}`, "-G", "https://commons.wikimedia.org/w/api.php",
    "--data-urlencode", "action=query", "--data-urlencode", "format=json",
    "--data-urlencode", `titles=${title}`,
    "--data-urlencode", "prop=imageinfo",
    "--data-urlencode", "iiprop=url|size|mime|extmetadata", "--data-urlencode", "iiurlwidth=1600",
  ];
  return JSON.parse(execFileSync("curl", a, { maxBuffer: 64 * 1024 * 1024 }).toString());
}

const stripHtml = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const md5 = (p) => createHash("md5").update(readFileSync(p)).digest("hex");

function candidates(json, bad = BAD) {
  const pages = json?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .filter((p) => p.imageinfo && p.imageinfo[0])
    .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
    .filter((p) => {
      const i = p.imageinfo[0];
      return !bad.test(p.title || "") && /image\/(jpeg|png)/.test(i.mime) &&
        i.width >= 1200 && i.height && i.width > i.height && i.width / i.height <= 2.2;
    });
}

mkdirSync(OUT, { recursive: true });
// existing md5s so a new photo never repeats one already on disk
const usedMd5 = new Map();
for (const f of readdirSync(OUT).filter((f) => f.endsWith(".jpg"))) usedMd5.set(md5(join(OUT, f)), f);

const credits = [];
const failures = [];
let ok = 0;

function processSlot(name, queries, { download, bad = BAD }) {
  const dest = join(OUT, `${name}.jpg`);
  if (download && MISSING_ONLY && existsSync(dest)) return true;
  for (const q of queries) {
    let cands;
    try {
      if (q.startsWith("File:")) {
        const pages = Object.values(curlExact(q)?.query?.pages || {});
        cands = pages.filter((p) => p.imageinfo && p.imageinfo[0]); // pinned: no filtering
      } else {
        cands = candidates(curlJSON(q), bad);
      }
    } catch { continue; }
    for (const p of cands) {
      const info = p.imageinfo[0];
      const meta = info.extmetadata || {};
      const record = () => credits.push({
        file: `${name}.jpg`, title: p.title, page: info.descriptionurl,
        artist: stripHtml(meta.Artist?.value) || "Unknown",
        license: stripHtml(meta.LicenseShortName?.value) || "See source page",
      });
      if (!download) { record(); ok++; console.log(`credit ${name} <- ${p.title}`); return true; }
      const tmp = join(OUT, `__${name}.jpg`);
      try {
        execFileSync("curl", ["-sS", "-L", "--max-time", "90", "--retry", "2", "-H", `User-Agent: ${UA}`, "-o", tmp, info.thumburl || info.url]);
        if (statSync(tmp).size < 8000) throw new Error("too small");
        const h = md5(tmp);
        if (usedMd5.has(h)) { execFileSync("rm", ["-f", tmp]); continue; } // dup, try next candidate
        execFileSync("mv", [tmp, dest]);
        usedMd5.set(h, `${name}.jpg`);
        record(); ok++;
        console.log(`OK  ${name}  <- "${q}"  (${info.width}x${info.height})`);
        return true;
      } catch { try { execFileSync("rm", ["-f", tmp]); } catch {} }
    }
  }
  failures.push(name);
  console.log(`XX  ${name}  — no image`);
  return false;
}

const doGallery = CREDITS_ONLY || ALL || (!EXTRA && !GUIDE_FLAG && !ICELAND_FLAG);
const doExtra = CREDITS_ONLY || ALL || EXTRA;
const doGuide = CREDITS_ONLY || ALL || GUIDE_FLAG;
const doIceland = CREDITS_ONLY || ALL || ICELAND_FLAG;
const download = !CREDITS_ONLY;

for (const [slug, slots] of Object.entries(GALLERY)) {
  if (!doGallery) break;
  slots.forEach((q, i) => processSlot(i === 0 ? `${slug}-hero` : `${slug}-g${i}`, q, { download }));
}
if (doExtra) {
  for (const [slug, slots] of Object.entries(PLACES)) slots.forEach((q, i) => processSlot(`${slug}-place${i + 1}`, q, { download }));
  for (const [slug, slots] of Object.entries(DAYS)) slots.forEach((q, i) => processSlot(`${slug}-day${i + 1}`, q, { download }));
}
if (doGuide) {
  for (const [key, queries] of Object.entries(GUIDE)) {
    processSlot(`sicily-guide-${key}`, queries, { download, bad: GUIDE_RELAXED.has(key) ? RELAXED_BAD : BAD });
  }
}
if (doIceland) {
  for (const [key, queries] of Object.entries(ICELAND)) processSlot(`iceland-${key}`, queries, { download });
  for (const [key, queries] of Object.entries(ICELAND_GUIDE)) {
    processSlot(`iceland-guide-${key}`, queries, { download, bad: ICELAND_RELAXED.has(key) ? RELAXED_BAD : BAD });
  }
}

// attribution file (sorted by filename)
credits.sort((a, b) => a.file.localeCompare(b.file));
const entryFor = (c) => `- **${c.file}** — [${c.title}](${c.page}) · ${c.artist} · ${c.license}`;
const header = [
  "# Photo credits", "",
  "All destination photos are from **Wikimedia Commons**, downloaded and self-hosted",
  "in this repo (see `scripts/fetch-photos.mjs`). Each entry lists the source file",
  "page, author, and license. Please retain attribution if you reuse them.", "",
];
const creditsPath = join(OUT, "CREDITS.md");
if (CREDITS_ONLY) {
  writeFileSync(creditsPath, [...header, ...credits.map(entryFor)].join("\n") + "\n");
} else if (credits.length) {
  // merge this run's credits into the existing file, keyed by filename
  const old = existsSync(creditsPath)
    ? readFileSync(creditsPath, "utf8").split("\n").filter((l) => l.startsWith("- **"))
    : [];
  const merged = new Map(old.map((l) => [l.match(/^- \*\*(.+?)\*\*/)[1], l]));
  for (const c of credits) merged.set(c.file, entryFor(c));
  const rows = [...merged.values()].sort((a, b) => a.localeCompare(b));
  writeFileSync(creditsPath, [...header, ...rows].join("\n") + "\n");
}

console.log(`\nDone: ${ok} ${CREDITS_ONLY ? "credits" : "downloaded"}, ${failures.length} failed.`);
if (failures.length) console.log("Failed:", failures.join(", "));
