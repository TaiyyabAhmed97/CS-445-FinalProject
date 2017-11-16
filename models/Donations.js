class Donations{
    constructor(wid, count, patron)
    {
        this.did = Donations.getdid();
        this.wid = wid;
        this.count = count;
        this.status = 'pending';
        this.tickets = null;
    }
    static getdid()
    {
        if (!this.did) 
        { this.did = 800; } 
        else this.did++; 
        return this.did; 
    }
    setTicks(tickets)
    {
        this.tickets = tickets;
    }
    setStatus()
    {
        this.status = 'assigned';
    }
    
}