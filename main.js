(function() {
    injectScript("config.js");
    injectScript("MathJax/MathJax.js");
    injectScript("livepreview.js");
    injectScript("helper.js");
    injectScript("png.js");
    
    var canvas = document.createElement("canvas");
    canvas.id = "drawCanvas";
    canvas.style = "display: none";
    document.getElementsByTagName("body")[0].appendChild(canvas);

    // Forward messages from the background script to the window 
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          window.postMessage(request, "*");
        }
    );

    function injectScript(src) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = chrome.extension.getURL(src);
        script.async = false;
        script.defer = true;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
})();
