(function (window) {
  var UserInterface = (function(window) {
    var UserInterface = function (options) {};
    
    var statString = function (obj) {
      return `<div class="stat-bar" id="schematicStat${obj.index}">
            <div class="progress" id="schematicStat${obj.index}Bar"></div>
            <span class="stat-label left">${obj.name}</span>
            <span class="stat-label right" id="schematicStat${obj.index}Value">0</span>
          </div>`
    }
    
    var matString = function (obj) {
      return `<div class="col-6 schem-mat bottom top hidden" id="schematicMat${obj.index}">
              <span class="wa-header" id="schematicMat${obj.index}Label">${obj.name}</span>
              <span id="schematicMat${obj.index}Value">100</span>
            </div>`
    }
    
    UserInterface.prototype.renderSchematicUI = function (type) {
      var panel = window.document.getElementById("schematicPanel");
      panel.setAttribute("schematicType", type);
      panel.innerHTML = `<span class="wa-header" style="font-size: 1em; float: left;" id="schematicName">Procedural ${type}</span>
                         <div class="divider top bottom"></div>`;
      for (var i = 0; i < 5; i++) {
        panel.innerHTML += statString({"name": Object.keys(window.schematicConfig[type].stats)[i], "index": i});
      }
      for (var i = 0; i < Object.keys(window.schematicConfig[type].stats).length; i++) {
        if(panel.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[0].innerHTML == "undefined") {
          panel.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[0].classList.add("hidden");
          panel.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[1].classList.add("hidden");
        }
      }
      panel.innerHTML += `<div class="schematicMoreInfo">
            <div class="divider bottom top" style="margin-bottom: 3%;"></div>`;
      
      for (var i = 0; i < Object.keys(window.schematicConfig[type].statEffects).length; i++) {
        panel.innerHTML += matString({"name": Object.keys(window.schematicConfig[type].statEffects)[i], "index": i});
      }
      panel.innerHTML += `</div>`;
    }
    
    UserInterface.prototype.patchSchematicUI = function (type) {
      var panel = window.document.getElementById("schematicPanel");
      
      if (panel.getAttribute("schematicType") == type) {
        return true;
      } else {
        
      }
    
    }
    
    UserInterface.prototype.renderRollerUI = function (type) {
      document.getElementById("rollerUI").innerHTML = "";
      for (var i = 1; i < 9; i++) {
        document.getElementById("rollerUI").innerHTML += `<div class='${window.schematicConfig.Engine[i].rarity.toLowerCase()}-btn roll-btn' 
          onclick='UI.randomRoll${type}(${i})'>${window.schematicConfig.Engine[i].rarity} (T${i}) ${type}</div>`;
      }
    }
    
    UserInterface.prototype.renderLoaderUI = function () {
      var modalEl = document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0];

      if (window.localStorage.length == 0) {
        modalEl.innerHTML = `<em style='color:darkgrey;'>Nothing to see here. Save an engine first before you try to load one`;
        return undefined;
      }

      for (var i = 0; i < window.localStorage.length; i++) {
        var currentItem = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));

        var htmlString = '<div class="form-group col-6" id="Group-' + window.localStorage.key(i) + '"><span class="wa-header form-group-header center" style="color: var(--rarity-' + currentItem.config.rarity.toLowerCase() + ');">' + (currentItem.name[0] + " " + currentItem.name[1] + " " + currentItem.name[2] + currentItem.name[3]) + '</span><span class="center" id="' + window.localStorage.key(i) + '"><span class="load-btn" onclick="EventHandler.prototype.handleLoadAction(event);">Load Engine</span><span class="forget-btn" onclick="EventHandler.prototype.handleForgetAction(event);">Forget Engine</span></span></div>';
        modalEl.innerHTML += htmlString;
      }
    }
    
    UserInterface.prototype.resetKnowledge = function () {
      var kc = document.getElementById("schematicKnowledge");
      console.log("Reset " + kc.innerHTML + " Knowledge to 0");
      kc.innerHTML = 0;
      return true;
    }
    
    UserInterface.prototype.randomRollEngine = function (tier) {
      UserInterface.prototype.renderSchematicUI("Engine");
      UserInterface.prototype.renderRollerUI("Engine");
      
      var roll = new Engine(tier);
      console.log("Rolling new Tier " + tier + " Engine");
      
      
      roll.displaySchematic();
    }
    
    UserInterface.prototype.bindHandlers = function () {
      var Utilities = new window.Utilities(), 
          EventHandler = new window.EventHandler();
      
      var materials = window.document.getElementsByClassName("schem-mat");
      for (var i = 0; i < materials.length; i++) {
        materials[i].addEventListener("mouseenter", EventHandler.handleMatMouseEnter);
        materials[i].addEventListener("mouseleave", EventHandler.handleMatMouseLeave);
      }
      for (var i = 0; i < 5; i++) {
        window.document.getElementById("roll-stat-" + i + "-param").addEventListener("click", EventHandler.handleQualifierClick);
        window.document.getElementById("roll-stat-" + i + "-val").addEventListener("change", EventHandler.handleValueChange);
      }
      window.document.getElementById("roll-tier").addEventListener("change", EventHandler.handleTierChange);
      window.document.getElementById("loadSavedSchematicBtn").addEventListener("click", function () {Utilities.showModal("LoadEngine")});
      
      var closeBtns = window.document.getElementsByClassName("modalClose");
      for (var element of closeBtns) {
        element.addEventListener("click", Utilities.closeOpenModal);
      };

      window.addEventListener("click", EventHandler.handleWindowClick);
    }
    
    UserInterface.prototype.renderAndBind = function (type) {
      UserInterface.prototype.renderRollerUI(type);
      UserInterface.prototype.renderSchematicUI(type);
      
      UserInterface.prototype.bindHandlers();
    }
    
    return UserInterface;
    
  })(window);
  
  window.UserInterface = UserInterface;
  
})(window);


var checkRollAgainstRuleset = function (array, engine) {
  //2D Array [ [qual, value], ... ] 
  for (var i = 0; i < array.length; i++) {
    var bool = eval(engine.stats[i] + array[i][0] + array[i][1]);
    if (bool === true) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

var assembleRuleset = function () {
  var array = new Array(5);
  for (var i = 0; i < array.length; i++) {
    array[i] = [document.getElementById("roll-stat-" + i + "-param").value, document.getElementById("roll-stat-" + i + "-val").value];
  }
  return array;
}

var safetyCheckForRoll = function (tier, ruleset) {
  var statTotal = 0, maximumTotal = engineConfig[tier].schemMax - 25;
  for (var i = 0; i < ruleset.length; i++) {
    statTotal += parseInt(ruleset[i][1]);
  }
  if (statTotal > maximumTotal) {
    return false;
  } else {
    return true;
  }
}

var advancedRoll = function (tier, ruleset) {
  var n = 0;
  while (true) {
    n++;
    var engine = new Engine(tier);
    if(checkRollAgainstRuleset(ruleset, engine)) {
      alert("Success! (After attempt #" + n + ")");
      engine.setRollNumber(n);
      return engine;
    }
  }
}

var advancedRollWrapper = function () {
  var ruleset = assembleRuleset(),
      tier = document.getElementById("roll-tier").value,
      button = document.querySelector(".form-group.clickable > .wa-header");
  if (safetyCheckForRoll(tier, ruleset) === false) {
    alert("ABORTING from Advanced Roll as the input values could not be generated by an engine of the selected tier.");
    return false;
  } else {
    var result = advancedRoll(tier, ruleset);
    result.displayEngine();
    return true;
  }
};












