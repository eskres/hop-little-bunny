// image assets src stored in this object
const assets = {
    bunny: "images/bunny.png",
    obstacle: "images/obs.png",
    foreground: "images/fg.png",
    background: "images/bg.png",
}

// jQuery stuff here for now
const gme = $('#game-container');
const fg = $('#fg');
gme.prepend("<img src='" + assets.bunny + "'id='bunny'/>");
$('#play-again').hide();
const bunny = $('#bunny');

// Foreground related things in this object literal
let foreground = {
    img: $("<img/>", {id: "fg", src: assets.foreground}),
    elem: $('#fg'),
    style: {"position": "absolute",
            "width": 7200,
            "height": 90,
            "bottom": 0,
            "left": 0,
            "z-index": 2},
    animate: function() {
        gme.prepend(this.img);
        const fg = $('#fg');
        fg.css(this.style);
        fg.animate({'left': -6840}, sandbox.speed*20, "linear", function(){
        fg.remove();
        if (stop === true) {
            return
        } else {
            foreground.animate();
        }
    });
    return 
    }
}
// Sandbox variables in this object literal
let sandbox = {
    elem: $('#game-container'), //PROB REMOVE
    width: gme.width(),
    ground: 90,
    growth: 0,
    speed: 6000,
}
// Bunny related things in this object literal
let bunnys = {
    elem: $('#bunny'), //PROB REMOVE
    style: {"position":"absolute",
            "bottom": this.Y, //setter?
            "left": this.X, //setter?
            "z-index":1},
    x: 24,
    y: sandbox.ground-4,
    // WHY DOES bunnys. WORK HERE RATHER THAN this. ????
    hop: function () {
        if (bunnys.y === 86) {
            bunnys.y += 128;
            bunnys.x += 120;
            bunny.animate({'bottom': bunnys.y, "left": bunnys.x}, sandbox.speed/6, 'easeOutSine', function() {
                bunnys.y = sandbox.ground-4;
                bunny.animate({'bottom': bunnys.y}, sandbox.speed/4, 'easeOutBounce');
            if (bunnys.x > 24) {
                bunnys.x = 24;
                bunny.animate({'left': bunnys.x}, (sandbox.speed/4), "linear");
            }
            });
        }
    }
}



let score = 0;
let stop = false;
// let bnyX = 24;
// let bnyY = sandbox.ground-4;
let obsX = gme.width()-36;

// 
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscore = 0;
}
$('p.high-score').html(highscore);

function background(){
    img = $("<img/>",{
        id: "bg",
        src: assets.background
    });
    gme.prepend(img);
    const bg = $('#bg');
    bg.css({"position": "absolute",
            "width": 720,
            "height": 57,
            "bottom": 88,
            "left": 0,
            "z-index": -1});
    bg.animate({'left': -360}, sandbox.speed*2, "linear", function(){
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
        "bottom": bunnys.y,
        "left": bunnys.x,
        "z-index":1});

function obstacles(){
    img = $("<img/>",{
        id: "obs",
        src: assets.obstacle
    });
    gme.append(img);
    const obs = $('#obs');
    obs.css({"position": "absolute",
            "bottom": (sandbox.ground-70) + sandbox.growth,
            "left": obsX,
            "z-index": -1});
    obs.animate({'left': 0}, sandbox.speed, "linear", function(){
        obs.remove();
        if (sandbox.speed > 2000) {
            sandbox.speed -= 266;
            sandbox.growth += 6;
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
        // console.log(bnyPosX+36);
        bnyPosY = bunny.position().top;
        // console.log(bnyPosY+50);
        obsPosX = $('#obs').position().left;
        // console.log(obsPosX+36);
        obsPosY = $('#obs').position().top;
        // console.log(obsPosY);
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
            bunnys.hop()
        });
        $('body').on("click", function () {
            bunnys.hop()
        });
    }
}
function playAgain() {   
    bunny.hide();
    bunnys.x = 24;
    bunnys.y = sandbox.ground-4;
    bunny.animate({'bottom': bunnys.y, "left": bunnys.x}, 1);
    bunny.show();
    sandbox.growth = 0;
    score = 0;
    stop = false;
    obsX = gme.width()-36;
    sandbox.speed = 6000;
    $('#play-again').hide();
    $('.game-over').hide();
    $('#fg').remove();
    $('#bg').remove();
    foreground.animate();
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
foreground.animate();
start();