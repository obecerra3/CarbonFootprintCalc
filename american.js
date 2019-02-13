var trips = []

function scan_flight_data() {
    let trip_summaries = $(".flight-details-summary");
    for (let i = 0; i < trip_summaries.length; i+=1) {

        let trip_summary = $(trip_summaries[i]);
        let flight_summary = $(trip_summary.find(".flight_summary"));
        let date = $(flight_summary.find("h3")).text();
        console.log(date)
        let cabin_type = $(trip_summary.find(".cabin-type")).text();
        let locations = flight_summary.find(".visible-phone");
        let depart = $(locations[0]).text();
        console.log(depart)
        let dest = $(locations[1]).text();
        console.log(dest);
        let trip = new Trip(depart, dest, date, "American Airlines", cabin_type);

        let flight_selectors = trip_summary.find(".flight-info");
        if (flight_selectors.length < 1) {
            // there is no flight available
            return;
        } else if (flight_selectors.length == 1) {
            // non stop trip
            let flightNo = $(flight_selectors.find(".flight_number")).text();
            console.log(flightNo);
            let aircraft = $(flight_selectors.find(".wrapText")).text();
            console.log(aircraft);
            trip.addFlight(new Flight(depart, dest, flightNo, aircraft));
        } else {
            for (let j = 0; j < flight_selectors.length; j += 1) {
                let flight = $(flight_selectors[j]);
                let locs = $(flight.children().first()).text();
                console.log(locs);
                let depart1 = locs.substring(0, 4);
                console.log(depart1)
                let dest1 = locs.substring(6, 9);
                console.log(dest1)
                let flightNo = $(flight.find(".flight_number")).text();
                console.log(flightNo);
                let aircraft = $(flight.find(".wrapText")).text();
                console.log(aircraft);
                Trip.addFlight(new Flight(depart1, dest1, flightNo, aircraft));
            }
        }
        trips.push(trip);
    }
}

$(document).ready(scan_flight_data)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.task === 'getTrips') {
        sendResponse({ detectedTrips: trips})
    }
})