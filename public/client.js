
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
    var casingName, propMountName, propName, powerNum, engineType, stats = stats;
    // TODO: Get Casing name from something
    for (var i = 0; i < engineConfig.casings.length; i++) {
      var currentCasing = engineConfig.casings[i];
      if (currentCasing[0] <= this.tier && this.fullStats.indexOf(Math.max(...this.fullStats)) == engineConfig.stats[currentCasing[2]]) {
        casingName = currentCasing[1];
        engineType = currentCasing[3];
      } 
    }
  
    //Get Prop Head name from Power
    var power = stats[4];
    for (var i = 0; i < engineConfig.propMounts.length; i++) {
      if (power > engineConfig.propMounts[i][0] && engineConfig.propMounts[i][2] == engineType) {

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
    
    loadedEngine = this; //Load in engine to the UI
    
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
    
    document.getElementById("engine-save").addEventListener("click", handleEngineSaveClick);
    document.getElementById("engine-save").style.cursor = "pointer";
    document.getElementById("engine-save").style.color = "darkgrey";
    document.getElementById("engine-save").innerHTML = "(Save Loaded Engine)";
    
    
    if (this.rollNumber > 1) {
      document.getElementById("rolling-output").innerHTML = "<br> Rolled " + this.rollNumber + " engines.";
    } else {
      document.getElementById("rolling-output").innerHTML = "";
    }
  }
  
  saveEngine() {
    window.localStorage.setItem(this.name.join(""), JSON.stringify(this));
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
  
  static parseJSON (json) {
    return Object.assign(new Engine(parseInt(json.tier)), json);
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
  var roll = new Engine(tier);
  console.log("Rolling new " + tier + " Engine");
  roll.displayEngine();
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

var buildLoaderUI = function () {
  var modalEl = document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0];
  
  if (window.localStorage.length == 0) {
    modalEl.innerHTML = "<em style='color:darkgrey;'>Nothing to see here. Save an engine first before you try to load one";
    return undefined;
  }
  
  for (var i = 0; i < window.localStorage.length; i++) {
    var currentItem = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
    
    var htmlString = '<div class="form-group col-6" id="Group-' + window.localStorage.key(i) + '"><span class="wa-header form-group-header center" style="color: var(--rarity-' + currentItem.config.rarity.toLowerCase() + ');">' + (currentItem.name[0] + " " + currentItem.name[1] + " " + currentItem.name[2] + currentItem.name[3]) + '</span><span class="center" id="' + window.localStorage.key(i) + '"><span class="load-btn" onclick="handleLoadAction(event);">Load Engine</span><span class="forget-btn" onclick="handleForgetAction(event);">Forget Engine</span></span></div>';
    console.log(htmlString);
    modalEl.innerHTML += htmlString;
  }
}


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



