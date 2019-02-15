var flights = [];

function pull_flight_info() {

	var flight_blocks = $(".cart-trip-summary");
	var flight_dates = $(".flight-summary-date");
	$('.flight-time-depart').find('span').remove()
	var flight_departures = $(".flight-time-depart");
	$('.flight-time-arrive').find('span').remove()
	var flight_arrivals = $(".flight-time-arrive");
	var flight_durations = $(".flight-duration");
	$('.flight-duration').find('span').remove()
	var flight_origins = $(".flight-station-origin");
	var flight_destinations = $(".flight-station-destination");
	$('.segment-flight-number').find('span').remove()
	var flight_numbers = $(".segment-flight-number");
	$('.segment-aircraft-type').find('span').remove()
	var flight_aircrafts = $(".segment-aircraft-type");
	var airport_codes = $(".dc-trip");
	for (var i = 0; i < flight_blocks.length; i++) {
		// Pick up flight code
		var flight_no = $(flight_numbers[i]).text().trim();

		// Pick up depart/arrive airport codes
		var depart_code = $(airport_codes[i]).text().substring(0, 3);
		var arrive_code = $(airport_codes[i]).text().substring(6, 9);

		// Pick up flight time then parse into date object
		var date_info = $(flight_dates[i]).text().toUpperCase().replace(/,/g, ' ').split(/\s+/);
		var time_info = $(flight_departures[i]).text().trim().replace(/:/g, ' ').split(/\s+/);
		var flight_date = new Date($(flight_dates[i]).text());
		if (time_info[2].charAt(0) == 'p') {
			time_info[0] = parseInt(time_info[0]) + 12;
		}
		flight_date.setHours(time_info[0]);
		flight_date.setMinutes(time_info[1]);

		// Pick up Airline name
		var airline = "United";

		// Pick up Aircraft
		var aircraft = $(flight_aircrafts[i]).text().trim();

		// Pick up ticket class
		var ticket_class = 1;

		flights.push(new FlightProfile(flight_no, depart_code, arrive_code, flight_date, airline, aircraft, ticket_class));
	}
}
$(document).ready(pull_flight_info);