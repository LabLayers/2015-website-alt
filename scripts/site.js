// = require bower
// = require jquery
// = require_tree .

// Smooth scrolling across inline links
/*

$( document ).ready(function() {
  $("a").click(function() {
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top
    }, 500);
    return false;
  });
});

*/


// Stars!
// @ Modified from open source "Snow" at http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
/*

window.onload = function(){
    //canvas init
    var canvas = document.getElementById("stars");
    var ctx = canvas.getContext("2d");
    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    //snowflake particles
    var mp = 40; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp //density
        })
    }
    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);
        // var colors = ['rgba(255, 255, 255, 0.8)', 'rgba(0, 255, 255, 0.8)', 'rgba(255, 255, 0, 0.8)'];
        // ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = 'rgba(50, 255, 100, 0.3)';
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            // Possible colors
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();
    }
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            // Modified to move upwards
            p.y += Math.cos(angle+p.d) - 1 + p.r/2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W || p.x < 0 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter fromth
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }
    //animation loop
    setInterval(draw, 33);
};

// Visibility Classes
// -> A small plugin that checks whether elements are within
//    the user visible viewport of a web browser.
//    only accounts for vertical position, not horizontal.
//    Adds .visible to visible sections for animations.
// -@ Sam Sehnert from Digital Fusion http://teamdf.com/jquery-plugins/license/
(function($) {
  $.fn.visible = function(partial) {
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };
})(jQuery);

// Scroll Timer!
// -> This actually improves the framerate and rendering time by 95%!
//    However, the user must stop scrolling or let go of the mouse wheel...
// -@ Modified from open source answer at http://stackoverflow.com/questions/15591002/jquery-setinterval-or-scroll
var scrollTimer = null;
$(window).scroll(function () {
    if (scrollTimer) {
        clearTimeout(scrollTimer);   // clear any previous pending timer
    }
    scrollTimer = setTimeout(handleScroll, 100);   // set new timer
});

function handleScroll() {
    scrollTimer = null;
    $(".browser").toggleClass("code", ($(document).offsetTop > 200));
    $("section").each(function(i, el) {
        var el = $(el);
        // if (el.visible(true)) {
        // -> A section MUST be in the viewport and 200px from the bottom in order for 
        //    some awesome CSS3 animations to happen!
        // -@ http://stackoverflow.com/questions/16569941/use-jquery-to-detect-when-an-element-is-near-the-bottom-of-the-page
        if (   ($(this).offset().top) < ($(window).scrollTop() + $(window).height() - 200)  &&  el.visible(true)  ) {
            el.addClass("visible");
            // Load iFrames only when visible
            // -> Improves site performance by like 20 frames and lowers bandwidth.
            // -@ http://stackoverflow.com/questions/19482601/have-iframe-load-when-visible
            // Show our element, then call our callback
            // Find the iframes within our newly-visible element
            $(this).find("iframe").not(".loaded").prop("src", function(){
                // Set their src attribute to the value of data-src
                $(this).addClass("loaded");
                return $(this).data("src");
            });
        } else {
            if (!$(this).hasClass("onceler")) {
                el.removeClass("visible"); 
            };
            // el.removeClass("visible"); 
        }
    });
    $("#unicorn .browser").each(function(i, el) {
        var el = $(el);
        // if (el.visible(true)) {
        // -> A section MUST be in the viewport and 200px from the bottom in order for 
        //    some awesome CSS3 animations to happen!
        // -@ http://stackoverflow.com/questions/16569941/use-jquery-to-detect-when-an-element-is-near-the-bottom-of-the-page
        if (   ($(this).offset().top) < ($(window).scrollTop() + $(window).height() - 300)  &&  el.visible(true)  ) {
            el.addClass("visible");
        }
    });
    $(".animate, #event article, #more article, #science article, #lab article, #film article").each(function(i, el) {
        var el = $(el);
        // if (el.visible(true)) {
        // -> A section MUST be in the viewport and 200px from the bottom in order for 
        //    some awesome CSS3 animations to happen!
        // -@ http://stackoverflow.com/questions/16569941/use-jquery-to-detect-when-an-element-is-near-the-bottom-of-the-page
        if (   ($(this).offset().top) < ($(window).scrollTop() + $(window).height() - 178)  &&  el.visible(true)  ) {
            el.addClass("visible");
        }
    });
};

*/