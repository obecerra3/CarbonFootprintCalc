
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

var newFlights = [];
/** Class representing the profile of a flight */
class FlightProfile {
	/**
	 * Create a flight profile
	 * @param {string} 	flightNo 	the flight number
	 * @param {string}	depart 		the IATA code for departure airport
	 * @param {string} 	arrival 	the IATA code for arrival airport
	 * @param {Date} 	date 		the departure time
	 * @param {string} 	airline 	the airline name
	 * @param {string} 	aircraft 	the aircraft model
	 * @param {number}  ticketClass the ticket class
	 *                              0: economy
	 *                              1: economy plus
	 *                              2: business
	 *                              3: first
	 */
	constructor(flightNo, depart, arrival, date, airline, aircraft, ticketClass) {
		this.flightNo = flightNo;
		this.depart = depart;
		this.arrival = arrival;
		this.date = date;
		this.airline = airline;
		this.ticketClass = ticketClass;
		this.greatCircleDistance = this.calcGreatCircleDistance();
		this.emissionFactor = this.calcEmissionFactor();
		this.carbonVal = this.calcCarbonEmission();
		this.calcSteps = this.genCalcSteps();
		newFlights.push(this);
	}

	/**
 	 * Calculates the great circle distance between two points, point 1 and point 2
 	 * @return {number} great circle distane in km between the two points
 	 */
	calcGreatCircleDistance() {
		let lon1 = airports[this._depart]["longitude"];
		let lat1 = airports[this._depart]["latitude"];
		let lon2 = airports[this._arrival]["longitude"];
		let lat2 = airports[this._arrival]["latitude"];
		let R = 6371;
		let dLat = deg2rad(lat2-lat1);
    	let dLon = deg2rad(lon2-lon1);
    	let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1))
    		* Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	let d = R * c;
    	return d;
	}

	/**
 	 * Categorizes the distance as long haul (>3,700 km), medium haul
 	 * (463-3,700 km), or short haul (<463 km)
 	 * @return {number} category of the distance
 	 */
	categorizeDistance() {
		let dist = this._greatCircleDistance * 1.08;
		if (dist > 3700) { // long haul
        	return 0;
    	} else if (dist > 463) { // medium haul
        	return 1;
    	} else { // short haul
        	return 2;
    	}
	}

	/**
	 * Looks up emission factor based on distance category and ticket class
	 * @return {number} emission factor
	 */
	calcEmissionFactor() {
		let distCategory = this.categorizeDistance();
		let emissionFactorsTable = [[0.14678, 0.16508, 0.27867],
                            		[0.23484, 0.24761, 0.27867],
                            		[0.42565, 0.24761, 0.27867],
                            		[0.58711, 0.24761, 0.27867]];
        return emissionFactorsTable[this._ticketClass][distCategory];
	}

	/**
	 * Calculates the total greenhouse gas produced by the flight
	 * @return {number} total greenhouse gas produced in lbs
	 */
	calcCarbonEmission() {
		return Math.round(kg2lbs(this._greatCircleDistance * 1.08 * this._emissionFactor * 1.9));
	}

	/**
	 * Generates array that contains the steps taken for the calculation
	 * @return {String[]} steps taken for the calculation
	 */
	genCalcSteps() {
		let arr = new Array(4);
		arr[0] = String(Math.round(this._greatCircleDistance * 100) / 100) + " km";
		arr[1] = arr[0] + " * 1.08";
		arr[2] = arr[1] + " * " + String(this._emissionFactor);
		arr[3] = arr[2] + " * 1.9 = " + String(this._carbonVal) + " lbs CO<sub>2</sub>e";
		return arr;
	}

	set flightNo(flightNo) {
		this._flightNo = flightNo;
	}

	set depart(depart) {
		this._depart = depart;
	}

	set arrival(arrival) {
		this._arrival = arrival;
	}

	set date(date) {
		this._date = date;
	}

	set airline(airline) {
		this._airline = airline;
	}

	set aircraft(aircraft) {
		this._aircraft = aircraft;
	}

	set ticketClass(ticketClass) {
		this._ticketClass = ticketClass;
	}

	set greatCircleDistance(greatCircleDistance) {
		this._greatCircleDistance = greatCircleDistance;
	}

	set emissionFactor(emissionFactor) {
		this._emissionFactor = emissionFactor;
	}

	set carbonVal(carbonVal) {
		this._carbonVal = carbonVal;
	}

	set calcSteps(calcSteps) {
		this._calcSteps = calcSteps;
	}

	get flightNo() {
		return this._flightNo;
	}

	get depart() {
		return this._depart;
	}

	get arrival() {
		return this._arrival;
	}


	get date() {
		return this._date;
	}

	get aircraft() {
		return this._aircraft;
	}

	get ticketClass() {
		return this._ticketClass;
	}

	get greatCircleDistance() {
		return this._greatCircleDistance;
	}

	get emissionFactor() {
		return this._emissionFactor;
	}

	get carbonVal() {
		return this._carbonVal;
	}

	get calcSteps() {
		return this._calcSteps;
	}

}

function allFlightsCreated() {
	console.log("Notified all flights created");
	chrome.runtime.sendMessage({task: 'notify'}, function(response) {});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.task === 'flights') {
		var flights = [];
		for (let flight of newFlights) {
			flights.push(flight);
		}
		console.log(flights);
		console.log("Sending new flights");
		sendResponse({newFlightsKey: flights});
	} else if (message.task === 'clear_flights') {
		newFlights = [];
		sendResponse({farewell: 'All done'});
	}
});