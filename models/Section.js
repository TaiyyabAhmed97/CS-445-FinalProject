class Section{
    constructor(sid, name, rows, price)
    {
        this.sid = Section.getsid();
        this.name = name;
        this.rows = rows;
        this.price = price;
    }
    static getsid() 
    { 
        if (!this.sid) 
        { this.sid = 123; } 
        else this.sid++; 
        return this.sid; 
    } 
}
module.exports =  Section;