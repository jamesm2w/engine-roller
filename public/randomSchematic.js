class Schematic {
  constructor (type, tier) {
    this.tier = tier;
    this.type = type;
    this.config = window.schematicConfig[type][tier];
    this.Utilities = (typeof window.Utilities == undefined)? require("./public/utilities.js") : window.Utilities;
  }
  
  rollSchematic() {
    var stats = undefined, min = 5, max = 100, total = this.config.schemTotal;
    switch (this.type) {
      case "Engine":
        stats = new Array(5);
        break;
      case "Wing":
        stats = new Array(3);
        break;
      case "Cannon":
        stats = new Array(5);
        break;
      case "SwivelCannon":
        stats = new Array(5);
        break;
      default:
        stats = new Array(5);
        break;
                     }
    let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
    let rollMax = -1, rollMin = 0;
    while (engine[0] >= max || engine[1] >= max || engine[2] >= max || engine[3] >= max || engine[4] >= max) {
      rollMax++;
      engine = this.Utilities.arrayMult(engine, this.Utilities.randomStatArray(5), 1, max, min)
      engine = this.Utilities.elMult(this.Utilities.elDiv(engine, eval(engine.join('+'))), total);

      while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
        rollMin++;
        engine = this.Utilities.arrayMult(engine, this.Utilities.randomStatArray(5), 1, max, min)
        engine = this.Utilities.elMult(this.Utilities.elDiv(engine, eval(engine.join('+'))), total);
      }
    }
    return engine;
  }
  
  static parseJson (json) {
    return Object.assign(new Schematic(json.type, parseInt(json.tier)), json);
  }
  
  get schemKnowledge() {
    return this.config.knowledgeCost;
  }
  
  get schemPoints () {
    return this.config.schemMax;
  }
};

class Engine extends Schematic {
  constructor(tier) {
    super("Engine", tier);
    this.fullStats = this.rollSchematic();
    this.stats = this.fullStats.map(function (x) {return Math.round(x)});
  }
  
  determinName() {
    var casingName, propMountName, propName, powerNum, engineType, stats = stats;
    // TODO: Get Casing name from something
    for (var i = 0; i < this.config.casings.length; i++) {
      var currentCasing = this.config.casings[i];
      if (currentCasing[0] <= this.tier && this.fullStats.indexOf(Math.max(...this.fullStats)) == this.config.stats[currentCasing[2]]) {
        casingName = currentCasing[1];
        engineType = currentCasing[3];
      } 
    }
    //Get Prop Head name from Power
    var power = stats[4];
    for (var i = 0; i < this.config.propMounts.length; i++) {
      if (power > this.config.propMounts[i][0] && this.config.propMounts[i][2] == engineType) {

        propMountName = this.config.propMounts[i][1];
        powerNum = power - this.config.propMounts[i][0];
        engineType = this.config.propMounts[i][3];

        break;
      }
    }
    // Get the propeller from spin-up
    var spin = stats[2];
    for (var i = 0; i < this.config.props.length; i++) {
      if (spin >= this.config.props[i][0] && this.config.props[i][2] == engineType) {

        propName = this.config.props[i][1];
        engineType = this.config.props[i][3];

        break;
      }
    }
    return [casingName, propMountName, propName, powerNum];
  }
};

class Wing extends Schematic {};

class Cannon extends Schematic {};

class SwivelCannon extends Schematic {};

