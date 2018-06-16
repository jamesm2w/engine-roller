class Schematic {
  constructor (type, tier) {
    this.tier = tier;
    this.type = type;
    this.config = window.schematicConfig[type][tier];
  }
  
  rollSchematic() {
    var stats = undefined;
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
    
  }
  
  static parseJson (json) {
    return Object.assign(new Engine(parseInt(json.tier)), json);
  }
  
  get schemKnowledge() {
    return this.config.knowledgeCost;
  }
  
  get schemPoints () {
    return this.config.schemMax;
  }
};

class Wing extends Schematic {};

class Cannon extends Schematic {};

class SwivelCannon extends Schematic {};

class Engine extends Schematic {};