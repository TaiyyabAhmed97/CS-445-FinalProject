class Theater{
    constructor(show, sections)
    {
        this.show = show;
        this.section = sections;
    }
    addShow(show)
    {
        this.show.push(show);
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
}
module.exports = Theater;