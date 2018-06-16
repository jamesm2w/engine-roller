var engineConfig = {
  8: {
    "rarity":    "Experimental",
    "schemMax":  460,
    "knowledge": 2000,
    "colour":    "black"
  },
  7: {
    "rarity":    "Hypothetical",
    "schemMax":  375,
    "knowledge": 1240,
    "colour":    "darkgray"
  },
  6: {
    "rarity":    "Legendary",
    "schemMax":  300,
    "knowledge": 860,
    "colour":    "#E6152C"
  },
  5: {
    "rarity":    "Pristine",
    "schemMax":  235,
    "knowledge": 640,
    "colour":    "#C883F5"
  },
  4: {
    "rarity":    "Exotic",
    "schemMax":  180,
    "knowledge": 500,
    "colour":    "#FFD27D"
  },
  3: {
    "rarity":    "Rare",
    "schemMax":  135,
    "knowledge": 400,
    "colour":    "#6392F6"
  },
  2: {
    "rarity":    "Uncommon",
    "schemMax":  100,
    "knowledge": 320,
    "colour":    "#95C340"
  },
  1: {
    "rarity":    "Common",
    "schemMax":  75,
    "knowledge": 250,
    "colour":    "#FFE5C4"
  },
  "statEffects": {
    "Casing":     [0],
    "Combustion": [1, 3, 4],
    "Mechanical": [1, 3, 2],
    "Propeller":  [2, 4]
  },
  "stats": {
    "Resilience": 0,
    "Fuel Efficiency": 1,
    "Spin-Up": 2,
    "Overheat Limit": 3,
    "Power": 4
  },
  "casings": [
  //Min Tier, Name, Required Stat, Casing Type
    [1, "Piped",      "Spin-Up",        "w"],
    [1, "Squareframe","Resilience",     "w"],
    [1, "Scrapheap",  "Fuel Efficiency","m"],
    [1, "Scrapheap",  "Overheat Limit", "m"],
    [1, "Boxpile",    "Power",          "w"],   
    [2, "Spinshaft", "Spin-Up",        "w"],
    [2, "Trishell",  "Resilience",     "w"],
    [2, "Reliant",   "Fuel Efficiency","w"],
    [2, "Ventilated","Overheat Limit", "w"],
    [2, "Spark",     "Power",          "w"],  
    [3, "Dervish",   "Spin-Up",         "m"],
    [3, "Pinnacle",  "Resilience",      "m"],
    [3, "Iceberg",   "Fuel Efficiency", "m"],
    [3, "Iceberg",   "Overheat Limit",  "m"],
    [3, "Stallion",  "Power",           "m"],  
    [4, "Godfellow", "Spin-Up",         "m"],
    [4, "Apotheus",  "Resilience",      "m"],
    [4, "Sunstream", "Fuel Efficiency", "m"],
    [4, "Sunstream", "Overheat Limit",  "m"],
    [4, "Ironforge", "Power",           "m"]
  ],
  "propMounts": [ // minPower, name, requiredType, setType
    [59, "Starcaster",  "m", "j"],
    [50, "Cloudchaser", "m", "j"],
    [44, "Supreme",     "m", "p"],
    [39, "Elite",       "m", "p"],
    [34, "Hurricane",   "m", "p"],
    [29, "Tornado",     "m", "p"],
    [24, "Cyclone",     "m", "p"],
    [19, "Pacesetter",  "m", "p"],
    [14, "Rival",       "m", "p"],
    [ 9, "Populus",     "m", "p"],
    [ 0, "Steamer",     "m", "p"],
    [27, "Workhorse",   "w", "p"],
    [19, "Cranker",     "w", "p"],
    [14, "Smokie",      "w", "p"],
    [ 9, "Crudbait",    "w", "p"],
    [ 0, "Rustbucket",  "w", "p"]
  ],
  "props": [ // minSpin, name, requiredType
    [30, "Z", "j"],
    [ 0, "X", "j"],
    [58, "N", "p"],
    [48, "M", "p"],
    [40, "H", "p"],
    [31, "F", "p"],
    [25, "B", "p"],
    [20, "U", "p"],
    [15, "O", "p"],
    [10, "E", "p"],
    [ 0, "A", "p"]
  ]
}