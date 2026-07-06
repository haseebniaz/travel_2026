// Map data for the /map tab: ordered driving waypoints per trip (following each
// itinerary's bases), a distinct color per trip, and the major airports serving
// these regions. Coordinates are approximate town centers — plenty at map zoom.

export type RouteStop = {
  name: string;
  lat: number;
  lng: number;
};

export type Airport = {
  code: string; // IATA
  name: string;
  country: string;
  lat: number;
  lng: number;
};

// One distinct, legend-friendly color per trip (dark enough for a light basemap).
export const tripColors: Record<string, string> = {
  "amalfi-campania": "#e63946", // red
  "tuscany-val-dorcia": "#f77f00", // orange
  "sicily-east": "#9d4edd", // violet
  "dalmatian-coast": "#1e6fd9", // blue
  "peloponnese": "#00897b", // teal
  "crete": "#d6336c", // magenta
  "montenegro-kotor": "#6d4c41", // brown
  "slovenia-julian-alps": "#2e7d32", // green
  "corsica": "#00acc1", // cyan
  "dordogne-perigord": "#5c6bc0", // indigo
};

// Ordered waypoints per trip, matching the day-by-day itineraries.
export const routes: Record<string, RouteStop[]> = {
  "amalfi-campania": [
    { name: "Naples", lat: 40.852, lng: 14.268 },
    { name: "Sorrento", lat: 40.626, lng: 14.376 },
    { name: "Capri", lat: 40.551, lng: 14.243 },
    { name: "Positano", lat: 40.628, lng: 14.485 },
    { name: "Amalfi", lat: 40.634, lng: 14.603 },
    { name: "Ravello", lat: 40.649, lng: 14.612 },
    { name: "Paestum", lat: 40.423, lng: 15.005 },
    { name: "Pompeii", lat: 40.749, lng: 14.485 },
  ],
  "tuscany-val-dorcia": [
    { name: "Florence", lat: 43.769, lng: 11.256 },
    { name: "Greve in Chianti", lat: 43.584, lng: 11.316 },
    { name: "Siena", lat: 43.319, lng: 11.331 },
    { name: "Montalcino", lat: 43.056, lng: 11.489 },
    { name: "Bagno Vignoni", lat: 43.028, lng: 11.617 },
    { name: "San Quirico d'Orcia", lat: 43.057, lng: 11.604 },
    { name: "Pienza", lat: 43.077, lng: 11.679 },
    { name: "Montepulciano", lat: 43.093, lng: 11.781 },
    { name: "Monteriggioni", lat: 43.39, lng: 11.223 },
  ],
  "sicily-east": [
    { name: "Catania", lat: 37.508, lng: 15.083 },
    { name: "Taormina", lat: 37.853, lng: 15.288 },
    { name: "Mount Etna", lat: 37.7, lng: 14.999 },
    { name: "Siracusa (Ortigia)", lat: 37.063, lng: 15.293 },
    { name: "Noto", lat: 36.891, lng: 15.069 },
    { name: "Ragusa Ibla", lat: 36.925, lng: 14.74 },
    { name: "Modica", lat: 36.858, lng: 14.761 },
  ],
  "dalmatian-coast": [
    { name: "Split", lat: 43.508, lng: 16.44 },
    { name: "Trogir", lat: 43.517, lng: 16.251 },
    { name: "Hvar", lat: 43.172, lng: 16.443 },
    { name: "Korčula", lat: 42.96, lng: 17.135 },
    { name: "Ston", lat: 42.837, lng: 17.697 },
    { name: "Dubrovnik", lat: 42.64, lng: 18.108 },
  ],
  "peloponnese": [
    { name: "Athens", lat: 37.984, lng: 23.728 },
    { name: "Nafplio", lat: 37.568, lng: 22.808 },
    { name: "Epidaurus", lat: 37.596, lng: 23.079 },
    { name: "Monemvasia", lat: 36.687, lng: 23.054 },
    { name: "Areopoli (Mani)", lat: 36.664, lng: 22.38 },
    { name: "Gerolimenas", lat: 36.481, lng: 22.399 },
    { name: "Dimitsana", lat: 37.594, lng: 22.041 },
    { name: "Olympia", lat: 37.638, lng: 21.63 },
  ],
  "crete": [
    { name: "Chania", lat: 35.519, lng: 24.018 },
    { name: "Elafonisi", lat: 35.271, lng: 23.541 },
    { name: "Rethymno", lat: 35.371, lng: 24.474 },
    { name: "Preveli", lat: 35.155, lng: 24.469 },
    { name: "Heraklion (Knossos)", lat: 35.298, lng: 25.163 },
    { name: "Lasithi plateau", lat: 35.19, lng: 25.49 },
    { name: "Agios Nikolaos", lat: 35.191, lng: 25.716 },
  ],
  "montenegro-kotor": [
    { name: "Tivat", lat: 42.43, lng: 18.696 },
    { name: "Kotor", lat: 42.425, lng: 18.771 },
    { name: "Perast", lat: 42.487, lng: 18.699 },
    { name: "Mount Lovćen", lat: 42.4, lng: 18.837 },
    { name: "Cetinje", lat: 42.391, lng: 18.914 },
    { name: "Lake Skadar (Virpazar)", lat: 42.246, lng: 19.09 },
    { name: "Tara Canyon bridge", lat: 43.15, lng: 19.294 },
    { name: "Žabljak (Durmitor)", lat: 43.154, lng: 19.122 },
  ],
  "slovenia-julian-alps": [
    { name: "Ljubljana", lat: 46.051, lng: 14.506 },
    { name: "Lake Bled", lat: 46.369, lng: 14.114 },
    { name: "Lake Bohinj", lat: 46.278, lng: 13.885 },
    { name: "Kranjska Gora", lat: 46.484, lng: 13.784 },
    { name: "Vršič Pass", lat: 46.433, lng: 13.737 },
    { name: "Bovec", lat: 46.338, lng: 13.552 },
    { name: "Kobarid", lat: 46.248, lng: 13.579 },
    { name: "Postojna", lat: 45.783, lng: 14.208 },
    { name: "Piran", lat: 45.528, lng: 13.568 },
  ],
  "corsica": [
    { name: "Bastia", lat: 42.703, lng: 9.45 },
    { name: "Macinaggio (Cap Corse)", lat: 42.961, lng: 9.454 },
    { name: "Nonza", lat: 42.785, lng: 9.344 },
    { name: "Calvi", lat: 42.568, lng: 8.757 },
    { name: "Porto & the Calanques", lat: 42.267, lng: 8.703 },
    { name: "Corte", lat: 42.306, lng: 9.15 },
    { name: "Bonifacio", lat: 41.387, lng: 9.159 },
    { name: "Palombaggia", lat: 41.556, lng: 9.33 },
    { name: "Ajaccio", lat: 41.919, lng: 8.738 },
  ],
  "dordogne-perigord": [
    { name: "Bordeaux", lat: 44.838, lng: -0.579 },
    { name: "Sarlat-la-Canéda", lat: 44.889, lng: 1.216 },
    { name: "Beynac", lat: 44.84, lng: 1.146 },
    { name: "La Roque-Gageac", lat: 44.825, lng: 1.183 },
    { name: "Domme", lat: 44.802, lng: 1.213 },
    { name: "Lascaux (Montignac)", lat: 45.064, lng: 1.163 },
    { name: "Rocamadour", lat: 44.799, lng: 1.618 },
    { name: "Saint-Cirq-Lapopie", lat: 44.464, lng: 1.672 },
    { name: "Cahors", lat: 44.448, lng: 1.441 },
  ],
};

