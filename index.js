var express = require('express');
var mongoose = require('mongoose'),
var bodyParser = require('body-parser'),

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.render('pad');
});


var port = process.env.PORT || 8000;
app.listen(port);
