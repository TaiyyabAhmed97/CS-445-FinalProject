var _ = require('underscore');
class Show{
    constructor(name, web, date, time,sections)
    {
        this.wid = Show.getwid();
        this.name = name;
        this.web = web;
        this.time = time;
        this.date = date;
        this.sections = sections;
    }
    static getwid() 
    { 
        if (!this.wid) 
        { this.wid = 300; } 
        else this.wid++; 
        return this.wid; 
    } 
    getShow()
    {
        return _.omit(this, ["sections"]);
    }

}
module.exports =  Show;