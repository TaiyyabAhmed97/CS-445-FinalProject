class Seat{
    constructor(cid, seatnum, available)
    {
        this.cid = Seat.getcid();
        this.seatnum = seatnum;
        this.available = available;
    }
    sold()
    {
            this.available = 'sold'; 
    }
    unsold()
    {
            this.available = 'sold';
    }
    static getcid() 
    { 
        if (!this.cid) 
        { this.cid = 200; } 
        else this.cid++; 
        return this.cid; 
    } 
}
module.exports =  Seat;