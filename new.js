$(document).ready( function () {
  processImages();
})

function processImages() {
    var src = "http://i1214.photobucket.com/albums/cc500/violoncellox/14.png"

    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].id = "img".concat(i);
        wrapped(imgs[i], src, i);
    }
}

function wrapped(oldImg, src, i) {

    $(oldImg).wrap("<div class='memeWrapper'></div>");
    var wrapper = $(oldImg).parent();

    wrapper.style = oldImg.style;
    $(wrapper).css("position", "relative");
    $(wrapper).css("background-image", "url('" + oldImg.src + "')");
    $(wrapper).css("width", oldImg.width + "px");
    $(wrapper).css("height", oldImg.height + "px");
    $(wrapper).css("overflow", "none");

    oldImg.style.visibility = "hidden";

    var results = [];

    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(1.7);

    tracking.track("#img".concat(i), tracker);

    tracker.on('track', function(event) {
        if (event.data.length === 0) {
            return results;
        }
        event.data.forEach(function(rect) {
            var overlayImg = new Image();
            overlayImg.src = src;
            overlayImg.class = "memeOverlay";
            $(overlayImg).css("position", "absolute");

            $(overlayImg).css("left", rect.x + "px");
            $(overlayImg).css("top", rect.y + "px");

            nw = rect.width;
            nh = rect.height;

            var oldw = overlayImg.width;
            var oldh = overlayImg.height;

            if (oldw > oldh) {
                var r = nw/oldw;
                var neww = nw;
                var newh = r * oldh;
                $(overlayImg).css("width", neww + "px");
                $(overlayImg).css("height", newh + "px");
            }

            else {
                var r = nh/oldh;
                var neww = r * oldw;
                var newh = nh;
                $(overlayImg).css("width", neww + "px");
                $(overlayImg).css("height", newh + "px");
            }

            $(wrapper).prepend(overlayImg);
        });
    });
}
