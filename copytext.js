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
        textNodes[i].parentElement.parentElement.parentElement.title = "Click to Copy";
        textNodes[i].class="found";
    }
};
                                                
function copy(currentNode) {
    var textScript = currentNode.getElementsByTagName("script")[0];
    var textarea = document.getElementById("textarea");
    textarea.value = (textScript.type=="math/tex") ? ("\\(" + textScript.textContent + "\\)") : ("$$" + textScript.textContent + "$$");
    textarea.select();
    document.execCommand("copy");
    textarea.value = "";
};

getText();