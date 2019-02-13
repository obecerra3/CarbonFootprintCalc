

function buildFlightString(flight_date) {
    var PM = false;
    var flight_string = parseDay(flight_date.getDay()) + ", ";
    flight_string += parseMonth(flight_date.getMonth()) + " ";
    flight_string += flight_date.getDate() + ", ";
    if (flight_date.getHours() > 12) {
        PM = true;
        flight_date.setHours(parseInt(flight_date.getHours()) - 12);
    }
    flight_string += flight_date.getHours() + ":" + flight_date.getMinutes() + " ";
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
        chrome.tabs.sendMessage(tabs[0].id, {task: "united"}, function(response) {
            var flight_dates = $('.flight_date');
            var flight_containers = $('.flight_container');
            if (response != undefined) {
                $('.no_flights').hide();
                for (var i = 0; i < response.flightProfiles.length; i++) {
                    var flight_date = new Date(response.flightProfiles[i]._date);
                    $(flight_dates[i]).html(buildFlightString(flight_date));
                    $(flight_containers[i]).show();
                }
            }
        });
    });
}

$(document).ready(() => {
  buildFlights();
});