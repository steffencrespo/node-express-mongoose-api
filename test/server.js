var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe('Routing', function() {
  var url = 'http://localhost:8080/';
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    // In our tests we use the test db
    mongoose.connect("mongodb://lsteffen:1234@ds011248.mongolab.com:11248/lsteffen");
    done();
  });

  describe('Load items', function() {
    it('should return a list of items from the database', function(done) {
      request(url)
    	.get('/places')
    	.end(function(err, res) {
              if (err) {
                throw err;
              }
              // this is should.js syntax, very clear
              res.should.be.json;
              done();
            });
    });

    it('should return specific item by id', function(done){
  		var id = '56df550c9f8bb32435c33257';
      var name = 'Alaska';
  	   request(url)
  		.get('/places/'+ id)
  		.expect(200) //Status code
  		.end(function(err,res) {
  			if (err) {
  				throw err;
  			}
  			// Should.js fluent syntax applied
  			res.body.should.have.property('_id');
        res.body.should.have.property('name').which.is.equal(name);
  			done();
  		});
	});
  });
});
