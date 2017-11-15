class Ticket{
    constructor(price, status, wid, show, patron, sid, sname, seats)
    {
        this.tid = Ticket.getid();
        this.price = price;
        this.status = status;
        this.wid = wid;
        this.show_info = show;
        this.patron_info = patron;
        this.sid = sid;
        this.section_name = sname;
        this.seating = seats;
    }
    static getid()
    {
        if (!this.tid) 
        { this.tid = 700; } 
        else this.tid++; 
        return this.tid; 
    }
}
module.exports = Ticket;