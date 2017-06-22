(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("MathJax/MathJax.js");
    script.src += "?config=TeX-AMS_HTML"

    // FIXME: update only when new a message is received instead
    script.text = "setInterval(function() { MathJax.Hub.Queue(['Typeset',MathJax.Hub]); }, 1000);";

    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("LaTeX loaded");
})();
