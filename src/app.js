
//Dependecies
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
    }); 


// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');