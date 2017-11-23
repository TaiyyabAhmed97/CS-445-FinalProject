var should = require("should");
var request = require("request");
require("blanket");
var expect = require("chai").expect;
var baseurl = "http://localhost:8080/thalia";
var util = require("util");
let chai = require('chai');
let chaiHttp = require('chai-http');
//let Show = require('.././models/Show.js');
var Section = require('.././models/Section');
var Seat = require('.././models/Seat');
var Show = require('.././models/Show');
var Row = require('.././models/Row');
var Order = require('.././models/Order');
var Ticket = require('.././models/Ticket');
var Patron = require('.././models/Patron');
var SectHolder = require('.././models/SectHolder');
var Theater = require('.././models/Theater');
var Donations = require('.././models/Donations');
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
let donation = {
  "wid": "308",
  "count": 2,
  "patron_info": {
    "name": "John Smith",
    "phone": "123-457-6890",
    "email": "john.smith@example.com",
    "billing_address": "123 Main ST, Anytown, CA 90999",
    "cc_number": "1234567890985432",
    "cc_expiration_date": "4/22"
  }
};
let donate = {
  "did": 800,
  "wid": "300",
  "count": 2,
  "status": "pending",
  "tickets": [],
  "patron_info": {
    "name": "John Smith",
    "phone": "123-457-6890",
    "email": "john.smith@example.com",
    "billing_address": "123 Main ST, Anytown, CA 90999",
    "cc_number": "1234567890985432",
    "cc_expiration_date": "4/22"
  }
};
let seatobj = {
  "wid": "300",
  "show_info": {
      "name": "King Lear",
      "web": "http://www.example.com/shows/king-lear",
      "date": "2017-12-05",
      "time": "13:00"
  },
  "sid": "124",
  "section_name": "Front center",
  "starting_seat_id": 216,
  "status": "ok",
  "total_amount": 225,
  "seating": {
      "row": "1",
      "seats": [
          {
              "cid": 216,
              "seat": "5",
              "status": "available"
          },
          {
              "cid": 217,
              "seat": "6",
              "status": "available"
          },
          {
              "cid": 218,
              "seat": "7",
              "status": "available"
          }
      ]
  }
};
let result = {
  "oid": "400",
  "wid": "300",
  "show_info": {
    "name": "King Lear",
    "web": "http://www.example.com/shows/king-lear",
    "date": "2017-12-05",
    "time": "13:00"
  },
  "date_ordered": "2017-10-28 18:24",
  "order_amount": 0,
  "tickets": ["700", "701", "702"]
};
let tickets = [{
  "tid": "700",
  "status": "open"
}, {
  "tid": "701",
  "status": "open"
}, {
  "tid": "702",
  "status": "open"
}];
let seating2 = [{
  "sid": 123,
  "section_name": "Front right"
},
{
  "sid": 124,
  "section_name": "Front center"
},
{
  "sid": 125,
  "section_name": "Front left"
},
{
  "sid": 126,
  "section_name": "Main right"
},
{
  "sid": 127,
  "section_name": "Main center"
},
{
  "sid": 128,
  "section_name": "Main left"
}
];
let specifcisect = {
  "sid": 123,
  "section_name": "Front right",
  "seating": [{
      "row": "1",
      "seats": [
        "1",
        "2",
        "3",
        "4"
      ]
    },
    {
      "row": "2",
      "seats": [
        "1",
        "2",
        "3",
        "4"
      ]
    },
    {
      "row": "3",
      "seats": [
        "1",
        "2",
        "3",
        "4"
      ]
    },
    {
      "row": "4",
      "seats": [
        "1",
        "2",
        "3",
        "4"
      ]
    }
  ]
};
let sometick =  {
  "tid": 700,
  "price": 0,
  "status": "open",
  "wid": "300",
  "show_info": {
    "name": "King Lear",
    "web": "http://www.example.com/shows/king-lear",
    "date": "2017-12-05",
    "time": "13:00"
  },
  "patron_info": {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "billing_address": "123 Main ST, Anytown, IL 45678",
    "cc_number": "1234567890987654",
    "cc_expiration_date": "12/21"
  },
  "sid": "123",
  "section_name": "Front right",
  "seating": {
      "cid": "201",
      "seat": "1"
  }
};
let tick = {
  "oid": 400,
  "wid": "300",
  "show_info": {
    "name": "King Lear",
    "web": "http://www.example.com/shows/king-lear",
    "date": "2017-12-05",
    "time": "13:00"
  },
  "date_ordered": "2017-11-22 9:17",
  "order_amount": 0,
  "number_of_tickets": 3,
  "patron_info": {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "billing_address": "123 Main ST, Anytown, IL 45678",
    "cc_number": "1234567890987654",
    "cc_expiration_date": "12/21"
  },
  "tickets": [{
    "tid": "700",
    "status": "open"
  }, {
    "tid": "701",
    "status": "open"
  }, {
    "tid": "702",
    "status": "open"
  }]
};
let order =     {
  "wid": "300",
  "sid": "123",
  "seats": [{
      "cid": "201",
      "seat": "1"
    },
    {
      "cid": "202",
      "seat": "2"
    },
    {
      "cid": "203",
      "seat": "3"
    }
  ],
  "patron_info": {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "billing_address": "123 Main ST, Anytown, IL 45678",
    "cc_number": "1234567890987654",
    "cc_expiration_date": "12/21"
  }
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

      expect(res.body).to.deep.equal(obj2);
      done();
    });
});
it(' on /donations POST', function(done) {
  chai.request(baseurl)
    .post('/shows/300/donations')
    .send(donation)
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal({"did":800});
      done();
    });
});
it(' on /donations get', function(done) {
  chai.request(baseurl)
    .get('/shows/300/donations/800')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(donate);
      done();
    });
});
it(' on /contiguous seating', function(done) {
  chai.request(baseurl)
    .get('/seating?show=300&section=124&count=3')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(seatobj);
      done();
    });
});
it(' on /get seating seections', function(done) {
  chai.request(baseurl)
    .get('/seating')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(seating2);
      done();
    });
});
it(' on /get seating specifcs', function(done) {
  chai.request(baseurl)
    .get('/seating/123')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(specifcisect);
      done();
    });
});
it(' on /POST orders', function(done) {
  chai.request(baseurl)
    .post('/orders')
    .send(order)
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body.order_amount).to.deep.equal(result.order_amount);
      done();
    });
});
it(' on /GET orders', function(done) {
  chai.request(baseurl)
    .get('/orders')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body.length).to.deep.equal([result].length);
      done();
    });
});
it(' on /GET orders within a date', function(done) {
  chai.request(baseurl)
    .get('/orders?start_date=20171122&end_date=20171123')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body.length).to.deep.equal([result].length);
      done();
    });
});

/*t(' on /GET a specific order', function(done) {
  chai.request(baseurl)
    .get('/orders/400')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(tick);
      done();
    });
});*/
it(' on /GET ticket/specific', function(done) {
  chai.request(baseurl)
    .get('/tickets/700')
    .end(function(err, res){
      res.status.should.equal(200)
      //res.body.should.equal('object');
      //res.body.should.have.property('SUCCESS');

      expect(res.body).to.deep.equal(sometick);
      done();
    });
});
