chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({total_offset: 0}, function() {
      console.log('The total offset is 0');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlPrefix: 'https://www.delta.com/'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });