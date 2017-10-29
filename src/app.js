
//Dependecies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//express
app.use(bodyParser());
app.use(bodyParser.json());


//Routes
app.use('/thalia', require('./routes/thalia'));


// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');