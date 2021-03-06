let Row = require('./Row.js');
let Ticket = require('./Ticket.js');
let Order = require('./Order.js');
let Donation = require('./Donations.js');
let OccupancyReport = require('./OccupancyReport.js');
var moment = require('moment');
var _ = require('underscore');
class Theater {
    constructor(show, sectholders, orders, tickets, donations) {
        this.show = show;
        this.sectholders = sectholders;
        this.orders = orders;
        this.tickets = tickets;
        this.donations = donations;
    }
    getOrdersBetween(start, end)
    {
        let arr = [];
        for(let  i =0;i<this.orders.length;i++)
        {
            if(moment(this.orders[i].date).isBetween(moment(start).subtract(1, 'days'), moment(end).add(1, 'days')))
            {
                console.log(this.orders[i].date);
                arr.push(this.orders[i]);
            }
        }
        return arr;
    }
    getdonation(wid, did) {
        //console.log(this.donations);
        for (let i = 0; i < this.donations.length; i++) {
            if ((this.donations[i].wid == wid) && (this.donations[i].did == did)) {
                return this.donations[i];
            }
        }
    }
    UpdateDonations(tidarr) {
        if (tidarr) {
            let donationsarr = this.donations;
            let delarr = [];
            for(let i =0;i<tidarr.length;i++)
            {
                for(let j =0;j<donationsarr.length;j++)
                {
                    if(donationsarr[j].wid == this.tickets[tidarr[i]].wid)
                    {
                        if(donationsarr[j].count>donationsarr[j].tickets.length)
                        {
                            donationsarr[j].tickets.push(this.tickets[tidarr[i]].tid);
                            this.tickets[tidarr[i]].patron_info = donationsarr[j].patron_info;
                            donationsarr[j].setStatus();
                            delarr.push(i);
                        }
                    }
                }
            }
            for(let i =0;i<delarr.length;i++)
            {
                tidarr.splice(delarr[i],1);
            }
            return tidarr;
        } else {
            return 'no donated tickets yet';
        }
    }
    scanTicket(tid) {
        for (let i = 0; i < this.tickets.length; i++) {
            if (tid == this.tickets[i].tid) {
                this.tickets[i].status = 'used';
                break;
            }
        }
        return {
            "tid": tid,
            "status": 'used'
        };
    }
    getTicket(tid) {
        for (let i = 0; i < this.tickets.length; i++) {
            if (tid == this.tickets[i].tid) {
                return this.tickets[i];
            }
        }
    }
    checkOrder(order) {
        let sectseats = this.getSect(order.wid, order.sid).seating;
        
        let idx = 0;
        let row = '';
        var seating = [];
        let iarr = [];
        let jarr = [];
        //console.log(sectseats.name);
        for (let i = 0; i < sectseats.length; i++) {
            let rseats = sectseats[i].seats;
            row = sectseats[i].row;
            let row1 = new Row();
            row1.row = row;
            for (let j = 0; j < rseats.length; j++) {
                //rseats[j].status = 'sold';
                if ((order.seats[idx].cid == rseats[j].cid) && (rseats[j].status == 'available')) {
                    //console.log(order.seats[idx]);
                    //console.log(rseats[j]);
                    iarr.push(i);
                    jarr.push(j);
                    idx++;
                    if (idx == order.seats.length) {
                        row1.seats = order.seats;
                        i = sectseats.length + 1;
                        j = order.seats.length + 1;
                        seating.push(row1);
                    }
                }
            }
        }
        if (idx == order.seats.length) {
            let i = 0;
            while (true) {
                sectseats[iarr[i]].seats[jarr[i]].status = 'sold';
                i++;
                if (i == order.seats.length) {
                    break;
                }
            }
            let tickarr = [];
            let tickarr1 = [];
            let ssats = seating[0].seats;
            for (let i = 0; i < ssats.length; i++) {
                let tick = new Ticket(this.getPrice(order.wid, order.sid, 1), 'open', order.wid, this.getShowbyID(order.wid).show_info,
                    order.patron_info, order.sid, this.getSect(order.wid, order.sid).name, ssats[i]);
                    //console.log(tick);
                let obj = {
                    "tid": tick.tid.toString(),
                    "status": 'open'
                };
                tickarr.push(obj);
                tickarr1.push(_.omit(tick, ['price', 'wid', 'show_info', 'patron_info', 'sid', 'section_name', 'seating']));
                this.tickets.push(tick);
            }
            let show = this.getShowbyID(order.wid).show_info;
            let order1 = new Order(order.wid, show,
                this.getPrice(order.wid, order.sid, order.seats.length), order.seats.length, order.patron_info, tickarr);
            this.orders.push(order1);
            let order2 = _.omit(order1, ['tickets']);
            let obj1 = {
                "tickets": tickarr1
            };
            let retobj = Object.assign(order2, obj1);
            return retobj;
        } else {
            let str = 'Sorry the requested seat(s) are not available';
            return str;
        }
    }
    getseating(wid, sid, count, starting_seat_id) {
        let sect = this.getSect(wid, sid);
        let section_name = sect.name;
        let sectseats = sect.seating;
        let seating = [];
        let name = '';
        if (!starting_seat_id) {
            for (let i = 0; i < sectseats.length; i++) {
                let rowseats = sectseats[i].seats;
                name = sectseats[i].row;
                seating = [];
                for (let j = 0; j < rowseats.length; j++) {
                    if (rowseats[j].status == 'available') {
                        seating.push(rowseats[j]);
                        if (seating.length == count) {
                            i = 100000;
                            j = i;
                        }
                    } else {
                        seating = [];
                    }
                }
            }
            if (seating.length == count) {
                let status = 'ok';
                let show = this.getShowbyID(wid).getShow().show_info;
                let total_amount = 0;
                let sections = this.getShowbyID(wid).seating_info;
                for (let k = 0; k < sections.length; k++) {
                    if (sections[k].sid == sid) {
                        total_amount = sections[k].price * count;
                        k = sections.length + 1;
                    }
                }
                starting_seat_id = seating[0].cid;
                var seta1 = {};
                seta1['row'] = name;
                seta1['seats'] = seating;
                var seta = {};
                seta['wid'] = wid;
                seta['show_info'] = show;
                seta['sid'] = sid;
                seta['section_name'] = section_name;
                seta['starting_seat_id'] = starting_seat_id;
                seta['status'] = status;
                seta['total_amount'] = total_amount;
                seta['seating'] = seta1;
                return seta;
            } else {
                seating = [];
                let status = 'Error ' + count + ' contiguous seats were not found';
                let show = this.getShowbyID(wid).getShow().show_info;
                starting_seat_id = '201';
                var seta1 = {};
                seta1['row'] = name;
                seta1['seats'] = seating;
                var seta = {};
                seta['wid'] = wid;
                seta['show_info'] = show;
                seta['sid'] = sid;
                seta['section_name'] = section_name;
                seta['starting_seat_id'] = starting_seat_id;
                seta['status'] = status;
                seta['seating'] = seating;
                return seta;
            }

        } else {
            let done = false;
            for (var i = 0; i < sectseats.length; i++) {
                let rowseats = sectseats[i].seats;
                name = sectseats[i].row;
                seating = [];
                for (var j = 0; j < rowseats.length; j++) {
                    if ((rowseats[j].cid == starting_seat_id) || (done)) {
                        done = true;
                        if (rowseats[j].status == 'available') {
                            seating.push(rowseats[j]);
                            if (seating.length == count) {
                                i = 100000;
                                j = i;
                            }
                        } else {
                            seating = [];
                        }
                    }
                }
            }
            if (seating.length == count) {
                let status = 'ok';
                let show = this.getShowbyID(wid).getShow().show_info;
                let total_amount = 0;
                let sections = this.getShowbyID(wid).seating_info;
                for (var k = 0; k < sections.length; k++) {
                    if (sections[k].sid == sid) {
                        total_amount = sections[k].price * count;
                        k = sections.length + 1;
                    }
                }
                starting_seat_id = seating[0].cid;
                var seta1 = {};
                seta1['row'] = name;
                seta1['seats'] = seating;
                var seta = {};
                seta['wid'] = wid;
                seta['show_info'] = show;
                seta['sid'] = sid;
                seta['section_name'] = section_name;
                seta['starting_seat_id'] = starting_seat_id;
                seta['status'] = status;
                seta['total_amount'] = total_amount;
                seta['seating'] = seta1;
                return seta;
            } else {
                seating = [];
                let status = 'Error ' + count + ' contiguous seats were not found';
                let show = this.getShowbyID(wid).getShow().show_info;
                starting_seat_id = '201';
                var seta1 = {};
                seta1['row'] = name;
                seta1['seats'] = seating;
                var seta = {};
                seta['wid'] = wid;
                seta['show_info'] = show;
                seta['sid'] = sid;
                seta['section_name'] = section_name;
                seta['starting_seat_id'] = starting_seat_id;
                seta['status'] = status;
                seta['seating'] = seating;
                return seta;
            }
        }


    }
    getOrders(oid) {
        if (!oid) {
            let tmparr = [];
            for (let i = 0; i < this.orders.length; i++) {
                tmparr.push(_.omit(this.orders[i], ["tickets"]));
            }
            return tmparr;
        } else {
            for (let i = 0; i < this.orders.length; i++) {
                if (oid == this.orders[i].oid) {
                    return this.orders[i];
                }
            }
        }
    }
    addShow(show) {
        this.show.push(show);
    }
    addSect(sect) {
        this.sectholders.push(sect);
    }
    addOrder(order) {
        this.orders.push(order);
    }
    addTicket(ticket) {
        this.tickets.push(ticket);
    }
    getShowbyID(wid) {
        for (var i = 0; i < this.show.length; i++) {
            if (wid == this.show[i].wid) {
                return this.show[i];
            }

        }
    }
    getIDbyShow(show) {
        for (var i = 0; i < this.show.length; i++) {
            if (this.show[i] == show) {
                return this.show[i].id;
            }

        }
    }
    getPrice(wid, sid, count) {
        let sections = this.getShowbyID(wid).seating_info;
        let total_amount = 0;
        for (let k = 0; k < sections.length; k++) {
            if (sections[k].sid == sid) {
                total_amount = sections[k].price * count;
                k = sections.length + 1;
            }
        }
        return total_amount;
    }
    getSect(wid, sid) {

        for (let i = 0; i < this.sectholders.length; i++) {
            if ((this.sectholders[i].wid == wid) && (this.sectholders[i].sid == sid)) {
                return this.sectholders[i];
            }
        }
    }
    replaceSect(sect) {
        for (let i = this.sectholders.length - 1; i--;) {
            if (this.sectholders[i] === sect[0].wid) array.splice(i, 1);
        }
        for (var i = 0; i < sect.length; i++) {
            this.addShow(sect[i]);
        }
    }
    addDonation(dona)
    {
        this.donations.push(dona);
    }
    getReport(rid, sections)
    {
        if(rid == 801)
        {
            let occreport = new OccupancyReport();
            occreport.start_date = '';
            occreport.end_date = '';
            occreport.total_shows = this.show.length;
            let seatcount = 0;
            let count = 0;
            for(let i =0;i<this.sectholders.length;i++)
            {
                let seatss = this.sectholders[i].seating;
                for(let j = 0;j<seatss.length;j++)
                {
                    for(let k = 0;k<seatss[j].seats.length;k++)
                    {
                       // console.log(this.sectholders[i].wid);
                        //console.log(seatss[j].seats[k]);
                        if(seatss[j].seats[k].status == 'sold')
                        {
                            count++;
                        }
                    }
                    seatcount = seatcount + seatss[j].seats.length;
                }

            }
            occreport.total_seats = seatcount;
            occreport.sold_seats = count;
            occreport.overall_occupancy = Number((count/seatcount) * 100).toFixed(2) + "%";
            var show1 = {};
            show1['wid'] = '';
            show1['show_info'] = '';
            show1['seats_available'] = 0;
            show1['seats_sold'] = 0;
            show1['occupancy'] = '';
            let temparr = [];
            for(let i =0;i<this.show.length;i++)
            {
                show1['wid'] = this.show[i].wid;
                show1['show_info'] = this.show[i].show_info;
                count = 0;
                seatcount = 0;
                for(let j =0;j<this.sectholders.length;j++)
                {
                    if(this.show[i].wid == this.sectholders[j].wid)
                    {
                        for(let k =0;k<this.sectholders[j].seating.length;k++)
                        {
                            for(let p =0;p<this.sectholders[j].seating[k].seats.length;p++)
                            {
                                if(this.sectholders[j].seating[k].seats[p].status == 'sold')
                                {
                                    //console.log(p);
                                    count++;
                                }
                            }
                            seatcount = seatcount + this.sectholders[j].seating[k].seats.length;
                        }
                    }
                }
                show1['seats_available'] = seatcount;
                show1['seats_sold'] = count;
                show1['occupancy'] = Number((count/seatcount) * 100).toFixed(2) + "%";
                temparr.push(JSON.parse(JSON.stringify(show1)));
            }
            occreport.shows = temparr;
            return occreport;
        }
    }

}
module.exports = Theater;