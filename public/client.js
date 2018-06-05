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

var rollEngine = function (tier) {
  document.getElementById("schematicName").innerHTML = "Procedural Engine (Tier " + tier + ")";
  var panel = document.getElementById("schematicPanel"), colour = "white", max = 180, knowledge = 0;//Establish default fallback values
  switch (tier) {
    case 6:
      max = 300;
      colour = "#ee4000";
      knowledge = 860;
      break;
    case 5:
      max = 235;
      colour = "#6b5ace";
      knowledge = 640;
      break;
    case 4:
      max = 180;
      colour = "#F9D58B";
      knowledge = 500;
      break;
    case 3: 
      max = 135;
      colour = "#588BEB";
      knowledge = 400;
      break;
    case 2:
      max = 100;
      colour = "#00ee76";
      knowledge = 320;
      break;
    case 1:
      max = 75;
      colour = "white";
      knowledge = 250;
      break;
    case 7:
      max = 375;
      colour = "darkgrey";
      knowledge = 1240;
      break;
    case 8:
      max = 460;
      colour = "black";
      knowledge = 2000;
      break;
    default:
      max = 100
      break;
              }
  panel.style.borderColor = colour;
  document.getElementById("schematicKnowledge").innerHTML = parseInt(document.getElementById("schematicKnowledge").innerHTML) + knowledge
  console.log("Rolling New" + tier + " Engine");
  var result = rollSchematic(5, 100, max);
  for (var i = 0; i < result.length; i++){
    result[i] = Math.round(result[i]);
    document.getElementById("schem-stat-" + i).style.width = result[i] + "%";
    document.getElementById("schem-stat-" + i + "-label").innerHTML = result[i];
  }
  console.log(result);
  generateSchemCosts(result);
  return true;
}

var generateSchemCosts = function (engine) {
  // [Resil, FE, Spin, OH, Power]
  var costs = [0, 0, 0, 0] //Casing, Combus, Mech, Prop
  costs[0] = 2 * (engine[0] + engine[4] + engine[2]);   //2 x (Resilience + Power + Spinup)
  costs[1] = 2 * (engine[4] + engine[1] + engine[3]);   //2 x (Power + Fuel efficiency + Overheat)
  costs[2] = 2 * (engine[4] + engine[1]);               //2 x (Power + Fuel efficiency)
  costs[3] = 2 * (engine[2] + engine[3]);               //2 x (Spinup + Overheat)
  for (var i = 0; i < costs.length; i++) {
    document.getElementById("schem-mat-" + i).innerHTML = costs[i]
  }
}

var materials = document.getElementsByClassName("schem-mat");
for (var i = 0; i < materials.length; i++) {
  var materialName = document.getElementById("schem-mat-" + i + "-label").innerHTML, effect = [0]
  switch (materialName) {
    case "Casing":
      effect = [0]; // Resilience
      break;
    case "Combustion":
      effect = [1, 3 ,4]; // FE, OH, Power
      break;
    case "Mechanical":
      effect = [1, 3, 2]; // FE, OH, Spin
      break;
    case "Propeller":
      effect = [2, 4]; // Spin, Power
      break;
    default:
      break;
  }
  materials[i]
}

var resetKnowledge = function () {
  var kc = document.getElementById("schematicKnowledge");
  console.log("Reset " + kc.innerHTML + " Knowledge to 0");
  kc.innerHTML = 0;
  return true;
}