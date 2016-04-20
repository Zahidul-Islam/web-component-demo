var express       = require('express'),
    cors          = require('cors'),
    app           = express(),
    widgetService = require('./data/widgetConfigHandler'),
    request       = require('request');

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.json({message: 'Welcome to widget service. Try GET: \widgets\:id url'})
});

app.get('/api/widgets/:id', function(req, res) {
	var id = req.params.id;
	console.log("widget id: ", id);

	return res.json(widgetService.getWidgetConfig(id));
});

app.get('/api/nps', function(req, res){
	request('http://localhost:5000/api/count', function(err, response, result){
		if(err) console.log(err);
		return res.json({nps: result});
	});
});

app.listen(3000, function(){
	console.log('Widget Service is listening on port 3000');
});