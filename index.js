var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://127.0.0.1:27017/local";
var port = process.env.PORT || 8000;


app.use(express.static(__dirname + '/public'));



mongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('Using port ' + port);
  });               
})