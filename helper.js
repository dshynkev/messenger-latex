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


//Live Preview
var Preview = {
    delay: 100,   // delay after keystroke to update

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
        var text = document.querySelectorAll(["data-text"]).value;
        if (text === this.oldtext) return; // Return if text hasn't changed
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

Preview.callback = MathJax.Callback(["CreatePreview",Preview]); // TODO: MathJax not defined
Preview.callback.autoReset = true; 

// Update on keystrokes 
var input = document.querySelectorAll(["data-text"]);
input.onkeyup = "Preview.Update()";


// TODO: Create output boxes
var MathPreview = document.createElement("DIV");
MathPreview.id = "MathPreview";
MathPreview.style = "border:1px solid; padding: 3px; width:50%; margin-top:5px";
document.getElementsByClassName("__i_").appendChild(MathPreview);


var MathBuffer = document.createElement("DIV");
MathBuffer.id = "MathBuffer";
MathBuffer.style = "border:1px solid; padding: 3px; width:50%; margin-top:5px; visibility:hidden; position:absolute; top:0; left: 0";
document.getElementsByClassName("__i_").appendChild(MathBuffer);

