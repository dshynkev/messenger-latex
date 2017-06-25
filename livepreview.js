//Live Preview
var Preview = {
    delay: 150,   // delay after keystroke to update

    preview: null, buffer: null, 
    timeout: null, mjaxRunning: false,
    oldText: null, savebutton: null,
    savebuttonbuffer: null,

    Init: function () {
        this.preview = document.getElementById("MathPreview"); 
        this.buffer = document.getElementById("MathBuffer");
        this.savebutton = document.getElementById("SavePNG");
    },
    
    // switch buffer and preview
    SwapBuffers: function () {
        var buffer = this.preview, preview = this.buffer;
        this.buffer = buffer; this.preview = preview;
        buffer.style.display = "none";
        preview.style.display = "";
        this.preview.appendChild(this.savebutton);
        this.savebutton.style.display = "";
    },

    Update: function () {
        if (this.timeout) {clearTimeout(this.timeout)}
        this.timeout = setTimeout(this.callback,this.delay);
    },

    CreatePreview: function () {
        Preview.timeout = null;
        if (this.mjaxRunning) return; // Return if MathJax is already running
        var lines = document.querySelectorAll("div._1mf");
        var text = lines[lines.length-1].lastChild.lastChild.textContent;
        if (text === this.oldtext) return; // Return if text hasn't changed
        if (!text.match(/\$\$.*\$\$/) && !text.match(/\\\(.*\\\)/)) { // or if no TeX is found
            this.oldtext = text;
            // If the preview is visible
            if (!this.preview.style.display) {
                // Hide the preview
                this.preview.style.display = "none";
                this.savebutton.style.display = "none";
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

// Update on keystrokes 
chat = document.getElementsByClassName(chatClass)[0];

// Output buffer and preview boxes
var MathPreview = document.createElement("div");
MathPreview.id = "MathPreview";
MathPreview.className = "tex2jax_process"
MathPreview.style = "position:absolute; bottom: 100%; box-shadow: 2px 2px 1px #ccc; background-color: #f0f0f0; border: 1px solid #0084ff; border-radius: 10px; padding: 10px; display:none; z-index: 999; margin-bottom: 3px";

var MathBuffer = document.createElement("div");
MathBuffer.id = "MathBuffer";
MathBuffer.className = "tex2jax_process"
MathBuffer.style = "position:absolute; bottom: 100%; box-shadow: 2px 2px 1px #ccc; background-color: #f0f0f0; border: 1px solid #0084ff; border-radius: 10px; padding: 10px; display:none; z-index: 999; margin-bottom: 3px";
MathBuffer.textContent = " ";

// PNG button and styles
var SavePNG = document.createElement("button");
SavePNG.id = "SavePNG";
SavePNG.setAttribute("class", "btn");
SavePNG.style = "position: absolute; left: 100%; bottom: 0%; background-color: #f0f0f0; border: 1px solid #0084ff; border-radius: 5px; padding: 5px; display: none; z-index: 999; font-size: 75%; text-align: center; box-shadow: 2px 2px 1px #ccc; margin-left: 5px; transition: background-color 0.25s, border 0.25s; color: #fff";
SavePNG.textContent = "Save PNG";


//PNG styles
SavePNG.onmouseover=function(){
    this.style.backgroundColor="#3b5998";
    this.style.color="#dfe3ee";
}
SavePNG.onmouseout=function() {
   this.style.backgroundColor="#f0f0f0";    this.style.color="#111";
}

// If the chat exists, then add the live components
if (chat != null) {
    chat.appendChild(MathPreview);
    chat.appendChild(MathBuffer);
    chat.appendChild(SavePNG);
    chat.setAttribute("onkeyup", "Preview.Update()");
};

// Initialze preview
Preview.Init();
