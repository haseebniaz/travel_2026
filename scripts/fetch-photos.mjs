// Downloads real, freely-licensed destination photos from Wikimedia Commons
// into public/images (self-hosted, so they always load from Vercel), and writes
// attribution to public/images/CREDITS.md.
//
// Network is done via curl (which respects the sandbox proxy + CA bundle);
// Node's global fetch does not use the proxy.
//
//   node scripts/fetch-photos.mjs            download images + write credits
//   node scripts/fetch-photos.mjs --credits  (re)write credits only, no download
//
// After downloading, images are large originals/thumbs; resize to ~1600px for
// the web (this repo used sharp: resize fit:inside 1600, jpeg quality 80).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const CREDITS_ONLY = process.argv.includes("--credits");
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const UA = "travel-2026-dashboard/1.0 (https://github.com/haseebniaz/travel_2026; haseebniaz@gmail.com)";
const BAD = /(\bmap\b|flag|coat[_ ]of[_ ]arms|locator|logo|\bseal\b|diagram|blazon|chart|icon|cheese|fromage|christmas|ornament|bauble|trinacria|padlock|lucchett|emblem|\bfood\b|dish|recipe|stamp|banknote|coin)/i;

// 7 slots per trip: [hero, g1..g6]. First query is the one that produced the
// current image; the rest are fallbacks.
const QUERIES = {
  "amalfi-campania": [
    ["Positano panorama", "Positano", "Amalfi Coast"],
    ["Positano", "Positano beach"],
    ["Amalfi Coast road", "Amalfitana coast road", "Amalfi Coast Conca dei Marini"],
    ["Capri Faraglioni", "Capri island Italy"],
    ["Ravello Villa Rufolo", "Ravello"],
    ["Naples Italy panorama", "Naples Italy skyline", "Naples Italy"],
    ["Sorrento Marina Grande", "Sorrento Italy"],
  ],
  "tuscany-val-dorcia": [
    ["Podere Belvedere Val d'Orcia", "Val d'Orcia San Quirico", "Val d'Orcia"],
    ["Val d'Orcia cypress", "Cypress Val d'Orcia", "Podere Belvedere"],
    ["Piazza del Campo Siena", "Siena Italy"],
    ["Montepulciano", "Montepulciano Tuscany"],
    ["Chianti vineyard", "Chianti landscape Tuscany"],
    ["Pienza Val d'Orcia", "Pienza panorama", "Pienza"],
    ["Montalcino", "Montalcino Tuscany"],
  ],
  "sicily-east": [
    ["Taormina", "Taormina Sicily"],
    ["Teatro antico di Taormina", "Taormina Greek Theatre"],
    ["Mount Etna", "Etna eruption"],
    ["Ortigia Syracuse", "Ortigia Siracusa"],
    ["Noto Sicily", "Noto cathedral Sicily"],
    ["Ragusa Ibla panorama", "Ragusa Ibla view", "Ragusa Sicily town"],
    ["Modica cathedral", "Modica Sicily panorama", "Modica"],
  ],
  "dalmatian-coast": [
    ["Dubrovnik", "Dubrovnik old town"],
    ["Diocletian's Palace Split", "Split Croatia"],
    ["Hvar Croatia", "Hvar town"],
    ["Korčula", "Korcula town Croatia"],
    ["Dubrovnik city walls", "Dubrovnik panorama"],
    ["Makarska Riviera", "Dalmatia coast Croatia"],
    ["Trogir", "Trogir Croatia"],
  ],
  "peloponnese": [
    ["Nafplio panorama", "Nafplio town view", "Nafplio"],
    ["Bourtzi Nafplio", "Nafplio harbour"],
    ["Monemvasia", "Monemvasia Greece"],
    ["Vathia Mani", "Mani peninsula Greece"],
    ["Theatre of Epidaurus", "Epidaurus theatre"],
    ["Ancient Olympia", "Olympia Greece archaeological"],
    ["Voidokilia beach", "Peloponnese beach"],
  ],
  "crete": [
    ["Chania", "Chania Crete"],
    ["Chania Venetian harbour", "Chania old harbour"],
    ["Elafonisi", "Elafonisi beach Crete"],
    ["Rethymno", "Rethymno Crete"],
    ["Samaria Gorge", "Crete mountains White Mountains"],
    ["Balos lagoon", "Balos beach Crete"],
    ["Anogeia Crete", "Crete village mountain"],
  ],
  "montenegro-kotor": [
    ["Kotor", "Kotor Montenegro"],
    ["Bay of Kotor", "Boka Kotorska"],
    ["Perast", "Our Lady of the Rocks Perast"],
    ["Mount Lovćen", "Lovcen Montenegro"],
    ["Durmitor", "Durmitor Montenegro"],
    ["Tara River Canyon", "Tara Canyon Montenegro"],
    ["Sveti Stefan", "Budva Montenegro"],
  ],
  "slovenia-julian-alps": [
    ["Lake Bled", "Bled Slovenia"],
    ["Bled Island", "Lake Bled island church"],
    ["Lake Bohinj", "Bohinj Slovenia"],
    ["Soča river Bovec", "Soča Trenta", "Soča gorge"],
    ["Vršič Pass road", "Vršič Pass", "Vrsic pass Slovenia"],
    ["Piran", "Piran Slovenia"],
    ["Ljubljana Triple Bridge", "Ljubljana Ljubljanica", "Ljubljana"],
  ],
  "corsica": [
    ["Bonifacio Corsica", "Bonifacio"],
    ["Golfe de Porto Corsica", "Corsica coast Scandola"],
    ["Bonifacio old town", "Bonifacio cliffs"],
    ["Calvi Corsica", "Calvi citadel"],
    ["Les Calanche Piana", "Calanche di Piana"],
    ["Palombaggia beach", "Corsica beach Palombaggia"],
    ["Corte citadel Corsica", "Corte Haute-Corse", "Corte Corsica"],
  ],
  "dordogne-perigord": [
    ["Cingle de Trémolat Dordogne", "Dordogne valley meander"],
    ["Sarlat-la-Canéda old town", "Sarlat market square", "Sarlat"],
    ["Château de Beynac", "Beynac-et-Cazenac"],
    ["La Roque-Gageac", "La Roque Gageac Dordogne"],
    ["Rocamadour village cliff", "Rocamadour cité", "Rocamadour"],
    ["Dordogne river", "Dordogne valley France"],
    ["Saint-Cirq-Lapopie village", "Saint-Cirq-Lapopie Lot"],
  ],
};

