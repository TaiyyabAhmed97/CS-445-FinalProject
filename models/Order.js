var moment = require('moment');
class Order{
    constructor(oid, wid, show_info, date_ordered, order_amount, number_of_tickets, patron_info)
    {
        this.oid = oid;
        this.wid = wid;
        this.show_info = show_info;
        this. date_ordered = this.getdate(date_ordered);
        this.order_amount = order_amount;
        this.number_of_tickets = number_of_tickets;
        this.patron_info = patron_info;
    }
    getdate(date_ordered)
    {
        var momentdate = moment(date_ordered);
        return momentdate;
    }
}
module.exports = Order;