
function pull_flight_info() {

	var flight_blocks = $(".flight-block");
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
	var flights = [];
	for (var i = 0; i < 2; i++) {
		let flight_string = "Flight " + (i+1) + "\n";
		flight_string += $(flight_dates[i]).text() + "\n";
		flight_string += $(flight_departures[i]).text().trim() + " " + $(flight_arrivals[i]).text().trim() + "\n";
		flight_string += "Total Flight Time: " + $(flight_durations[i]).text() + "\n";
		flight_string += $(flight_origins[i]).text() + " to " + $(flight_destinations[i]).text() + "\n";
		flight_string += "Flight Number: " + " " + $(flight_numbers[i]).text().trim() + "\n";
		flight_string += "Flight Aircraft: " + " " + $(flight_aircrafts[i]).text().trim() + "\n";
		flights.push(flight_string);
	}
	for (var j = 0; j < flights.length; j++) {
		alert(flights[j]);
	}

}

$(document).ready(pull_flight_info);