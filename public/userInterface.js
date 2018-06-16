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
      
        if(document.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[0].innerHTML == "undefined") {
          document.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[0].classList.add("hidden");
          document.getElementById("schematicStat"+i).getElementsByClassName("stat-label")[1].classList.add("hidden");
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
        
        window.document.getElementById("schematicName").innerHTML = "Procedural " + type;
        
        for (var i = 0; i < 5; i++) {
          var stat = document.getElementById("schematicStat"+i);
          if(stat.getElementsByClassName("stat-label")[0].innerHTML == "undefined") {
            //Hide stats which aren't gonna be used in this schematic
            stat.getElementsByClassName("stat-label")[0].classList.add("hidden");
            stat.getElementsByClassName("stat-label")[1].classList.add("hidden");
            stat.getElementsByClassName("progress")[0].classList.add("hidden");
          } else {
            //Show stats which are
            stat.getElementsByClassName("stat-label")[0].classList.remove("hidden");
            stat.getElementsByClassName("stat-label")[1].classList.remove("hidden");
            stat.getElementsByClassName("progress")[0].classList.remove("hidden");
          }
        }
      }
    
    }
    
    UserInterface.prototype.renderRollerUI = function (type) {
      document.getElementById("rollerUI").innerHTML = "";
      for (var i = 1; i < 8; i++) {
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
      UserInterface.prototype.patchSchematicUI("Engine");
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