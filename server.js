//BASE SETUP
//================

// call packages we need
var express	= require('express');	//calls the express fwk
var app		= express();		//defines our app using express
var bodyParser	= require('body-parser');

var mongoose 	= require('mongoose');
mongoose.connect('mongodb://lsteffen:1234@ds011248.mongolab.com:11248/lsteffen');

var Place	= require('./app/models/place');		//this is where the schema and model are defined, so by pointing it here I get the app pointing to it

// configure app to use bodyParser()
// this will let us get the data from a POST
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	//set our port

// ROUTES FOR OUR API
// ==================
var router = express.Router();		// gets an instance or the express Router

//middleware to use for all requests
//router.use(function(req, res, next) {
//	//do logging
//	console.log('Shomething is happening here, this is the middleware speaking.');
//	next(); //next() is to make sure we go to the next routes and don't get stuck here
//});

app.use(express.static('app/public'));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.sendfile(__dirname + '/app/public/index.html');
});

// more routes for our API will be here

// routes that end in /places
router.route('/places')
	//creates a place (POST http://<local>:<port>/places)
	.post(function(req, res) {

		var place = new Place(); 		// creates a new instance of the Place model obj
		place.name = req.body.name;	// sets the place name to the name comming from the request body
		place.address = req.body.address;

		// saves the place and validates it for error
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

		//use the place model to find the place I want to change
		Place.findById(req.params.place_id, function(err, place) {
				if (err)
					res.send(err);

				place.name = req.body.name;	//updates the places information

				//save the place
				place.save(function(err) {
					if (err)
						res.send(err);

				res.json({ message: 'Place updated!' });
				});
			});
	})

	// delete the place with specific id

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
// all of our routes will prefix /api
app.use('/', router);

// START SERVER
// ==================
app.listen(port);
console.log('Now serving...port '+ port);
