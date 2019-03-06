

function buildFlightString(flight_date) {
	console.log(flight_date);
    var PM = false;
    var flight_string = parseDay(flight_date.getDay()) + ", ";
    flight_string += parseMonth(flight_date.getMonth()) + " ";
    flight_string += flight_date.getDate() + ", ";
	var hoursStr = "";
    if (flight_date.getHours() >= 12) {
        PM = true;
		if (flight_date.getHours() === 12) {
			hoursStr += flight_date.getHours()
		} else {
			hoursStr += flight_date.getHours() - 12;
		}
    } else if (flight_date.getHours() === 0) {
		hoursStr += 12;
	} else {
		hoursStr += flight_date.getHours();
	}
	var minutesStr = flight_date.getMinutes() + "";
	if (flight_date.getMinutes() < 10) {
		minutesStr = "0" + minutesStr;
	}
    flight_string += hoursStr + ":" + minutesStr + " ";
    if (PM) {
        flight_string += "PM";
    } else {
        flight_string += "AM";
    }
    return flight_string;
}

// Cameron's modified parseMonth code
function parseMonth(monthStr) {
    switch (monthStr) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
    return -1;
}

function parseDay(dayStr) {
    switch (dayStr) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
    return -1;
}


function buildFlights() {
    // Chrome magic
    // Queries the right tab, sends out task which is currently picked up by
    // listener in united.js, which responds with the flight data.
    // Dom then is directly manipulated using jquery of the popup.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
		chrome.tabs.sendMessage(tab.id, {task: 'flights'}, function(response) {
			console.log("New flights recieved " + response.newFlightsKey.length);
			var flight_dates = $('.flight_date');
			var flight_airports = $('.flight_airport');
			var flight_containers = $('.flight_container');
            var flight_emissions = $('.emissions');
            var total_emissions = $('.total_emissions');
            var formula_distances = $('.formula_distance');
            var formula_percents = $('.formula_percent');
            var formula_emission_factors = $('.formula_emission_factor');
            var formula_results = $('.formula_result');

            var totalCarbonAmt = 0;
			if (response != undefined) {
				$('.no_flights').hide();
				for (var i = 0; i < response.newFlightsKey.length; i++) {
					console.log(response.newFlightsKey[i]._date);
                    var calculation = emissionCalc(response.newFlightsKey[i]);
                    var carbonAmt = calculation["value"];
                    var distance = Math.round(calculation["distance"] * 100) / 100;
                    var emissionFactor = calculation["emissionFactor"];
                    totalCarbonAmt += carbonAmt;
					var flight_date = new Date(response.newFlightsKey[i]._date);
					$(flight_dates[i]).html(buildFlightString(flight_date));
					$(flight_airports[i]).html(response.newFlightsKey[i]._depart + " to " + response.newFlightsKey[i]._arrival);
                    $(flight_emissions[i]).html(carbonAmt + " lbs CO2e");
					$(flight_containers[i]).show();
                    var formula = String(distance) + " km ";
                    $(formula_distances[i]).html(formula);
                    formula += " * 1.08";
                    $(formula_percents[i]).html(formula);
                    formula += " * " + String(emissionFactor);
                    $(formula_emission_factors[i]).html(formula);
                    formula += " = " + carbonAmt + " lbs CO2e";
                    $(formula_results[i]).html(formula);
				}
                $(total_emissions[0]).html(totalCarbonAmt + " lbs CO2e");
                generalizeCarbonContexts(totalCarbonAmt);
			}
		});
	});
}

// Info taken from epa.gov
// https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
var equivalencies = [["a car on the road for ", 1.1, " miles."],
    ["", 1/10376, " cars on the road for a year."],
    ["", 57.8, " smartphones charged."]];

function generalizeCarbonContexts(totalCarbonAmt) {
    // Total Emissions Equivalency
    var equivalency_string = "Equivalent to ";
    var rand_num = Math.floor(Math.random() * 3);

    var equivalency = equivalencies[rand_num];
    equivalency_string += equivalency[0] + (totalCarbonAmt*equivalency[1]).toFixed(2) + equivalency[2];
    $(".total_emissions_equivalency").html(equivalency_string);

    // Trees Atlanta
    // 1 tree = 9,480 lbs of CO2
    $(".trees_num").html((totalCarbonAmt/9480).toFixed(2));

    // Dollar Example Charity
    // 1 dollar = 2,000 lbs of CO2
    $(".dollar_num").html((totalCarbonAmt/2000).toFixed(2));
}


$(document).ready(() => {
    buildFlights();
    $(".emissions_container").click(function() {
      jQuery(this).children(".formula_container").toggle();
    });
});