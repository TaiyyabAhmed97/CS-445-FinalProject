//Dependecies
var Section = require('.././models/Section');
var Seat = require('.././models/Seat');
var Show = require('.././models/Show');
var Row = require('.././models/Row');
var Order = require('.././models/Order');
var Ticket = require('.././models/Ticket');
var Patron = require('.././models/Patron');
var SectHolder = require('.././models/SectHolder');
var Theater = require('.././models/Theater');
var Donation = require('.././models/Donations');
var _ = require('underscore');
var express = require('express');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
//express
app.use(bodyParser());
app.use(bodyParser.json());
//define theatre main object
var Theater1 = new Theater();
Theater1.show = [];
Theater1.sectholders = [];
Theater1.orders = [];
Theater1.tickets = [];
Theater1.donations = [];
//Routes
//Define Theater layout and sections
//let set = new Seat(200, 'available', )

var Sections = [];
app.route('/populate/sections')
    .post(function (req, res) {

        for (let i = 0; i < req.body.length; i++) {
            let sect = new Section(req.body[i].section_name, req.body[i].seating);
            Sections.push(sect);
        }
        res.send(Sections);
    });

// All Show API Endpoints

app.route('/thalia/shows')
    .get(function (req, res) {
        if (Theater1.show.length == 0)
            res.send('Sorry, no shows yet, check back ina later time', 400);
        else {
            var arr = [];
            for (let i = 0; i < Theater1.show.length; i++) {
                arr.push(_.omit(Theater1.show[i], ["seating_info"]));
            }
            res.send(arr);
        }
    })
    .post(function (req, res) {
        let show1 = new Show(req.body.show_info, req.body.seating_info)
        Theater1.addShow(show1);
        for (var i = 0; i < show1.seating_info.length; i++) {
            let seatid = show1.seating_info[i].sid - 123;
            //console.log(seatid);
            let sect2 = new SectHolder(show1.seating_info[i].sid, show1.wid, show1.seating_info[i].price, Sections[seatid].section_name);
            sect2.getSeats(Sections[seatid].seating);
            Theater1.addSect(sect2);
        }
        res.send({
            "wid": Theater1.show[Theater1.show.length - 1].wid
        });
        //console.log(Theater1.show[Theater1.show.length-1].wid);
        // do case for error
    });

app.route('/thalia/shows/:showsId')
    .put(function (req, res) {
        let sects3 = [];
        let id = req.params.showsId - 300;
        Theater1.show[id].show_info.name = req.body.show_info.name;
        Theater1.show[id].show_info.web = req.body.show_info.web;
        Theater1.show[id].show_info.date = req.body.show_info.date;
        Theater1.show[id].show_info.time = req.body.show_info.time;
        Theater1.show[id].seating_info = req.body.seating_info;
        for (var i = 0; i < Theater1.show[id].seating_info.length; i++) {
            let seatid = Theater1.show[id].seating_info[i].sid - 123;
            let sect2 = new SectHolder(Theater1.show[id].seating_info[i].sid, Theater1.show[id].wid, Theater1.show[id].seating_info[i].price, Sections[seatid].section_name);
            sect2.getSeats(Sections[seatid].seating);
            sects3.push(sect2);
        }
        Theater1.replaceSect(sects3);
        res.send(200);
        // do case for error
    })
    .get(function (req, res) {
        let wid = req.params.showsId;
        res.send(Theater1.getShowbyID(wid));
        // do error case
    });

app.route('/thalia/shows/:showId/sections')
    .get(function (req, res) {
        let sarr = [];
        let idx = 0;
        let show = Theater1.getShowbyID(req.params.showId);
        for (let i = 0; i < show.seating_info.length; i++) {
            for (let j = 0; j < Sections.length; j++) {
                if (show.seating_info[i].sid == Sections[j].sid) {
                    let obj2 = _.omit(Sections[j], ["wid", "seating"]);
                    let price = {
                        "price": show.seating_info[i].price
                    };
                    console.log(show.seating_info[i].price);
                    let obj1 = Object.assign(obj2, price);
                    sarr.push(obj1);
                }
            }
        }
        res.send(sarr);
        //populate section and row objects before starting this code
        // return seat info from res.params
    });

