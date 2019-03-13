'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.delta.com'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.united.com'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.aa.com'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.southwest.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var notificationId = 'flights_loaded_notifiction_id';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.task === 'notify') {
		console.log("Displaying notification");
		var properties = {type: 'basic', title: 'Flights Detected!', iconUrl: 'images/get_started48.png', buttons: [{title: 'Okay'}, {title: 'Dismiss Flights'}], message: 'Carbon Footprint Calculator has found flights! Open the extension to view them.'}
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
