/*
** This is a background script (runs in a separate context).
** Here we install network request hooks and notify the helper script
** when they are triggered.
*/
var FSEND = "https://www.facebook.com/messaging/send/*"
var FRECEIVE = "https://www.facebook.com/ajax/mercury/delivery_receipts.php*"
var FSWITCH = "https://www.facebook.com/ajax/bz"
var FSCROLLDIRECT = "https://www.facebook.com/api/graphqlbatch/"
var FSCROLLGROUP = "https://www.facebook.com/ajax/mercury/thread_info.php*"
var FTAB = "https://www.facebook.com/ajax/mercury/tabs_presence.php*"
var MSEND = "https://www.messenger.com/messaging/send/*"
var MRECEIVE = "https://www.messenger.com/ajax/mercury/delivery_receipts.php*"
var MSWITCH = "https://www.messenger.com/ajax/bz"
var MSCROLLDIRECT = "https://www.messenger.com/api/graphqlbatch/"
var MSCROLLGROUP = "https://www.messenger.com/ajax/mercury/thread_info.php*"
var MTAB = "https://www.messenger.com/ajax/mercury/tabs_presence.php*"

URLS = [
    FSEND,
    FRECEIVE,
    FSWITCH,
    FSCROLLDIRECT,
    FSCROLLGROUP,
    MSEND,
    MRECEIVE,
    MSWITCH,
    MSCROLLDIRECT,
    MSCROLLGROUP,
    FTAB,
    MTAB,
];

function checkURL(url) {
    for (var i = 0; i < URLS.length; i++) {
        if (url.includes(URLS[i].replace("*", "")) || url == URLS[i]) {
            return URLS[i];
        };
    };
};

// Request a refresh when the page changes
chrome.webRequest.onCompleted.addListener(function(details) {
    console.log("onComplete")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        url = checkURL(details.url)
        switch (url) {
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
            case FSCROLLDIRECT:
            case MSCROLLDIRECT:
            case FSCROLLGROUP:
            case MSCROLLGROUP:
                chrome.tabs.sendMessage(tabs[0].id, "scrolled");
                break;
            case FTAB:
            case MTAB:
                chrome.tabs.sendMessage(tabs[0].id, "tabbed");
                break;
        }
    });
}, {urls: URLS}
);
