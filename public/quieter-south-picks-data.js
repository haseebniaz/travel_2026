/* Additive destination data. Load after quieter-south-data.js and before the app.
 * Existing route IDs, bookings and localStorage schema are intentionally unchanged.
 * Driving bands reproduce the supplied shortlist; they are estimates, not live routes.
 */
(function () {
'use strict';
if (!window.TRIPDATA || window.EZE_PICKS) return;
const data=window.TRIPDATA;
const rows=[
['erice-overlook','c/cb','Castello_di_Venere,_Erice,_Trapani,_Sicily,_Italy_-_panoramio.jpg','trolvag','by-sa/3.0','Erice · the Balio castle and gardens','Castle & gardens',1280],
['erice-lane','6/65','Erice-streets-bjs-2.jpg','Bjs','zero','Erice · a stone lane and archway','Stone lanes',960],
['erice-towers','2/26','Erice_castle.jpg','Dedda71','by-sa/3.0','Erice · the Balio towers','Medieval towers',1280],
['castelmola-town','0/03','Castelmola_-_Panorama_del_borgo.jpg','Lucamato','by-sa/4.0','Castelmola · rooftops above the Ionian coast','The village',1280],
['castelmola-view','2/25',"Castelmola_-_Panorama_di_Taormina_da_Piazza_Sant'Antonio.jpg",'Lucamato','by-sa/4.0','Castelmola · looking toward Taormina from the main square','The outlook',1280],
['castelmola-arch','f/f1','Arco_Antico_(Castelmola).jpg','The Cosmonaut','by-sa/2.5/ca','Castelmola · the old arch at the village entrance','The old arch',960],
['sperlinga-rock','c/ca','Sperlinga_castle.JPG','Dedda71','by/3.0','Sperlinga · castle masonry built into the rock','The rock castle',1280],
['sperlinga-caves','e/e8','Sperlinga_grotte_dal_castello.JPG','Azotoliquido','by-sa/2.5','Sperlinga · cave dwellings viewed from the castle','Cave dwellings',0],
['sperlinga-view','9/98','Sperlinga_panorama_dal_castello.JPG','Azotoliquido','by-sa/2.5','Sperlinga · village rooftops from the castle','Village outlook',0],
['ragusa-wide','6/63','Ragusa_Ibla_in_Sicily.jpg','Nicolas Chadeville','by-sa/4.0','Ragusa Ibla · the hillside old town','Hillside setting',1280],
['ragusa-roofs','f/fc','Panorama_Ragusa_Ibla.JPG','Hein56didden','by-sa/3.0','Ragusa Ibla · a panorama of the old town','Layered rooftops',1280],
['gangi-wide','3/3e','Panorama_di_Gangi_2.jpg','Davide Mauro','by-sa/4.0','Gangi · the village rising above the surrounding hills','Gangi panorama',1280],
['petralia-church','2/21','Chiesa_di_Loreto,_Petralia_Soprana.jpg','trolvag','by-sa/3.0','Petralia Soprana · Santa Maria di Loreto','Loreto square',1280],
['petralia-view','0/03','Belvedere_di_Petralia_Soprana.jpg','Davide Mauro','by-sa/4.0','Petralia Soprana · a belvedere over the countryside','Petralia outlook',960],
['pantalica-gorge','5/5a','Pantalica_gorge_(356575873).jpg','Andrew Malone','by/2.0','Pantalica · the Calcinara gorge','Canyon landscape',1280],
['pantalica-tombs','f/fb','Pantalica_-_un_tratto_della_necropoli.jpg','Carlo Columba','by-sa/2.0','Pantalica · rock-cut tombs in the necropolis','Rock-cut tombs',0],
['pantalica-wide','2/24','Nekropolis_von_Pantalica.jpg','Clemensfranz','by/2.5','Pantalica · the archaeological landscape','The wider setting',1280]
];
for (const [key,hash,file,author,lic,caption,short,width] of rows) {
 const f=encodeURIComponent(file).replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29');
 const full='https://upload.wikimedia.org/wikipedia/commons/'+hash+'/'+f;
 data.photos[key]={key,hash,file,author,caption,short,width,full,
 license:lic==='zero'?'CC0 1.0':'CC '+lic.toUpperCase().replace('/',' '),
 licenseUrl:'https://creativecommons.org/'+(lic==='zero'?'publicdomain/zero/1.0/':'licenses/'+lic+'/'),
 page:'https://commons.wikimedia.org/wiki/File:'+f,
 url:width?'https://thumb.wikimedia.org/wikipedia/commons/thumb/'+hash+'/'+f+'/'+width+'px-'+f:full};
}
Object.assign(data.sources,{
'eze-erice':['Erice · Visit Sicily','https://www.visitsicily.info/en/erice/'],
'eze-castelmola':['Castelmola · Visit Sicily','https://www.visitsicily.info/en/castelmola/'],
'eze-sperlinga':['Sperlinga · Visit Sicily','https://www.visitsicily.info/en/sperlinga/'],
'eze-ragusa':['Ragusa · Visit Sicily','https://www.visitsicily.info/en/localita/ragusa/'],
'eze-ragusa-walk':['Ragusa · Italia.it','https://www.italia.it/it/sicilia/ragusa'],
'eze-gangi':['Gangi · Visit Sicily','https://www.visitsicily.info/en/gangi/'],
'eze-petralia':['Petralia Soprana · Visit Sicily','https://www.visitsicily.info/en/petralia-soprana/'],
'eze-pantalica':['Pantalica entrances · Visit Sicily','https://www.visitsicily.info/en/itinerario/pantalica/'],
'eze-unesco':['Pantalica · UNESCO','https://whc.unesco.org/en/list/1200/']
});
const picks=[
{
id:'erice',name:'Erice',eyebrow:'Closest in spirit to Èze',tag:'Village',lat:38.036,lon:12.588,drive:'4–4½ hr',hours:4.5,visit:'Half day + an overnight',fit:'Overnight / reroute',mood:['eze','overnight'],gallery:['erice-overlook','erice-lane','erice-towers'],
why:'Stone lanes, castle walls and the feeling of a village lifted above the coast.',
text:'This is the closest emotional match to what you liked about Èze—not a claim that the towns look identical. Erice brings a medieval hilltop setting, atmospheric lanes and coast-facing viewpoints. Give the evening as much attention as the sights.',
do:['Start at Porta Trapani and wander the old lanes; keep some time deliberately unplanned.','Explore the Balio gardens and the Castle of Venus area. Treat entry to buildings as conditional on opening.','Break the walk for a genovese pastry, then linger for the evening rather than driving straight back.'],
photosNote:'The castle photographs show the Balio towers and gardens, not an invented composite of Erice and the French Riviera.',
plan:[['Arrive','Travel west and check in first. A late arrival is not the time to chase every viewpoint.'],['Explore','Choose the village lanes, garden overlooks and castle area. Pause when a courtyard or café catches your eye.'],['Stay','Spend at least one night in the west. A second night gives you room for weather and a slower morning.']],
stay:'Inside the historic village for atmosphere; Trapani below is an alternative when you prefer a coastal base. Confirm heating, dinner and luggage access.',
watch:'The drive is each way: this is not a sensible relaxed day trip from Catania. Fog can erase the views. Do not rely on a November cable-car service without checking it.',
routeA:'A western variation, not an extra stop. Replace the two-night Castelbuono/Madonie block with an Erice/Trapani stay, omit the Madonie village day, and protect November 6 for the drive back to Catania. November 4 also becomes a substantial transfer.',
routeB:'Not a small detour from Calabria. Choose a Sicily-focused variation instead of trying to combine the west and mainland coast in seven nights.',
suggestRoute:'a',suggestDay:4,sources:['eze-erice'],pins:[['Erice old town','Erice Porta Trapani Italy'],['Castle area','Castello di Venere Erice Italy']]
},
{
id:'castelmola',name:'Castelmola',eyebrow:'The easiest coastal balcony',tag:'Village',lat:37.86,lon:15.278,drive:'1–1½ hr',hours:1.5,visit:'2–3 hours + lunch',fit:'Easy route swap',mood:['eze','easy'],gallery:['castelmola-town','castelmola-view','castelmola-arch'],
why:'A compact village above Taormina, with a big view for a modest detour.',
text:'For a smaller dose of that perched-village feeling, this is the easiest addition. Piazza Sant’Antonino opens toward Taormina; the castle remains and village lanes give you a short walk rather than a full sightseeing agenda.',
do:['Pause in Piazza Sant’Antonino for the outlook before disappearing into the lanes.','Walk toward the castle remains and Piazza Duomo; on a clear day, look for Etna and the coast.','Leave time for lunch. Taormina below is optional, not a second compulsory checklist.'],
plan:[['Arrive','Park outside the tight center, or arrange the bus/taxi leg uphill from the Taormina area.'],['Wander','Connect the square, old arch, lanes and castle area at an unhurried pace.'],['Lunch','Choose lunch with a view, then decide whether you have energy for Taormina.']],
stay:'A short stop works well. Overnight in Castelmola or the Taormina area only after confirming November opening and your onward connection.',
watch:'The village is not at Taormina-Giardini railway station. A train itinerary still needs an uphill transfer. This is a known visitor destination, not an undiscovered village.',
routeA:'An alternative to the Etna outing on November 1—not an extra mountain-and-village marathon. Keeping both calls for replanning that day and possibly its overnight base.',
routeB:'The simplest new option: replace Savoca on November 1. Replan that night and the next morning’s rail connection toward Messina; keep the two Scilla and two Tropea nights.',
suggestRoute:'b',suggestDay:1,sources:['eze-castelmola'],pins:[['Village square','Piazza Sant Antonino Castelmola Italy'],['Castle remains','Castello di Mola Castelmola Italy']]
},
{
id:'montalbano',name:'Montalbano Elicona + Argimusco',eyebrow:'The most unusual pairing',tag:'Nature',lat:38.024,lon:15.016,drive:'1¾–2¼ hr',hours:2.25,visit:'One full day across both',fit:'Already in route A',mood:['easy','nature'],gallery:['montalbano','argimusco'],
why:'A medieval village paired with enormous, strangely shaped natural rocks.',
text:'Keep this as a two-part experience: Montalbano for stone lanes and a castle, Argimusco for the open plateau. The sandstone formations are natural; the “Stonehenge” nickname should not be read as proof of a built stone circle.',
do:['Walk the castle-side lanes in Montalbano and arrange dinner locally.','Drive separately to Argimusco and explore the rock formations in the clearest weather window.','Add only a short, locally advised Malabotta forest walk if weather and daylight leave room.'],
plan:[['Village','Explore Montalbano without rushing a castle visit; verify interior access.'],['Plateau','Give Argimusco a separate walking window. The photos show two distinct places, not one castle-and-rock scene.'],['Return','Come back to the same room and enjoy an evening without repacking.']],
stay:'Two nights in Montalbano work well, as already planned in route A. Check that both dinner and a heated room will be available.',
watch:'The village and plateau are separate stops. Wind, fog or wet ground can change the day; use current local advice, not this overview map, for access.',
routeA:'Already built in: Montalbano on November 2, then Argimusco and optional Malabotta on November 3. Keep the two-night base rather than squeezing both into a transfer day.',
routeB:'An inland car/taxi excursion, not a rail stop. It requires more time in Sicily and fewer mainland nights; avoid adding it to the Strait-crossing day.',
suggestRoute:'a',suggestDay:3,sources:['montalbano','argimusco'],pins:[['Medieval village','Montalbano Elicona castello Italy'],['Rock plateau','Argimusco Italy']]
},
{
id:'sperlinga',name:'Sperlinga',eyebrow:'Architecture you will remember',tag:'Village',lat:37.765,lon:14.351,drive:'1¾–2¼ hr',hours:2.25,visit:'2–3 hours on site',fit:'Inland excursion / swap',mood:['eze'],gallery:['sperlinga-rock','sperlinga-caves','sperlinga-view'],
why:'A castle that seems to grow out of sandstone, with cave dwellings below.',
text:'This is the most unexpected architectural stop in the shortlist. The castle combines built walls with chambers and steps cut into the rock; the cave-house area gives the village a very different character from a conventional medieval town.',
do:['Confirm castle access before committing the drive; the rock-carved interiors are a major reason to come.','Take the steps slowly and look at the junction between masonry and sandstone.','Explore the cave-village exteriors respectfully, then pause for a quiet lunch.'],
plan:[['Confirm','Check the castle opening and access arrangements, especially in November.'],['Explore','Make the rock castle the main event, with time for the stairways and outlook.'],['Village','Walk the cave-house area, then keep the rest of the day light.']],
stay:'Best treated as a deliberate inland excursion. A nearby village night is an option only after confirming an open room and dinner.',
watch:'Rock-cut stairways can be steep and slippery. Do not assume caves or private dwellings are open to enter. If the castle is closed, reconsider whether the long drive is worthwhile.',
routeA:'A possible alternative inland transfer toward the Madonie. Swap out other detours and allow for a longer driving day; do not stack it on top of Gangi, Petralia and Geraci.',
routeB:'Off the coastal rail route. It needs a car-led Sicily day and a meaningful itinerary change, not an extra stop between train connections.',
suggestRoute:'a',suggestDay:4,sources:['eze-sperlinga'],pins:[['Castle','Castello di Sperlinga Italy'],['Village','Borgo rupestre Sperlinga Italy']]
},
{
id:'ragusa',name:'Ragusa Ibla',eyebrow:'The overnight atmosphere pick',tag:'Village',lat:36.925,lon:14.744,drive:'1½–2 hr',hours:2,visit:'Late afternoon + a night',fit:'Southeast overnight / reroute',mood:['eze','overnight'],gallery:['ragusa-wide','ragusa-roofs'],
why:'Layered rooftops, stairways and a beautiful reason to stay after dark.',
text:'Different architecture from Èze, but a similar invitation to wander slowly. The walk between upper Ragusa and Ibla changes your view of the hillside; the old-town lanes, San Giorgio area and Giardino Ibleo give the afternoon a natural shape.',
do:['Start near Santa Maria delle Scale for the layered view, then descend toward Ibla.','Wander around Piazza Duomo and San Giorgio before continuing toward Giardino Ibleo.','Stay for dinner and an evening walk. Arrange a taxi back uphill if you do not want to retrace the steps.'],
plan:[['Arrive','Check in and arrange parking before entering the tight old streets.'],['Walk down','Use the changing views from the Santa Maria delle Scale side as part of the experience.'],['Stay late','Finish with a slow dinner in Ibla rather than turning the town into a drive-through photo stop.']],
stay:'Inside Ibla for the evening atmosphere; the upper-town edge can simplify arrival. Ask about twin beds, steps, parking and room access.',
watch:'Expect real stair climbing if you connect the upper and lower town on foot. This is a celebrated Baroque destination, not a secret village.',
routeA:'A southeast variation: replace the Madonie block rather than tacking Ragusa onto the north-coast loop. Budget the cross-island transfer and give Ibla an actual evening.',
routeB:'A separate branch south of Catania. To include it, shorten or replace the mainland portion; do not add it to the November 6 return journey.',
suggestRoute:'a',suggestDay:4,sources:['eze-ragusa','eze-ragusa-walk'],pins:[['Starting viewpoint','Santa Maria delle Scale Ragusa Italy'],['Old-town center','Duomo di San Giorgio Ragusa Italy'],['Garden','Giardino Ibleo Ragusa Italy']]
},
{
id:'gangi',name:'Gangi + Petralia Soprana',eyebrow:'The mountain-village day',tag:'Village',lat:37.798,lon:14.204,drive:'2–2¾ hr',hours:2.75,visit:'4–6 hours across both',fit:'Madonie day swap',mood:['easy'],gallery:['gangi-wide','petralia-church','petralia-view'],
why:'A hillside townscape, quiet lanes and a choice of mountain viewpoints.',
text:'A strong pairing for the inland part of the trip, not two more towns to add to a packed loop. In Gangi, focus on the old center and Ventimiglia tower area. Petralia Soprana offers the Loreto, Carmine and Piazza Duomo viewpoints; views depend on visibility.',
do:['Give Gangi a short old-town walk around the tower and San Nicolò area.','Make Petralia’s Loreto square and Piazza Duomo the second half of the day.','Choose a long lunch over a third or fourth village; one of the pair is enough in poor weather.'],
plan:[['Gangi','Start with the hillside setting, then park and explore the center on foot.'],['Lunch','Keep lunch as the pause between villages rather than eating in the car.'],['Petralia','Pick one or two viewpoints and wander the lanes; return before the drive becomes tiring.']],
stay:'Keep the two-night Castelbuono base in route A, or choose a village stay only if you are redesigning that block.',
watch:'The Catania drive allowance is not the entire two-village outing. The link between villages, parking and walks all take extra time. High-ground cloud can remove the panoramic payoff.',
routeA:'Best fit: replace the Geraci/Petralia choice on November 5 with Gangi + Petralia. Keep Castelbuono as your base and remove Geraci from that day.',
routeB:'Not on the mainland rail corridor. These make more sense as part of the Sicily route than as a one-day excursion from Scilla or Tropea.',
suggestRoute:'a',suggestDay:5,sources:['eze-gangi','eze-petralia'],pins:[['Gangi','Torre dei Ventimiglia Gangi Italy'],['Petralia Soprana','Santa Maria di Loreto Petralia Soprana Italy']]
},
{
id:'pantalica',name:'Pantalica',eyebrow:'Nature with a strong sense of place',tag:'Nature',lat:37.139,lon:15.028,drive:'1¼–1¾ hr',hours:1.75,visit:'A half day; route-dependent',fit:'Separate nature day',mood:['nature'],gallery:['pantalica-gorge','pantalica-tombs','pantalica-wide'],
why:'A canyon landscape and an ancient necropolis cut into the rock.',
text:'This is the non-village counterpoint: walking, archaeology and a landscape that feels distinct. Pantalica is part of the UNESCO property shared with Syracuse. The entrance is a real planning decision, not something to leave to a generic map pin.',
do:['Choose Ferla for an archaeology-led approach or research the Sortino side for the Calcinara setting.','Agree on a short route and turnaround time with current local access information.','Carry water and grippy shoes; leave time for the drive back rather than chasing a complete circuit.'],
plan:[['Choose an entrance','The upland Ferla and Sortino approaches are around 50–60 minutes apart by road. Confirm the exact entrance and trail first.'],['Walk one route','Choose a manageable out-and-back or locally advised walk. No river crossing, swimming or technical canyoning is part of this plan.'],['Turn back','Leave with daylight for the access road. This is a half-day nature objective, not a quick roadside viewpoint.']],
stay:'Works as a dedicated excursion from a southeast base or a Catania day with enough daylight. Pair with a Ragusa-focused route only after checking the actual driving legs.',
watch:'The upper necropolis approaches and the lower Anapo valley entrances are not interchangeable. Rain, river levels or closures can invalidate a route; confirm with the reserve/local guide.',
routeA:'Best within a redesigned southeast block with Ragusa, replacing part of the north-coast plan. Do not add a canyon walk to an already long return-to-Catania day.',
routeB:'This needs extra time back in Sicily. It does not fit naturally on the rail-and-ferry chain; dropping a mainland day is the honest tradeoff.',
suggestRoute:'a',suggestDay:5,sources:['eze-pantalica','eze-unesco'],pins:[['Research Ferla access','Ingresso Pantalica Ferla Italy'],['Research Sortino access','Ingresso Pantalica Sortino Italy']]
}
];
window.EZE_PICKS=Object.fromEntries(picks.map(p=>[p.id,p]));
for(const p of picks){const existing=data.places.find(x=>x.id===p.id);if(existing)existing.discoveryId=p.id;else data.places.push({...p,photo:p.gallery[0],route:'ideas',discoveryId:p.id});}
const arg=data.places.find(p=>p.id==='argimusco');if(arg)arg.discoveryId='montalbano';
})();
