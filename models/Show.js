class Show{
    constructor(name, web, date, time,sections)
    {
        this.name = name;
        this.web = web;
        this.time = time;
        this.date = date;
        this.sections = sections;
        this.wid = Show.getwid();
    }
    static getwid() 
    { 
        if (!this.wid) 
        { this.wid = 300; } 
        else this.wid++; 
        return this.wid; 
    } 

}
module.exports =  Show;