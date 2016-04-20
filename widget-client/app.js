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


app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
  console.log('NPS Survey server listening on port ' + server.address().port);
});