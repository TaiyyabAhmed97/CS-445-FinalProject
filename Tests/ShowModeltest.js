
var assert = require('chai').assert;
var Section = require('.././models/Section');
var Seat = require('.././models/Seat');
var Show = require('.././models/Show');
var Row = require('.././models/Row');
var Order = require('.././models/Order');
var Ticket = require('.././models/Ticket');
var Patron = require('.././models/Patron');
var SectHolder = require('.././models/SectHolder');
var Theater = require('.././models/Theater');
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var util = require("util");
let chai = require('chai');
require("blanket");
let chaiHttp = require('chai-http');
let obj = {
  "show_info": {
    "name": "King Lear",
    "web": "http://www.example.com/shows/king-lear",
    "date": "2017-12-05",
    "time": "13:00"
  },
  "seating_info": [
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
  ]
};
let obj2 = {
  "wid": 300,
  "sid": "123",
  "name": "Front right",
  "price": 60,
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
describe('Show.js functions', function()
{
    it('getwid()', function(){
      let show1 = new Show();
      show1.show_info = {"name": "King Lear",
      "web": "http://www.example.com/shows/king-lear",
      "date": "2017-12-05",
      "time": "13:00"};
      expect(show1.getShow()).to.deep.equal({"wid":302,"show_info": {
        "name": "King Lear",
        "web": "http://www.example.com/shows/king-lear",
        "date": "2017-12-05",
        "time": "13:00"
    }});
    });
});
describe('Seat.js functions', function()
{
    it('seat()', function(){
      let set = new Seat();
      set.sold();
      expect(set.status).equals('available');
    });
    it('seat1()', function(){
      let set = new Seat();
      set.unsold();
      expect(set.status).equals('available');
    });
  });

  describe('theater.js functions', function()
  {
      it('sroweat()', function(){
        let theater = new Theater();
        theater.show = [];
        theater.sectholders = [];
        theater.show.push(obj);
        theater.sectholders.push(obj2);
        expect(theater.getseating(300, 123, 3)).to.deep.equal({
          "wid": "300",
          "show_info": {
              "name": "King Lear",
              "web": "http://www.example.com/shows/king-lear",
              "date": "2017-12-05",
              "time": "13:00"
          },
          "sid": "123",
          "section_name": "Front right",
          "starting_seat_id": 200,
          "status": "ok",
          "total_amount": 180,
          "seating": {
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
                  }
              ]
          }
      })
      });
      it('row()', function(){
        let set = new Seat();
        set.unsold();
        expect(set.status).equals('available');
      });
    });