var Utilities = (function() {
  Utilities.random = (typeof window.random == undefined) ? new require("random-js")() : window.random;
  
  Utilities.prototype.elDiv = function (ar1, num) {
    var res = new Array(ar1.length);
    for (var i = 0; i < ar1.length; i++) {
      res[i] = ar1[i] / num;
    }
    return res;
  }
  
  Utilities.prototype.elMult = function (ar1, num) {
    var res = new Array(ar1.length);
    for (var i = 0; i < ar1.length; i++) {
      res[i] = ar1[i] * num;
    }
    return res;
  }
  
  Utilities.prototype.arrayMult = function (ar1, ar2, pwr, max, min) {
    if (ar1.length != ar2.length) {
      throw "Arrays are not same length. Can't do this";
    }
    for (let i = 0; i < ar1.length; i++) {
      ar1[i] = Math.pow(ar2[i], pwr) * (max-min) + min;
    }
    return ar1;
  }
  
  Utilities.prototype.randomStatArray = function (n) {
    var a = new Array(n);
    for (var i = 0; i < n; i++) {
      a[i] = [Utilities.random.real(1,5)];
    }
    return a;
  }
  
  Utilities.prototype.showModal = function (modalID) {
    document.getElementById(modalID + "Modal").style.display = "block";

    if (modalID = "LoadEngine") {
      document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0].innerHTML = "";
      window.UI.buildLoaderUI();
    }
  }
  
  Utilities.prototype.closeOpenModal = function (e) {
    var modals = document.getElementsByClassName("modal");
    for (var modal of modals) {
      if (modal.style.display == "block") {
        modal.style.display = "none";
      }
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = Utilities;
  } else {
    window.Utilities = Utilities;
  }
})();

