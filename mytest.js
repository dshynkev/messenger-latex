window.MathJax = {
  jax: ["input/TeX", "output/SVG"],
  extensions: ["tex2jax.js", "MathMenu.js", "MathZoom.js"],
  showMathMenu: false,
  showProcessingMessages: false,
  messageStyle: "none",
  SVG: {
    useGlobalCache: false
  },
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js", "autoload-all.js"]
  }
};

(function(d, script) {
  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js';
  d.getElementsByTagName('head')[0].appendChild(script);
}(document));