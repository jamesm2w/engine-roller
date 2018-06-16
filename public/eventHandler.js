(function(window) {
  var EventHandler = (function(window) {

    var EventHandler = function(options) {};

    EventHandler.prototype.handleWindowClick = function (e) {
      if (event.target.classList.contains("modal")) {
        window.Utilities.prototype.closeOpenModal(e);
      }
    };

    EventHandler.prototype.handleLoadAction = function (e) {
      var obj = JSON.parse(window.localStorage.getItem(e.target.parentElement.id));
      var engine = Schematic.parseJson(obj);
      engine.displaySchematic();
      window.Utilities.prototype.closeOpenModal();
    };

    EventHandler.prototype.handleForgetAction = function (e) {
      var name = e.target.parentElement.id;
      var confirmation = confirm("Are you sure you want to remove this engine? It will be lost forever.");
      if (confirmation) {
        window.localStorage.removeItem(name);
        window.Utilities.prototype.closeOpenModal();
        return true;
      } else {
        return false;
      }
    };

    EventHandler.prototype.handleEngineSaveClick = function (e) {
      if (window.loadedSchematic != undefined) {
        window.loadedSchematic.saveSchematic();
        e.target.innerHTML = "(Saved Schematic)";
        e.target.style.color =  "green";
      } else {
        alert("Tried to save an undefined engine");
      }
    };

    EventHandler.prototype.handleValueChange = function (e) {
      var value = e.target.value;
      if ( value > 99) {
        e.target.value = 99;
      } else if ( value < 5) {
        e.target.value = 5;
      }
    };

    EventHandler.prototype.handleTierChange = function (e) {
      var value = e.target.value;
      if (value > 8) {
        e.target.value = 8;
      } else if (value < 1) {
        e.target.value = 1;
      }
    };

    EventHandler.prototype.handleQualifierClick = function (e) {
      var current = e.target.value;
      e.target.value = EventHandler.prototype.incrementQualifier(current);
    };

    EventHandler.prototype.handleMatMouseEnter = function (e) {
      var el = e.target, 
          name = el.querySelector(".wa-header").innerHTML, 
          effects = window.schematicConfig[window.loadedSchematic.type].statEffects[name];
      for (var i = 0; i < effects.length; i++) {
        document.getElementById("schematicStat" + effects[i] + "Bar").style.backgroundColor = "#8bc34a";
      }
    };

    EventHandler.prototype.handleMatMouseLeave = function (e) {
      for (var i = 0; i < 5; i++) {
        document.getElementById("schematicStat" + i + "Bar").style.backgroundColor = "#668ec3";
      }
    };
    
    return EventHandler;
  })(window);

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
      module.exports = EventHandler;
    } else {
      window.EventHandler = new EventHandler();
    }

})(window);