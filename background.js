// Request a refresh when the page changes
chrome.webRequest.onCompleted.addListener(function(details) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, "refresh");
	});
}, {urls: [
    "https://www.facebook.com/messaging/send/?dpr=1",
    "https://www.facebook.com/ajax/mercury/mark_seen.php?dpr=1",
    "https://www.facebook.com/ajax/bz",
    "https://www.facebook.com/api/graphqlbatch/",
    "https://www.messenger.com/messaging/send/?dpr=1",
    "https://www.messenger.com/ajax/mercury/delivery_receipts.php?dpr=1",
    "https://www.messenger.com/ajax/bz",
    "https://www.messenger.com/api/graphqlbatch/",
]});
