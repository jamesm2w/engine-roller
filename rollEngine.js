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

exports.rollEngine = (n, min, max, total) => {
  e
};