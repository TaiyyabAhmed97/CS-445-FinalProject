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
    getseating(wid, sid, count, start)
    {
        let sect = this.getSect(wid, sid);
        //return sect;
        let section_name = sect.name;
        var row = new Row();
        let sectseats = sect.seats;
        if(!start)
        {
            let seating = [];
            for(var i =0;i<sectseats.length;i++)
            {
                let rownum = sectseats[i];
                let rowseats = sectseats[i].seats;
                for(var j=0;j<rowseats.length;j++)
                {
                    if(seating.length!=count)
                    {
                        if(rowseats[j].status == 'available')
                        {
                            seating.push(rowseats[j]);
                        }
                        else
                        {
                            seating = [];
                        }
                    }
                     else
                    {
                        break;
                    }
                }
            }
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
            let obj1 = Object.assign(show, sid);
            obj1 = Object.assign(obj1, status);
            obj1 = Object.assign(obj1, total_amount);
            obj1 = Object.assign(obj1, seating);
            return obj1;
            
         }
         else
         {

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