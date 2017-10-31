export class Seat{
    constructor(cid, status, available)
    {
        this.cid = cid;
        this.status = status;
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