// Major airports serving these regions — for picking the fly-in by route density.
export const airports: Airport[] = [
  { code: "NAP", name: "Naples International", country: "Italy", lat: 40.884, lng: 14.291 },
  { code: "FCO", name: "Rome Fiumicino", country: "Italy", lat: 41.8, lng: 12.239 },
  { code: "FLR", name: "Florence Peretola", country: "Italy", lat: 43.81, lng: 11.205 },
  { code: "PSA", name: "Pisa Galileo Galilei", country: "Italy", lat: 43.684, lng: 10.393 },
  { code: "CTA", name: "Catania Fontanarossa", country: "Italy", lat: 37.467, lng: 15.066 },
  { code: "PMO", name: "Palermo Falcone-Borsellino", country: "Italy", lat: 38.176, lng: 13.091 },
  { code: "SPU", name: "Split", country: "Croatia", lat: 43.539, lng: 16.298 },
  { code: "DBV", name: "Dubrovnik", country: "Croatia", lat: 42.561, lng: 18.268 },
  { code: "ZAD", name: "Zadar", country: "Croatia", lat: 44.108, lng: 15.347 },
  { code: "ATH", name: "Athens Eleftherios Venizelos", country: "Greece", lat: 37.936, lng: 23.947 },
  { code: "KLX", name: "Kalamata", country: "Greece", lat: 37.068, lng: 22.026 },
  { code: "CHQ", name: "Chania", country: "Greece", lat: 35.532, lng: 24.15 },
  { code: "HER", name: "Heraklion", country: "Greece", lat: 35.34, lng: 25.18 },
  { code: "TIV", name: "Tivat", country: "Montenegro", lat: 42.405, lng: 18.723 },
  { code: "TGD", name: "Podgorica", country: "Montenegro", lat: 42.359, lng: 19.252 },
  { code: "LJU", name: "Ljubljana Jože Pučnik", country: "Slovenia", lat: 46.224, lng: 14.458 },
  { code: "TRS", name: "Trieste", country: "Italy", lat: 45.827, lng: 13.472 },
  { code: "VCE", name: "Venice Marco Polo", country: "Italy", lat: 45.505, lng: 12.352 },
  { code: "BIA", name: "Bastia Poretta", country: "France (Corsica)", lat: 42.553, lng: 9.484 },
  { code: "AJA", name: "Ajaccio Napoléon Bonaparte", country: "France (Corsica)", lat: 41.924, lng: 8.803 },
  { code: "FSC", name: "Figari Sud-Corse", country: "France (Corsica)", lat: 41.501, lng: 9.098 },
  { code: "CLY", name: "Calvi Sainte-Catherine", country: "France (Corsica)", lat: 42.531, lng: 8.793 },
  { code: "BOD", name: "Bordeaux Mérignac", country: "France", lat: 44.828, lng: -0.715 },
  { code: "TLS", name: "Toulouse Blagnac", country: "France", lat: 43.629, lng: 1.364 },
  { code: "EGC", name: "Bergerac Dordogne-Périgord", country: "France", lat: 44.825, lng: 0.519 },
  { code: "BVE", name: "Brive Vallée de la Dordogne", country: "France", lat: 45.04, lng: 1.486 },
];
