// Generates self-hosted SVG "travel poster" images for every trip into
// public/images. No network, no dependencies — pure deterministic SVG so the
// dashboard's photos always load from Vercel and can never break.
//
// Run: node scripts/gen-images.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const W = 1600;
const H = 1000;

// ----- deterministic PRNG (mulberry32 over a string hash) -----
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = (r, lo, hi) => lo + r() * (hi - lo);
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const lerp = (a, b, t) => a + (b - a) * t;

// ----- palettes -----
// sky:[top,bottom], sun, layers:[far,mid,near], sea, roof, wall, accent, snow?
const PALETTES = {
  amalfi:      { sky:["#ffe6c2","#f7ad74"], sun:"#fff4dd", layers:["#c98a67","#a86a4a","#7d4a34"], sea:"#2f7d8c", roof:"#b25630", wall:"#f3ead9", accent:"#e0a458" },
  tuscany:     { sky:["#f6e7b4","#ecc86b"], sun:"#fff6d8", layers:["#c9b566","#9aab5e","#6f7f45"], sea:"#8fae6a", roof:"#a9552f", wall:"#efe3c4", accent:"#7a8450" },
  sicily:      { sky:["#ffdca0","#e8865f"], sun:"#fff1cf", layers:["#9a6b57","#6f4a3f","#3f2c28"], sea:"#2a8ca0", roof:"#a34a2f", wall:"#eaddc0", accent:"#e07a5f" },
  dalmatia:    { sky:["#c8e8f0","#86c6da"], sun:"#fbf6e6", layers:["#9fb7bf","#7f9aa0","#5f7a80"], sea:"#2a9db5", roof:"#b6503a", wall:"#efe7d6", accent:"#2f7d8c" },
  peloponnese: { sky:["#d2ecf3","#8fd0e0"], sun:"#fff6dd", layers:["#b6a878","#8f8a5e","#6b6f45"], sea:"#2f93b5", roof:"#c06a3a", wall:"#f0e8d6", accent:"#3f7d6a" },
  crete:       { sky:["#dff0e8","#8fd0d0"], sun:"#fff4cf", layers:["#b09a6a","#8a7450","#5f5038"], sea:"#25b0c0", roof:"#b45a34", wall:"#efe6cf", accent:"#2aa5b0" },
  montenegro:  { sky:["#dbe6c8","#9bb56f"], sun:"#f2f2d0", layers:["#8fa07a","#5f7358","#3c4a3a"], sea:"#2f6d7a", roof:"#a9542f", wall:"#e7e0cf", accent:"#5f8a5a" },
  slovenia:    { sky:["#d6e6ef","#9ec7d8"], sun:"#fbf6e6", layers:["#9fb0b8","#6f8a90","#4a6068"], sea:"#3fae9a", roof:"#a9542f", wall:"#eef0e6", accent:"#3fae9a", snow:true },
  corsica:     { sky:["#ffe2bd","#f0a06a"], sun:"#fff2d5", layers:["#b06a4a","#8a4a38","#5f3a2f"], sea:"#2f8ca0", roof:"#b25630", wall:"#efe4d0", accent:"#c96f43" },
  dordogne:    { sky:["#eef1d8","#cfe0a8"], sun:"#fbf6e0", layers:["#9caf6a","#7a8f52","#54683a"], sea:"#6f9ec0", roof:"#9a6a3a", wall:"#eee6cf", accent:"#7a8450" },
};

// ----- geometry helpers -----
function ridge(r, yBase, amp, seg) {
  const pts = [`0,${H}`];
  let prev = yBase;
  for (let i = 0; i <= seg; i++) {
    const x = (W * i) / seg;
    const target = yBase + Math.sin(i * 1.3 + r() * 6) * amp * rnd(r, 0.4, 1);
    const y = lerp(prev, target, 0.6);
    prev = y;
    pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
  }
  pts.push(`${W},${H}`);
  return pts.join(" ");
}

