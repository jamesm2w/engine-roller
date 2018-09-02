(function(window) {
  
  var Utilities = (function(window) {
    
    var Utilities = function (options) {};
    
    var random = window.random;
    
    Utilities.prototype.elementwiseDivision = (arr, num) => {
      // Divides each element in the array by num
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i] / num
      }
      return arr;
    }

    Utilities.prototype.elementwiseMultiplication = (arr, num) => {
      // Multiplies each element in the array by num
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * num
      }
      return arr;
    }

    Utilities.prototype.comparisonAny = (arr, max, min) => {
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

    Utilities.prototype.randomStatArray = function (n) {
      var a = new Array(n);
      for (var i = 0; i < n; i++) {
        a[i] = window.random.real(1,5);
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