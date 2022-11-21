# Hop Little Bunny

Completed during my 3rd week General Assembly’s Software Engineering Immersive, a game inspired by the brilliant side scrolling games of the late \'80s and early \'90s, the simple mechanics of the viral hit flappy bird and one of my daughter's favourite nursery rhymes.

---
| Table of Contents |
|-|
| [Technologies Used](#Technologies-Used) |
| [Brief](#Brief) |
| [Planning](#Planning) |
| [Build Process](#Build-Process) |
| [Challenges](#Challenges) |
| [Wins](#Wins) |
| [Key Learnings](#Key-Learnings) |
| [Bugs](#Bugs) |
| [Future Improvements](#Future-Improvements) |

---
## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery
- jQueryUI

---
## Brief

Our brief was to create a fully functioning browser based game of our choice or design in 7 days with the following requirements specified:
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat  -  - Yourself) principles
- Use JavaScript and/or jQuery for DOM manipulation
- Deploy your online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)
- Have well-formatted, and well-commented code
---
## Planning

I started by revisiting my favourite side scrolling games to get a renewed perspective on them as I had never given much thought about what is happening behind the scenes whilst playing them in the past. This step evolved into a sort of feasibility study and I consequently decided that the objective of my game would be to avoid obstacles, the game would be continuously scrolling with a parallax effect and that the only action would be to “hop”. My ambition was to challenge myself as much as possible within the time available. I drew a very basic wireframe in Microsoft Paint and wrote some user stories before creating a to do list. These can be found below:

#### Wireframe of website layout
![Wireframe of website layout](https://i.imgur.com/OfNiJBQ.jpg)

#### Wireframe including a rought sketch of the game
![Wireframe of website layout including rough sketch of game](https://i.imgur.com/3wDK1ag.jpg)

#### User Stories
- As a user I want to play a game that requires just one repetitive input so that I do not have a steep learning curve or skill barrier to overcome.
- As a user I want to play a game for as long or as little time as I like so that I can enjoy it anytime without having to commit a block of time.
- As a user I want to see what the highest scores achieved are so that I can try and compete against them.

## To Do List
- Build Skeleton Website
    - Decide the game\'s container size and build it out with html and css
    - Add placeholder for highscores
    - Add placeholder for a very short instructions section
    - Add minimal css styles

- Start coding the game logic using placeholder images instead of artwork
    - Animate character with user inputs
	- Limit user inputs
	- Remove elements that leave the container
    - Animate obstacles
    - Increase obstacle speed incrementally
    - Figure out how to handle collisions between character and obstacles
    - Animate scrolling section of background
    - Create scoring system
    - Create system to log highscores

- Create artwork
- Replace colour blocks with artwork
- Finalise CSS syling
- Make website responsive
- Check for any missed bugs
---
## Build Process

I approached the project in 3 stages. First was to build the core structure, second was to build the functionality and third would be refinement and aesthetics.

### Stage 1
This was very brief and consisted of building the minimum structure for the page plus some temporary styling.

### Stage 2
I decided to approach this stage element by element e.g. animate the bunny and then animate the obstacle and so on. Initially I used HTML\'s \<canvas> and JavaScript\'s requestAnimationFrame(). Although I was able to make good progress I decided to switch to jQuery\'s .animate() as I had more experience with it from our lectures and thought the learning curve wouldn\'t be as steep. From here I was able to regain the ground I lost fairly quickly and progress to collision detection which was easier than I expected thanks to jQuery\'s .position() method.

### Stage 3
This stage saw me focusing on creating the artwork for the game, working on my css styles and trying to break the game in any way possible.


### Highlights
#### Collision Detection
```
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
```
Here I have used setInterval to get the positions of the bunny and the obstacle every 10 milliseconds and then check for any overlap. As a beginner this function felt like a leap forward for me and is probably my favourite in the game.
#### Bunny Animation
```
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
```
Here we have 3 animations for the bunny first up to its maximum height then back to the ground before moving back to the starting position. In this function I used jQueryUI’s easings to give the animations a more natural feel.
#### Background Animation
```
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
```
This animation is for the background and it is almost identical to the obstacle and foreground animations apart from the speed which is slower to help create a parallax effect and give a sense of depth.

---
## Challenges
My biggest challenges centred around event listeners. When I tried to implement the \"Game Over/Play Again\" functionality I could not get my event listener for the \"play again\" button to work at all when placed inside the game container. I eventually moved it outside of and below the game container so that I could move forward. At this point I also encountered problems with click events accumulating and causing the bunny to double or triple hop. This is something that I was only able to resolve after the project\'s deadline. I resolved this issue by encasing the bunny\'s hop animation in an if statement (to check the bunny was back at ground level) and by using stopPropogation() on my button event listeners.

---
## Wins
I am very pleased with my game, particularly the visual design and animation. I wanted my game to have the look and feel of games from my childhood and I think I was able to achieve that. I am also proud of how much I was able to learn and put to use during the course of this project.

---
## Key Learnings
I think my biggest area for learning on this project was with regards to basic animation techniques with jQuery. This has been something I have enjoyed and would like to explore in further detail in the future.

This project really helped me with my overall confidence and self belief with regards to my coding ability. I would not have believed that I could create a project like this from scratch a week or two before I started this project.

---
## Bugs
At this stage, no bugs have been detected.

---
## Future Improvements
I think the game would be more enjoyable with additional interactive elements so that it is more challenging and engaging for the player. Ways that I have thought about doing this are by adding \"carrots\" that the player has to collect and by adding platforms / changes in the ground level in front of obstacles. I would also like to add sound effects for collisions and the \"hop\" in order to make the game more immersive.

---