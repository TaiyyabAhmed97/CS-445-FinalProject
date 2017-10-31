
//Dependecies
var Section = require('.././models/Section');
var Seat = require('.././models/Seat');
var Show = require('.././models/Show');
var Row = require('.././models/Row');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//express
app.use(bodyParser());
app.use(bodyParser.json());

//Routes
app.route('/thalia')
    .get(function(req,res){
        res.send('world');
    })
    .post(function(req,res)
    {
       console.log(req.body.show_info);
       var show1 = new Show(req.body.show_info.name,req.body.show_info.web,req.body.show_info.time,req.body.show_info.date);
       show1.name = req.body.show_info.name;
       console.log(show1);
       res.send(req.body.show_info);
    });
    


// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');