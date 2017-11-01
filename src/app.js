
//Dependecies
var Section = require('.././models/Section');
var Seat = require('.././models/Seat');
var Show = require('.././models/Show');
var Row = require('.././models/Row');
var Theater = require('.././models/Theater');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//express
app.use(bodyParser());
app.use(bodyParser.json());
//define theatre main object
var Theater1 = new Theater();
Theater1.show = [];
//Routes


// All Show API Endpoints

app.route('/thalia/shows')
    .get(function(req,res){
        //res.send('world');
        // send all shows array form thater object
    })
    .post(function(req,res)
    {
       console.log(req.body.show_info);
       var show1 = new Show(req.body.show_info.name,req.body.show_info.web,req.body.show_info.time,req.body.show_info.date, req.body.seating_info);
       Theater1.addShow(show1);
       res.send({"wid":Theater1.show[Theater1.show.length-1].wid});
       console.log(Theater1.show[Theater1.show.length-1].wid);
    });

app.route('/thalia/shows/:showsId')
    .put(function(req,res)
    {
      let wid = req.params.showsId;
      res.send(wid);
      // finish rest of code 
      // update theater object 
    })
    .get(function(req,res)
    {
       // use put code as example
    });

app.route('/thalia/shows/:showId/section/:secId')
    .get(function(req,res)
    {
        //populate section and row objects before starting this code
        // return seat info from res.params
    });

app.route('/thalia/shows/:showId/donations')
    .post(function(req,res)
    {
        //make patron object and use it for this
    });

app.route('/thalia/shows/:showId/donations/:donateId')
    .get(function(req,res)
    {
        //make patron object and use it for this
    });


// End Show API




//Begin Seating/Sections API endpoints
app.route('thalia/ /seating?show={wid}&section={sid}&count=[0-9]+')
    .get(function(req,res)
    {
        //make patron object and use it for this
    });

app.route('/thalia/sections')
    .get(function(req,res)
    {
        //return all sections
    });

app.route('/thalia/sections/:secId')
    .get(function(req,res)
    {
        //return section seating info
    });

//End Seating/Section API




//Begin Orders API Endpoints
app.route('/thalia/orders')
    .post(function(req,res)
    {
        //rcreate orders object and do tuff here
    })
    .get(function(req,res)
    {
       //return all orders 
    });

app.route('/thalia/orders?start_date=YYYYMMDD&end_date=YYYYMMDD')
    .get(function(req,res)
    {
        //return orders within a specifc time period.
    });

app.route('/thalia/orders/:oid')
    .get(function(req,res)
    {
        //return a specific order
    });

// End Orders API




//Begin Tickets/Reports API
app.route('/thalia/tickets/:tid')
    .get(function(req,res)
    {
        //return a specific ticket
    })
    .post(function(req,res)
    {
        //change ticket status
    });

app.route('/thalia/tickets/donations')
    .get(function(req,res)
    {
        //donate a specifc ticket(s)
    });

app.route('/thalia/tickets/reports')
    .get(function(req,res)
    {
        //return name and id of 3 specifc reports
    });

app.route('/thalia/tickets//reports/{mrid}[ ?show={wid} | ?start_date=YYYYMMDD&end_date=YYYYMMDD]')
    .get(function(req,res)
    {
        //retun what prof said in the specification
    }); 
// End Reports/Tickets API




// 1 search API
app.route('/thalia/search?topic=topicword&key=keyword')
    .get(function(req,res)
    {
        //retun what prof said in the specification
    }); 


// End all API endpoints

// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');