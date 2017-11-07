var moment = require('moment');
class Order{
    constructor(oid, wid, show_info, order_amount, number_of_tickets, patron_info)
    {
        this.oid = Order.setoid();
        this.wid = wid;
        this.show_info = show_info;
        this.date_ordered = Order.setdate();
        this.order_amount = Order.setamount(order_amount);
        this.number_of_tickets = Order.setnum();
        this.patron_info = patron_info;
    }
    setdate()
    {
        if (!this.date_ordered) 
        { this.date_ordered = moment().format("YYYY-MM-DD h:mm"); } 
        return this.date_ordered;
    }
    static setoid()
    {
        if (!this.sid) 
        { this.sid = 123; } 
        else this.sid++; 
        return this.sid; 
    }
    setamount(orders)
    {
        
    }
    setnum()
    {

    }
}
module.exports = Order;