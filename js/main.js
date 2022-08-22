// Get html div that is to be used as the game's container and assign to variable
const gme = $('#game-container');

// Assign variables to image asset sources
const bunnySrc = "https://via.placeholder.com/50";
const fgSrc = "https://via.placeholder.com/360x90";
const obsSrc = "https://via.placeholder.com/75";

// Add image assets to DOM
gme.prepend("<img src='" + fgSrc + "'id='fg'/>");
gme.prepend("<img src='" + bunnySrc + "'id='bunny'/>");
gme.prepend("<img src='" + obsSrc + "'id='obs'/>");


// Get image assets and assign to variables
const bunny = $('#bunny');
const fg = $('#fg');
const obs = $('#obs');

let bnyX = 24;
let bnyY = fg.height();
let obsX = gme.width();
let gravity = 1;

fg.css("position", "absolute");
fg.css("bottom", 0);
fg.css("left", 0);

bunny.css("position", "absolute");
bunny.css("bottom", bnyY);
bunny.css("left", bnyX);

obs.css("position", "absolute");
obs.css("bottom", fg.height());
obs.css("right", -75);

function hop() {
    bunny.animate({
        bottom: +150,
        left: +50
    })
}
$(document).keydown(hop)





// // Get html canvas and assign to cnv variable
// var cnv = document.getElementById("game-container");
// // Set contect to 2d (not 100% sure why???)
// var ctx = cnv.getContext("2d");

// // Assign variables to image assets
// var bunny = new Image();
// bunny.src = "https://via.placeholder.com/50";

// var fg = new Image();
// fg.src = "https://via.placeholder.com/360x90";

// var obs = new Image();
// obs.src = "https://via.placeholder.com/75";

// let bnyX = 24;
// let bnyY = cnv.height-(fg.height+bunny.height);  
// let obsX = cnv.width;
// let gravity = 1;

// // Ground level // cnv.height-(fg.height+bunny.height)

// $("html").keydown(hop);  
// $("html").click(hop);

// function hop(){
//     bnyY -=120;
//     bnyX +=180;
// }  

// function draw(){
//     ctx.fillStyle = "#9fdfdf";
//     ctx.fillRect(0, 0, 360, 540);
//     ctx.drawImage(bunny, bnyX, bnyY);
//     ctx.drawImage(fg, 0, cnv.height-fg.height);
//     ctx.drawImage(obs, obsX, cnv.height-(fg.height+obs.height));
//     obsX -=1;
    
//     if (bnyY <= cnv.height-(fg.height+bunny.height)) {
//         bnyY += gravity;
//     }
//     if (bnyX >= 20) {
//         bnyX -=0.5;
//     }

//     requestAnimationFrame(draw);

// }

// draw();