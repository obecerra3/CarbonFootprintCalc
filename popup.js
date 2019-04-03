function populateExtension(response) {
    for (var i = 0; i < response.newFlightsKey.length; i++) {
        createFlightContainer();
    }
    $('#flight_info').append('<hr />')
    createTotalEmissionContainer();
    // getLocation();
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

// function createCharity(state) {
//     for (var i = 0; i < state.length; i++) {
//         $("#charity_list").append(
//           '<a href=' + state["link"] + ' target="_blank">' +
//             '<div class="donate_button">' +
//               '<div class="flex_row">' +
//                   '<img src=' + state["img_src"] + ' class="icon image">' +
//                 '<div class="flex_col">' +
//                 state["flex_col"] +
//                 '</div>' +
//                 '<i class="material-icons md-18 arrow_icon donate_arrow">keyboard_arrow_right</i>' +
//               '</div>' +
//             '</div>' +
//           '</a>' +
//           '<br />');
//     }
// }

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
                    if (result != undefined) {
                        populateExtension(result);
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

// var georgia = [
//     {"link": "https://treesatlanta.org/",
//     "img_src": "images/trees_atlanta.jpg",
//     "flex_col": '<div class="main_text">Donate <span class="trees_num"></span> trees to Trees Atlanta </div>' +
//                 '<div class="sub_text">1 tree offsets 9,480 lbs of CO<sub>2</sub> </div>'},
//     {"link": "https://gff.givingfuel.com/georgia-forestry-foundation",
//     "img_src": "images/georgia_forestry_foundation.jpg",
//     "flex_col": '<div class="main_text">Donate $<span class="dollar_num"></span> to Georgia Forestry Foundation </div>' +
//                 '<div class="sub_text">1 dollar offsets 2,000 lbs of CO<sub>2</sub> </div>'},
//     {"link": "http://www.gufc.org/donate-to-gufc-operations-and-receive-a-tree-print-as-our-thank-you/",
//     "img_src": "images/georgia_urban_forest_council.jpg",
//     "flex_col": '<div class="main_text">Donate $<span class="dollar_num"></span> to Georgia Urban Forest Council </div>' +
//                 '<div class="sub_text">1 dollar offsets 2,000 lbs of CO<sub>2</sub> </div>'}
//     ];

// var other_state = [
//     {"link": "https://treesatlanta.org/",
//     "img_src": "images/trees_atlanta.jpg",
//     "flex_col": '<div class="main_text">Donate <span class="trees_num"></span> trees to Trees Atlanta </div>' +
//                 '<div class="sub_text">1 tree offsets 9,480 lbs of CO<sub>2</sub> </div>'},
//     {"link": "https://treesatlanta.org/",
//     "img_src": "images/trees_atlanta.jpg",
//     "flex_col": '<div class="main_text">Donate <span class="trees_num"></span> trees to Trees Atlanta </div>' +
//                 '<div class="sub_text">1 tree offsets 9,480 lbs of CO<sub>2</sub> </div>'}
//     ];


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

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(classifyState);
//     } else {
//         console.log("location unavailable");
//         createCharity(other_state);

//     }
// }
// function classifyState(position) {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
//     console.log("Latitude: " + lat + " Longitude: " + lon);
//     if (lat >= 31 && lat <= 35 && lon >= - 85 && lon <= -81) {
//         createCharity(georgia);
//     } else {
//         createCharity(other_state);
//     }

// }

$(document).ready(() => {
    buildFlights();
});