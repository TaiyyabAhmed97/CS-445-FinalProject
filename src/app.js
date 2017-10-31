
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
app.route('/thalia/shows')
    .get(function(req,res){
        res.send('world');
    })
    .post(function(req,res)
    {
       console.log(req.body.show_info);
       var show1 = new Show(req.body.show_info.name,req.body.show_info.web,req.body.show_info.time,req.body.show_info.date, req.body.seating_info);
       Theater1.addShow(show1);
       res.send({"wid":Theater1.show[Theater1.show.length-1].wid});
       console.log(Theater1.show[Theater1.show.length-1].wid);
    });
//app.route('/')

    


// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');