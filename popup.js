class Charity {
	
	constructor(name, link) {
		this.name = name;
		this.link = link;
	}
	
	get name() {
		return this._name;
	}
	
	set name(value) {
		this._name = value;
	}
	
	get link() {
		return this._link;
	}
	
	set link(value) {
		this._link = value;
	}
	
}

const charities = [new Charity('Trees Atlanta', 'https://treesatlanta.org/support-us/become-a-donor/'),
					new Charity('Sierra Club', 'https://act.sierraclub.org/donate/rc_connect__campaign_designform?id=7010Z0000027DRfQAM&formcampaignid=70131000001Lm6aAAC&ddi=N18ZSCZZ63'),
					new Charity('Earth Justice', 'https://secure.earthjustice.org/site/Donation2'),
					new Charity('One Tree Planted', 'https://onetreeplanted.org/collections/where-we-plant')];

let charityDiv = document.getElementById('charityButtons');
function populateCharities(charities) {
	for (let charity of charities) {
		let button = document.createElement('button');
		button.innerHTML = charity.name
		button.addEventListener('click', function() {
			window.open(charity.link, '_blank');
		});
		charityDiv.appendChild(button);
	}
}
populateCharities(charities);