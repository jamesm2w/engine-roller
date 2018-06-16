class Schematic {
  constructor (type, tier) {
    this.tier = tier;
    this.type = type;
    this.config = window.schematicConfig[type][tier];
  }
  
  rollSchematic(max) {
    var stats = undefined, min = 5, max = this.config.schemMa
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
      engine = Utilities.arrayMult(engine, randomStatArray(5), 1, max, min)
      engine = Utilities.elMult(Utilities.elDiv(engine, eval(engine.join('+'))), total);

      while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
        rollMin++;
        engine = Utilities.arrayMult(engine, randomStatArray(5), 1, max, min)
        engine = Utilities.elMult(Utilities.elDiv(engine, eval(engine.join('+'))), total);
      }
    }
    return engine;
    
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