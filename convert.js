main(loadImage);

function main(load) {
    var img = load("http://introcs.cs.princeton.edu/java/31datatype/peppers.jpg", convertTo);
}

function loadImage(src, converting) {
    var imgs = document.getElementsByTagName('img');
    var img = new Image();
    img.src = src;
    img.onload = function() {
        converting(img, imgs, overlayImage);
    }
}

function convertTo(img, imgs, overlay) {
    for (var i=0; i<imgs.length; i++) {
        $(imgs[i]).wrap("<div class='memeWrapper'></div>");
        var targetImage = $(imgs[i]).parent();

        overlay(img, imageToDiv, targetImage, imgs[i], function() {
            return [90, 20, 50, 100]; },
            alignOverlay,
            resize);
    }
}

function imageToDiv(targetImage, targetConvert) {
    var md = $(targetImage);


    md.css("width", targetConvert.width);
    md.css("height", targetConvert.height);
    md.css("background-image", "url('" + targetConvert.src + "')");
    md.css("background-size", targetConvert.width + "px " + targetConvert.height + "px");
    md.css("background-repeat", "no-repeat");
    md.css("position", "relative");

    targetConvert.width = 0;
    targetConvert.height = 0;
}

function overlayImage(img, toDiv,
    targetImage, targetConvert, getDims, align, resize) {
    var p = $(img).wrap("<div class='memeOverlay'></div>").parent();
    var oldw = img.width;
    var oldh = img.height;
    $(targetImage).append(p);

    toDiv(targetImage, targetConvert);

    /*
     * dims  array of array of numbers where
     * - [0] : x
     * - [1] : y
     * - [2] : width
     * - [3] : height
     */
    var dims = getDims();

    align(resize(p, img, oldw, oldh, dims[2], dims[3]), dims[0], dims[1]);
}

function resize(modDiv, img, oldw, oldh, nw, nh) {
    var nimg = $(img);
    var md = $(modDiv);


    if (oldw > oldh) {
        var r = nw/oldw;
        var neww = nw;
        var newh = r * oldh;
        md.css("width", neww + "px");
        md.css("height", newh + "px");
    }
    else {
        var r = nh/oldh;
        var neww = r * oldw;
        var newh = nh;
        md.css("width", neww + "px");
        md.css("height", newh + "px");
    }

    md.css("background-image", "url('" + img.src + "')");
    md.css("background-size", neww + "px " + newh + "px");
    md.css("background-repeat", "no-repeat");
<<<<<<< HEAD
    debugger;
    img.remove();

=======

    img.remove();

>>>>>>> master
    return md;
}

function alignOverlay(md, x, y) {
    md.css("left", x + "px");
    md.css("top", y + "px");
    md.css("position", "absolute");
}
