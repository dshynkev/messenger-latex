(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("MathJax/MathJax.js");
    script.src += "?config=TeX-AMS_HTML"

    // FIXME: update only when new a message is received instead
    script.text = "MathJax.Hub.Queue(['Typeset',MathJax.Hub]);";
    chrome.runtime.onMessage.addListener(
	  	function(request, sender, sendResponse) {
	  		console.log(request.value);
	  		console.log(request)
		    if (request.value == 'refresh') {
		    	var newScript = document.createElement("script");
    			newScript.type = "text/javascript";
    			newScript.text = "MathJax.Hub.Queue(['Typeset',MathJax.Hub]);";
		      	document.getElementsByTagName("body")[0].appendChild(newScript);
		      	console.log("refreshed");
	    	};
	    	sendResponse({value: "received"})
	  	}
	)
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("LaTeX loaded");
})();
