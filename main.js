window.MathJax = {
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/CommonHTML"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    }
}
var script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.extension.getURL("MathJax/MathJax.js");
document.getElementsByTagName("head")[0].appendChild(script);
console.log("LaTeX loaded");
