class OccupancyReport{
    constructor(start, end, totalsh, totalse, sold, over, shows)
    {
        this.mrid = 801;
        this.name = "Occupancy report";
        this.start_date = start;
        this.end_date = end;
        this.total_shows = totalsh;
        this.total_seats = totalse;
        this.sold_seats = sold;
        this.overall_occupancy = over;
        this.shows = shows;
    }
}
module.exports = OccupancyReport;