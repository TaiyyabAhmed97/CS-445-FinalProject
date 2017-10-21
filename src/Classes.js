class Theater{
    constructor(test)
    {
        this.test = test;
    }
}

class Seat{
    constructor(test)
    {
        this.test = test;
    }
}


class Section extends Seat{
    constructor(test)
    {
        super();
    }
}



class Show{
    constructor(name, web, author, cast, director, date, time)
    {
        this.name = name;
        this.web = web;
        this.author =author;
        this.cast = cast;
        this.director = director;
        this.date = date;
        this.time = time;
    }
}

class Order{
    constructor(test)
    {
        this.test = test;
    }
}

class Ticket{
    constructor(test)
    {
        this.test = test;
    }
}

class Patron{
    constructor(test)
    {
        this.test = test;
    }
}