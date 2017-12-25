var objectId = require("mongodb").ObjectID;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/local";

module.exports = function(app, db) {

	app.get("/api/files", function(req, res) {
	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").find({}).toArray(function(err, files) {
	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }
	      res.send(files)
	      db.close();
	    });
	  });
	});

	app.get("/api/files/:id", function(req, res) {

	  var id = new objectId(req.params.id);
	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").findOne({
	      _id: id
	    }, function(err, file) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }
	      res.send(file);
	      db.close();
	    });
	  });
	});

	app.post("/api/files", jsonParser, function(req, res) {
	  if (!req.body) return res.sendStatus(400);

	  var fileName = req.body.body.fileName;
	  var fileData = req.body.body.fileData;
	  var file = {
	    fileName: fileName,
	    fileData: fileData
	  };

	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").insertOne(file, function(err, result) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }

	      res.send(file);
	      db.close();
	    });
	  });
	});

	app.put("/api/files", jsonParser, function(req, res) {

	  if (!req.body) return res.sendStatus(400);

	  var id = new objectId(req.body.body.id);
	  var fileName = req.body.body.fileName;
	  var fileData = req.body.body.fileData;

	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").findOneAndUpdate({
	      _id: id
	    }, {
	      $set: {
	        fileData: fileData,
	        fileName: fileName
	      }
	    }, {
	      returnOriginal: false
	    }, function(err, result) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }

	      var file = result.value;
	      console.log(file);
	      res.send(file);
	      db.close();
	    });
	  });
	});
};