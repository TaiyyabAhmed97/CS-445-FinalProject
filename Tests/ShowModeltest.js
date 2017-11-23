
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
describe('Theater.js functions', function()
{
    it('getseating()', function(){
      let Theater1 = new Theater();
      let show1 = new Show();
    });
  });