// COLLATE INTO BUILD FUNCTION TO SET THE SCENE
// Get html div that is to be used as the game's container and assign to variable
const gme = $('#game-container');

// Assign variables to image asset sources
const bunnySrc = "images/bunny.png";
const fgSrc = "images/fg.png";
const obsSrc = "images/obs.png";
const bgSrc = "images/bg.png";

// 
gme.prepend("<img src='" + bunnySrc + "'id='bunny'/>");
$('#play-again').hide();

// Get image assets and assign to variables
const bunny = $('#bunny');

//
const gmeW = gme.width();
const ground = 90;
let growth = 0;
let score = 0;
let stop = false;
let bnyX = 24;
let bnyY = ground-4;
let obsX = gmeW-36;
let speed = 6000;

// 
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscore = 0;
}
$('p.high-score').html(highscore);

// 
function foreground(){
    img = $("<img/>",{
        id: "fg",
        src: fgSrc
    });
    gme.prepend(img);
    const fg = $('#fg');
    fg.css({"position": "absolute",
            "width": 7200,
            "height": 90,
            "bottom": 0,
            "left": 0,
            "z-index": 2});
    fg.animate({'left': -6840}, speed*20, "linear", function(){
        fg.remove();
        if (stop === true) {
            return
        } else {
            foreground();
        }
    });
    return 
}
// 
function background(){
    img = $("<img/>",{
        id: "bg",
        src: bgSrc
    });
    gme.prepend(img);
    const bg = $('#bg');
    bg.css({"position": "absolute",
            "width": 720,
            "height": 57,
            "bottom": 88,
            "left": 0,
            "z-index": -1});
    bg.animate({'left': -360}, speed*2, "linear", function(){
        bg.remove();
        if (stop === true) {
            return
        } else {
            background();
        }
    });
    return 
}

bunny.css({"position":"absolute",
        "bottom":bnyY,
        "left":bnyX,
        "z-index":1});
// 
function hop() {
    if (bnyY === 86) {
        bnyY += 128;
        bnyX += 120;
        bunny.animate({'bottom': bnyY, "left": bnyX}, speed/6, 'easeOutSine', function() {
            bnyY = ground-4;
            bunny.animate({'bottom': bnyY}, speed/4, 'easeOutBounce');
        if (bnyX > 24) {
            bnyX = 24;
            bunny.animate({'left': bnyX}, (speed/4), "linear");
        }
        });
    }
};

function obstacles(){
    img = $("<img/>",{
        id: "obs",
        src: obsSrc
    });
    gme.append(img);
    const obs = $('#obs');
    obs.css({"position": "absolute",
            "bottom": (ground-70) + growth,
            "left": obsX,
            "z-index": -1});
    obs.animate({'left': 0}, speed, "linear", function(){
        obs.remove();
        if (speed > 2000) {
            speed -= 266;
            growth += 6;
        } 
        score += 10;
        if (stop === true) {
            return
        } else {
            obstacles();
        }
    });
    return 
}

// 
function positions() {
    let id = setInterval(getPos, 10);
    function getPos() {
        bnyPosX = bunny.position().left;
        bnyPosY = bunny.position().top;
        obsPosX = $('#obs').position().left;
        obsPosY = $('#obs').position().top;
        if ((bnyPosX + 36) >= obsPosX && (bnyPosY + 50) >= obsPosY && bnyPosX <= (obsPosX + 36)) {
            gameOver();
            clearInterval(id);
            return
        }   
    }
}
// 
function gameOver() {
    $('#obs').stop(true);
    $('#fg').stop(true);
    $('#bg').stop(true);
    bunny.stop(true);
    bunny.animate({"bottom": 0}, 600, "easeInBack");
    stop = true;
    $('#obs').remove();
    highScore();
    gme.append("<h2 class='game-over'>GAME OVER!</h2>" + "<h2 class='game-over'>YOUR SCORE: " + score + "</h2>");
    $('#play-again').show();
}
//
function listen() {
    if (stop === false) {
        $('body').on("keydown", function () {
            console.log("X:"+bnyX+"Y:"+bnyY);
            hop()
        });
        $('body').on("click", function () {
            console.log("X:"+bnyX+"Y:"+bnyY);
            hop()
        });
    }
}
function playAgain() {   
    bunny.hide();
    bnyX = 24;
    bnyY = ground-4;
    bunny.animate({'bottom': bnyY, "left": bnyX}, 1);
    bunny.show();
    growth = 0;
    score = 0;
    stop = false;
    obsX = gmeW-36;
    speed = 6000;
    $('#play-again').hide();
    $('.game-over').hide();
    $('#fg').remove();
    $('#bg').remove();
    foreground();
    background();
    positions();
    obstacles();
    start();
}
function highScore() {
    if (highscore !== null && score > highscore) {
        localStorage.setItem("highscore", score);
    } else if (highscore === null){
        localStorage.setItem("highscore", score);
    }
    highscore = localStorage.getItem("highscore");
    $('p.high-score').html(highscore);
}
function start() {
$('#play').one("click", function () {
    event.stopPropagation();
    $('#play').fadeOut()
    positions();
    obstacles();
    listen();
})
$('#play-again').one("click", function () {
    event.stopPropagation();
    playAgain();
})
}
background();
foreground();
start();
