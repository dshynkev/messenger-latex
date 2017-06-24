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

//Live Preview
var Preview = {
    delay: 1,   // delay after keystroke to update

    preview: null, buffer: null, 
    timeout: null, mjaxRunning: false,
    oldText: null, 

    Init: function () {
        this.preview = document.getElementById("MathPreview"); 
        this.buffer = document.getElementById("MathBuffer");
    },
    
    // switch buffer and preview
    SwapBuffers: function () {
        var buffer = this.preview, preview = this.buffer;
        this.buffer = buffer; this.preview = preview;
        buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
        preview.style.position = ""; preview.style.visibility = "";
    },

    Update: function () {
        if (this.timeout) {clearTimeout(this.timeout)}
        this.timeout = setTimeout(this.callback,this.delay);
    },

    CreatePreview: function () {
        Preview.timeout = null;
        if (this.mjaxRunning) return; // Return if MathJax is already running
        var input = document.querySelector("div._1mf").lastChild.lastChild;
        var text = input.textContent;
        if (text === this.oldtext) return; // Return if text hasn't changed
        if (!text.match(/\$\$.*\$\$/) && !text.match(/\\\(.*\\\)/)) { // or if no TeX is found
            this.oldtext = text;
            // If the preview is visible
            if (!this.preview.style.visibility) {
                // Hide the preview
                this.preview.style.visibility = "hidden";
                this.preview.style.position = "absolute";
            }
            return;
        }

        this.buffer.innerHTML = this.oldtext = text;
        this.mjaxRunning = true;
        MathJax.Hub.Queue(
            ["Typeset",MathJax.Hub,this.buffer],
            ["PreviewDone",this]
        );
    },
    
    PreviewDone: function () {
        this.mjaxRunning = false;
        this.SwapBuffers();
    }
};

Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true; 

// Update on keystrokes 
document.getElementsByClassName("_kmc")[0].setAttribute("onkeyup", "Preview.Update()");

// Output buffer and preview boxes
var MathPreview = document.createElement("DIV");
MathPreview.id = "MathPreview";
MathPreview.className = "tex2jax_process"
MathPreview.style = "border:2px solid; border-radius:10px; border-color:#0084ff; padding:10px 15px 10px 15px; width:40%; margin:10px; position:absolute; visibility:hidden; z-index: 999";
document.getElementsByClassName("_kmc")[0].appendChild(MathPreview);

var MathBuffer = document.createElement("DIV");
MathBuffer.id = "MathBuffer";
MathBuffer.className = "tex2jax_process"
MathBuffer.style = "border:2px solid; border-radius:10px; border-color:#0084ff; padding:10px 15px 10px 15px; width:40%; margin:10px; visibility:hidden; position:absolute; z-index: 999";
MathBuffer.textContent = " ";
document.getElementsByClassName("_kmc")[0].appendChild(MathBuffer);

// Initialze preview
Preview.Init();