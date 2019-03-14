'use strict';

var notificationId = 'flights_loaded_notifiction_id';

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
