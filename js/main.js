// Get html div that is to be used as the game's container and assign to variable
const gme = $('#game-container');

// Assign variables to image asset sources
const bunnySrc = "https://via.placeholder.com/50";
const fgSrc = "https://via.placeholder.com/360x90";
const obsSrc = "https://via.placeholder.com/36x54 ";

// Add image assets to DOM
gme.prepend("<img src='" + fgSrc + "'id='fg'/>");
gme.prepend("<img src='" + bunnySrc + "'id='bunny'/>");

// Get image assets and assign to variables
const bunny = $('#bunny');
const fg = $('#fg');

const gmeW = gme.width();
const ground = fg.height();
let bnyX = 24;
let bnyY = ground;
let obsX = gmeW-36;
let speed = 6000;

fg.css({"position":"absolute",
        "bottom":"0",
        "left":"0"});

bunny.css({"position":"absolute",
        "bottom":bnyY,
        "left":bnyX});

function hop() {
    $(document).off("keydown");
    bnyY += 120;
    bnyX += 120;
    bunny.animate({'bottom': bnyY, "left": bnyX}, 400, 'easeInBack', function() {
        bnyY = ground;
        bunny.animate({'bottom': bnyY}, 1200, 'easeOutBounce', function() {
        });
        setTimeout(listen, 900);
        if (bnyX > 24) {
            bnyX = 24;
            bunny.animate({'left': bnyX}, (speed*0.25));
        } 
    });        
};

function obstacles(){
    img = $("<img/>",{
        id: "obs",
        src: obsSrc
    });
    gme.append(img);
    const obs = $('#obs');
    obs.css({"position":"absolute",
            "bottom":ground,
            "left": obsX});
    obs.animate({'left': 0}, speed, "linear", function(){
        obs.remove();
        obstacles();
    });
    if (speed > 2000) {
        speed -= 200;
    } else {
        obs.stop();
        alert("GAME OVER!");
    }
}

function listen() {
    $(document).keydown(hop);
}
listen();
obstacles();