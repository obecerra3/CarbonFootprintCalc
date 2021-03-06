function populateExtension(response) {
    for (var i = 0; i < response.newFlightsKey.length; i++) {
        createFlightContainer();
    }
    $('#flight_info').append('<hr />')
    createTotalEmissionContainer();
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

    $('.no_flights').hide();
    for (var i = 0; i < response.newFlightsKey.length; i++) {
        var flightProfile = response.newFlightsKey[i]
        var carbonAmt = flightProfile._carbonVal;
        totalCarbonAmt += carbonAmt;
        var flight_date = new Date(flightProfile._date);
        $(flight_dates[i]).html(buildFlightString(flight_date));
        $(flight_airports[i]).html(flightProfile._depart + " to " + flightProfile._arrival);
        $(flight_emissions[i]).html(carbonAmt + " lbs CO<sub>2</sub>e");
        $(flight_containers[i]).show();
        $(formula_distances[i]).html(flightProfile._calcSteps[0]);
        $(formula_percents[i]).html(flightProfile._calcSteps[1]);
        $(formula_emission_factors[i]).html(flightProfile._calcSteps[2]);
        $(formula_results[i]).html(flightProfile._calcSteps[3]);
    }
    $(total_emissions[0]).html(totalCarbonAmt + ' lbs CO<sub>2</sub>e');
    $(".emissions_container").click(function() {
      jQuery(this).children(".formula_container").toggle();
    });

    generalizeCarbonContexts(totalCarbonAmt);
}

function createFlightContainer() {
    $('#flight_info').append(
        '<div class="flight_container emissions_container">' +
            '<div class="flex_row">' +
              '<i class="material-icons md-18 icon material flight">airplanemode_active</i>' +
              '<div class="flex_col">' +
                '<div class="main_text flight_airport"></div>' +
                '<div class="sub_text flight_date"></div>' +
              '</div>' +
              '<div class="emissions"></div>' +
              '<i class="material-icons md-18">keyboard_arrow_down</i>' +
            '</div>' +
            '<div class ="formula_container">' +
              '<hr />' +
              '<div>Our formula relies on 3 main components.</div><br />' +
              '<div>We first have the distance our flight flies: </div><br />' +
              '<div class="formula_distance main_text"></div><br />' +
              '<div>We then add 8% on top to account for extra flight time: </div><br />' +
              '<div class="formula_percent main_text"></div><br />' +
              '<div>Finally, we use an emissions factor based on flight class and distance: </div><br />' +
              '<div class="formula_emission_factor main_text"></div><br />' +
              '<div>Now we have our calculated emissions number.</div><br />' +
              '<div class="formula_result main_text"></div><br />' +
              '<hr />' +
            '</div>' +
          '</div>');
}

function createTotalEmissionContainer() {
    $('#flight_info').append(
        '<div class="total_emissions_container emissions_container">' +
            '<div class="flex_row_non_expandable">' +
              '<i class="material-icons md-18 icon material total">account_balance</i>' +
              '<div class="flex_col">' +
                '<div class="flex_row_non_expandable">' +
                  '<div class="main_text">Total CO<sub>2</sub> emissions</div>' +
                  '<div class="total_emissions"></div>' +
                '</div>' +
                '<div class="total_emissions_equivalency sub_text">Equivalent to putting n cars on the road for a year</div>' +
              '</div>' +
              '<!--<i class="material-icons md-18 arrow_icon total_emissions_arrow">keyboard_arrow_down</i>-->' +
            '</div>' +
          '</div>');
}

function buildFlightString(flight_date) {
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

	var urls = [];
	var contentScriptArrs = chrome.runtime.getManifest().content_scripts;
	for (var i = 0; i < contentScriptArrs.length; i += 1) {
		for (var j = 0; j < contentScriptArrs[i].matches.length; j += 1) {
			var match_url = contentScriptArrs[i].matches[j];
			urls.push(match_url.substring(1, match_url.length - 1));
		}
	}

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		tabs.forEach(function(tab) {
			const url = tab.url;
			var match = false;
			urls.forEach(function(u) {
				if (url.match(u)) {
					match = true;
				}
			});
			if (match) {
				chrome.tabs.sendMessage(tab.id, {task: 'flights'}, function(response) {
                    console.log("Response received" + response);
					if (response != undefined) {
                        console.log("New flights received " + response.newFlightsKey.length);
                        populateExtension(response);
					}
				});

			} else {
                //not on airline website, get data from storage
                chrome.storage.local.get(['newFlightsKey'], function(result) {
                    console.log("Getting stored flights" + result);
                    if (result.newFlightsKey != undefined) {
                        populateExtension(result);
                    } else {
                        $("#charity_list").children().each(function() {
                            $(this).hide();
                        });
                        $("#default_charity_list").show();
                    }
                });
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

    $("#charity_list").children().each(function() {
        $(this).hide()
    })

    chrome.storage.local.get(["state"], function(result) {
        if (result != undefined) {
            $("#" + result.state + "_charity_list").show();
        } else {
            $("#default_charity_list").show();
        }
    })
}

$(document).ready(() => {
    buildFlights();
});