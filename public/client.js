(function(window) {
  var request = new XMLHttpRequest();
  request.open('GET', '/config/schematicConfig.json', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      window.schematicConfig = JSON.parse(this.response);
      window.UI = new window.UserInterface();
      
      window.UI.renderAndBind("Engine");
    } else {
      console.log(this.response);
    }
  };

  request.onerror = function(err) {
    console.log(err);
  };

  request.send();
  
})(window);