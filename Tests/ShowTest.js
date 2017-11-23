var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseurl = "http://localhost:8080/thalia";
var util = require("util");
let chai = require('chai');
let chaiHttp = require('chai-http');
let Show = require('.././models/Show.js');
//let app = require('.././src/app.js');
let seating = require('.././src/seating.json');
let show1 = new Show();
show1.show_info = {"name": "King Lear",
"web": "http://www.example.com/shows/king-lear",
"date": "2017-12-05",
"time": "13:00"};
show1.seating_info = [
  {
    "sid": "123",
    "price": 600
  },
  {
    "sid": "124",
    "price": 75
  },
  {
    "sid": "125",
    "price": 60
  }
];


let show2 = new Show();
show2.show_info = {"name": "King Lear",
"web": "http://www.example.com/shows/king-lear",
"date": "2017-12-05",
"time": "13:00"};
show2.seating_info = [
  {
    "sid": "125",
    "price": 600
  },
  {
    "sid": "124",
    "price": 75
  }
];
let obj = [
  {
      "sid": 125,
      "section_name": "Front left",
      "price": 600
  },
  {
      "sid": 124,
      "section_name": "Front center",
      "price": 75
  }
];

let obj2 = {
  "wid": 300,
  "show_info": {
      "name": "King Lear",
      "web": "http://www.example.com/shows/king-lear",
      "date": "2017-12-05",
      "time": "13:00"
  },
  "sid": "123",
  "name": "Front right",
  "price": 600,
  "seating": [
      {
          "row": "1",
          "seats": [
              {
                  "cid": 200,
                  "seat": "1",
                  "status": "available"
              },
              {
                  "cid": 201,
                  "seat": "2",
                  "status": "available"
              },
              {
                  "cid": 202,
                  "seat": "3",
                  "status": "available"
              },
              {
                  "cid": 203,
                  "seat": "4",
                  "status": "available"
              }
          ]
      },
      {
          "row": "2",
          "seats": [
              {
                  "cid": 204,
                  "seat": "1",
                  "status": "available"
              },
              {
                  "cid": 205,
                  "seat": "2",
                  "status": "available"
              },
              {
                  "cid": 206,
                  "seat": "3",
                  "status": "available"
              },
              {
                  "cid": 207,
                  "seat": "4",
                  "status": "available"
              }
          ]
      },
      {
          "row": "3",
          "seats": [
              {
                  "cid": 208,
                  "seat": "1",
                  "status": "available"
              },
              {
                  "cid": 209,
                  "seat": "2",
                  "status": "available"
              },
              {
                  "cid": 210,
                  "seat": "3",
                  "status": "available"
              },
              {
                  "cid": 211,
                  "seat": "4",
                  "status": "available"
              }
          ]
      },
      {
          "row": "4",
          "seats": [
              {
                  "cid": 212,
                  "seat": "1",
                  "status": "available"
              },
              {
                  "cid": 213,
                  "seat": "2",
                  "status": "available"
              },
              {
                  "cid": 214,
                  "seat": "3",
                  "status": "available"
              },
              {
                  "cid": 215,
                  "seat": "4",
                  "status": "available"
              }
          ]
      }
  ]
};
chai.use(chaiHttp);
it('should add a SINGLE blob on /blobs POST', function(done) {
  chai.request(baseurl)
    .post('/shows')
    .send(show1)
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');
      expect(res.body).to.deep.equal({"wid":300});
      done();
    });
});
it(' on /blobs GET', function(done) {
  chai.request(baseurl)
    .get('/shows')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');
      expect(res.body).to.deep.equal([show1.getShow()]);
      done();
    });
});
it(' on /blobs PUT', function(done) {
  chai.request(baseurl)
    .put('/shows/300')
    .send(show2)
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');
      done();
    });

});
it(' on /blobs GETPUT', function(done) {
  chai.request(baseurl)
    .get('/shows/300')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');
      show2.wid = 300;
      expect(res.body).to.deep.equal(show2);
      done();
    });
});
it(' on /showsections GETPUT', function(done) {
  chai.request(baseurl)
    .get('/shows/300/sections/123')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');
      show2.wid = 300;
      expect(res.body).to.deep.equal(obj2);
      done();
    });
});

