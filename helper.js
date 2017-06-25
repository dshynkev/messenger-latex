window.addEventListener("message", function(event) {
    // Only accept messages from the same window
    if (event.source != window)
        return;
    
    // Forwarded from the background script
    switch (event.data) {
        case "sent":
            console.log(event.data);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            Preview.Update();
            break;
        case "switched":
            console.log(event.data); 
            var input = document.getElementsByClassName("_1mf")[0]
            if (input != null) {
                input.classList.add("tex2jax_ignore");               
            };
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            Preview.Update();
            break;
        case "received":
            console.log(event.data);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            break;
        case "scrolled": //Timeout ensures that the older messages are loaded before MathJax updates
            console.log(event.data);
            setTimeout(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }, 500);
            break;
        case "tabbed":
            console.log(event.data);
            var inputs = document.getElementsByClassName("_1mf")
            console.log(inputs.length);
            if (inputs != null) {
                for (var i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("tex2jax_ignore");
                }
            };
            break;
    };
}, false);

//Ignore MathJax in input 
var currentpage = window.location.href;
if (currentpage.includes("facebook.com/messages") || currentpage.includes("messenger.com")) {
    var input = document.getElementsByClassName("_1mf")[0].classList.add("tex2jax_ignore");
};
