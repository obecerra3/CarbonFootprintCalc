var trips = []



function scan_flight_data() {
    let trip_summaries = $(".flight-details-summary");
    for (let i = 0; i < trip_summaries.length; i+=1) {
        let trip_summary = $(trip_summaries[i]);
        // Obtaining flight time information
        // entries in times are in the format: HH:MM AM
        let times = [];
        let time_infos = $(trip_summary.find("span.flight-time.gamma.aa-strong"));
        for (let j = 0; j < time_infos.length; j+=1) {
            let time_info = $(time_infos[j]).text().trim().split('\n');
            let time = time_info[0] + ' ' + time_info[1].trim();
            times.push(time);
        }

        let flight_summary = $(trip_summary.find(".flight-summary"));
        // Obtaining flight date infomation
        // date is formatted as "Day, Month Date, year"
        let dates = $(flight_summary.find("h3")).text();
        let date_infos = dates.split(", ");
        let date_str = date_infos[1] + ", " + date_infos[2];
        let date = new Date(date_str);
        console.log(date);

        // Obtaining cabin type information
        let cabin_type = $(trip_summary.find(".cabin-type")).text().trim();
        console.log(cabin_type);
        let locations = flight_summary.find(".visible-phone");
        let depart = $(locations[0]).text();
        console.log(depart)
        let dest = $(locations[1]).text();
        console.log(dest);

        let flight_selectors = trip_summary.find(".flight-info");
        if (flight_selectors.length < 1) {
            // there is no flight available
            return;
        } else if (flight_selectors.length == 1) {
            // non stop trip
            let flightNo = $(flight_selectors.find(".flight-numbers")).text();
            console.log(flightNo);
            let aircraft = $(flight_selectors.find(".wrapText")).text();
            console.log(aircraft);
        } else {
            for (let j = 0; j < flight_selectors.length; j += 1) {
                let flight = $(flight_selectors[j]);
                let locs = $(flight.children().first()).text().trim();
                console.log(locs);
                let depart1 = locs.substring(0, 4);
                console.log(depart1)
                let dest1 = locs.substring(6, 9);
                console.log(dest1)
                let flightNo = $(flight.find(".flight-numbers")).text().trim();
                console.log(flightNo);
                let aircraft = $(flight.find(".wrapText")).text().trim();
                console.log(aircraft);

            }
        }
        trips.push(new FlightProfile("AA DUMMY", date));

    }
}

$(document).ready(scan_flight_data)