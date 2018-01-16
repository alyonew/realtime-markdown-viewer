const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const jsonParser = bodyParser.json();
const url = "mongodb://127.0.0.1:27017/local";
const port = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
require('./app/routes')(app, database);
app.listen(port, () => {
  console.log('Using port ' + port);
});
})