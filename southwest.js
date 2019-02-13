var flightAirportsElems = $(".flight-segments--airport-code");
var flightNumberElems = $(".flight-segments--flight-number");
var flightDateElems = $(".flight-detail--heading-date");
var flights = [];
var lastAirport = null;

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

alert(flights.join("\n"));