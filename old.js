// converts all the images on the page to canvases of the same size and img
function convert(imgs) {
    while (imgs.length > 0) {
        convertImageToCanvas(imgs[0]);
    }

    overlayImages(30, 50);
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

function loadImage(src, onload) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();
    img.src = src;
    return img;
}

function resize(img) {
    var w = img.width;
    var h = img.height;

    var neww = 200;
    var newh = 200;

    if (w > h) {
        var r = neww/w;
        nh = r * h;
        img.width = neww;
        img.height = newh;
    }
    else {
        var r = newh/h;
        neww = r * w;
        img.width = neww;
        img.height = newh;
    }

    return img;
}

function overlayImages(x, y) {
    var cvs = document.getElementsByTagName("canvas");
    var toLoad = resize(loadImage('http://introcs.cs.princeton.edu/java/31datatype/peppers.jpg'));

    for (var i=0; i<cvs.length; i++) {
        cvs[i].getContext("2d").drawImage(toLoad, x, y);
    }

    //$('canvas').append("<img src='" + img.src + "'height='300', width='300'>");
    //image.append("<img src='" + imgPath + "' height='300', width='300'>");
}
