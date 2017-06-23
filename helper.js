window.addEventListener("message", function(event) {
    // Only accept messages from the same window
    if (event.source != window)
        return;

    // Forwarded from the backdround script
    if (event.data == "refresh") {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        console.log("refreshed");
    }
}, false);
