//Create clipboard textarea
var textarea = document.createElement("textarea");
textarea.id = "textarea";
textarea.style = "z-index: -999; top: 0; left = 0; position: fixed; width: 2em; height: 2em; padding: 0px; border: none; outline: none; boxShadow: none";
document.body.appendChild(textarea);

function getText() {
    var textNodes = document.getElementsByClassName("MathJax_Preview");
    for(var i = 0; i < textNodes.length; i++){
        var currentNode = textNodes[i].nextSibling;
        textNodes[i].parentElement.parentElement.parentElement.setAttribute("onmousedown", "copy(this)");
        textNodes[i].class="found";
        textNodes[i].parentElement.parentElement.parentElement.title = "Click to copy";
    }
};
                                                
function copy(currentNode) {
    var textScript = currentNode.getElementsByTagName("script")[0];
    var textarea = document.getElementById("textarea");
    if(textScript.type=="math/tex"){
        textarea.value = "\\(" + textScript.textContent + "\\)";
    }
    else {
        textarea.value = "$$" + textScript.textContent + "$$";
    }
    textarea.select();
    document.execCommand("copy");
    textarea.value = "";
};

getText();