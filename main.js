(function() {
    // Inject MathJax
    var mathJaxScript = document.createElement("script");
    mathJaxScript.type = "text/javascript";
    mathJaxScript.src = chrome.extension.getURL("MathJax/MathJax.js");
    mathJaxScript.src += "?config=TeX-AMS_SVG";
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
    
    // Inject png script
    var pngScript = document.createElement("script");
    pngScript.type = "text/javascript";
    pngScript.src = chrome.extension.getURL("png.js");
    document.getElementsByTagName("body")[0].appendChild(pngScript);
    var canvas = document.createElement("canvas");
    canvas.id = "drawCanvas";
    
    // canvas.style = "display: none"
    document.getElementsByTagName("body")[0].appendChild(canvas);

    // Forward messages from the background script to the window 
    chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            window.postMessage(request, "*");
          }
    )
})();
