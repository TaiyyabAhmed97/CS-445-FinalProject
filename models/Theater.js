class Theater{
    constructor(show, sectholders, orders)
    {
        this.show = show;
        this.sectholders = sectholders;
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
            console.log(this.sectholders[i]);
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