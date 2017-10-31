import Row from './models';
export class Section{
    constructor(id, name, rows, price)
    {
        this.id = id;
        this.name = name;
        this.rows = rows;
        this.price = price;
    }
}