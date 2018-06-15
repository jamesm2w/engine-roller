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

var randomStatArray = function (n) {
  var a = new Array(n);
  for (var i = 0; i < n; i++) {
    a[i] = [random.real(1,5)];
  }
  return a;
}

var rollSchematic = function (min, max, total) {
  let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
  let rollMax = -1, rollMin = 0;
  while (engine[0] >= max || engine[1] >= max || engine[2] >= max || engine[3] >= max || engine[4] >= max) {
    rollMax++;
    engine = arrayMult(engine, randomStatArray(5), 1, max, min)
    engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    
    while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
      rollMin++;
      engine = arrayMult(engine, randomStatArray(5), 1, max, min)
      engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    }
  }
  return engine;
};

var engineConfig = {
  8: {
    "rarity":    "Experimental",
    "schemMax":  460,
    "knowledge": 2000,
    "colour":    "black"
  },
  7: {
    "rarity":    "Hypothetical",
    "schemMax":  375,
    "knowledge": 1240,
    "colour":    "darkgray"
  },
  6: {
    "rarity":    "Legendary",
    "schemMax":  300,
    "knowledge": 860,
    "colour":    "#E6152C"
  },
  5: {
    "rarity":    "Pristine",
    "schemMax":  235,
    "knowledge": 640,
    "colour":    "#C883F5"
  },
  4: {
    "rarity":    "Exotic",
    "schemMax":  180,
    "knowledge": 500,
    "colour":    "#FFD27D"
  },
  3: {
    "rarity":    "Rare",
    "schemMax":  135,
    "knowledge": 400,
    "colour":    "#6392F6"
  },
  2: {
    "rarity":    "Uncommon",
    "schemMax":  100,
    "knowledge": 320,
    "colour":    "#95C340"
  },
  1: {
    "rarity":    "Common",
    "schemMax":  75,
    "knowledge": 250,
    "colour":    "#FFE5C4"
  },
  "statEffects": {
    "Casing":     [0],
    "Combustion": [1, 3, 4],
    "Mechanical": [1, 3, 2],
    "Propeller":  [2, 4]
  },
  "stats": {
    "Resilience": 0,
    "Fuel Efficiency": 1,
    "Spin-Up": 2,
    "Overheat Limit": 3,
    "Power": 4
  },
  "casings": [
  //Min Tier, Name, Required Stat, Casing Type
    [1, "Piped",      "Spin-Up",        "w"],
    [1, "Squareframe","Resilience",     "w"],
    [1, "Scrapheap",  "Fuel Efficiency","w"],
    [1, "Scrapheap",  "Overheat Limit", "w"],
    [1, "Boxpile",    "Power",          "w"],
    
    [2, "Spinshaft",  "Spin-Up",        "w"],
    [2, "Reliant",    "Resilience",     "w"],
    [2, "Trishell",   "Fuel Efficiency","w"],
    [2, "Ventilated", "Overheat Limit", "w"],
    [2, "Spark",      "Power",          "w"],
    
    [3, "Dervish",   "Spin-Up",         "m"],
    [3, "Pinnacle",  "Resilience",      "m"],
    [3, "Iceberg",   "Fuel Efficiency", "m"],
    [3, "Iceberg",   "Overheat Limit",  "m"],
    [3, "Stallion",  "Power",           "m"],
    
    [4, "Godfellow", "Spin-Up",         "m"],
    [4, "Apotheus",  "Resilience",      "m"],
    [4, "Sunstream", "Fuel Efficiency", "m"],
    [4, "Sunstream", "Overheat Limit",  "m"],
    [4, "Ironforge", "Power",           "m"]
  ],
  "propMounts": [ // minPower, name, requiredType, setType
    [59, "Starcaster",  "m", "j"],
    [50, "Cloudchaser", "m", "j"],
    [44, "Supreme",     "m", "p"],
    [39, "Elite",       "m", "p"],
    [34, "Hurricane",   "m", "p"],
    [29, "Tornado",     "m", "p"],
    [24, "Cyclone",     "m", "p"],
    [19, "Pacesetter",  "m", "p"],
    [14, "Rival",       "m", "p"],
    [ 9, "Populus",     "m", "p"],
    [ 0, "Steamer",     "m", "p"],
    [27, "Workhorse",   "w", "p"],
    [19, "Cranker",     "w", "p"],
    [14, "Smokie",      "w", "p"],
    [ 9, "Crudbait",    "w", "p"],
    [ 0, "Rustbucket",  "w", "p"]
  ],
  "props": [ // minSpin, name, requiredType
    [30, "Z", "j"],
    [ 0, "X", "j"],
    [58, "N", "p"],
    [48, "M", "p"],
    [40, "H", "p"],
    [31, "F", "p"],
    [25, "B", "p"],
    [20, "U", "p"],
    [15, "O", "p"],
    [10, "E", "p"],
    [ 0, "A", "p"]
  ]
}

