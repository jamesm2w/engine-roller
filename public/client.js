var elDiv =  function (ar1, num) {
  let res = new Array(ar1.length);
  for (let i = 0; i < ar1.length; i++) {
    res[i] = ar1[i] / num;
  }
  return res;
}

var elMult = function (ar1, num) {
  let res = new Array(ar1.length);
  for (let i = 0; i < ar1.length; i++) {
    res[i] = ar1[i] * num;
  }
  return res;
}

var arrayMult = function (ar1, ar2, pwr, max, min) {
  if (ar1.length != ar2.length) {
    throw "Arrays are not same length. Can't do this";
  }
  for (let i = 0; i < ar1.length; i++) {
    ar1[i] = Math.pow(ar2[i], pwr) * (max-min) + min;
  }
  return ar1;
}

var rollSchematic = function (min, max, total) {
  let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
  let rollMax = -1, rollMin = 0;
  while (engine[0] >= max || engine[1] >= max || engine[2] >= max || engine[3] >= max || engine[4] >= max) {
    rollMax++;
    engine = arrayMult(engine, [random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5)], 1, max, min)
    engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    
    while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
      rollMin++;
      engine = arrayMult(engine, [random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5)], 1, max, min)
      engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    }
  }
  return engine;
};

var engineConfig = {
  8: {
    "rarity": "Hypothetical",
    "schemMax": 460,
    "knowledge": 2000,
    "colour": "black"
  },
  7: {
    "rarity": "Hypothetical",
    "schemMax": 375,
    "knowledge": 1240,
    "colour": "darkgrey"
  },
  6: {
    "rarity": "Legendary",
    "schemMax": 300,
    "knowledge": 860,
    "colour": "#ee4000"
  },
  5: {
    "rarity": "Pristine",
    "schemMax": 235,
    "knowledge": 640,
    "colour": "#6b5ace"
  },
  4: {
    "rarity": "Exotic",
    "schemMax": 180,
    "knowledge": 500,
    "colour": "#F9D58B"
  },
  3: {
    "rarity": "Rare",
    "schemMax": 135,
    "knowledge": 400,
    "colour": "#588BEB"
  },
  2: {
    "rarity": "Uncommon",
    "schemMax": 100,
    "knowledge": 320,
    "colour": "#00ee76"
  },
  1: {
    "rarity": "Common",
    "schemMax": 75,
    "knowledge": 250,
    "colour": "white"
  },
  "statEffects": {
    "Casing": [0],
    "Combustion": [1, 3, 4],
    "Mechanical": [1, 3, 2],
    "Propeller": [2, 4]
  },
  "stats": {
    "Resilience": 0,
    "Fuel Efficiency": 1,
    "Spin-Up": 2,
    "Overheat Limit": 3,
    "Power": 4
  }
}

var rollEngine = function (tier) {
  document.getElementById("schematicName").innerHTML = "Procedural Engine (Tier " + tier + ")";
  var panel = document.getElementById("schematicPanel"), config = engineConfig[tier];
  panel.style.borderColor = config.colour;
  document.getElementById("schematicKnowledge").innerHTML = parseInt(document.getElementById("schematicKnowledge").innerHTML) + config.knowledge
  console.log("Rolling New" + tier + " Engine");
  var result = rollSchematic(5, 100, config.schemMax);
  for (var i = 0; i < result.length; i++){
    result[i] = Math.round(result[i]);
    document.getElementById("schem-stat-" + i).style.width = result[i] + "%";
    document.getElementById("schem-stat-" + i + "-label").innerHTML = result[i];
  }
  console.log(result);
  var engineObj = generateSchemCostsAndObj(result);
  return true;
}

var generateSchemCostsAndObj = function (engine) {
  // [Resil, FE, Spin, OH, Power]
  var costs = [0, 0, 0, 0] //Casing, Combus, Mech, Prop
  costs[0] = 2 * (engine[0] + engine[4] + engine[2]);   //2 x (Resilience + Power + Spinup)
  costs[1] = 2 * (engine[4] + engine[1] + engine[3]);   //2 x (Power + Fuel efficiency + Overheat)
  costs[2] = 2 * (engine[4] + engine[1]);               //2 x (Power + Fuel efficiency)
  costs[3] = 2 * (engine[2] + engine[3]);               //2 x (Spinup + Overheat)
  for (var i = 0; i < costs.length; i++) {
    document.getElementById("schem-mat-" + i).innerHTML = costs[i]
  }
  return {
    "stats": engine,
    "costs": costs
  }
}

var rollEngineUntil = function (statName, statValue, tier) {
  var arrayKey = engineConfig.stats[statName];
  var engine = rollSchematic(5, 100, engineConfig[tier].schemMax);
  console.log(engine);
  var n = 1;
  while (engine[arrayKey] < statValue) {
    if (n > 5000) {
      alert("The function has run 5000 times without generating a schematic matching the criteria. Continue?")
    } else if (n > 1000) {
      alert("The function has run 1000 times without generating a schematic matching the criteria. Continue?")
    } else if (n > 500) {
      alert("The function has run 500 times without generating a schematic matching the criteria. Continue?")
    } else if (n > 100) {
      alert("The function has run 100 times without generating a schematic matching the criteria. Continue?")
    }
    engine = rollSchematic(5, 100, engineConfig[tier].schemMax);
    console.log(engine);
    n++;
  }
  console.log("Final Engine");
  console.log(engine);
  console.log("It took " + n + " tries");
}

var handleMatMouseEnter = function (e) {
  var el = e.target, 
      name = el.querySelector(".wa-header").innerHTML, 
      effects = engineConfig.statEffects[name];
  for (var i = 0; i < effects.length; i++) {
    document.getElementById("schem-stat-" + effects[i]).style.backgroundColor = "#8bc34a";
  }
}

var handleMatMouseLeave = function (e) {
  for (var i = 0; i < 5; i++) {
    document.getElementById("schem-stat-" + i).style.backgroundColor = "#668ec3";
  }
}

var resetKnowledge = function () {
  var kc = document.getElementById("schematicKnowledge");
  console.log("Reset " + kc.innerHTML + " Knowledge to 0");
  kc.innerHTML = 0;
  return true;
}