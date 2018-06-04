var random = new require("random-js").Random;

exports = module.exports = {};

var elDiv = (ar1, num) => {
  let res = new Array(ar1.length);
  for (let i = 0; i < ar1.length; i++) {
    res[i] = ar1[i] / num;
  }
  return res;
}

var elMult = (ar1, num) => {
  let res = new Array(ar1.length);
  for (let i = 0; i < ar1.length; i++) {
    res[i] = ar1[i] * num;
  }
  return res;
}

var arrayMult = (ar1, ar2, pwr, max, min) => {
  if (ar1.length != ar2.length) {
    throw "Arrays are not same length. Can't do this";
  }
  for (let i = 0; i < ar1.length; i++) {
    ar1[i] = Math.pow(ar2[i], pwr * (max-min)) + min;
  }
}

exports.rollSchematic = (min, max, total) => {
  let engine = Array(5);
  let rollMax = -1, rollMin = 0;
  
  while (engine[0] >= max || engine[1] >= max || engine[2] >= max || engine[3] >= max || engine[4] >= max) {
    rollMax++;
    engine = arrayMult(engine, [random.uniform(0,4),random.uniform(0,4),random.uniform(0,4),random.uniform(0,4),random.uniform(0,4)], 1, max, min)
    engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    
    while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
      rollMin++;
      engine = arrayMult(engine, [random.uniform(0,4),random.uniform(0,4),random.uniform(0,4),random.uniform(0,4),random.uniform(0,4)], 1, max, min)
      engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    }
  }
  return engine;
};