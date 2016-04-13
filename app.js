var express	= require('express');	//calls the express fwk
var app		= express();		//defines our app using express
var bodyParser	= require('body-parser');
var port = process.env.PORT || 8080;	//set our port
var mongoose 	= require('mongoose');

mongoose.connect('mongodb://lsteffen:1234@ds011248.mongolab.com:11248/lsteffen');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app/public'));

// REGISTER OUR ROUTES ---------
// app.use('/', require('./server'));
var server = require('./app/controllers/places');
app.use('/', server);

// START SERVER
app.listen(port);
console.log('Now serving...port '+ port);
