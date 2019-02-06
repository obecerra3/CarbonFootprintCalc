
function pull_flight_info() {

	var flight_blocks = $(".flight-block");
	var flights = [];

	for (int i = 0; i < flight_blocks.length; i++) {
		let flight_string = "Flight " + i + "\n";
		flight_string += $(".flight-summary-date") + "\n";
		flight_string += $(".flight-time-depart") + " " + $(".flight-time-arrive") + "\n";
		flight_string += "Total Flight Time: " + $(".flight-duration") + "\n";
		flight_string += $(".flight-station-origin") + " to " + $(".flight-station-destination") + "\n";
		flight_string += "Flight Number: " + " " + $(".segment-flight-number") + "\n";
		flight_string += "Flight Aircraft: " + " " + $(".segment-aircraft-type") + "\n";
		flights.push(flight_string);
	}


	alert(flights.join("\n"));

}

$(document).ready(pull_flight_info);