let Seat = require('./Seat.js');
let Row = require('./Row.js');
var _ = require('underscore');
class SectHolder{
    constructor(sid, wid, name, seats)
    {
        this.wid = wid;
        this.sid = sid;
        this.name = name;
        this.seats = seats;
    }
    getSeats(seats)
    {   let rows = [];
        for(var i =0;i<seats.length;i++)
        {
            let seatsarray = [];
            for(var j = 0;j<seats[i].seats.length;j++)
            {
                let seat = new Seat(seats[i].seats[j], 'available');
                seatsarray.push(seat);
            }
            let row = new Row(seats[i].row, seatsarray);
            rows.push(row);
        }
        this.seats =  rows;
    }
    getsect()
    {
        return _.omit(this, ["wid"]);
    }
}
module.exports = SectHolder;