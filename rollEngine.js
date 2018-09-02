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
  // Return true (to keep while loop going) if any value in array is outside the max >= x >= min range
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= max) {
      return true;
    }
    if (arr[i] <= min) {
      return true;
    }
  }
  return false;
}

exports.rollSchematic = (min, max, total) => {
  let engine = [max + 1, max + 1, max + 1, max + 1, max + 1];
  while (comparisonAny(engine, max, min)) {
    engine = [random.real(1,5), random.real(1,5), random.real(1,5), random.real(1,5), random.real(1,5)];
    engine = elementwiseMultiplication(
      elementwiseDivision(
        engine,
        engine.reduce((a, b) => a + b, 0) // sum the array.
      ), total
    );
  }
  return engine;
};