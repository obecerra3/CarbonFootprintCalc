class CarbonCalcuationStep {

	  constructor(pre, modder, op, post) {
		  this.pre = pre;
		  this.modder = modder;
		  this.op = op;
		  this.post = post;
	  }

	  set pre(pre) {
		  this._pre = pre
	  }

	  set modder(modder) {
		  this._modder = modder;
	  }

	  set op(op) {
		  this._op = op;
	  }

	  set post(post) {
		  this._post = post;
	  }

	  get pre() {
		  return this._pre;
	  }

	  get modder() {
		  return this._modder;
	  }

	  get op() {
		  return this._op;
	  }

	  get post() {
		  return this._post;
	  }

	  get strVersion() {
		  return this.pre + " " + this.op + " " + this.modder + " = " + this.post;
	  }

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
		this.calcSteps = this.genCalcSteps();
		this.carbonVal = this.calcSteps[this.calcSteps.length - 1].post;

		newFlights.push(this);
	}


	genCalcSteps() {
		let arr = new Array(1);
		arr[0] = new CarbonCalcuationStep(3, 9, '*', 27);
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

	set calcSteps(calcSteps) {
		this._calcSteps = calcSteps;
	}

	set carbonVal(carbonVal) {
		this._carbonVal = carbonVal;
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

	get calcSteps() {
		return this._calcSteps;
	}

	get carbonVal() {
		return this._carbonVal;
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
	}
});