class Engine {
  constructor(tier) {
    this.tier = tier;
    this.config = engineConfig[tier];
    this.fullStats = this.rollStats(this.config.schemMax);
    this.stats = this.fullStats.map(x => Math.round(x));
    this.costs = this.calcCosts(this.stats);
    this.name = this.detName(this.stats);
    this.rollNumber = 1;
  }
  
  setRollNumber (n) {
    this.rollNumber = n;
  }
  
  _calculateCosts (stats) {
    var costs = [0, 0, 0, 0] //Casing, Combus, Mech, Prop
    costs[0] = 2 * (stats[0] + stats[4] + stats[2]);   //2 x (Resilience + Power + Spinup)
    costs[1] = 2 * (stats[4] + stats[1] + stats[3]);   //2 x (Power + Fuel efficiency + Overheat)
    costs[2] = 2 * (stats[4] + stats[1]);               //2 x (Power + Fuel efficiency)
    costs[3] = 2 * (stats[2] + stats[3]);               //2 x (Spinup + Overheat)
    return costs;
  }
  
  _determineEngineName (stats) {
    var casingName, propMountName, propName, powerNum, engineType = "m", stats = stats;
    // TODO: Get Casing name from something
    for (var i = 0; i < engineConfig.casings.length; i++) {
      var currentCasing = engineConfig.casings[i];
      if (currentCasing[0] <= this.tier && stats.indexOf(Math.max(...stats)) == engineConfig.stats[currentCasing[2]]) {
        casingName = currentCasing[1];
        engineType = currentCasing[3];
      } 
    }
  
    //Get Prop Head name from Power
    var power = stats[4];
    for (var i = 0; i < engineConfig.propMounts.length; i++) {
      if (power > engineConfig.propMounts[i][0] && engineType == engineConfig.propMounts[i][2]) {

        propMountName = engineConfig.propMounts[i][1];
        powerNum = power - engineConfig.propMounts[i][0];
        engineType = engineConfig.propMounts[i][3];

        break;
      }
    }
    // Get the propeller from spin-up
    var spin = stats[2];
    for (var i = 0; i < engineConfig.props.length; i++) {
      if (spin >= engineConfig.props[i][0] && engineConfig.props[i][2] == engineType) {

        propName = engineConfig.props[i][1];
        engineType = engineConfig.props[i][3];

        break;
      }
    }
    return [casingName, propMountName, propName, powerNum];
  }
  
  displayEngine () {
    var panel = document.getElementById("schematicPanel");
    panel.style.borderColor = this.config.colour;
    document.getElementById("schematicKnowledge").innerHTML = parseInt(document.getElementById("schematicKnowledge").innerHTML) + 
      (this.rollNumber * this.config.knowledge);
    
    for (var i = 0; i < this.stats.length; i++){
      
      document.getElementById("schem-stat-" + i).style.width = this.stats[i] + "%";
      document.getElementById("schem-stat-" + i + "-label").innerHTML = this.stats[i];
    }
    
    for (var i = 0; i < this.costs.length; i++) {
      document.getElementById("schem-mat-" + i).innerHTML = this.costs[i];
    }
    
    document.getElementById("schematicName").innerHTML = 
      this.name[0] + " " + this.name[1] + " " + this.name[2] + this.name[3] + " (Tier " + this.tier + ")";
    
    if (this.rollNumber > 1) {
      document.getElementById("rolling-output").innerHTML = "<br> Rolled " + this.rollNumber + " engines.";
    } else {
      document.getElementById("rolling-output").innerHTML = "";
    }
  }
  
