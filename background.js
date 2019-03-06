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
        pageUrl: {urlContains: 'www.aa.com/booking/flights/choose-flights/your-trip-summary'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.southwest.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.task === 'notify') {
		console.log("Displaying notification");
		//sendResponse({newFlightsKey: flights});
		chrome.notifications.create('test_id', {type: 'basic', iconUrl: 'images/get_started48.png', title: 'Test', message: 'This is a test'}, function(id) {});
	}
});

chrome.notifications.onClicked.addListener(function(id) {
	if (id === 'test_id') {
		// not allowed to open popup programatically
	}
});
