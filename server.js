//BASE SETUP
//================

// call packages we need
var express	= require('express');	//calls the express fwk
var app		= express();		//defines our app using express
var bodyParser	= require('body-parser');

var mongoose 	= require('mongoose');
//mongoose.connect('mongodb://lsteffen:1234@localhost:27017/admin');
mongoose.connect('mongodb://lsteffen:1234@ds011248.mongolab.com:11248/lsteffen');

var Bear	= require('./app/models/bear');		//this is where the schema and model are defined, so by pointing it here I get the app pointing to it

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
router.use(function(req, res, next) {
	//do logging
	console.log('Shomething is happening here, this is the middleware speaking.');
	next(); //next() is to make sure we go to the next routes and don't get stuck here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'horray! welcome to our api!' });
});

// more routes for our API will be here

// routes that end in /bears
router.route('/bears')
	//creates a bear (POST http://<local>:<port>/api/bears)
	.post(function(req, res) {
		
		var bear = new Bear(); 		// creates a new instance of the Bear model obj
		bear.name = req.body.name;	// sets the bear name to the name comming from the request body
		
		// saves the bear and validates it for error
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
	})	

	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
			
			res.json(bears);
		});
	});

router.route('/bears/:bear_id')
	// get the bear with specific ID
	//
	.get(function(req, res){
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	.put(function(req, res) {
		
		//use the bear model to find the bear I want to change
		Bear.findById(req.params.bear_id, function(err, bear) {
				if (err)
					res.send(err);
				
				bear.name = req.body.name;	//updates the bears information
				
				//save the bear LOL
				bear.save(function(err) {
					if (err)
						res.send(err);

				res.json({ message: 'Bear updated!' });
				});
			});
	})

	// delete the bear with specific id
	
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted!' });
		});
	});


// REGISTER OUR ROUTES ---------
// all of our routes will prefix /api
app.use('/api', router);

// START SERVER
// ==================
app.listen(port);
console.log('Now serving...port '+ port);




