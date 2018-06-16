var createRollerUI = function () {
  for (var i = 1; i < 9; i++) {
    document.getElementById("rollerUI").innerHTML += "<div class='" 
      + engineConfig[i].rarity.toLowerCase() + "-btn roll-btn' onclick='randomRollEngine(" 
      + i + ")'>" 
      + engineConfig[i].rarity + " (T" + i + ") Engine</div>";
  }
}

var randomRollEngine = function (tier) {
  var roll = new Engine(tier);
  console.log("Rolling new " + tier + " Engine");
  roll.displayEngine();
}

var resetKnowledge = function () {
  var kc = document.getElementById("schematicKnowledge");
  console.log("Reset " + kc.innerHTML + " Knowledge to 0");
  kc.innerHTML = 0;
  return true;
}

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

var buildLoaderUI = function () {
  var modalEl = document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0];
  
  if (window.localStorage.length == 0) {
    modalEl.innerHTML = "<em style='color:darkgrey;'>Nothing to see here. Save an engine first before you try to load one";
    return undefined;
  }
  
  for (var i = 0; i < window.localStorage.length; i++) {
    var currentItem = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
    
    var htmlString = '<div class="form-group col-6" id="Group-' + window.localStorage.key(i) + '"><span class="wa-header form-group-header center" style="color: var(--rarity-' + currentItem.config.rarity.toLowerCase() + ');">' + (currentItem.name[0] + " " + currentItem.name[1] + " " + currentItem.name[2] + currentItem.name[3]) + '</span><span class="center" id="' + window.localStorage.key(i) + '"><span class="load-btn" onclick="handleLoadAction(event);">Load Engine</span><span class="forget-btn" onclick="handleForgetAction(event);">Forget Engine</span></span></div>';
    console.log(htmlString);
    modalEl.innerHTML += htmlString;
  }
}










