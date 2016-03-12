//BASE SETUP

// call packages we need
var express	= require('express');	//calls the express fwk
var app		= express();		//defines our app using express
var bodyParser	= require('body-parser');

var mongoose 	= require('mongoose');
mongoose.connect('mongodb://lsteffen:1234@ds011248.mongolab.com:11248/lsteffen');

var Place	= require('./app/models/place');		//this is where the schema and model are defined, so by pointing it here I get the app pointing to it

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	//set our port

// ROUTES FOR OUR API
var router = express.Router();		// gets an instance or the express Router

app.use(express.static('app/public'));

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


// REGISTER OUR ROUTES ---------
app.use('/', router);

// START SERVER
app.listen(port);
console.log('Now serving...port '+ port);
