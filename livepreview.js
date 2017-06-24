//Live Preview
var Preview = {
    delay: 150,   // delay after keystroke to update

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
        buffer.style.display = "none";
        preview.style.display = "";
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
            if (!this.preview.style.display) {
                // Hide the preview
                this.preview.style.display = "none";
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

var chatClass = "_kmc";
var currentpage = window.location.href;
if (currentpage.includes("facebook.com/messages")) chatClass="_kmc";
else if (currentpage.includes("messenger.com")) chatClass="_kmc";
else chatClass="_552h";
console.log(chatClass);

// Update on keystrokes 
document.getElementsByClassName(chatClass)[0].setAttribute("onkeyup", "Preview.Update()");

// Output buffer and preview boxes
var MathPreview = document.createElement("div");
MathPreview.id = "MathPreview";
MathPreview.className = "tex2jax_process"
MathPreview.style = "position:absolute; bottom: 100%; box-shadow: 2px 2px 1px #e0e0e0; background-color: #f0f0f0; border-radius: 10px; padding: 10px 20px 10px 20px; display:none";
document.getElementsByClassName(chatClass)[0].appendChild(MathPreview);

var MathBuffer = document.createElement("div");
MathBuffer.id = "MathBuffer";
MathBuffer.className = "tex2jax_process"
MathBuffer.style = "position:absolute; bottom: 100%; box-shadow: 2px 2px 1px #e0e0e0; background-color: #f0f0f0; border-radius: 10px; padding: 10px 20px 10px 20px; display:none";
MathBuffer.textContent = " ";
document.getElementsByClassName(chatClass)[0].appendChild(MathBuffer);

// Initialze preview
Preview.Init();
