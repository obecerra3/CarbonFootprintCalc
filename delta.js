
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


function parseDetailString(detailStr) {
	// removes all spaces and splits around continuous non-space strings
	return detailStr.match(/[^ ]+/g);
}

function parseDate(detailStr) {
		
	if (!detailStr || detailStr === "") {
		return null;
	}
	
	let splitStr = parseDetailString(detailStr);
	
	let dayStr = splitStr[2];
	let monthStr = splitStr[3].toUpperCase();
	
	let day = parseInt(dayStr);
	let month = parseMonth(monthStr);
	
	let currDate = new Date();
	let year = currDate.getFullYear();
	
	let splitTime = splitStr[4].split(":");
	let hour = parseInt(splitTime[0]);
	let minute = parseInt(splitTime[1]);
	if (splitStr[5].search("PM") != -1) {
		if (hour != 12) {
			hour += 12;
		}
	} else if (hour === 12) {
		hour = 0;
	}
	
	let flightDate = new Date(year, month, day, hour, minute, 0, 0);
	if (flightDate < currDate) {
		flightDate = new Date(year + 1, month, day, hour, minute, 0, 0);
	}
	
	return flightDate;
	
};

function parseAirport(detailStr) {
	if (!detailStr || detailStr === "") {
		return null;
	}
	let splitStr = parseDetailString(detailStr);
	let airport = splitStr[splitStr.length - 1];
	return airport.substring(1, airport.length - 1);
}

function parseFlightNo(detailStr) {
	if (!detailStr || detailStr === "") {
		return null;
	}
	let splitStr = parseDetailString(detailStr);
	return splitStr[1] + " " + splitStr[2];
}

function parseAircraft(detailStr) {
	
	if (!detailStr || detailStr === "") {
		return null;
	}
	
	let splitStr = parseDetailString(detailStr);
	let aircraft = splitStr[1];
	let i = 2;
	while (i < splitStr.length && splitStr[i] != "View") {
		aircraft += " " + splitStr[i];
		i += 1;
	}
	
	return aircraft;
}

function pullFlightInfo() {

	let detailElems = $(".detailsRowItem");
	let flightAircrafts = [];
	let flightDepart = [];
	let flightArrive = [];
	let flightNos = [];
	let flightDates = [];
	detailElems.each(function(index) {
		let modIndex = index % 4;
		
		detailStr = $(this).text();
		
		if (modIndex === 0) {
			flightDates.push(parseDate(detailStr));
			flightDepart.push(parseAirport(detailStr));
		}
		
		if (modIndex === 1) {
			flightArrive.push(parseAirport(detailStr));
		}
		
		if (modIndex === 2) {
			flightNos.push(parseFlightNo(detailStr));
		}
		
		if (modIndex === 3) {
			flightAircrafts.push(parseAircraft(detailStr));
		}
		
	});

	let secLineElems = $(".secLine");
	let flightClasses = [];
	secLineElems.each(function(index) {
		
		let classes = $(this).text().split("|");
		for (var i = 0; i < classes.length; i += 1) {
			
			let flightClass = classes[i];
			
			if (flightClass.search("Main Cabin") != -1) {
				flightClasses.push(1);
			} else if (flightClass.search("Delta Comfort") != -1) {
				flightClasses.push(2);
			} else if (flightClass.search("First Class") != -1) {
				flightClasses.push(3);
			} else {
				flightClasses.push(0);
			}
			
		}
	});
	
	flights = [];
	for (i = 0; i < flightDates.length; i += 1) {
		flights.push(new FlightProfile(flightNos[i], flightDepart[i], flightArrive[i], flightDates[i], "delta", flightAircrafts[i], flightClasses[i]));
	}
	
	allFlightsCreated();
}

$(window).bind("load", pullFlightInfo);