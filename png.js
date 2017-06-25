var bBox; // bBox is used to know the dimensions of the svg to render the png with the right dimensions

function render() {
    var svg = document.getElementById('MathPreview').getElementsByClassName("MathJax_SVG")[0].childNodes[0];
    // bBox
    bBox = svg.getBBox();

    var canvas = document.querySelector('drawCanvas');
    function triggerDownload (imgURI) {
        var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
        });

        var a = document.createElement('a');
        a.setAttribute('download', 'messenger-latex equation.png');
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');

        a.dispatchEvent(evt);
    }

    var canvas = document.getElementById('drawCanvas');
    
    // bBox
    var wDivisionFactor = 50;
    var hDivisionFactor = 50;

    if(bBox.width < 700){
        wDivisionFactor = 40;
    }
    else if(bBox.width < 1100){
        wDivisionFactor = 45;
    }
    else{
        wDivisionFactor = 50;
    }
    
    if(bBox.height < 750){
        hDivisionFactor = 35;
    }
    else if(bBox.height < 1000){
        hDivisionFactor = 37;
    }
    else{
        hDivisionFactor = 45;
    }
    
    canvas.width = bBox.width / wDivisionFactor;
    canvas.height = bBox.height / hDivisionFactor;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';

    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 1, 1);
      DOMURL.revokeObjectURL(url);

      var imgURI = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

      triggerDownload(imgURI);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    img.src = url;
};