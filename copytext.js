//Create clipboard textarea
var textarea = document.createElement("textarea");
textarea.id = "textarea";
textarea.style = "z-index: -999; top: 0; left = 0; position: fixed; width: 2em; height: 2em; padding: 0px; border: none; outline: none; boxShadow: none";
document.body.appendChild(textarea);

function getText() {
    var textNodes = document.getElementsByClassName("MathJax_SVG_Display");
    var nodes = textNodes.length;
    console.log("Copy function added to: " + nodes + " nodes");
    var i;
    for(i = 0; i < nodes - 1; i++){
        var currentNode = textNodes[i].nextSibling;
        currentNode.setAttribute("class", "found");
        textNodes[i].parentElement.parentElement.parentElement.setAttribute("onClick", "copy(this)");
    }
};
                                                
function copy(currentNode) {
    var selectedText = currentNode.getElementsByTagName("script")[0].textContent;
    console.log(selectedText);
    var copiedText = "$$" + selectedText + "$$";
    var textarea = document.getElementById("textarea");
    textarea.value = copiedText;
    textarea.select();
    document.execCommand("copy");
    textarea.value = "";
};

getText();