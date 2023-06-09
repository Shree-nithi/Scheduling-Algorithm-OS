"use strict";

var chapter = 17;
var runNumber = 0;

function setupVars() {
  planetA = planets[Math.floor(Math.random() * planets.length)];
  planetB = planets[Math.floor(Math.random() * planets.length)];
  planetC = planets[Math.floor(Math.random() * planets.length)];
  alien = aliens[Math.floor(Math.random() * aliens.length)];
  resolution = resolutions[Math.floor(Math.random() * resolutions.length)];
  foe = foes[Math.floor(Math.random() * foes.length)];
  mcguffinA = mcguffins[Math.floor(Math.random() * mcguffins.length)];
  mcguffinB = mcguffins[Math.floor(Math.random() * mcguffins.length)];
  groguDesc = groguDescs[Math.floor(Math.random() * groguDescs.length)];
  moveA = moves[Math.floor(Math.random() * moves.length)];
  moveB = moves[Math.floor(Math.random() * moves.length)];
  resolveA = resolves[Math.floor(Math.random() * resolves.length)];
  resolveB = resolves[Math.floor(Math.random() * resolves.length)];
  thingA = things[Math.floor(Math.random() * things.length)];
  thingB = things[Math.floor(Math.random() * things.length)];
  thingC = things[Math.floor(Math.random() * things.length)];
  arriving = arrivings[Math.floor(Math.random() * arrivings.length)];
  characteristic = characteristics[Math.floor(Math.random() * characteristics.length)];
  find = finds[Math.floor(Math.random() * finds.length)];
  action = actions[Math.floor(Math.random() * actions.length)];
  typeOfRel = typeOfRels[Math.floor(Math.random() * typeOfRels.length)];
  bond = bonds[Math.floor(Math.random() * bonds.length)];
  mission = missions[Math.floor(Math.random() * missions.length)];
  farewell = farewells[Math.floor(Math.random() * farewells.length)];
}

$("#write").click(function () {
  chapter = chapter + 1;
  setupVars(); //alert(planet + " " + alien);

  text = "After " + resolution + " the " + foe + " of " + planetA + ", Mando and " + groguDesc + " Grogu " + moveA + " to " + planetB + " to " + resolveA + " the " + mcguffinA + " of " + thingB + ".<br><br>Upon " + arriving + " they " + find + " a" + characteristic + " " + alien + " and a " + action + " ensues. Mando bests this opponent and a " + typeOfRel + " " + bond + " is formed.<br><br>With his new companion, Mando embarks on his " + mission + " and together they " + resolveA + " the " + mcguffinA + " of " + thingB + ".<br><br>After " + farewell + " his new found friend, Mando learns that he and Grogu must " + moveB + " to " + planetC + " to " + resolveB + " the " + mcguffinB + " of " + thingC + ".";
  $("#chapter").html("Chapter " + chapter);
  $("#synopsis").html(text);
});
var planets = ["Tatooine", "Coruscant", "Kamino", "Hoth", "Kashyyyk", "Naboo", "Bespin", "Crait", "Dagobah", "Geonosis", "Mustafar", "Jakku", "Yavin", "Corellia", "Polis Massa", "Mandalore", "Dantooine", "Mon Calamari", "Nal Hutta", "Malachor V"];
var aliens = ["Pantoran", "Zabrak", "Devaronian", "Tusken", "Gungan", "Rodian", "Crolute", "Mon Calamari", "Twi'lek", "Ortolan", "Sarkan", "Gamorrean", "Sullustan", "Talpini", "Chagrian", "Ewok", "Dowutin", "Drabata", "Utapaun", "Gran", "Ubdurian", "Lakaru", "Trandoshan", "Dug", "Toydarian", "Tognath", "Neimoidian", "Jawa", "Bith", "Talz", "Hutt", "Wookiee", "Human", "Mandalorian", "Corellian", "Chiss", "Geonosian", "Togruta", "Mirialan", "Pantoran", "Theelin", "Echani"];
var resolutions = ["finding", "defeating", "destroying", "burying", "besting", "running from", "evading", "hunting down", "confronting"];
var foes = ["war lord", "pirate", "lord", "Jedi", "vortex", "creature", "monster", "beast", "scoundrel", "memory board", "mines", "catacombs"];
var mcguffins = ["Holocron", "Sword", "Weapon", "Sheild", "Helmet", "Crystal", "Book", "Map", "Wayfinder", "Tree"];
var groguDescs = ["tiny", "cute", "adorable", "baby Jedi,", "sweet, little", "lucrative marketing opportunity,", "the child,"];
var moves = ["travel", "escape", "journey", "set off", "head"];
var resolves = ["defeat", "find", "confront", "destroy", "track down", "bury", "best", "evade", "hunt down"];
var things = ["Power", "Doom", "Life", "Evil", "the Sith", "the Force", "Insanity", "Madness", "Filth"];
var arrivings = ["arriving", "landing", "crash landing", "setting down"];
var characteristics = [" honourable", " pathetic", " evil", " vile", " huge", "n attractive", " furious", "n insane", "n unhelpful"];
var finds = ["find", "meet", "chance upon", "walk into", "knock over", "dare to speak to"];
var actions = ["fight", "skirmish", "battle", "argument", "test of strength", "blaster showdown", "duel", "slagging match"];
var typeOfRels = ["nervous", "strong", "mutual", "nervous", "unlikely"];
var bonds = ["alliance", "friendship", "understanding"];
var missions = ["mission", "quest", "journey", "adventure"];
var farewells = ["bidding farewell to", "mourning the loss of", "saying goodbye to", "recruiting", "burying the body of", "vowing to avenge", "arranging to rendezvous later with", "removing his helmet for", "sharing a bath with", "hearing the dying words of"];
//# sourceMappingURL=new.dev.js.map
