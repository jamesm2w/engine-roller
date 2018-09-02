var random = new require("random-js")();

exports = module.exports = {};

var elementwiseDivision = (arr, num) => {
  // Divides each element in the array by num
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i] / num
  }
  return arr;
}

var elementwiseMultiplication = (arr, num) => {
  // Multiplies each element in the array by num
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * num
  }
  return arr;
}

var comparisonAny = (arr, max, min) => {
  // Return false if any value in array is outside the max >= x >= min range
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= max) {
      return false;
    }
    if (arr[i] <= min) {
      return false;
    }
  }
  return true;
}

exports.rollSchematic = (min, max, total) => {
  let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
  while (comparisonAny(engine, max, min)) {
    engine = elementwiseMultiplication(elementwiseDivision());
  }
  
  
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