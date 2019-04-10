var flights = [];

// Cameron's parseMonth Code
function parseMonth(monthStr) {
	switch (monthStr) {
		case "JAN":
			return 0;
		case "FEB":
			return 1;
		case "MAR":
			return 2;
		case "APR":
			return 3;
		case "MAY":
			return 4;
		case "JUN":
			return 5;
		case "JUL":
			return 6;
		case "AUG":
			return 7;
		case "SEP":
			return 8;
		case "OCT":
			return 9;
		case "NOV":
			return 10;
		case "DEC":
			return 11;
	}
	return -1;
}


function pull_flight_info() {

	var flight_dates = $(".flight-summary-date");
	$('.segment-times').find('span').remove()
	var flight_departures = $(".flight-block:not(.flight-block-cart").find('.segment-times');
	/*$('.flight-time-arrive').find('span').remove()
	var flight_arrivals = $(".flight-time-arrive");
	var flight_durations = $(".flight-duration");
	$('.flight-duration').find('span').remove()
	var flight_origins = $(".flight-station-origin");
	var flight_destinations = $(".flight-station-destination");*/
	$('.segment-flight-number').find('span').remove()
	var flight_numbers = $(".segment-flight-number");
	$('.segment-aircraft-type').find('span').remove()
	var flight_aircrafts = $(".segment-aircraft-type");
	var airport_codes = $(".segment-market");
	var flight_classes = $(".segment-properties");
	for (var i = 0; i < flight_numbers.length; i++) {
		// Pick up flight code
		var flight_number = $(flight_numbers[i]).text().trim();

		// Pick up depart/arrive airport codes
		var depart_code = $(airport_codes[i]).text().substring(0, 3);
		var arrive_code = $(airport_codes[i]).text().substring(7, 10);

		// Pick up flight time then parse into date object
		var date_info_container_index = $(flight_aircrafts[i]).parents('.flight-block').attr('data-trip-index') - 1;
		var date_info_container = $(flight_dates[date_info_container_index]).text();
		var date_info = date_info_container.replace(/,/g, ' ').split(/\s+/);
		var month = parseMonth(date_info[1].toUpperCase());
		var day = date_info[2];
		var year = date_info[3];

		var time_info = $(flight_departures[i]).text().toLowerCase().trim().replace(/:/g, ' ').split(/\s+/);
		if (time_info[2].charAt(0) == 'p' && parseInt(time_info[0]) != 12) {
			time_info[0] = parseInt(time_info[0]) + 12;
		}

		var hours = time_info[0];
		var minutes = time_info[1];
		var flight_date = new Date(year, month, day, hours, minutes);

		// Pick up Airline name
		var airline = "United";

		// Pick up Aircraft
		var aircraft = $(flight_aircrafts[i]).text().trim();

		// Pick up ticket class
		var ticket_class = 1;
		var flight_class = $(flight_classes[i]).children().first().text().toLowerCase();
		if (flight_class.match(/(\b)*(first)(\b)*/g)) {
			ticket_class = 3;
		} else if (flight_class.match(/(\b)*(business)(\b)*/g)) {
			ticket_class = 2;
		} else if (flight_class.match(/(\b)*(premium)(\b)*/g)) {
			ticket_class = 1;
		} else if (flight_class.match(/(\b)*(economy)(\b)*/g)) {
			ticket_class = 0;
		}

		flights.push(new FlightProfile(flight_number, depart_code, arrive_code, flight_date, airline, aircraft, ticket_class));
	}
	
	allFlightsCreated();
}
$(document).ready(pull_flight_info);