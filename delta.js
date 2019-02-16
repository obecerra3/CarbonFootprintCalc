
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

function parseDate(dateStr, timeStr) {
		
	if (!dateStr || dateStr === "" || !timeStr || timeStr === "") {
		return null;
	}
	
	let splitIndex = dateStr.search("[0-9]");
	let dayStr = dateStr.substring(splitIndex, splitIndex + 2);
	let monthStr = dateStr.substring(splitIndex + 2);
	
	let day = parseInt(dayStr);
	let month = parseMonth(monthStr);
	
	let currDate = new Date();
	let year = currDate.getFullYear();
	
	let splitTime = timeStr.split(":")
	let hour = parseInt(splitTime[0]);
	let minute = parseInt(splitTime[1]);
	if (splitTime[1].search("PM") != -1) {
		hour += 12;
	}
	
	let flightDate = new Date(year, month, day, hour, minute, 0, 0);
	if (flightDate < currDate) {
		flightDate = new Date(year + 1, month, day, hour, minute, 0, 0);
	}
	
	return flightDate;
	
};

function pullFlightInfo() {
	let flightNoElems = $(".fltNumber");
	let flightNos = [];

	flightNoElems.each(function(index) {
		let flightNo = $(this).text();
		flightNos.push(flightNo);
	});

	let tripTimeElems = $(".tripTime");
	let flightDateElems = $(".tripRowDate");
	let flightDates = [];
	flightDateElems.each(function(index) {
		let flightDate = $(this).text();
		var flightTime = null;
		tripTimeElems.each(function(index2) {
			if (index === 0) {
				flightTime = $(this).html();
			}
		});
		flightDate = parseDate(flightDate, flightTime);
		flightDates.push(flightDate);
	});

	let detailElems = $(".detailsRowItem");
	let flightAircrafts = [];
	detailElems.each(function(index) {
		
		if ((index + 1) % 4 === 0) {
			let spans = $(this).find('span');
			spans.each(function(index2) {
				
				if (index2 === 1) {
					let aircraft = $(this).text();
					flightAircrafts.push(aircraft);
				}
				
			});
		}
	});

	let tripSummaryFlyElems = $(".tripSummeryFly");
	let flightDepart = [];
	let flightArrive = [];
	var first = true;
	tripSummaryFlyElems.each(function(index) {
		let value = $(this).html();
		if (value.length === 3) {
			if (first) {
				flightDepart.push(value);
				first = false;
			} else {
				flightArrive.push(value);
				first = true;
			}
		}
	});

	let secLineElems = $(".secLine");
	let flightClasses = [];
	secLineElems.each(function(index) {
		let flightClass = $(this).text();
		if (flightClass.search("Main Cabin") != -1) {
			flightClasses.push(1);
		} else if (flightClass.search("Delta Comfort") != -1) {
			flightClasses.push(2);
		} else if (flightClass.search("First Class") != -1) {
			flightClasses.push(3);
		} else {
			flightClasses.push(0);
		}
	});

	alert(flightNos);
	alert(flightDepart);
	alert(flightArrive);
	alert(flightDates);
	alert(flightAircrafts);
	alert(flightClasses);
	
	flights = [];
	for (i = 0; i < flightDates.length; i += 1) {
		flights.push(new FlightProfile(flightNos[i], flightDepart[i], flightArrive[i], flightDates[i], "delta", flightAircrafts[i], flightClasses[i]));
	}
}

$(document).ready(pullFlightInfo);