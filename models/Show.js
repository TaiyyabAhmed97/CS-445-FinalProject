import Section from './models';
export class Show{
    constructor(name, web, date, time,section)
    {
        this.name = name;
        this.web = web;
        this.time = time;
        this.date = date;
        this.section = section;
        this.wid = Show.getwid();
    }
    static getwid() 
    { 
        if (!this.wid) 
        { this.wid = 1; } 
        else this.wid++; 
        return this.wid; 
    } 

}