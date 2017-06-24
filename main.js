(function() {
    // Inject MathJax
    var mathJaxScript = document.createElement("script");
    mathJaxScript.type = "text/javascript";
    mathJaxScript.src = chrome.extension.getURL("MathJax/MathJax.js");
    mathJaxScript.src += "?config=TeX-AMS_HTML";
    mathJaxScript.async = false;
    mathJaxScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(mathJaxScript);

    // Inject a helper script
    var helperScript = document.createElement("script");
    helperScript.type = "text/javascript";
    helperScript.src = chrome.extension.getURL("helper.js");
    helperScript.async = false;
    helperScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(helperScript);
    
    // Inject preview script
    var previewScript = document.createElement("script");
    previewScript.type = "text/javascript";
    previewScript.src = chrome.extension.getURL("livepreview.js");
    previewScript.async = false;
    previewScript.defer = true;
    document.getElementsByTagName("head")[0].appendChild(previewScript);
    
    // Forward messages from the background script to the window 
    chrome.runtime.onMessage.addListener(
	  	function(request, sender, sendResponse) {
            window.postMessage(request, "*");
	  	}
	)
})();