  get engineObj () {
    return {"name": this.name, "tier": this.tier, "stats": this.stats, "costs": this.costs};
  }
  
  rollStats (total) {
    return rollSchematic(5, 100, total);
  }
  
  calcCosts (stats) {
    return this._calculateCosts(stats);
  }
  
  detName (stats) {
    return this._determineEngineName(stats);
  }
}

var createRollerUI = function () {
  for (var i = 1; i < 9; i++) {
    document.getElementById("rollerUI").innerHTML += "<div class='" 
      + engineConfig[i].rarity.toLowerCase() + "-btn roll-btn' onclick='randomRollEngine(" 
      + i + ")'>" 
      + engineConfig[i].rarity + " (T" + i + ") Engine</div>";
  }
}

var randomRollEngine = function (tier) {
  var randomRoll = new Engine(tier);
  console.log("Rolling new " + tier + " Engine");
  randomRoll.displayEngine();
}

var resetKnowledge = function () {
  var kc = document.getElementById("schematicKnowledge");
  console.log("Reset " + kc.innerHTML + " Knowledge to 0");
  kc.innerHTML = 0;
  return true;
}

var checkRollAgainstRuleset = function (array, engine) {
  //2D Array [ [qual, value], ... ] 
  for (var i = 0; i < array.length; i++) {
    var bool = eval(engine.stats[i] + array[i][0] + array[i][1]);
    if (bool === true) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

var assembleRuleset = function () {
  var array = new Array(5);
  for (var i = 0; i < array.length; i++) {
    array[i] = [document.getElementById("roll-stat-" + i + "-param").value, document.getElementById("roll-stat-" + i + "-val").value];
  }
  return array;
}

var safetyCheckForRoll = function (tier, ruleset) {
  var statTotal = 0, maximumTotal = engineConfig[tier].schemMax - 25;
  for (var i = 0; i < ruleset.length; i++) {
    statTotal += parseInt(ruleset[i][1]);
  }
  if (statTotal > maximumTotal) {
    return false;
  } else {
    return true;
  }
}

var advancedRoll = function (tier, ruleset) {
  var n = 0;
  while (true) {
    n++;
    var engine = new Engine(tier);
    if(checkRollAgainstRuleset(ruleset, engine)) {
      alert("Success! (After attempt #" + n + ")");
      engine.setRollNumber(n);
      return engine;
    }
  }
}

var advancedRollWrapper = function () {
  var ruleset = assembleRuleset(),
      tier = document.getElementById("roll-tier").value,
      button = document.querySelector(".form-group.clickable > .wa-header");
  if (safetyCheckForRoll(tier, ruleset) === false) {
    alert("ABORTING from Advanced Roll as the input values could not be generated by an engine of the selected tier.");
    return false;
  } else {
    var result = advancedRoll(tier, ruleset);
    result.displayEngine();
    return true;
  }
};

var equals = function (el) {
  return el == this;
}

var incrementQualifier = function (current) { //Maybe I'll flesh this out later. Likely not, since handling safety checks for <, = would be a pain.
  var qualifiers = [">", "<", "=", ">=", "<="]; //implementing >= and <= wouldn't be too difficult, but they are pretty lesser, and the value input
  let a = qualifiers.findIndex(equals, current) + 1;//could esily be changed to mimic logic similar. e.g. "> 49" is the same as ">= 50"
  if (a >= qualifiers.length) {
    var next = qualifiers[0];
  } else {
    var next = qualifiers[a];
  }
  return ">";
}

var handleQualifierClick = function (e) {
  var current = e.target.value;
  e.target.value = incrementQualifier(current);
}

var handleValueChange = function (e) {
  var value = e.target.value;
  if ( value > 99) {
    e.target.value = 99;
  } else if ( value < 5) {
    e.target.value = 5;
  }
}

var handleTierChange = function (e) {
  var value = e.target.value;
  if (value > 8) {
    e.target.value = 8;
  } else if (value < 1) {
    e.target.value = 1;
  }
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

