main();

function main() {
    var imgs = document.getElementsByTagName('img');
    convertTo(imgs, loadImage, overlayImage);
}

function loadImage(src) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();
    img.src = src;
    return img;
}

function convertTo(imgs, load, overlay) {
    for (var i=0; i<imgs.length; i++) {
        debugger;
        $(imgs[i]).wrap("<div class='memeWrapper'></div>");
    }

    var img = load("http://introcs.cs.princeton.edu/java/31datatype/peppers.jpg");

    overlay(img, function() {
        return [10, 20, 50, 70]; },
        formatOverlay);
}

function overlayImage(img, getDims, setCSS) {
    var cvs = document.getElementsByClassName("memeWrapper");
    for (var i=0; i<cvs.length; i++) {
        $(cvs[i]).appendChild(img.wrap("<div class='memeOverlay'></div>"));
    }

    setCSS(getDims(), resize, alignOverlay);
}

/**
 * @param dims  array of array of numbers where
 * - [0] : x
 * - [1] : y
 * - [2] : width
 * - [3] : height
 */
function formatOverlay(dims, resize, align) {
        var cvs = document.getElementsByClassName("memeOverlay");
        for (var i=0; i<cvs.length; i++) {
            align(resize(cvs[i], dims[2], dims[3]), dims[0], dims[1]);
        }
}

function resize(modDiv, nw, nh) {
    var img = $('img')[0];
    var w = img.width;
    var h = img.height;

    if (w > h) {
        var r = nw/w;
        modDiv.width = nw;
        modDiv.height = r * h;
    }
    else {
        var r = nh/h;
        modDiv.width = r * w;
        modDiv.height = nh;
    }

    modDiv.style.backgroundImage = "url('" + img.src + "')";
    modDiv.style.backgroundSize = modDiv.width + "px " + modDiv.height + "px";
    modDiv.style.backgroundRepeat = "no-repeat";

    img.remove();

    return modDiv;
}

function alignOverlay(modDiv, x, y) {
    modDiv.style.left = x + "px";
    modDiv.style.top = y + "px";
    modDiv.style.position = "relative";
}
