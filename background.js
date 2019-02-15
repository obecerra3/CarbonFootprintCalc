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
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    chrome.storage.local.set({flightProfiles: request.flightProfiles}, function() {
      console.log('flightProfiles stored');
    });
});


