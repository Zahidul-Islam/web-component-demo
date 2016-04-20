exports.getWidgetConfig = function(id){
	return {
		id: id,
		options : {
          "title":  "How likely is it you would recommend us to a friend or coworker?",
          "colors": ['red', 'orange', 'indigo'],
          "height": 400,
          "width": 800,
          "legend": { "position": 'bottom', "maxLines": 3 },
          "isStacked": true,
          "hAxis": {minValue: 0}
        },
        data: [
          {"label": "Jan", "detractors": 14, "passives": 40, "promotors": 46},
          {"label": 'Feb', "detractors": 20, "passives": 20, "promotors": 60},
          {"label": 'March', "detractors": 10, "passives": 40, "promotors": 50},
          {"label": 'April', "detractors": 30, "passives": 50, "promotors": 20},
          {"label": 'May', "detractors": 20, "passives": 30, "promotors": 50},
          {"label": 'Jun', "detractors": 5, "passives": 15, "promotors": 80}
        ]
	}
}