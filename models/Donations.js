class Donations{
    constructor(wid, count, patron)
    {
        this.did = Donations.getdid();
        this.wid = wid;
        this.count = count;
        this.patron_info = patron;
        this.status = 'pending';
        this.tickets = [];
    }
    static getdid()
    {
        if (!this.did) 
        { this.did = 800; } 
        else this.did++; 
        return this.did; 
    }
    addTicks(ticket)
    {
        if(this.tickets.length<this.count)
        {
            this.tickets.push(ticket)
        }
    }
    setStatus()
    {
        this.status = 'assigned';
    }
    
}
module.exports = Donations;