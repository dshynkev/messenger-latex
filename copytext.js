//Create clipboard textarea
var textarea = document.createElement("textarea");
textarea.id = "textarea";
textarea.style = "z-index: -999; top: 0; left = 0; position: fixed; width: 2em; height: 2em; padding: 0px; border: none; outline: none; boxShadow: none";
document.body.appendChild(textarea);

// Walk all new TeX nodes and register copy-on-click callbacks
function getText() {
    var textNodes = document.querySelectorAll("span.MathJax_Preview:not(.found)");
    for(var i = 0; i < textNodes.length; i++){
        var clickableParent = textNodes[i].parentElement.parentElement.parentElement;
        // Skip the preview over the input field
        if (clickableParent.classList.contains('_5irm'))
            continue;
        clickableParent.setAttribute("onmousedown", "copy(this)");
        clickableParent.title = "Click to Copy";
        textNodes[i].className +=" found";
    }
};

// Copy TeX markup from underlying node
function copy(currentNode) {
    var textScript = currentNode.getElementsByTagName("script")[0];
    var textarea = document.getElementById("textarea");
    textarea.value = (textScript.type=="math/tex") ? ("\\(" + textScript.textContent + "\\)") : ("$$" + textScript.textContent + "$$");
    textarea.select();
    document.execCommand("copy");
    textarea.value = "";
};