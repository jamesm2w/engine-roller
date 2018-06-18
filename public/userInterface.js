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
    
    var advancedRollMetaString = function (type) {
      return `<h3 class="wa-title" style="text-align:center;">Advanced Rolling</h3>
          <div style="width: 100%; text-align: center;">
            <label for="advancedRollTier" class="wa-header">${type} Tier </label>
            <input class="wa-input" id="advancedRollTier" type="number" min="1" max="7" value="4">
          </div>
          <p style="text-transform:uppercase; font-size: 0.7em; text-align:center;">
            Warning: Running these functions can lead to the rolling algorithm running hundereds of thousands of times. 
            This can crash browser tabs on some machines.
          </p><div style="width: 100%;" class="row">`
    }
    
    var advancedRollGroup = function (obj) {
      return `<div class="form-group col-6">
              <span class="wa-header form-group-header">${obj.name}</span>
              <input class="wa-input value" id="rollStat${obj.index}Value" type="number" min="5" max="99" value="5">
              <input class="wa-input parameter unselectable" id="rollStat${obj.index}Param" type="text" value=">" 
                readonly unselectable="on" onselectstart="return false;" onmousedown="return false;">
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
        panel.style.borderColor = "var(--text-color)";
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
      modalEl.innerHTML = "";
      if (window.localStorage.length == 0) {
        modalEl.innerHTML = `<p><em style='color:darkgray;'>Nothing to see here. Save an engine first before you try to load one</em></p>`;
        return undefined;
      }

      for (var i = 0; i < window.localStorage.length; i++) {
        var currentItem = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));

        var htmlString = `<div class="form-group col-6" id="Group-${window.localStorage.key(i)}">
            <span class="wa-header form-group-header center" style="color: var(--rarity-${currentItem.config.rarity.toLowerCase()});">
            ${Schematic.getDisplayName(currentItem.type, currentItem.name)}</span>
            <span class="center" id="${window.localStorage.key(i)}">
            <span class="load-btn" onclick="EventHandler.handleLoadAction(event);">Load ${currentItem.type}</span>
            <span class="forget-btn" onclick="EventHandler.handleForgetAction(event);">Forget ${currentItem.type}</span>
        </span></div>`;
        modalEl.innerHTML += htmlString;
      }
    }
    
    UserInterface.prototype.renderAdvancedRollerUI = function (type) {
      if (typeof window.EventHandler == undefined) {
        var EventHandler = new EventHandler();
      }
      var panel = document.getElementById("advancedForm");
      panel.innerHTML = advancedRollMetaString(type);
      
      for (var i = 0; i < Object.keys(window.schematicConfig[type].stats).length; i++) {
        var currentObj = Object.keys(window.schematicConfig[type].stats)[i];
        if (currentObj == "Fuel Efficiency") {
          currentObj = "Fuel E.";
        } else if (currentObj == "Overheat Limit") {
          currentObj = "Overheat";
        }
        panel.innerHTML += advancedRollGroup({"name": currentObj, "index": i});
      }
      
      panel.innerHTML += `<div class="form-group col-6 clickable" style="text-align: center; height: 64px; vertical-align: middle;" 
              onclick="AdvancedRoller.advancedRollWrapper('${type}');">
              <span class="wa-header" style="font-size: 1em; line-height: 34px;" id="advancedRoll${type}">Roll ${type}</span>
            </div></div>`;
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
    
    UserInterface.prototype.randomRollWing = function (tier) {
      UserInterface.prototype.patchSchematicUI("Wing");
      UserInterface.prototype.renderRollerUI("Wing");
      
      var roll = new Wing(tier);
      console.log("Rolling new Tier " + tier + " Wing");

      roll.displaySchematic();
    }
    
    UserInterface.prototype.randomRollCannon = function (tier) {
      UserInterface.prototype.patchSchematicUI("Cannon");
      UserInterface.prototype.renderRollerUI("Cannon");
      
      var roll = new Cannon(tier);
      console.log("Rolling new Tier " + tier + " Cannon");

      roll.displaySchematic();
    }
    
    UserInterface.prototype.randomRollSwivel = function (tier) {
      UserInterface.prototype.patchSchematicUI("Swivel");
      UserInterface.prototype.renderRollerUI("Swivel");
      
      var roll = new Swivel(tier);
      console.log("Rolling new Tier " + tier + " Swivel");

      roll.displaySchematic();
    }
    
    UserInterface.prototype.bindHandlers = function (type) {
      if (typeof window.Utilities == undefined) {
        var Utilities = new Utilities();
      } 
      if (typeof window.EventHandler == undefined) {
        var EventHandler = new EventHandler();
      }
      
      var switchBtns = window.document.getElementsByClassName("switch-btn");
      for (var i = 0; i < switchBtns.length; i++) {
        switchBtns[i].addEventListener("click", this.switch);
      }
      
      var materials = window.document.getElementsByClassName("schem-mat");
      for (var i = 0; i < materials.length; i++) {
        materials[i].addEventListener("mouseenter", window.EventHandler.handleMatMouseEnter);
        materials[i].addEventListener("mouseleave", window.EventHandler.handleMatMouseLeave);
      }
      for (var i = 0; i < window.schematicConfig[type].stats.length; i++) {
        window.document.getElementById("rollStat" + i + "Param").addEventListener("click", window.EventHandler.handleQualifierClick);
        window.document.getElementById("rollStat" + i + "Value").addEventListener("change", window.EventHandler.handleValueChange);
      }
      window.document.getElementById("advancedRollTier").addEventListener("change", window.EventHandler.handleTierChange);
      window.document.getElementById("loadSavedSchematicBtn").addEventListener("click", function () {
        window.Utilities.showModal("LoadEngine")});
      
      var closeBtns = window.document.getElementsByClassName("modalClose");
      for (var element of closeBtns) {
        element.addEventListener("click", window.Utilities.closeOpenModal);
      };

      window.addEventListener("click", window.EventHandler.handleWindowClick);
    }
    
    UserInterface.prototype.renderAndBind = function (type) {
      UserInterface.prototype.renderRollerUI(type);
      UserInterface.prototype.renderAdvancedRollerUI(type);
      UserInterface.prototype.renderSchematicUI(type);
      UserInterface.prototype.bindHandlers(type);
    }
    
    UserInterface.prototype.switch = function (e) {
      var type = e.target.parentNode.getAttribute("id") ? e.target.parentNode.getAttribute("id"): e.target.getAttribute("id");

      
      UserInterface.prototype.renderRollerUI(type);
      UserInterface.prototype.patchSchematicUI(type);
      UserInterface.prototype.renderAdvancedRollerUI(type);
      UserInterface.prototype.renderSchematicUI(type);
      UserInterface.prototype.bindHandlers(type);
      UserInterface.prototype.resetKnowledge();
      window.loadedSchematic = undefined;
      
      
      var loadBtn = document.getElementById("saveLoadedSchematicBtn");
      loadBtn.removeEventListener("click", window.EventHandler.handleEngineSaveClick);
      loadBtn.style.cursor = "not-allowed";
      loadBtn.style.color = "darkgrey";
      loadBtn.innerHTML = "(Save Loaded Schematic)";
      
      
      var btns = document.getElementsByClassName("switch-btn");
      for (var i = 0; i< btns.length; i++) {
        var el = btns[i];
        el.classList.remove("active");
        if (el.getAttribute("id") == type) {
          el.classList.add("active");
          el.removeEventListener("click", this.switch); 
        } else {
          el.addEventListener("click", this.switch);
        }
      }
    }
    
    return UserInterface;
    
  })(window);
  
  window.UserInterface = UserInterface;
  
})(window);