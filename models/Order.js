var moment = require('moment');
class Order{
    constructor(wid, show_info, order_amount, number_of_tickets, patron_info, tickets)
    {
        this.oid = Order.setoid();
        this.wid = wid;
        this.show_info = show_info;
        this.date_ordered = Order.setdate();
        this.order_amount = order_amount;
        this.number_of_tickets = number_of_tickets;
        this.patron_info = patron_info;
        this.tickets = tickets;
    }
    static setdate()
    {
        if (!this.date_ordered) 
        { this.date_ordered = moment().format("YYYY-MM-DD h:mm"); } 
        return this.date_ordered;
    }
    static setoid()
    {
        if (!this.sid) 
        { this.sid = 323; } 
        else this.sid++; 
        return this.sid; 
    }
}
module.exports = Order;