function peaks(r, yBase, amp, count) {
  const pts = [`0,${H}`, `0,${yBase.toFixed(0)}`];
  for (let i = 0; i <= count; i++) {
    const x = (W * i) / count;
    const up = i % 2 === 0 ? amp * rnd(r, 0.7, 1.2) : amp * rnd(r, 0.1, 0.4);
    pts.push(`${x.toFixed(0)},${(yBase - up).toFixed(0)}`);
  }
  pts.push(`${W},${yBase.toFixed(0)}`, `${W},${H}`);
  return pts.join(" ");
}

function sunDisc(r, pal, seaTop) {
  const cx = rnd(r, W * 0.55, W * 0.82);
  const cy = rnd(r, H * 0.18, H * 0.32);
  const rad = rnd(r, 70, 110);
  let s = `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${pal.sun}" opacity="0.95"/>`;
  if (seaTop) {
    for (let i = 0; i < 6; i++) {
      const yy = seaTop + i * 22 + 10;
      const ww = rad * (1.4 - i * 0.12);
      s += `<rect x="${(cx - ww / 2).toFixed(0)}" y="${yy.toFixed(0)}" width="${ww.toFixed(0)}" height="6" rx="3" fill="${pal.sun}" opacity="${(0.5 - i * 0.06).toFixed(2)}"/>`;
    }
  }
  return s;
}

