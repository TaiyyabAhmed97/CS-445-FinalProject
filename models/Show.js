var _ = require('underscore');
class Show{
    constructor(show_info,seating_info)
    {
        this.wid = Show.getwid();
        this.show_info = show_info;
        this.seating_info = seating_info;
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
        return _.omit(this, ["seating_info"]);
    }

}
module.exports =  Show;