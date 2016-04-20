var mongoose = require('mongoose');
var Schema   =  mongoose.Schema;

var surveySchema = new Schema({
	question: String,
	choice: Number
}, 
{ 
	timestamps: true
});

module.exports = mongoose.model('Survey', surveySchema);