app.route('/thalia/shows/:showId/sections/:secId')
    .get(function (req, res) {

        let obj1 = Theater1.show[req.params.showId - 300].getShow();
        let obj2 = Theater1.getSect(req.params.showId, req.params.secId).getsect();
        let obj3 = Object.assign(obj1, obj2);
        res.send(obj3);
    });

app.route('/thalia/shows/:showId/donations')
    .post(function (req, res) {
        //make patron object and use it for this

    });

app.route('/thalia/shows/:showId/donations/:donateId')
    .get(function (req, res) {
        //make patron object and use it for this
    });


// End Show API




//Begin Seating/Sections API endpoints
app.route('/thalia/seating')
    .get(function (req, res) {
        if (_.has(req.query, 'starting_seat_id')) {
            res.send(Theater1.getseating(req.query.show, req.query.section, req.query.count, req.query.starting_seat_id));
        } else if (_.has(req.query, 'count')) {
            res.send(Theater1.getseating(req.query.show, req.query.section, req.query.count));
        } else {
            let temprr = [];
            for (let i = 0; i < Sections.length; i++) {
                temprr.push(_.omit(Sections[i], ["seating"]));
            }
            res.send(temprr);
        }
    });
app.route('/thalia/seating/:secId')
    .get(function (req, res) {
        res.send(Sections[req.params.secId - 123]);
    });


app.route('/thalia/sections')
    .get(function (req, res) {
        let temp = [];
        for (var i = 0; i < Sections.length; i++) {
            temp.push(_.omit(Sections[i], ["seating"]));
        }
        res.send(temp);
    });

app.route('/thalia/sections/:secId')
    .get(function (req, res) {
        res.send(Sections[req.params.secId - 123]);
    });

//End Seating/Section API

//Begin Orders API Endpoints
app.route('/thalia/orders')
    .post(function (req, res) {
        //rcreate orders object and do tuff here
        let order = req.body;
        res.send(Theater1.checkOrder(order));
        //res.send(Theater.addOrder(order));

    })
    .get(function (req, res) {
        res.send(Theater1.getOrders());
    });

app.route('/thalia/orders?start_date=YYYYMMDD&end_date=YYYYMMDD')
    .get(function (req, res) {
        //return orders within a specifc time period.
    });

app.route('/thalia/orders/:oid')
    .get(function (req, res) {
        res.send(Theater1.getOrders(req.params.oid));
    });

// End Orders API




//Begin Tickets/Reports API
app.route('/thalia/tickets/:tid')
    .get(function (req, res) {
        res.send(Theater1.getTicket(req.params.tid));
    })
    .post(function (req, res) {
        for (let i = 0; i < Theater1.orders.length; i++) {
            ticks = Theater1.orders[i];
            for (let j = 0; j < ticks.tickets.length; j++) {
                if (ticks.tickets[j].tid == req.params.tid) {
                    ticks.tickets[j].status = 'used';
                    i = 100000;
                    j = i;
                }
            }
        }
        res.send(Theater1.scanTicket(req.params.tid));
    });

app.route('/thalia/tickets/donations')
    .get(function (req, res) {
        //donate a specifc ticket(s)
    });

app.route('/thalia/tickets/reports')
    .get(function (req, res) {
        //return name and id of 3 specifc reports
    });

app.route('/thalia/tickets//reports/{mrid}[ ?show={wid} | ?start_date=YYYYMMDD&end_date=YYYYMMDD]')
    .get(function (req, res) {
        //retun what prof said in the specification
    });
// End Reports/Tickets API




// 1 search API
app.route('/thalia/search?topic=topicword&key=keyword')
    .get(function (req, res) {
        //retun what prof said in the specification
    });


// End all API endpoints

// Start Server
app.listen(3000);
console.log('Api is wokring on port 3000');