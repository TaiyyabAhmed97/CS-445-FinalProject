let Row = require('./Row.js');
let Ticket = require('./Ticket.js');
let Order = require('./Order.js');
var _ = require('underscore');
class Theater{
    constructor(show, sectholders, orders, tickets)
    {
        this.show = show;
        this.sectholders = sectholders;
        this.orders = orders;
        this.tickets = tickets;
    }
    checkOrder(order)
    { 
        let sectseats = this.getSect(order.wid, order.sid).seats;
        let idx = 0;
        let row = '';
        var seating = [];
        for(let i =0;i<sectseats.length;i++)
        {
            let rseats = sectseats[i].seats;
            row = sectseats[i].row;
            let row1 = new Row();
            row1.row = row;
            for(let j = 0;j<rseats.length;j++)
            {
                if(order.seats[idx].cid == rseats[j].cid &&(rseats[j].status=='available'))
                {
                    idx++;
                    if(idx==order.seats.length)
                    {
                        row1.seats = order.seats;
                        i = sectseats.length +1;
                        j = order.seats.length + 1;
                        seating.push(row1);
                    }
                }
            }
        }
        if(idx == order.seats.length)
        {
            let tickarr = [];
            let tickarr1 = [];
            let ssats = seating[0].seats;
            for(let i =0;i<ssats.length;i++)
            {
                let tick = new Ticket(this.getPrice(order.wid, order.sid, order.seats.length), 'open', order.wid, order.show_info,
                order.patron_info, order.sid, sectseats.name, ssats[i]);
                tickarr.push(tick);
                tickarr1.push(tick.tid);
                this.addTicket(tick);
            }
            let order1 = new Order(order.wid, order.show_info, this.getPrice(order.wid, order.sid, order.seats.length), order.seats.length, order.patron_info, tickarr);
            this.addOrder(order1);
            let order2 = _.omit(order1, ['tickets']);
            let retobj = Object.assign(tickarr1, order2);
            return retobj;
 

        }
    }
    getseating(wid, sid, count, starting_seat_id)
    {
        let sect = this.getSect(wid, sid);
        let section_name = sect.name;
        let sectseats = sect.seating;
        let seating = [];
        let name = '';
        if(!starting_seat_id)
        {            
            for(let i =0;i<sectseats.length;i++)
            {
                let rowseats = sectseats[i].seats;
                name = sectseats[i].row;
                seating = [];
                for(let j=0;j<rowseats.length;j++)
                {
                    if(rowseats[j].status == 'available')
                    {
                        seating.push(rowseats[j]);
                        if(seating.length==3)
                        {
                            i = 100000;
                            j = i;
                        }
                    }
                    else
                    {
                        seating = [];
                    }
                }
            }
            if(seating.length==count)
            {
            let status = 'ok';
            let show = this.getShowbyID(wid).getShow();
            let total_amount = 0;
            let sections = this.getShowbyID(wid).seating_info;
            for(let k = 0;k<sections.length;k++)
            {
                if(sections[k].sid == sid)
                {
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
            }
            else
            {
                seating = [];
                let status = 'Error '+count+' contiguous seats were not found';
                let show = this.getShowbyID(wid).getShow();
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
         else
         {
             let done = false;
            for(var i =0;i<sectseats.length;i++)
            {
                let rowseats = sectseats[i].seats;
                name = sectseats[i].row;
                seating = [];
                for(var j=0;j<rowseats.length;j++)
                {
                    if((rowseats[j].cid == starting_seat_id) || (done))
                    {
                        done = true;
                    if(rowseats[j].status == 'available')
                    {
                        seating.push(rowseats[j]);
                        if(seating.length==3)
                        {
                            i = 100000;
                            j = i;
                        }
                    }
                    else
                    {
                        seating = [];
                    }
                    }
                }
            }
            if(seating.length==3)
            {
            let status = 'ok';
            let show = this.getShowbyID(wid).getShow();
            let total_amount = 0;
            let sections = this.getShowbyID(wid).seating_info;
            for(var k = 0;k<sections.length;k++)
            {
                if(sections[k].sid == sid)
                {
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
            }
            else
            {
                seating = [];
                let status = 'Error '+count+' contiguous seats were not found';
                let show = this.getShowbyID(wid).getShow();
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
    addShow(show)
    {
        this.show.push(show);
    }
    addSect(sect)
    {
        this.sectholders.push(sect);
    }
    addOrder(order)
    {
        this.orders.push(order);
    }
    addTicket(ticket)
    {
        this.tickets.push(ticket);
    }
    getShowbyID(wid)
    {
        for(var i =0; i<this.show.length; i++)
        {
            if(wid==this.show[i].wid)
            {
               return this.show[i];
            }
            
        }
    }
    getIDbyShow(show)
    {
        for(var i =0; i<this.show.length; i++)
        {
            if(this.show[i]==show)
            {
               return this.show[i].id;
            }
            
        }
    }
    getPrice(wid, sid, count)
    {
        let sections = this.getShowbyID(wid).seating_info;
        let total_amount = 0;
        for(let k = 0;k<sections.length;k++)
        {
            if(sections[k].sid == sid)
            {
                total_amount = sections[k].price * count;
                k = sections.length + 1;
            }
        }
        return total_amount;
    }
    getSect(wid, sid)
    {
        for( var i =0;i<this.sectholders.length;i++)
        {
            //console.log(this.sectholders[i]);
            if((this.sectholders[i].wid == wid) && (this.sectholders[i].sid == sid))
            {
                return this.sectholders[i];
            }
        }
    }
    replaceSect(sect)
    {
        for(let i = this.sectholders.length-1; i--;){
            if (this.sectholders[i] === sect[0].wid) array.splice(i, 1);
        }
        for(var i =0;i<sect.length;i++)
        {
            this.addShow(sect[i]);
        }
    }

}
module.exports = Theater;