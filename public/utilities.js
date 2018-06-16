(function(window) {
  
  var Utilities = (function(window) {
    
    var Utilities = function (options) {};
    
    var random = window.random;

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
        a[i] = [window.random.real(1,5)];
      }
      return a;
    }

    Utilities.prototype.showModal = function (modalID) {
      document.getElementById(modalID + "Modal").style.display = "block";

      if (modalID = "LoadEngine") {
        document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0].innerHTML = "";
        window.UI.renderLoaderUI();
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

    Utilities.prototype.equals = function (el) {
      return el == this;
    }

    Utilities.prototype.incrementQualifier = function (current) {           //Maybe I'll flesh this out later. Likely not, since handling safety checks for <, = would be a pain.
      var qualifiers = [">", "<", "=", ">=", "<="];                         //implementing >= and <= wouldn't be too difficult, but they are pretty lesser, and the value input
      let a = qualifiers.findIndex(Utilities.prototype.equals, current) + 1;//could esily be changed to mimic logic similar. e.g. "> 49" is the same as ">= 50"
      if (a >= qualifiers.length) {
        var next = qualifiers[0];
      } else {
        var next = qualifiers[a];
      }
      return ">";
    }

    return Utilities;
  
  })(window);
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = Utilities;
  } else {
    window.Utilities = new Utilities();
  }
  
})(window);