function houses(r, pal, x0, x1, ground, density, opts = {}) {
  let s = "";
  const n = Math.max(4, Math.round((x1 - x0) / (opts.tight ? 46 : 70)) * density);
  for (let i = 0; i < n; i++) {
    const w = rnd(r, 34, 64);
    const h = rnd(r, 40, 120) * (opts.tall ? 1.3 : 1);
    const x = rnd(r, x0, x1 - w);
    const y = ground - h;
    const wall = pick(r, [pal.wall, pal.wall, "#f7efe0", "#e9dcc4"]);
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${wall}" opacity="0.96"/>`;
    s += `<polygon points="${(x - 3).toFixed(0)},${y.toFixed(0)} ${(x + w + 3).toFixed(0)},${y.toFixed(0)} ${(x + w / 2).toFixed(0)},${(y - rnd(r, 12, 22)).toFixed(0)}" fill="${pal.roof}"/>`;
    if (h > 60) {
      for (let wy = y + 16; wy < ground - 14; wy += 26) {
        for (let wx = x + 8; wx < x + w - 10; wx += 20) {
          s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="7" height="10" fill="${pal.layers[2]}" opacity="0.55"/>`;
        }
      }
    }
  }
  return s;
}

function tower(r, pal, x, ground, kind) {
  const h = rnd(r, 150, 230);
  const w = rnd(r, 34, 46);
  const y = ground - h;
  let s = `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${pal.wall}"/>`;
  if (kind === "dome") {
    s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} Q${(x + w / 2).toFixed(0)} ${(y - w).toFixed(0)} ${(x + w).toFixed(0)} ${y.toFixed(0)} Z" fill="${pal.accent}"/>`;
    s += `<rect x="${(x + w / 2 - 2).toFixed(0)}" y="${(y - w - 14).toFixed(0)}" width="4" height="16" fill="${pal.roof}"/>`;
  } else {
    s += `<polygon points="${(x - 4).toFixed(0)},${y.toFixed(0)} ${(x + w + 4).toFixed(0)},${y.toFixed(0)} ${(x + w / 2).toFixed(0)},${(y - 34).toFixed(0)}" fill="${pal.roof}"/>`;
    s += `<rect x="${(x + 8).toFixed(0)}" y="${(y + 24).toFixed(0)}" width="10" height="18" fill="${pal.layers[2]}" opacity="0.5"/>`;
  }
  return s;
}

function cypress(r, pal, x, ground, scale = 1) {
  const h = rnd(r, 70, 120) * scale;
  return `<ellipse cx="${x.toFixed(0)}" cy="${(ground - h / 2).toFixed(0)}" rx="${(12 * scale).toFixed(0)}" ry="${(h / 2).toFixed(0)}" fill="${pal.layers[2]}"/>`;
}

function boats(r, pal, seaTop) {
  let s = "";
  for (let i = 0; i < 4; i++) {
    const x = rnd(r, W * 0.1, W * 0.85);
    const y = seaTop + rnd(r, 30, 120);
    const w = rnd(r, 40, 80);
    s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l${w.toFixed(0)} 0 l-10 16 l-${(w - 20).toFixed(0)} 0 z" fill="${pal.wall}"/>`;
    s += `<rect x="${(x + w / 2 - 2).toFixed(0)}" y="${(y - 40).toFixed(0)}" width="3" height="40" fill="${pal.layers[2]}"/>`;
    s += `<polygon points="${(x + w / 2).toFixed(0)},${(y - 40).toFixed(0)} ${(x + w / 2).toFixed(0)},${(y - 6).toFixed(0)} ${(x + w / 2 + 22).toFixed(0)},${(y - 8).toFixed(0)}" fill="${pal.accent}" opacity="0.9"/>`;
  }
  return s;
}

// ----- scene composer -----
function scene(type, pal, seedStr) {
  const r = seeded(seedStr);
  const [t, opts] = Array.isArray(type) ? type : [type, {}];
  let body = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;

  const draw = {
    coast() {
      const seaTop = H * 0.52;
      body += sunDisc(r, pal, seaTop);
      body += `<polygon points="${peaks(r, seaTop, 220, 5)}" fill="${opts.red ? "#b25a3a" : pal.layers[0]}" opacity="0.9"/>`;
      body += `<rect x="0" y="${seaTop.toFixed(0)}" width="${W}" height="${(H - seaTop).toFixed(0)}" fill="url(#sea)"/>`;
      const left = r() > 0.5;
      const cx0 = left ? 0 : W * 0.62;
      const cx1 = left ? W * 0.4 : W;
      const cliffTop = H * 0.3;
      const pts = left
        ? `0,${H} 0,${cliffTop.toFixed(0)} ${cx1.toFixed(0)},${(seaTop + 40).toFixed(0)} ${cx1.toFixed(0)},${H}`
        : `${cx0.toFixed(0)},${H} ${cx0.toFixed(0)},${(seaTop + 40).toFixed(0)} ${W},${cliffTop.toFixed(0)} ${W},${H}`;
      body += `<polygon points="${pts}" fill="${opts.red ? "#c2643f" : pal.layers[1]}"/>`;
      body += houses(r, pal, cx0 + 30, cx1 - 30, seaTop + 30, 1, { tight: true });
      for (let i = 0; i < 5; i++) {
        const yy = seaTop + 40 + i * 60;
        body += `<path d="M0 ${yy.toFixed(0)} q ${(W / 4).toFixed(0)} 14 ${(W / 2).toFixed(0)} 0 t ${(W / 2).toFixed(0)} 0" stroke="#ffffff" stroke-opacity="0.12" fill="none" stroke-width="3"/>`;
      }
    },
    town() {
      const ground = H * (opts.cliff ? 0.6 : 0.82);
      body += sunDisc(r, pal, opts.cliff ? ground : null);
      body += `<polygon points="${ridge(r, H * 0.55, 60, 8)}" fill="${pal.layers[0]}" opacity="0.8"/>`;
      if (opts.cliff) {
        const seaTop = ground + 10;
        body += `<rect x="0" y="${seaTop.toFixed(0)}" width="${W}" height="${(H - seaTop).toFixed(0)}" fill="url(#sea)"/>`;
        body += `<polygon points="0,${ground.toFixed(0)} ${W},${ground.toFixed(0)} ${W},${(ground - 90).toFixed(0)} 0,${(ground - 40).toFixed(0)}" fill="${pal.layers[1]}"/>`;
      } else {
        body += `<polygon points="${ridge(r, ground, 40, 7)}" fill="${pal.layers[1]}"/>`;
      }
      body += houses(r, pal, W * 0.12, W * 0.9, ground, 2, { tall: !!opts.tall });
      body += tower(r, pal, rnd(r, W * 0.4, W * 0.62), ground, opts.dome ? "dome" : "tower");
      if (opts.castle) body += tower(r, pal, rnd(r, W * 0.2, W * 0.3), ground, "tower");
    },
    mountains() {
      body += sunDisc(r, pal, null);
      body += `<polygon points="${peaks(r, H * 0.5, 300, 6)}" fill="${pal.layers[0]}"/>`;
      body += `<polygon points="${peaks(r, H * 0.62, 240, 7)}" fill="${pal.layers[1]}"/>`;
      if (pal.snow || opts.snow) {
        for (let i = 0; i < 5; i++) {
          const x = rnd(r, W * 0.1, W * 0.9);
          const y = rnd(r, H * 0.3, H * 0.42);
          body += `<polygon points="${x.toFixed(0)},${y.toFixed(0)} ${(x - 40).toFixed(0)},${(y + 60).toFixed(0)} ${(x + 40).toFixed(0)},${(y + 60).toFixed(0)}" fill="#ffffff" opacity="0.85"/>`;
        }
      }
      if (opts.lake) {
        const lakeTop = H * 0.72;
        body += `<rect x="0" y="${lakeTop.toFixed(0)}" width="${W}" height="${(H - lakeTop).toFixed(0)}" fill="url(#sea)"/>`;
        const ix = rnd(r, W * 0.4, W * 0.6);
        body += `<rect x="${ix.toFixed(0)}" y="${(lakeTop - 26).toFixed(0)}" width="26" height="26" fill="${pal.wall}"/>`;
        body += `<rect x="${(ix + 9).toFixed(0)}" y="${(lakeTop - 46).toFixed(0)}" width="8" height="22" fill="${pal.wall}"/>`;
      } else {
        body += `<polygon points="${ridge(r, H * 0.78, 40, 8)}" fill="${pal.layers[2]}"/>`;
      }
    },
    hills() {
      body += sunDisc(r, pal, null);
      body += `<polygon points="${ridge(r, H * 0.5, 50, 6)}" fill="${pal.layers[0]}" opacity="0.75"/>`;
      body += `<polygon points="${ridge(r, H * 0.64, 60, 6)}" fill="${pal.layers[1]}" opacity="0.9"/>`;
      body += `<polygon points="${ridge(r, H * 0.8, 50, 7)}" fill="${pal.layers[2]}"/>`;
      const ridgeY = H * 0.63;
      for (let i = 0; i < 7; i++) body += cypress(r, pal, rnd(r, W * 0.08, W * 0.92), ridgeY + rnd(r, -6, 26), rnd(r, 0.7, 1.2));
      if (opts.ruin) {
        const bx = rnd(r, W * 0.35, W * 0.6);
        for (let i = 0; i < 5; i++) body += `<rect x="${(bx + i * 26).toFixed(0)}" y="${(ridgeY - 70).toFixed(0)}" width="14" height="70" fill="${pal.wall}" opacity="0.95"/>`;
        body += `<rect x="${(bx - 6).toFixed(0)}" y="${(ridgeY - 82).toFixed(0)}" width="${(5 * 26 + 20).toFixed(0)}" height="12" fill="${pal.wall}"/>`;
      }
    },
    beach() {
      const seaTop = H * 0.42;
      body += sunDisc(r, pal, seaTop);
      body += `<polygon points="${peaks(r, seaTop, 160, 4)}" fill="${pal.layers[0]}" opacity="0.8"/>`;
      body += `<rect x="0" y="${seaTop.toFixed(0)}" width="${W}" height="${(H - seaTop).toFixed(0)}" fill="url(#sea)"/>`;
      body += `<path d="M0 ${H} L0 ${(H * 0.8).toFixed(0)} Q ${(W * 0.5).toFixed(0)} ${(H * 0.68).toFixed(0)} ${W} ${(H * 0.82).toFixed(0)} L${W} ${H} Z" fill="${pal.wall}"/>`;
      for (let i = 0; i < 6; i++) {
        const yy = seaTop + 30 + i * 55;
        body += `<path d="M0 ${yy.toFixed(0)} q ${(W / 4).toFixed(0)} 12 ${(W / 2).toFixed(0)} 0 t ${(W / 2).toFixed(0)} 0" stroke="#ffffff" stroke-opacity="0.14" fill="none" stroke-width="3"/>`;
      }
    },
    harbor() {
      const seaTop = H * 0.6;
      body += sunDisc(r, pal, seaTop);
      body += `<polygon points="${ridge(r, H * 0.5, 50, 6)}" fill="${pal.layers[0]}" opacity="0.8"/>`;
      body += houses(r, pal, W * 0.08, W * 0.92, seaTop, 2, { tight: true });
      body += tower(r, pal, rnd(r, W * 0.4, W * 0.6), seaTop, r() > 0.5 ? "dome" : "tower");
      body += `<rect x="0" y="${seaTop.toFixed(0)}" width="${W}" height="${(H - seaTop).toFixed(0)}" fill="url(#sea)"/>`;
      body += boats(r, pal, seaTop);
    },
    vineyard() {
      body += sunDisc(r, pal, null);
      body += `<polygon points="${ridge(r, H * 0.5, 50, 6)}" fill="${pal.layers[0]}" opacity="0.8"/>`;
      body += `<polygon points="${ridge(r, H * 0.68, 40, 6)}" fill="${pal.layers[1]}"/>`;
      const vpx = W * rnd(r, 0.4, 0.6);
      const vpy = H * 0.62;
      for (let i = -12; i <= 12; i++) {
        const bx = W / 2 + i * 90;
        body += `<line x1="${vpx.toFixed(0)}" y1="${vpy.toFixed(0)}" x2="${bx.toFixed(0)}" y2="${H}" stroke="${pal.layers[2]}" stroke-width="3" opacity="0.5"/>`;
      }
      body += `<rect x="${(W * 0.7).toFixed(0)}" y="${(H * 0.6 - 40).toFixed(0)}" width="70" height="50" fill="${pal.wall}"/>`;
      body += `<polygon points="${(W * 0.7 - 4).toFixed(0)},${(H * 0.6 - 40).toFixed(0)} ${(W * 0.7 + 74).toFixed(0)},${(H * 0.6 - 40).toFixed(0)} ${(W * 0.7 + 35).toFixed(0)},${(H * 0.6 - 64).toFixed(0)}" fill="${pal.roof}"/>`;
      body += cypress(r, pal, W * 0.66, H * 0.6, 1.1);
    },
    canyon() {
      body += sunDisc(r, pal, null);
      body += `<polygon points="0,${H} 0,0 ${(W * 0.34).toFixed(0)},0 ${(W * 0.42).toFixed(0)},${(H * 0.4).toFixed(0)} ${(W * 0.3).toFixed(0)},${H}" fill="${pal.layers[1]}"/>`;
      body += `<polygon points="${W},${H} ${W},0 ${(W * 0.66).toFixed(0)},0 ${(W * 0.58).toFixed(0)},${(H * 0.4).toFixed(0)} ${(W * 0.7).toFixed(0)},${H}" fill="${pal.layers[0]}"/>`;
      body += `<polygon points="${(W * 0.3).toFixed(0)},${H} ${(W * 0.42).toFixed(0)},${(H * 0.4).toFixed(0)} ${(W * 0.5).toFixed(0)},${(H * 0.5).toFixed(0)} ${(W * 0.58).toFixed(0)},${(H * 0.4).toFixed(0)} ${(W * 0.7).toFixed(0)},${H}" fill="${pal.layers[2]}"/>`;
      if (opts.river) {
        body += `<path d="M${(W * 0.46).toFixed(0)} ${(H * 0.45).toFixed(0)} Q ${(W * 0.5).toFixed(0)} ${(H * 0.7).toFixed(0)} ${(W * 0.48).toFixed(0)} ${H} L${(W * 0.54).toFixed(0)} ${H} Q ${(W * 0.52).toFixed(0)} ${(H * 0.7).toFixed(0)} ${(W * 0.52).toFixed(0)} ${(H * 0.45).toFixed(0)} Z" fill="${pal.sea}"/>`;
      }
    },
  };

  (draw[t] || draw.coast)();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${pal.sky[0]}"/>
      <stop offset="1" stop-color="${pal.sky[1]}"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${pal.sea}"/>
      <stop offset="1" stop-color="${pal.layers[2]}"/>
    </linearGradient>
  </defs>
  ${body}
</svg>`;
}

// ----- scene map: [heroScene, ...6 gallery scenes] per slug. palette key too. -----
const TRIPS = [
  { slug: "amalfi-campania", pal: "amalfi", scenes: ["coast", ["town", { cliff: true }], "coast", "coast", ["town", { dome: true }], "harbor", "harbor"] },
  { slug: "tuscany-val-dorcia", pal: "tuscany", scenes: ["hills", "hills", ["town", { dome: true }], ["town", { tall: true }], "vineyard", "town", "vineyard"] },
  { slug: "sicily-east", pal: "sicily", scenes: ["coast", ["town", { cliff: true }], ["mountains", { snow: true }], "harbor", ["town", { dome: true }], "town", "town"] },
  { slug: "dalmatian-coast", pal: "dalmatia", scenes: [["town", { cliff: true }], "town", "coast", "town", ["town", { cliff: true }], "coast", "town"] },
  { slug: "peloponnese", pal: "peloponnese", scenes: ["harbor", "harbor", "coast", ["town", { cliff: true }], ["hills", { ruin: true }], ["hills", { ruin: true }], "beach"] },
  { slug: "crete", pal: "crete", scenes: ["harbor", "harbor", "beach", "town", "mountains", "beach", "hills"] },
  { slug: "montenegro-kotor", pal: "montenegro", scenes: ["mountains", ["town", { cliff: true }], "town", ["mountains", { snow: true }], ["mountains", { snow: true }], ["canyon", { river: true }], "coast"] },
  { slug: "slovenia-julian-alps", pal: "slovenia", scenes: [["mountains", { lake: true }], ["mountains", { lake: true }], ["mountains", { lake: true }], ["canyon", { river: true }], ["mountains", { snow: true }], "harbor", "town"] },
  { slug: "corsica", pal: "corsica", scenes: ["coast", ["town", { cliff: true }], "harbor", ["coast", { red: true }], "beach", "mountains", "town"] },
  { slug: "dordogne-perigord", pal: "dordogne", scenes: ["hills", "town", ["town", { castle: true }], ["town", { cliff: true }], ["town", { cliff: true }], ["canyon", { river: true }], ["town", { cliff: true }]] },
];

mkdirSync(OUT, { recursive: true });
let count = 0;
for (const { slug, pal, scenes } of TRIPS) {
  const palette = PALETTES[pal];
  scenes.forEach((sc, i) => {
    const name = i === 0 ? `${slug}-hero.svg` : `${slug}-g${i}.svg`;
    writeFileSync(join(OUT, name), scene(sc, palette, `${slug}-${i}`));
    count++;
  });
}
console.log(`Generated ${count} images into public/images`);
