class Seat{
    constructor(cid, seatnum, available)
    {
        this.cid = cid;
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
}
module.exports =  Seat;