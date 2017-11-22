let Seat = require('./Seat.js');
let Row = require('./Row.js');
var _ = require('underscore');
class SectHolder{
    constructor(sid, wid, price, name, seating)
    {
        this.wid = wid;
        this.sid = sid;
        this.name = name;
        this.price = price;
        this.seating = seating;
    }
    getSeats(seats)
    {   
        this.seating = JSON.parse(JSON.stringify(seats[this.sid - 123].seating));
    }
    getsect()
    {
        return _.omit(this, ["wid"]);
    }
}
module.exports = SectHolder;