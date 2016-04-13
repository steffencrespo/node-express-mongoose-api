// call packages we need
var express	= require('express');	//calls the express fwk

var Place	= require('../models/place');		//this is where the schema and model are defined, so by pointing it here I get the app pointing to it

// ROUTES FOR OUR API
var router = express.Router();		// gets an instance or the express Router

router.get('/', function(req, res) {
	res.sendfile(__dirname + '/app/public/index.html');
});

router.route('/places')
	.post(function(req, res) {

		var place = new Place(); 		// creates a new instance of the Place model obj
		place.name = req.body.name;	// sets the place name to the name comming from the request body
		place.address = req.body.address;

		place.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Place created!' });
		});
	})

	.get(function(req, res) {
		Place.find(function(err, places) {
			if (err)
				res.send(err);

			res.json(places);
		});
	});

router.route('/places/:place_id')
	// get the place with specific ID
	//
	.get(function(req, res){
		Place.findById(req.params.place_id, function(err, place) {
			if (err)
				res.send(err);
			res.json(place);
		});
	})

	.put(function(req, res) {

		Place.findById(req.params.place_id, function(err, place) {
				if (err)
					res.send(err);

				place.name = req.body.name;	//updates the places information

				place.save(function(err) {
					if (err)
						res.send(err);

				res.json({ message: 'Place updated!' });
				});
			});
	})

	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_id
		}, function(err, place) {
			if (err)
				res.send(err);
			debugger;
			place.id = req.body._id;

			res.json({ message: 'Successfully deleted!' });
		});
	});

	module.exports = router;
