class Schematic {
  constructor (type, tier) {
    this.tier = tier;
    this.type = type;
    this.config = window.schematicConfig[type][tier];
    this.rollNumber = 1;
  }
  
  rollSchematic() {
    var statNo = undefined, min = 5, max = 100, total = this.config.schemMax, Utilities = window.Utilities;
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
    console.log(schematic);
    while (Utilities.comparisonAny(schematic, max, min)) {
      console.log(schematic);
      schematic = Utilities.randomStatArray(statNo);
      schematic = Utilities.elementwiseMultiplication(
        Utilities.elementwiseDivision(
          schematic,
          schematic.reduce((a, b) => a + b, 0) // sum the array.
        ), total
      );
      console.log(schematic);
    }
    return schematic;
  }
  
  displaySchematic () {
    var EventHandler = window.EventHandler;
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
      document.getElementById("schematicMat" + i).classList.remove("hidden");
    }
    
    
    document.getElementById("schematicName").innerHTML = Schematic.getDisplayName(this.type, this.name) + " (Tier " + this.tier + ")";
    
    document.getElementById("saveLoadedSchematicBtn").addEventListener("click", EventHandler.handleEngineSaveClick);
    document.getElementById("saveLoadedSchematicBtn").style.cursor = "pointer";
    document.getElementById("saveLoadedSchematicBtn").style.color = "darkgrey";
    document.getElementById("saveLoadedSchematicBtn").innerHTML = "(Save Loaded Schematic)";
    
    if (this.rollNumber > 1) {
      document.getElementById("multipleRollOutput").innerHTML = "<br> Rolled " + this.rollNumber + " schematics.";
    } else {
      document.getElementById("multipleRollOutput").innerHTML = "";
    }
  }
  
  saveSchematic() {
    var key = this.type + this.name.join("");
    while (true) {
      if (window.localStorage.getItem(key)) {
        if (window.localStorage.getItem(key) == JSON.stringify(this)) {
          //Same object... don't really care what happens
          break;
        } else {
          //Whoa two different engines with the same name!!
          key += "+";
        }
      } else {
        break;
      }
    }
    
    window.localStorage.setItem(key, JSON.stringify(this));
  }
  
  static parseJson (json) {
    return Object.assign(new Schematic(json.type, parseInt(json.tier)), json);
  }
  
  static getDisplayName (type, name) {
    switch(type) {
      case "Engine":
        return Engine.getDisplayName(name);
      case "Wing":
        return Wing.getDisplayName(name);
      case "Cannon":
        return Cannon.getDisplayName(name);
      case "Swivel":
        return Swivel.getDisplayName(name);
               }
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
  
  rollNumber(n) {
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
  
  
  static getDisplayName(name) {
        // Casing Name + Prop Mount Name + Prop Letter + Number
        //e.g. Ironforge Starcaster N1
    return name[0] + " " + name[1] + " " + name[2] + name[3];
  }
};

class Wing extends Schematic {
  constructor(tier) {
    super("Wing", tier);
    this.fullStats = this.rollSchematic();
    this.stats = this.fullStats.map(function (x) {return Math.round(x)});
    this.name = this.determineName();
    this.costs = this.calculateCosts();
  }
  
  determineName() {
    return ["Proc", "Wing", this.tier, "00", "X"];
  }
  
  calculateCosts() {
    var stats = this.stats, costs = [0,0,0];
    costs[0] = 2 * (stats[0] + stats[1]);
    costs[1] = 2 * (stats[1]);
    costs[2] = 2 * (stats[2]);
    return costs;
  }
  
  static getDisplayName(name) {
        // Body Name + Wingtip Name + Aileron Number + Bracket Number + Letter
        // [Traveller] [Navigator] [1][23][B]
    return name[0] + " " + name[1] + " " + name[2] + name[3] + name[4];
  }
};

class Cannon extends Schematic {
  constructor(tier) {
    super("Cannon", tier);
    this.fullStats = this.rollSchematic();
    this.stats = this.fullStats.map(function (x) {return Math.round(x)});
    this.name = this.determineName();
    this.costs = this.calculateCosts();
  }
  
  determineName() {
    return ["Procedural", "Cannon", "AB", "C", this.tier];
  }
  
  calculateCosts() {
    var stats = this.stats, costs = [0,0,0];
  // Resilience, Capactiy, Power, OH, ROF
    costs[0] = 2 * (stats[0] + stats[2]); //Casing = 2 x (Resilience + Power)
    costs[3] = 2 * (stats[4]); //Firing Mechanism = 2 x (Rate of fire)
    costs[1] = 2 * (stats[2]); //Barrel = 2 x (Power)
    costs[2] = 2 * (stats[1] + stats[3]); //Ammo Loader = 2x (Capacity + Overheat)
    return costs;
  }
  
  static getDisplayName(name) {
        // Body Name + "Barrel" + Base + Ammo Box + - Number
        // [Narwhal] "[Hunter]" [A][BC]-[0]
    return name[0] + " \"" + name[1] + "\" " + name[2] + name[3] + "-" + name[4];
  }
};

class Swivel extends Schematic {
  constructor(tier) {
    super("Swivel", tier);
    this.fullStats = this.rollSchematic();
    this.stats = this.fullStats.map(function (x) {return Math.round(x)});
    this.name = this.determineName();
    this.costs = this.calculateCosts();
  }
  
  determineName() {
    return ["Procedural", "Swivel", "AB", "C", this.tier];
  }
  
  calculateCosts() {
    var stats = this.stats, costs = [0,0,0];
  // Resilience, Capactiy, Power, OH, ROF
    costs[0] = 2 * (stats[0] + stats[2]); //Casing = 2 x (Resilience + Power)
    costs[3] = 2 * (stats[4]); //Firing Mechanism = 2 x (Rate of fire)
    costs[1] = 2 * (stats[2]); //Barrel = 2 x (Power)
    costs[2] = 2 * (stats[1] + stats[3]); //Ammo Loader = 2x (Capacity + Overheat)
    return costs;
  }
  
  static getDisplayName(name) {
        // Body Name + "Barrel" + Base + Ammo Box + - Number
        // [Narwhal] "[Hunter]" [A][BC]-[0]
    return name[0] + " \"" + name[1] + "\" " + name[2] + name[3] + "-" + name[4];
  }
};

