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
    getShowbyID(id)
    {
        for(var i =0; j=this.show.length, i<j; i++)
        {
            if(id==this.show[i].id)
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