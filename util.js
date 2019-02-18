// table saving the emission factors
// rows represent the ticket class in the order of economy, economy plus,
// business, first
// cols represent the distance category in the order of long, medium, short
var emissionFactorsTable = [[0.14678, 0.16508, 0.27867],
                            [0.23484, 0.24761, null],
                            [0.42565, 0.24761, null],
                            [0.58711, 0.24761, null]];

/**
 * Converts angle in degrees to radians
 * @param   {number} degree     angle in degrees
 * @return  {number}            angle in radians
 */
function deg2rad(degree) {
    return degree * (Math.PI / 180);
}

/**
 * Converts mass in kg to lbs
 * @param   {number}    mass    mass in kg
 * @return  {number}            mass in lbs
 */
function kg2lbs(mass) {
    return mass * 2.20462262185;
}


/**
 * Calculates the great circle distance between two points, point 1 and point 2
 * @param {number} lat1 latitude of point 1 in degrees
 * @param {number} lon1 longitude of point 1 in degrees
 * @param {number} lat2 latitude of point 2 in degrees
 * @param {number} long2 longitude of point 2 in degrees
 * @return {number} great circle distane between the two points
 */
function greatCircleDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

/**
 * Categorizes the distance as long haul (>3,700 km), medium haul
 * (463-3,700 km), or short haul (<463 km)
 * @param {number} dist distance in km
 * @return {number} category of the distance
 */
function categorizeDistance(dist) {
    if (dist > 3700) {
        // long haul
        return 0;
    } else if (dist > 463) {
        // medium haul
        return 1;
    } else {
        // short haul
        return 2;
    }
}

/**
 * Calculates the carbon emission of a flight by the passenger
 * @param {flightProfile} flightProfile profile of the flight
 * @return {number} the carbon emission by the passenger in kg CO2e
 */
function emissionCalc(flightProfile) {
    var iata1 = flightProfile._depart;
    var iata2 = flightProfile._arrival;
    var aircraft = flightProfile._aircraft;
    var cabinType = flightProfile._ticketClass;

    // 1. Lookup lat/lng of start airport and end airport
    var depart = airports[iata1];
    var lon1 = depart["longitude"];
    var lat1 = depart["latitude"];
    var arrive = airports[iata2];
    var lon2 = arrive["longitude"];
    var lat2 = arrive["latitude"];

    // 2. Calculate great circle distance (km) between airports. Then add 8% to
    // account for additional flight length due to rerouting of planes, holding
    // patterns, etc
    var totalDistance = greatCircleDistance(lat1, lon1, lat2, lon2) * 1.08;

    // 3. Categorize total distance as long haul (>3,700 km), medium haul
    // (463-3,700 km), or short haul (<463 km)
    var distCategory = categorizeDistance(totalDistance);

    // 4. Lookup passenger capacity of airline model. Then multiply by 0.8 to
    // assume that the flight is 80% full
    // var numPassengers = aircrafts[""] * 0.8;
    // var numPassengers = 200 * 0.8; // Arbitrary set to 200 since no data yet

    // 5. Calculate passenger-kilometers = totalDistance * numPassengers
    // var passengerKilo = totalDistance * numPassengers;
    var passengerKilo = totalDistance;

    // 6. Use ticket class and distance category (long haul, medium haul, short
    // haul) to lookup emissions factor
    var emissionFactor = emissionFactorsTable[cabinType][distCategory];

    // 7. Multiply passenger-kilometers (passenger-km) with emissions factor
    // (kg CO2e / passenger-km) to calculate the amount of greenhouse gases
    // produced (kg CO2e)
    var greenhouseGasProduced = passengerKilo * emissionFactor;

    // 8. Multiply greenhouse gases produced (kg CO2e) by 1.9 to account for
    // radiative forcing
    return Math.round(kg2lbs(greenhouseGasProduced * 1.9));
}

