var express = require('express');
var app = express();
var path = require('path');
var Survey = require('./models/survey');
var cors    = require('cors');


var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use('/static', express.static(path.join(process.cwd(), 'bower_components')))

var mongoose = require('mongoose');

var dbName = 'surveyDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString, function(err){
	if(err){
		console.log(err);
	}
});



app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/surveys/:choice', function(req, res){
	Survey.where('choice', parseInt(req.params.choice))
		  .find(function(err, result){
		  	if(err) console.log(err);
		  	res.json(result);
		  });
});

app.get('/api/summary', function(req, res){
	var agg = [
		{
			$group: {
				_id: "$choice",
				total: { $sum: 1}
			}
		}
	];
	Survey.aggregate(agg, function(err, result){
			if(err) console.log(err);
			res.json(result);
	});
});

app.get('/api/count', function(req, res){
	var surveys = Survey.find().count(function(err, result){
		if(err) console.log(err);
		res.json(result);
	});
});

app.post('/api/surveys', function(req, res){
	if (!req.body) return res.sendStatus(400)

	var survey = new Survey(req.body);

	survey.save(function(err){
		if(err) {
			return res.send(err);
		}

		res.send({message: 'Survey completed'});
	});
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
  console.log('NPS Survey server listening on port ' + server.address().port);
});