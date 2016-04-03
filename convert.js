main(loadImage);

function main(load) {
    load("http://i1214.photobucket.com/albums/cc500/violoncellox/01.png", convertTo)
}

function loadImage(src, converting) {
    var imgs = document.getElementsByTagName('img');
    var img = new Image();
    img.src = src;
    img.onload = function() {
        converting(img, imgs, getBounds);
    }
}

function convertTo(img, imgs, getDims) {
    for (var i=0; i<imgs.length; i+=2) {
        imgs[i].id = "img";
        $(imgs[i]).wrap("<div class='memeWrapper'></div>");
        var targetImage = $(imgs[i]).parent();
        var p = $(img).wrap("<div class='memeOverlay'></div>").parent();
        $(targetImage).append(p);
        getDims(img, targetImage, imgs[i], alignOverlay, resize, p);
    }
}

function getBounds(img, targetImage, targetConvert, align, resize, p) {
    var results = [];

    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(1.7);

    tracking.track('#img', tracker);

    tracker.on('track', function(event) {
        if (event.data.length === 0) {

            return results;
        }
        event.data.forEach(function(rect) {
            var arr = [rect.x, rect.y, rect.width, rect.height];
            console.log(arr);

            plz(p, img, arr, imageToDiv, align, resize, targetConvert, targetImage);
        });
        // var rect = event.data[0];
        // var arr = [rect.x, rect.y, rect.width, rect.height];
        // console.log(arr);
        //
        // plz(p, img, arr, imageToDiv, align, resize, targetConvert, targetImage);
    });

    console.log(results);
}

function plz(p, img, dims, toDiv, align, resize, targetConvert, targetImage) {

    align(resize(p, img, dims[2], dims[3]), dims[0], dims[1]);
    toDiv(targetImage, targetConvert);
}

function resize(modDiv, img, nw, nh) {

    var nimg = $(img);
    var md = $(modDiv);
    var oldw = img.width;
    var oldh = img.height;


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

function imageToDiv(targetImage, targetConvert) {
    var md = $(targetImage);

    md.css("width", targetConvert.width);
    md.css("height", targetConvert.height);
    md.css("background-image", "url('" + targetConvert.src + "')");
    md.css("background-size", targetConvert.width + "px " + targetConvert.height + "px");
    md.css("background-repeat", "no-repeat");
    md.css("position", "relative");
    md.css("display", "inline-block");
    debugger;
    targetConvert.width = 1;
    targetConvert.height = 1;
}
