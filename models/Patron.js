class Patron{
    constructor(name, phone, email, billing_address, cc_number, cc_expiration_date)
    {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.billing_address = billing_address;
        this.cc_number = cc_number;
        this.cc_expiration_date = cc_expiration_date;
    }
}
module.exports = Patron;