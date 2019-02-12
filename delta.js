
let flightNoElems = $(".fltNumber");
let flightNos = [];

flightNoElems.each(function(index) {
	let flightNo = $(this).text();
	flightNos.push(flightNo);
});

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

function parseDate(dateStr) {
	
	if (!dateStr || dateStr === "") {
		return null;
	}
	
	let splitIndex = dateStr.search("[0-9]");
	let dayStr = dateStr.substring(splitIndex, splitIndex + 2);
	let monthStr = dateStr.substring(splitIndex + 2);
	
	let day = parseInt(dayStr);
	let month = parseMonth(monthStr);
	
	let currDate = new Date();
	let year = currDate.getFullYear();
	
	let flightDate = new Date(year, month, day, 0, 0, 0, 0);
	if (flightDate < currDate) {
		flightDate = new Date(year + 1, month, day, 0, 0, 0, 0);
	}
	
	return flightDate;
	
};

let flightDateElems = $(".tripRowDate");
let flightDates = [];
flightDateElems.each(function(index) {
	let flightDate = $(this).text();
	flightDate = parseDate(flightDate);
	if (flightDate != null) {
		flightDates.push(flightDate);
	}
});

flights = [];
for (i = 0; i < flightDates.length; i += 1) {
	flights.push(new FlightProfile(flightNos[i], flightDates[i]));
}

chrome.runtime.sendMessage({flightProfiles: flights}, function(response) {});
