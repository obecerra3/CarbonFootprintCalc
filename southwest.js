var flightAirportsElems = $(".flight-segments--airport-code");
var flightNumberElems = $(".flight-segments--flight-number");
var flightDateElems = $(".flight-detail--heading-date");
var flightTimeElems = $(".time--value");
var flights = [];
var times = [];
var flightProfiles = [];
var lastAirport = null;

function createDate(dateString) {
    var year;
    var monthIndex;
    var day;
    var hours;
    var minutes;

    var date = dateString.split(" ")[0];
    monthIndex = date.split("/")[0] - 1;
    day = date.split("/")[1];
    year = "20" + date.split("/")[2];

    var time = dateString.split(" ")[1];
    hours = time.split(":")[0];
    if (time[time.length - 2] == "P") {
        hours += 12;
    }
    minutes = time.split(":")[1].replace(/\D/g,'');;
    return new Date(year, monthIndex, day, hours, minutes);
}

function pull_flight_info() {

    flightAirportsElems.each(function(index) {
        if (!lastAirport) {
            lastAirport = $(this).text();
        } else {
            var currentAirport = $(this).text();
            flights.push([lastAirport, currentAirport]);
            lastAirport = null;
        }
    });

    var i = 0;
    flightNumberElems.each(function(index) {
        var flightNumber = "WN" + $(this).text();
        flights[i].push(flightNumber);
        i++;
    });

    i = 0;
    flightDateElems.each(function(index) {
        flights[i].push($(this).text());
        i++;
    });

    i = 0;
    flightTimeElems.each(function(index) {
        if (i % 2 == 0) {
            var timeString = $(this).text().split(" ");
            times.push(timeString[1]);
        }
        i++;
    });

    for (i = 0; i < flights.length; i++) {
        var dateString = flights[i][3].split(" ")[0];
        dateString += " " + times[i];
        //1 for flight class since southwest does not offer first class/ business/ extra legroom seats.
        flightProfiles.push(new FlightProfile(flights[i][2], flights[i][0], flights[i][1], createDate(dateString), "Southwest", "No_Model_Data", 1));
    }

}

$(document).ready(pull_flight_info);
