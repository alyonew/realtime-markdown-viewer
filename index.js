var express = require('express');
var mongoose = require('mongoose'),
var config = require('./config/DB');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => { console.log('Can not connect to the database'+ err)}
        );

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.render('pad');
});


var port = process.env.PORT || 8000;
app.listen(port);
