class Ticket{
    constructor(tid, price, status, wid, show, patron, sid, sname, seats)
    {
        this.tid = tid;
        this.price = price;
        this.status = status;
        this.wid = wid;
        this.show_info = show;
        this.patron_info = patron;
        this.sid = sid;
        this.section_name = sname;
        this.seating = seats;
    }
    getid()
    {
        return this.tid;
    }
}
module.exports = Ticket;