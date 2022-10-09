// image assets src stored in this object
const assets = {
    bunny: "images/bunny.png",
    obstacle: "images/obs.png",
    foreground: "images/fg.png",
    background: "images/bg.png",
}

const environ = {
    container: $('#game-container'),
    foreground: $('#fg'),
    bunny: $('#bunny'),
}

// jQuery stuff here for now
// const fg = $('#fg');
environ.container.prepend("<img src='" + assets.bunny + "'id='bunny'/>");
$('#play-again').hide();
const bunny = $('#bunny');

// Foreground related things in this object literal
let foreground = {
    img: $("<img/>", {id: "fg", src: assets.foreground}),
    // elem: $('#fg'),
    style: {"position": "absolute",
            "width": 7200,
            "height": 90,
            "bottom": 0,
            "left": 0,
            "z-index": 2},
    animate: function() {
        environ.container.prepend(this.img);
        const fg = $('#fg');
        fg.css(this.style);
        fg.animate({'left': -6840}, measure.speed*20, "linear", function(){
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
// measure variables in this object literal
let measure = {
    width: environ.container.width(),
    ground: 90,
    growth: 0,
    speed: 6000,
}
// Bunny related things in this object literal
let bunnys = {
    elem: $('#bunny'), //PROB REMOVE
    x: 24,
    y: measure.ground-4,
    get style(){ return {
        "position":"absolute",
        "bottom": this.y,
        "left": this.x,
        "z-index":1
    }},
    // WHY DOES bunnys. WORK HERE RATHER THAN this. ????
    hop: function () {
        console.log('bunny: ' + bunnys.y);
        console.log('this: ' + this.y);
        if (bunnys.y === measure.ground-4) {
            bunnys.y += 128;
            bunnys.x += 120;
            bunny.animate({'bottom': this.y, "left": bunnys.x}, measure.speed/6, 'easeOutSine', function() {
                bunnys.y = measure.ground-4;
                console.log('bunny: ' + bunnys.y);
                console.log('this: ' + this.y);
                bunny.animate({'bottom': bunnys.y}, measure.speed/4, 'easeOutBounce');
            if (bunnys.x > 24) {
                bunnys.x = 24;
                bunny.animate({'left': bunnys.x}, (measure.speed/4), "linear");
            }
            });
        }
    }
}

let backgrounds = {
    style: {"position": "absolute",
            "width": 720,
            "height": 57,
            "bottom": 88,
            "left": 0,
            "z-index": -1},
    animate: function (){
        img = $("<img/>",{
            id: "bg",
            src: assets.background
        });
        environ.container.prepend(img);
        const bg = $('#bg');
        bg.css(this.style);
        bg.animate({'left': -360}, measure.speed*2, "linear", function(){
            bg.remove();
            if (stop === true) {
                return
            } else {
                backgrounds.animate();
            }
        });
        return 
    }
}


let score = 0;
let stop = false;

let obsX = environ.container.width()-36;

// 
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscore = 0;
}
$('p.high-score').html(highscore);


function obstacles(){
    img = $("<img/>",{
        id: "obs",
        src: assets.obstacle
    });
    environ.container.append(img);
    const obs = $('#obs');
    obs.css({"position": "absolute",
            "bottom": (measure.ground-70) + measure.growth,
            "left": obsX,
            "z-index": -1});
    obs.animate({'left': 0}, measure.speed, "linear", function(){
        obs.remove();
        if (measure.speed > 2000) {
            measure.speed -= 266;
            measure.growth += 6;
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
    environ.container.append("<h2 class='game-over'>GAME OVER!</h2>" + "<h2 class='game-over'>YOUR SCORE: " + score + "</h2>");
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
    bunnys.y = measure.ground-4;
    bunny.animate({'bottom': bunnys.y, "left": bunnys.x}, 1);
    bunny.show();
    measure.growth = 0;
    score = 0;
    stop = false;
    obsX = environ.container.width()-36;
    measure.speed = 6000;
    $('#play-again').hide();
    $('.game-over').hide();
    $('#fg').remove();
    $('#bg').remove();
    foreground.animate();
    backgrounds.animate();
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
bunny.css(bunnys.style);
backgrounds.animate();
foreground.animate();
start();