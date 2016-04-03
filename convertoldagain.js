main(loadImage);

function main(load) {
    var img = load("http://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png", convertTo);
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
    debugger;
    for (var i=0; i<imgs.length; i++) {
        imgs[i].id = "img";
        $(imgs[i]).wrap("<div class='memeWrapper'></div>");
        var targetImage = $(imgs[i]).parent();

        overlay(img, imageToDiv, targetImage, imgs[i], getBounds,
            alignOverlay,
            resize, plz);
    }
}

function getBounds(p, img, oldw, oldh, targetImage, targetConvert, toDiv, align, resize) {
    debugger;
    var results = [];

    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(1.7);

    tracking.track('#img', tracker);
    debugger;
    tracker.on('track', function(event) {
        debugger;
        if (event.data.length === 0) {
            debugger;
            return results;
        }
        event.data.forEach(function(rect) {
            debugger;
            var arr = [rect.x, rect.y, rect.width, rect.height];
            console.log(arr);
            results.push(arr);

            var i = 0;
            debugger;

            plz(p, img, oldw, oldh, results, i, targetImage, targetConvert, toDiv, align, resize);
        });
    });
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
    targetImage, targetConvert, getDims, align, resize, comp) {
    var p = $(img).wrap("<div class='memeOverlay'></div>").parent();
    var oldw = img.width;
    var oldh = img.height;
    $(targetImage).append(p);

    /*
     * dims  array of array of numbers where
     * - [0] : x
     * - [1] : y
     * - [2] : width
     * - [3] : height
     */
    var dims = getDims(p, img, oldw, oldh, targetImage, targetConvert, toDiv, align, resize);
}

function plz(p, img, oldw, oldh, dims, i, targetImage, targetConvert, toDiv, align, resize) {
    align(resize(p, img, oldw, oldh, dims[i][2], dims[i][3]), dims[i][0], dims[i][1]);

    toDiv(targetImage, targetConvert);
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

    img.remove();

    return md;
}

function alignOverlay(md, x, y) {
    md.css("left", x + "px");
    md.css("top", y + "px");
    md.css("position", "absolute");
}
