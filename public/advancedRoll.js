(function(window) {
  var AdvancedRoller = (function(window) {
    
    var AdvancedRoller = function (options) {};
    
     var checkRollAgainstRuleset = function (array, stats) {
      //2D Array [ [qual, value], ... ] 
      for (var i = 0; i < array.length; i++) {
        var bool = eval(stats[i] + array[i][0] + array[i][1]);
        if (bool === true) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }

    AdvancedRoller.prototype.assembleRuleset = function (type) {
      var array = new Array(Object.keys(window.schematicConfig[type].stats).length);
      for (var i = 0; i < array.length; i++) {
        array[i] = [document.getElementById("rollStat" + i + "Param").value, document.getElementById("rollStat" + i + "Value").value];
      }
      return array;
    }

    var safetyCheckForRoll = function (tier, ruleset) {
      var statTotal = 0, maximumTotal = window.schematicConfig["Engine"][tier].schemMax - 25;
      for (var i = 0; i < ruleset.length; i++) {
        statTotal += parseInt(ruleset[i][1]);
      }
      if (statTotal > maximumTotal) {
        return false;
      } else {
        return true;
      }
    }

    var advancedRoll = function (type, tier, ruleset) {
      var n = 0;
      while (true) {
        n++;
        var schematic = eval("new " + type + "(" + tier + ")");
        if(checkRollAgainstRuleset(ruleset, schematic.stats)) {
          alert("Success! (After attempt #" + n + ")");
          schematic.rollNumber = n;
          return schematic;
        }
      }
    }

    AdvancedRoller.prototype.advancedRollWrapper = function (type) {
      var tier = document.getElementById("advancedRollTier").value,
          button = document.querySelector(".form-group.clickable > .wa-header"),
          ruleset = AdvancedRoller.prototype.assembleRuleset(type);
      if (safetyCheckForRoll(tier, ruleset) === false) {
        alert("ABORTING from Advanced Roll as the input values could not be generated by an engine of the selected tier.");
        return false;
      } else {
        var result = advancedRoll(type, tier, ruleset);
        result.displaySchematic();
        return true;
      }
    };

    
    return AdvancedRoller;
  })(window);
  
  window.AdvancedRoller = new AdvancedRoller();
})(window);