(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("MathJax/MathJax.js");

    var config = "MathJax.Hub.Config({" +
        "extensions: ['tex2jax.js']," +
        "jax: ['input/TeX', 'output/CommonHTML']," +
        "tex2jax: {" +
            "inlineMath: [ ['$','$'], ['\\(','\\)'] ]," +
            "displayMath: [ ['$$','$$'], ['\\[','\\]'] ]," +
            "processEscapes: true" +
        "}" +
    "});" +
    "MathJax.Hub.Startup.onload();";

    script.text = config;
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("LaTeX loaded");
})();
