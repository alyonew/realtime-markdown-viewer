var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var db = require('./config/db');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) { 
res.render('pad');
});

MongoClient.connect(db.url, function (error) {   
if (error) console.error(error); 
else console.log('mongo connected');
});

var port = process.env.PORT || 8000;
app.listen(port);