function curlJSON(query) {
  const args = [
    "-sS", "--compressed", "--max-time", "40", "--retry", "2", "--retry-delay", "1",
    "-H", `User-Agent: ${UA}`,
    "-G", "https://commons.wikimedia.org/w/api.php",
    "--data-urlencode", "action=query",
    "--data-urlencode", "format=json",
    "--data-urlencode", "generator=search",
    "--data-urlencode", `gsrsearch=${query} filetype:bitmap`,
    "--data-urlencode", "gsrnamespace=6",
    "--data-urlencode", "gsrlimit=15",
    "--data-urlencode", "prop=imageinfo",
    "--data-urlencode", "iiprop=url|size|mime|extmetadata",
    "--data-urlencode", "iiurlwidth=1600",
  ];
  return JSON.parse(execFileSync("curl", args, { maxBuffer: 64 * 1024 * 1024 }).toString());
}

const stripHtml = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function bestImage(json) {
  const pages = json?.query?.pages;
  if (!pages) return null;
  const items = Object.values(pages)
    .filter((p) => p.imageinfo && p.imageinfo[0])
    .sort((a, b) => (a.index ?? 999) - (b.index ?? 999));
  const scored = [];
  for (const p of items) {
    const info = p.imageinfo[0];
    if (BAD.test(p.title || "")) continue;
    if (!/image\/(jpeg|png)/.test(info.mime)) continue;
    if (!info.width || !info.height) continue;
    if (info.width < 1200 || info.width <= info.height) continue; // landscape only
    const ratio = info.width / info.height;
    if (ratio > 2.2) continue;
    let score = 100 - (p.index ?? 0) * 3;
    if (ratio >= 1.2 && ratio <= 2.1) score += 40;
    if (info.width >= 1600) score += 20;
    scored.push({ score, info, title: p.title });
  }
  if (!scored.length) return null;
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

function download(url, dest) {
  execFileSync("curl", [
    "-sS", "-L", "--max-time", "90", "--retry", "2", "--retry-delay", "2",
    "-H", `User-Agent: ${UA}`, "-o", dest, url,
  ]);
  const bytes = statSync(dest).size;
  if (bytes < 8000) throw new Error(`file too small (${bytes} bytes)`);
  return bytes;
}

mkdirSync(OUT, { recursive: true });
const credits = [];
const failures = [];
let ok = 0;

for (const [slug, slots] of Object.entries(QUERIES)) {
  slots.forEach((queries, i) => {
    const name = i === 0 ? `${slug}-hero` : `${slug}-g${i}`;
    const dest = join(OUT, `${name}.jpg`);
    let done = false;
    for (const q of queries) {
      try {
        const choice = bestImage(curlJSON(q));
        if (!choice) continue;
        if (!CREDITS_ONLY) {
          const bytes = download(choice.info.thumburl || choice.info.url, dest);
          console.log(`OK  ${name}  <- "${q}"  (${(bytes / 1024).toFixed(0)}KB, ${choice.info.width}x${choice.info.height})`);
        } else {
          console.log(`credit ${name}  <- ${choice.title}`);
        }
        const meta = choice.info.extmetadata || {};
        credits.push({
          file: `${name}.jpg`,
          title: choice.title,
          page: choice.info.descriptionurl,
          artist: stripHtml(meta.Artist?.value) || "Unknown",
          license: stripHtml(meta.LicenseShortName?.value) || "See source page",
        });
        ok++;
        done = true;
        break;
      } catch (e) {
        console.log(`..  ${name}  "${q}" failed: ${e.message}`);
      }
    }
    if (!done) {
      failures.push(name);
      console.log(`XX  ${name}  — no image found`);
    }
  });
}

const lines = [
  "# Photo credits",
  "",
  "All destination photos are from **Wikimedia Commons**, downloaded and self-hosted",
  "in this repo (see `scripts/fetch-photos.mjs`). Each entry lists the source file",
  "page, author, and license. Please retain attribution if you reuse them.",
  "",
];
for (const c of credits) {
  lines.push(`- **${c.file}** — [${c.title}](${c.page}) · ${c.artist} · ${c.license}`);
}
writeFileSync(join(OUT, "CREDITS.md"), lines.join("\n") + "\n");

console.log(`\nDone: ${ok} entries, ${failures.length} failed.`);
if (failures.length) console.log("Failed:", failures.join(", "));
