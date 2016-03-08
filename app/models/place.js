var mongoose	= require('mongoose');
var Schema 	= mongoose.Schema;

var PlaceSchema 	= new Schema({
	name: String,
	address: String

});

module.exports	= mongoose.model('Place', PlaceSchema);
