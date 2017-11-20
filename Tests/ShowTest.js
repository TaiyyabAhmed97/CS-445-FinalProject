var should = require('should'); 
var assert = require('assert');
var request = require('supertest');
//express
app.use(bodyParser());
app.use(bodyParser.json());

describe('Routing', function() {
    var url = 'http://localhost:3000';
   
    describe('POST SHOW', function() {
      it('should return correct wid', function(done) {
        var Show = {
          
    show_info: {
        name: "King Lear",
        web: "http://www.example.com/shows/king-lear",
        date: "2017-12-05",
        time: "13:00"
      },
      seating_info: [
        {
          sid: "123",
          price: 600
        },
        {
          sid: "124",
          price: 75
        },
        {
          sid: "125",
          price: 60
        }
      ]
    };
      // once we have specified the info we want to send to the server via POST verb,
      // we need to actually perform the action on the resource, in this case we want to 
      // POST on /api/profiles and we want to send some info
      // We do this using the request object, requiring supertest!
      request(url)
      .post('/thalia/shows')
      .send(Show)
      // end handles the response
      .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.body.should.have(400);
            done();
          });
      });
      
    });
  });