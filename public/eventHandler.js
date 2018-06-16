var EventHandler = (function(window) {

  EventHandler.prototype.handleWindowClick = function (e) {
    if (event.target.classList.contains("modal")) {
      window.Utilities.closeOpenModal(e);
    }
  }

  var closeBtns = document.getElementsByClassName("modalClose");
  for (var element of closeBtns) {
    element.addEventListener("click", window.Utilities.closeOpenModal);
  }

  EventHandler.prototype.handleLoadAction = function (e) {
    var obj = JSON.parse(window.localStorage.getItem(e.target.parentElement.id));
    var engine = window.Schematic.parseJson(obj);
    engine.displayEngine();
    window.Utilities.closeOpenModal();
  }

  EventHandler.prototype.handleForgetAction = function (e) {
    var name = e.target.parentElement.id;
    var confirmation = confirm("Are you sure you want to remove this engine? It will be lost forever.");
    if (confirmation) {
      window.localStorage.removeItem(name);
      window.Utilities.closeOpenModal();
      return true;
    } else {
      return false;
    }
  }

  EventHandler.prototype.handleEngineSaveClick = function (e) {
    if (window.loadedEngine != undefined) {
      window.loadedEngine.saveSchematic();
      e.target.innerHTML = "(Saved Schematic)";
      e.target.style.color =  "green";
    } else {
      alert("Tried to save an undefined engine");
    }
  }
});