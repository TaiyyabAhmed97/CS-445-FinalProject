class Seat{
    constructor(seatnum, available)
    {
        this.cid = Seat.getcid();
        this.seat = seatnum;
        this.status = Seat.getavail();
    }
    sold()
    {
            this.available = 'sold'; 
    }
    static getavail()
    {
        if(!this.status)
        {
            this.status = 'available';
        }
        return this.status;
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