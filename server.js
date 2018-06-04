var roller = require("./rollEngine.js");
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/engine/full/t1", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 30);
  res.send(ans);
});

app.get("/engine/full/t2", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 80);
  res.send(ans);
});

app.get("/engine/full/t3", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 130);
  res.send(ans);
});

app.get("/engine/full/t4", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 180);
  res.send(ans);
});

app.get("/engine/full/t6", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 250);
  res.send(ans);
});

app.get("/engine", (req, res) => {
  let ans = roller.rollSchematic(5, 100, 180);
  res.send(ans);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
