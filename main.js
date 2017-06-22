(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("MathJax/MathJax.js");
    script.src += "?config=TeX-AMS_HTML"

    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("LaTeX loaded");
})();
