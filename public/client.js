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
    ar1[i] = Math.pow(ar2[i], pwr) * (max-min) + min;
  }
  return ar1;
}

var rollSchematic = (min, max, total) => {
  let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
  let rollMax = -1, rollMin = 0;
  console.log(engine)
  while (engine[0] >= max || engine[1] >= max || engine[2] >= max || engine[3] >= max || engine[4] >= max) {
    rollMax++;
    engine = arrayMult(engine, [random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5)], 1, max, min)
    console.log(engine)
    engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
    console.log(engine)
    
    while (engine[0] < min || engine[1] < min || engine[2] < min || engine[3] < min || engine[4] < min) {
      rollMin++;
      engine = arrayMult(engine, [random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5),random.real(1,5)], 1, max, min)
      console.log(engine)
      engine = elMult(elDiv(engine, eval(engine.join('+'))), total);
      console.log(engine)
    }
  }
  return engine;
};