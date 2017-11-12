let Row = require('./Row.js');
class Theater{
    constructor(show, sectholders, orders)
    {
        this.show = show;
        this.sectholders = sectholders;
        this.orders = orders;
    }
    addOrder(order)
    {
        this.orders.push(Order);
    }
    getseating(wid, sid, count, starting_seat_id)
    {
        let sect = this.getSect(wid, sid);
        let section_name = sect.name;
        let sectseats = sect.seats;
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
            if(seating.length==3)
            {
            let status = 'ok';
            let show = this.getShowbyID(wid).getShow();
            let total_amount = 0;
            let sections = this.getShowbyID(wid).sections;
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
            let sections = this.getShowbyID(wid).sections;
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