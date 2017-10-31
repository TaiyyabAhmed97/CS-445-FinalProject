
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
       console.log(req.body);
       res.send(req.body);
    });
    


// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');