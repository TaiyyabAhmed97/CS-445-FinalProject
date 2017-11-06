class Section{
    constructor(name, seating)
    {
        this.sid = Section.getsid();
        this.section_name = name;
        this.seating = seating;
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