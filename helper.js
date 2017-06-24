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
            var input = document.getElementsByClassName("_1mf")[0]
            if (input != null) {
                input.classList.add("tex2jax_ignore");               
            };
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
var currentpage = window.location.href;
if (currentpage.includes("facebook.com/messages") || currentpage.includes("messenger.com")) {
    var input = document.getElementsByClassName("_1mf")[0].classList.add("tex2jax_ignore");
};
