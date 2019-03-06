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
    minutes = time.split(":")[1].replace(/\D/g,'');
    return new Date(year, monthIndex, day, hours, minutes);
}

function pullSouthwestInfo() {
    var flights = [];
    var times = [];
    var flightProfiles = [];
    var lastAirport = null;
    var flightDetailContents = $(".flight-detail-content");

    for (var i = 0; i < flightDetailContents.length; i++) {
        var flightDetailContent = $(flightDetailContents[i]);

        //find date
        var currentDate = flightDetailContent.find(".flight-detail--heading-date").text();

        var flightSegments = flightDetailContent.find(".flight-segments--segment");
        for (var j = 0; j < flightSegments.length; j++) {
            var flightSegment = $(flightSegments[j]);
            if (!lastAirport) {
                var currentTime = flightSegment.find(".time--value").text().split(" ")[1];
                var currentFlightNumber = "WN" + flightSegment.find(".flight-segments--flight-number").text();
                lastAirport = flightSegment.find(".flight-segments--airport-code").text();
            } else {
                var currentAirport = flightSegment.find(".flight-segments--airport-code").text();
                var dateString = currentDate.split(" ")[0];
                dateString += " " + currentTime;
                //(flightNo, depart, arrival, date, airline, aircraft, ticketClass)
                //1 for flight class since southwest does not offer first class/ business/ extra legroom seats.
                flightProfiles.push(new FlightProfile(currentFlightNumber, lastAirport, currentAirport, createDate(dateString), "Southwest", "No_Model_Data", 1));
                console.log(flightProfiles);
                lastAirport = null;
            }

        }

    }

}

$(document).ready(pullSouthwestInfo);
