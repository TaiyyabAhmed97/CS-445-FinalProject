class Theater{
    constructor(show, sections, sectholders)
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
    getSect(sid, wid)
    {
        for( var i =0;i<this.sectholders.length;i++)
        {
            if((this.sectholders[i].wid === sid) && (this.sectholders[i].sid === sid))
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