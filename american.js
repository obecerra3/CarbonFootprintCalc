/**
 * classifies the ticket class into the 4 categories described in integers
 * 0: economy, 1: economy plus, 2: business, 3: first
 * @param  {string} str the ticket class
 * @return {number}     the category number of the ticket class
 */
function classifyClass(str) {
    if (str === "Basic Economy" || str === "Main Cabin") {
        return 0;
    } else if (str === "Premium Economy Flexible") {
        return 1;
    } else if (str === "Business") {
        return 2;
    } else if (str === "First Flexible") {
        return 3;
    } else {
        return 0;
    }
}

/**
 * scrapes information of the flights from the American Airline's booking
 * website and generates flightProfile instances used to populate the index.html
 */
function scan_flight_data() {
    let trip_summaries = $(".flight-details-summary");
    for (let i = 0; i < trip_summaries.length; i+=1) {
        let trip_summary = $(trip_summaries[i]);
        // Obtaining flight time information
        let time_info = $(trip_summary.find("span.flight-time.gamma.aa-strong").first()).text().trim().split('\n');
        let hr_min = time_info[0].split(":");
        let am_pm = time_info[1].trim();
        let hr = (am_pm == "PM" && Number(hr_min[0]) !== 12) ? Number(hr_min[0]) + 12 : Number(hr_min[0]);
        let min = Number(hr_min[1]);
        let time = hr.toString() + ":" + min.toString() + ":00";

        let flight_summary = $(trip_summary.find(".flight-summary"));
        // Obtaining flight date infomation
        let dates = $(flight_summary.find("h3")).text();
        let date_infos = dates.split(", ");
        let date_str = date_infos[1] + ", " + date_infos[2];
        let date = new Date(date_str + " " + time);

        // Obtaining cabin type information
        let ticketClass = classifyClass($(trip_summary.find(".cabin-type")).text().trim());

        // Obtaining destination and arrival airports of the overall flight
        let locations = flight_summary.find(".visible-phone");
        let depart = $(locations[0]).text().trim();
        let arrival = $(locations[1]).text().trim();

        let flight_selectors = trip_summary.find(".flight-info");
        if (flight_selectors.length < 1) {
            // there is no flight available
            return;
        } else if (flight_selectors.length == 1) {
            // non stop trip
            // obtaining flight number
            let flightNo = $(flight_selectors.find(".flight-numbers")).text().trim();
            // obtaining aircraft model
            let aircraft = $(flight_selectors.find(".wrapText")).text().trim();
            new FlightProfile(flightNo, depart, arrival, date, "American Airlines", aircraft, ticketClass);

        } else {
            for (let j = 0; j < flight_selectors.length; j += 1) {
                let flight = $(flight_selectors[j]);
                let locs = $(flight.children().first()).text().trim();
                // obtaining departure airport IATA code
                let depart1 = locs.substring(0, 3);
                // obtaining arrival airport IATA code
                let arrival1 = locs.substring(6, 9);
                // obtaining flight number
                let flightNo = $(flight.find(".flight-numbers")).text().trim();
                // obtaining aircraft model
                let aircraft = $(flight.find(".wrapText")).text().trim();
                new FlightProfile(flightNo, depart1, arrival1, date, "American Airlines", aircraft, ticketClass);

            }
        }

    }
	
	allFlightsCreated();
}

$(document).ready(scan_flight_data)