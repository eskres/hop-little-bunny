// Get html div that is to be used as the game's container and assign to variable
const gme = $('#game-container');

// Assign variables to image asset sources
const bunnySrc = "images/bunny.png";
const fgSrc = "images/fg.png";
const obsSrc = "images/obs.png";

// Add image assets to DOM
gme.prepend("<img src='" + fgSrc + "'id='fg' width='360' height='90'/>");
gme.prepend("<img src='" + bunnySrc + "'id='bunny'/>");

// Get image assets and assign to variables
const bunny = $('#bunny');
const fg = $('#fg');

console.log(fg.height());
console.log(fg.width());

const gmeW = gme.width();
const ground = fg.height();
let growth = 0;
let score = 0;
let stop = false;
let bnyX = 24;
let bnyY = ground-4;
let obsX = gmeW-36;
let speed = 6000;
// 
fg.css({"position":"absolute",
        "bottom":"0",
        "left":"0",
        "z-index": 1});
bunny.css({"position":"absolute",
        "bottom":bnyY,
        "left":bnyX,
        "z-index":1});
// 
function hop() {
    $('body').off("keydown");
    bnyY += 180;
    bnyX += 120;
    bunny.animate({'bottom': bnyY, "left": bnyX}, 600, 'easeInBack', function() {
        bnyY = ground-4;
        bunny.animate({'bottom': bnyY}, 2000, 'easeOutBounce', function() {
        });
        setTimeout(listen, 900);
        if (bnyX > 24) {
            bnyX = 24;
            bunny.animate({'left': bnyX}, (speed*0.25));
        }
    });
};
// 
function obstacles(){
    img = $("<img/>",{
        id: "obs",
        src: obsSrc
    });
    gme.append(img);
    const obs = $('#obs');
    obs.css({"position":"absolute",
            "bottom": (ground-70) + growth,
            "left": obsX,
            "z-index": -1});
    obs.animate({'left': 0}, speed, "linear", function(){
        obs.remove();
        if (speed > 2000) {
            speed -= 200;
            growth += 6;
        }
        score += 10;
        obstacles();
    });
    
}
// 
function positions() {
    let id = setInterval(getPos, 10);
    function getPos() {
        bnyPosX = bunny.position().left;
        bnyPosY = bunny.position().top;
        obsPosX = $('#obs').position().left;
        obsPosY = $('#obs').position().top;
        if ((bnyPosX + 50) >= obsPosX && (bnyPosY + 50) >= obsPosY && bnyPosX <= (obsPosX + 36)) {
            gameOver();
            clearInterval(id);
        }   
    }
}
// 
function gameOver() {
    $('#obs').stop(true);
    bunny.stop(true);
    bunny.animate({"bottom": 0}, 600, "easeInBack");
    stop = true;
    listen();
    // localStorage.setItem("test", score);
    // console.log(localStorage.getItem("test"));
    // Display game over message, final score + play again button
    gme.append("<h2>GAME OVER!</h2>" + "<h3>YOUR SCORE: " + score + "</h3>" + "<button type='button' id='play'>PLAY AGAIN?</button>");
    $(document).on("click", "#play", function(){
        console.log("test");
    });
}
//
function listen() {
    if (stop === false) {
        $('body').on("keydown", hop);
    }
    
}
positions();
listen();
obstacles();