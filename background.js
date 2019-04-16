'use strict';

var notificationId = 'flights_loaded_notifiction_id';

chrome.runtime.onInstalled.addListener(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			console.log("Latitude: " + lat + " Longitude: " + lon);
			if (lat >= 31 && lat <= 35 && lon >= -85 && lon <= -81) {
				console.log("Saving location as GA");
				chrome.storage.local.set({'state': "ga"});
			} else {
				console.log("Saving location as Default");
				chrome.storage.local.set({'state': "default"});
			}
		});
	} else {
		console.log("Failed to obtain GPS location");
		console.log("Saving location as Default");
		chrome.storage.local.set({'state': "Default"});
	}

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.task === 'notify') {
		console.log("Displaying notification");
		var properties = {type: 'basic', title: 'Flights Detected!', iconUrl: 'images/icon48.png', buttons: [{title: 'Okay'}, {title: 'Dismiss Flights'}], message: 'Fly Aware has found flights! Open the extension to view them.', priority: 1};
		chrome.notifications.create(notificationId, properties, function(id) {});
	}
});

chrome.notifications.onClicked.addListener(function(id) {
	if (id === notificationId) {
		// not allowed to open popup programatically
	}
});

chrome.notifications.onButtonClicked.addListener(function(id, index) {
	if (id === notificationId) {
		if (index == 1) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				for (var i = 0; i < tabs.length; i += 1) {
					var tab = tabs[i];
					chrome.tabs.sendMessage(tab.id, {task: 'clear_flights'}, function(response) {
						// pass
					});
				}
			});
		}
	}
});
