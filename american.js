var trips = []
var flights = []
function classifyClass(str) {
    if (str === "Basic Economy" || str === "Economy") {
        return 0;
    } else if (str === "Premium Economy") {
        return 1;
    } else if (str === "Business") {
        return 2;
    } else if (str === "First") {
        return 3;
    } else {
        return 0;
    }
}
function scan_flight_data() {
    let trip_summaries = $(".flight-details-summary");
    for (let i = 0; i < trip_summaries.length; i+=1) {
        let trip_summary = $(trip_summaries[i]);
        // Obtaining flight time information
        // entries in times are in the format: HH:MM AM
        let time_info = $(trip_summary.find("span.flight-time.gamma.aa-strong").first()).text().trim().split('\n');
        console.log(time_info);
        let hr_min = time_info[0].split(":");
        let am_pm = time_info[1].trim();
        let hr = (am_pm == "PM" && Number(hr_min[0]) !== 12) ? Number(hr_min[0]) + 12 : Number(hr_min[0]);
        let min = Number(hr_min[1]);
        let time = hr.toString() + ":" + min.toString() + ":00";
        console.log(time)

        let flight_summary = $(trip_summary.find(".flight-summary"));
        // Obtaining flight date infomation
        // date is formatted as "Day, Month Date, year"
        let dates = $(flight_summary.find("h3")).text();
        let date_infos = dates.split(", ");
        let date_str = date_infos[1] + ", " + date_infos[2];
        console.log(date_str + " " + time);
        let date = new Date(date_str + " " + time);
        console.log(date);

        // Obtaining cabin type information
        let ticketClass = classifyClass($(trip_summary.find(".cabin-type")).text().trim());
        console.log("Class type: " + ticketClass);
        let locations = flight_summary.find(".visible-phone");
        let depart = $(locations[0]).text();
        // console.log(depart)
        let arrival = $(locations[1]).text();
        // console.log(dest);

        let flight_selectors = trip_summary.find(".flight-info");
        if (flight_selectors.length < 1) {
            // there is no flight available
            return;
        } else if (flight_selectors.length == 1) {
            // non stop trip
            let flightNo = $(flight_selectors.find(".flight-numbers")).text().trim();
            console.log(flightNo);
            let aircraft = $(flight_selectors.find(".wrapText")).text().trim();
            console.log(aircraft);
            new FlightProfile(flightNo, depart, arrival, date, "American Airlines", aircraft, ticketClass);

        } else {
            for (let j = 0; j < flight_selectors.length; j += 1) {
                let flight = $(flight_selectors[j]);
                let locs = $(flight.children().first()).text().trim();
                // console.log(locs);
                let depart1 = locs.substring(0, 4);
                // console.log(depart1)
                let arrival1 = locs.substring(6, 9);
                // console.log(dest1)
                let flightNo = $(flight.find(".flight-numbers")).text().trim();
                // console.log(flightNo);
                let aircraft = $(flight.find(".wrapText")).text().trim();
                // console.log(aircraft);
                new FlightProfile(flightNo, depart1, arrival1, date, "American Airlines", aircraft, ticketClass);

            }
        }

    }
}

$(document).ready(scan_flight_data)