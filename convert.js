// converts all the images on the page to canvases of the same size and img
function convert(imgs) {
    while (imgs.length > 0) {
        convertImageToCanvas(imgs[0]);
    }
}

// converts the given image to canvas
function convertImageToCanvas(image) {
    debugger;

    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    $(image).replaceWith(canvas);
}

var imgs = document.getElementsByTagName("img");
convert(imgs);
