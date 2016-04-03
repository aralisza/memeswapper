main(loadImage);

function main(load) {
    load("http://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png", convertTo)
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
        imgs[i].id = "img";
        $(imgs[i]).wrap("<div class='memeWrapper'></div>");
        var targetImage = $(imgs[i]).parent();

        overlay(img, targetImage, imgs[i], getBounds);
    }
}

function overlayImage(img, img, targetImage, targetConvert, getDims) {
    var p = $(img).wrap("<div class='memeOverlay'></div>").parent();
    $(targetImage).append(p);

    getDims(img, targetImage, targetConvert, alignOverlay, resize, p);
}

function getBounds(img, targetImage, targetConvert, align, resize, p) {
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

            var oldw = img.width;
            var oldh = img.height;

            plz(p, img, oldw, oldh, dims, i, imageToDiv, align, resize);
        });
    });
}

function plz(p, img, oldw, oldh, dims, i, imageToDiv, align, resize) {
    align(resize(p, p, img, oldw, oldh, dims[i][2], dims[i][3]), dims[i][0], dims[i][1]);
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
