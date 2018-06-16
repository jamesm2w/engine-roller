class Schematic {
  constructor (type, tier) {
    this.tier = tier;
    this.type = type;
    this.config = window.schematicConfig[type][tier];
    this.rollNumber = 1;
  }
  
  rollSchematic() {
    var statNo = undefined, min = 5, max = 100, total = this.config.schemMax, Utilities = new window.Utilities();
    switch (this.type) {
      case "Engine":
        statNo = 5;
        break;
      case "Wing":
        statNo = 3
        break;
      case "Cannon":
        statNo = 5;
        break;
      case "SwivelCannon":
        statNo = 5;
        break;
      default:
        statNo = 5;
        break;
                     }
    var schematic = new Array(statNo);
    for (var i = 0; i < statNo; i++) {
      schematic[i] = max + 1;  
    }
    let rollMax = -1, rollMin = 0;
    console.log(schematic);
    while (schematic[0] >= max || schematic[1] >= max || schematic[2] >= max || schematic[3] >= max || schematic[4] >= max) {
      rollMax++;
      schematic = Utilities.arrayMult(schematic, Utilities.randomStatArray(statNo), 1, max, min);
      schematic = Utilities.elMult(Utilities.elDiv(schematic, eval(schematic.join('+'))), total);
      console.log(total, min, max);
      console.log(schematic);
      while (schematic[0] < min || schematic[1] < min || schematic[2] < min || schematic[3] < min || schematic[4] < min) {
        rollMin++;
        schematic = Utilities.arrayMult(schematic, Utilities.randomStatArray(statNo), 1, max, min)
        schematic = Utilities.elMult(Utilities.elDiv(schematic, eval(schematic.join('+'))), total);
      }
    }
    return schematic;
  }
  
  displaySchematic () {
    var EventHandler = new window.EventHandler();
    window.loadedSchematic = this; //Load in engine to the UI
    
    var panel = document.getElementById("schematicPanel");
    panel.style.borderColor = this.config.colour;
    document.getElementById("schematicKnowledge").innerHTML = parseInt(document.getElementById("schematicKnowledge").innerHTML) + 
      (this.rollNumber * this.config.knowledge); // Increment knowledge based on which type was rolled and how many were.
    
    for (var i = 0; i < this.stats.length; i++){
      document.getElementById("schematicStat" + i + "Bar").style.width = this.stats[i] + "%";
      document.getElementById("schematicStat" + i + "Value").innerHTML = this.stats[i];
    }
    
    for (var i = 0; i < this.costs.length; i++) {
      document.getElementById("schematicMat" + i + "Value").innerHTML = this.costs[i];
      document.getElementById("schematicMat" + i + "Value").style.display = "block";
    }
    
    document.getElementById("schematicName").innerHTML = 
      this.name[0] + " " + this.name[1] + " " + this.name[2] + this.name[3] + " (Tier " + this.tier + ")";
    
    document.getElementById("saveLoadedSchematicBtn").addEventListener("click", EventHandler.handleEngineSaveClick);
    document.getElementById("saveLoadedSchematicBtn").style.cursor = "pointer";
    document.getElementById("saveLoadedSchematicBtn").style.color = "darkgrey";
    document.getElementById("saveLoadedSchematicBtn").innerHTML = "(Save Loaded Engine)";
    
    if (this.rollNumber > 1) {
      document.getElementById("multipleRollOutput").innerHTML = "<br> Rolled " + this.rollNumber + " engines.";
    } else {
      document.getElementById("multipleRollOutput").innerHTML = "";
    }
  }
  
  saveSchematic() {
    var key = this.type + this.name.join("");
    while (true) {
      if (window.localStorage.getItem(key) != undefined) {
        key = key + "+";
      } else {
        break;
      }
    }
    window.localStorage.setItem(key, JSON.stringify(this));
  }
  
  static parseJson (json) {
    return Object.assign(new Schematic(json.type, parseInt(json.tier)), json);
  }
  
  get toJson () {
    return this;
  }
  
  get toString() {
    return JSON.stringify(this);
  }
  
  get schemKnowledge() {
    return this.config.knowledge;
  }
  
  get schemPoints () {
    return this.config.schemMax;
  }
  
  set rollNumer(n) {
    this.rollNumber = n;
  }
};

class Engine extends Schematic {
  constructor(tier) {
    super("Engine", tier);
    this.fullStats = this.rollSchematic();
    this.stats = this.fullStats.map(function (x) {return Math.round(x)});
    this.name = this.determineName();
    this.costs = this.calculateCosts();
  }
  
  determineName() {
    var casingName, propMountName, propName, powerNum, engineType, stats = this.stats, config = window.schematicConfig[this.type];
    for (var i = 0; i < config.casings.length; i++) {
      var currentCasing = config.casings[i];
      if (currentCasing[0] <= this.tier && this.fullStats.indexOf(Math.max(...this.fullStats)) == config.stats[currentCasing[2]]) {
        casingName = currentCasing[1];
        engineType = currentCasing[3];
      } 
    }
    var power = stats[4];
    for (var i = 0; i < config.propMounts.length; i++) {
      if (power > config.propMounts[i][0] && config.propMounts[i][2] == engineType) {

        propMountName = config.propMounts[i][1];
        powerNum = power - config.propMounts[i][0];
        engineType = config.propMounts[i][3];

        break;
      }
    }
    var spin = stats[2];
    for (var i = 0; i < config.props.length; i++) {
      if (spin >= config.props[i][0] && config.props[i][2] == engineType) {

        propName = config.props[i][1];
        engineType = config.props[i][3];

        break;
      }
    }
    return [casingName, propMountName, propName, powerNum];
  }
  
  calculateCosts() {
    var stats = this.stats, costs = [0, 0, 0, 0] //Casing, Combus, Mech, Prop
    costs[0] = 2 * (stats[0] + stats[4] + stats[2]);   //2 x (Resilience + Power + Spinup)
    costs[1] = 2 * (stats[4] + stats[1] + stats[3]);   //2 x (Power + Fuel efficiency + Overheat)
    costs[2] = 2 * (stats[4] + stats[1]);               //2 x (Power + Fuel efficiency)
    costs[3] = 2 * (stats[2] + stats[3]);               //2 x (Spinup + Overheat)
    return costs;
  }
};

class Wing extends Schematic {};

class Cannon extends Schematic {};

class SwivelCannon extends Schematic {};

