window.addEventListener("message", function(event) {
    // Only accept messages from the same window
    if (event.source != window)
        return;

    // Forwarded from the background script
    switch (event.data) {
        case "sent":
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            console.log("refreshed");
            Preview.Update();
            break;
        case "switched":
            var input = document.querySelector("div._1mf")
            input.classList.add("tex2jax_ignore");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            console.log("refreshed");
            Preview.Update();
            break;
        case "received":
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            console.log("refreshed");
            break;
        case "scrolled": //Timeout ensures that the older messages are loaded before MathJax updates
            setTimeout(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                console.log("refreshed");
            }, 500);
            break;
    };
}, false);

//Ignore MathJax in input 
var input = document.querySelector("div._1mf")
input.classList.add("tex2jax_ignore");