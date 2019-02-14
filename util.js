function deg2rad(degree) {
    return degree * (Math.PI / 180);
}

function greatCircleDistance(iata1, iata2) {
    // loading coordinates for airport 1
    var depart = airports[iata1];
    var lon1 = depart["longitude"];
    var lat1 = depart["latitude"];

    // loading coordinates for airport 2
    var arrive = airports[iata2];
    var lon2 = arrive["longitude"];
    var lat2 = arrive["latitude"];

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

