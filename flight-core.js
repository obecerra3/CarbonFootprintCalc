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

class FlightProfile {

	constructor(flightNo, date, aircraft, departureAirportCode, arrivalAirportCode) {

		this.flightNo = flightNo;
		this.date = date;
		this.aircraft = aircraft;
		this.calcSteps = this.genCalcSteps();
		this.carbonVal = this.calcSteps[this.calcSteps.length - 1].post;
		this.departureAirportCode = departureAirportCode;
		this.arrivalAirportCode = arrivalAirportCode;

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

	set date(date) {
		this._date = date;
	}

	set aircraft(aircraft) {
		this._aircraft = aircraft;
	}

	set calcSteps(calcSteps) {
		this._calcSteps = calcSteps;
	}

	set carbonVal(carbonVal) {
		this._carbonVal = carbonVal;
	}

	set departureAirportCode(dCode) {
		this._departureAirportCode = dCode;
	}

	set arrivalAirportCode(aCode) {
		this._arrivalAirportCode = aCode;
	}

	get date() {
		return this._date;
	}

	get aircraft() {
		return this._aircraft;
	}

	get flightNo() {
		return this._flightNo;
	}

	get calcSteps() {
		return this._calcSteps;
	}

	get carbonVal() {
		return this._carbonVal;
	}

	get departureAirportCode() {
		return this._departureAirportCode;
	}

	get arrivalAirportCode() {
		return this._arrivalAirportCode;
	}


}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.task === 'flights') {
		var flights = [];
		for (let flight of newFlights) {
			flights.push(flight);
		}
		console.log("Sending new flights");
		newFlights = [];
		sendResponse({newFlights: flights});
	}
})