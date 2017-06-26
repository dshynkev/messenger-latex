//Create clipboard textarea
var textarea = document.createElement("textarea");
textarea.id = "textarea";
textarea.style = "z-index: -999; top: 0; left = 0; position: fixed; width: 2em; height: 2em; padding: 0px; border: none; outline: none; boxShadow: none";
document.body.appendChild(textarea);

function getText() {
    var textNodes = document.getElementsByClassName("MathJax_SVG_Display");
    for(var i = 0; i < textNodes.length; i++){
        var currentNode = textNodes[i].nextSibling;
        textNodes[i].parentElement.parentElement.parentElement.setAttribute("onmousedown", "copy(this)");
    }
};
                                                
function copy(currentNode) {
    var selectedText = currentNode.getElementsByTagName("script")[0].textContent;
    var textarea = document.getElementById("textarea");
    textarea.value = "$$" + selectedText + "$$";
    textarea.select();
    console.log(textarea.value);
    document.execCommand("copy");
    textarea.value = "";
};

getText();