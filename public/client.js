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
  console.log("rolling engine" + tier)
  document.getElementById("schematicName").innerHTML = "Procedural Engine (Tier " + tier + ")";
  var panel = document.getElementById("schematicPanel"), colour = "white", max = 180, knowledge = 0;
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
      colour = "#ffeb3b";
      knowledge = 500;
      break;
    case 3: 
      max = 135;
      colour = "#8470ff";
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
      colour = "black";
      knowledge = 12
      break;
    default:
      max = 100
      break;
              }
  panel.style.borderColor = colour;
  var result = rollSchematic(5, 100, max);
  for (var i = 0; i < result.length; i++){
    document.getElementById("schem-stat-" + i).style.width = Math.round(result[i]) + "%";
    document.getElementById("schem-stat-" + i + "-label").innerHTML = Math.round(result[i]);
  }
}