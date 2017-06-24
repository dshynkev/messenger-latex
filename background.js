var FSEND = "https://www.facebook.com/messaging/send/?dpr=1"
var FRECEIVE = "https://www.facebook.com/ajax/mercury/mark_seen.php?dpr=1"
var FSWITCH = "https://www.facebook.com/ajax/bz"
var FSCROLL = "https://www.facebook.com/api/graphqlbatch/"
var MSEND = "https://www.messenger.com/messaging/send/?dpr=1"
var MRECEIVE = "https://www.messenger.com/ajax/mercury/delivery_receipts.php?dpr=1"
var MSWITCH = "https://www.messenger.com/ajax/bz"
var MSCROLL = "https://www.messenger.com/api/graphqlbatch/"

// Request a refresh when the page changes
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        switch (details.url) {
            case FSEND:
            case MSEND:
                chrome.tabs.sendMessage(tabs[0].id, "sent");
                break;
            case FRECEIVE:
            case MRECEIVE:
                chrome.tabs.sendMessage(tabs[0].id, "received");
                break;
            case FSWITCH:
            case MSWITCH:
                chrome.tabs.sendMessage(tabs[0].id, "switched");
                break;
            case FSCROLL:
            case MSCROLL:
                chrome.tabs.sendMessage(tabs[0].id, "scrolled");
                break;
        }
          chrome.tabs.sendMessage(tabs[0].id, "refresh");
    });
}, {urls: [
    FSEND,
    FRECEIVE,
    FSWITCH,
    FSCROLL,
    MSEND,
    MSCROLL,
    MSWITCH,
    MSCROLL,
]});
