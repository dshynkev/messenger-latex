(function() {
    // Inject MathJax
    var mathJaxScript = document.createElement("script");
    mathJaxScript.type = "text/javascript";
    mathJaxScript.src = chrome.extension.getURL("MathJax/MathJax.js");
    mathJaxScript.src += "?config=TeX-AMS_HTML";
    mathJaxScript.async = false;
    mathJaxScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(mathJaxScript);
    // Inject preview script
    var previewScript = document.createElement("script");
    previewScript.type = "text/javascript";
    previewScript.src = chrome.extension.getURL("livepreview.js");
    previewScript.async = false;
    previewScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(previewScript);
    // Inject a helper script
    var helperScript = document.createElement("script");
    helperScript.type = "text/javascript";
    helperScript.src = chrome.extension.getURL("helper.js");
    helperScript.async = false;
    helperScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(helperScript);

    /*
    //CAN BE COMMENTARIZED NOT TESTED IN MESSENGER
    // Inject png script 1
    var pngScript1 = document.createElement("script");
    pngScript1.type = "text/javascript";
    pngScript1.src = chrome.extension.getURL("png.js");
    document.getElementsByTagName("body")[0].appendChild(pngScript1);
    // Inject png script 2
    var pngScript2 = document.createElement("script");
    pngScript2.type = "text/javascript";
    pngScript2.src = chrome.extension.getURL("png2.js");
    document.getElementsByTagName("body")[0].appendChild(pngScript2);
    //CAN BE COMMENTARIZED NOT TESTED IN MESSENGER
    */

    
    // Forward messages from the background script to the window 
    chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            window.postMessage(request, "*");
          }
    )
})();
