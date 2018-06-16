//------------------------//
//  Array Transformation  //
//------------------------//

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Validator;
} else {
  window.Validator = Validator;
}

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

var randomStatArray = function (n) {
  var a = new Array(n);
  for (var i = 0; i < n; i++) {
    a[i] = [random.real(1,5)];
  }
  return a;
}

//------------------------//
//  Load Modal Functions  //
//------------------------//

var showModal = function (modalID) {
  document.getElementById(modalID + "Modal").style.display = "block";
  
  if (modalID = "LoadEngine") {
    document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0].innerHTML = "";
    buildLoaderUI();
  }
}

var closeModal = function (e) {
  var modals = document.getElementsByClassName("modal");
  for (var modal of modals) {
    if (modal.style.display == "block") {
      modal.style.display = "none";
    }
  }
}

var handleWindowClick = function (e) {
  if (event.target.classList.contains("modal")) {
    closeModal(e);
  }
}

var closeBtns = document.getElementsByClassName("modalClose");
for (var element of closeBtns) {
  element.addEventListener("click", closeModal);
}