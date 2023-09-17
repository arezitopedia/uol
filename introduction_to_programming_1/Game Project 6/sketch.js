/*

The Game Project Part 4 side scrolling

1. Add a score counter [1 marks]
	- create a global variable called `game_score`
	- increment `game_score` by one each time the character collects an item.
	- use the text function to draw the score on the screen.

2. Add a flagpole [1 marks]
	- We need to add an end to your level. I have chosen a flagpole but you can chose according to the theme of your game.
	- Initialise an object called `flagpole`, it should at least have the properties `x_pos` and `isReached`.
	- set `isReached` to `false` and `x_pos` to a world position at the very end of your level.
	- create a function called `renderFlagpole` and call this from the draw function
	- complete the function to draw your flagpole in two states. One for when `isReached` is false,
	and one for when it is `true`

3. Flagpole checking function [1 marks]
	- create a function called `checkFlagpole`
	- call the function from `draw`, but write a conditional so that `checkFlagpole` is only called when `flagpole.isReached` is `false`
	- in `checkFlagpole` write a conditional such that when the gameChar is in range of the flagpole
	its `isReached` property is set to `true`

4. Add lives [2 marks]
	- Your character should begin with three lives, and each time they fall down a canyon the game
	 should reset and their remaining lives decrement by one.
	- Create a global variable `lives`, and initialise it to `3` within `setup`.
	- Create a function called `checkPlayerDie`. Call this within draw.
	- In this function define a conditional statement that tests if your character has fallen below
	the bottom of the canvas. When this is `true`, decrement the `lives` counter by one
	- Create a new function called `startGame()`.
	- Move everything from `setup` except `createCanvas` and the initialisation of `floorPos_y` and
	`lives` into this new function.
	- At the end of your now very short `setup` function call `startGame()`.
	- In `checkPlayerDie` create a conditional statement to test if the player has
	used all of their lives. If there are lives remaining call `startGame`.
	- Write some code using a `for` loop to draw life tokens onto the screen so that you
	can keep track of how many lives you have remaining.

5. "Game over" and "Level complete" text [2 marks]
	- In the draw loop, after your drawing code and before your game logic
	code, write two conditional statements
	- The first displays "Game over. Press space to continue."
	when `lives` is less than 1.
	- The other displays "Level complete. Press space to continue." when
	`flagpole.isReached` is true
	- For each conditional you should return at the end of the statement. This
	prevents any further game logic from happening when play is over.


	6. Tidy your code [3 marks]
	- make sure your code is elegant
		- remove all commented blocks of code
		- check all indentations
		- make your variable names consistent
		- remove any redundant code
		- refactor unwieldy drawing code
		- break up long commands onto multiple lines
*/

// Variable declarations
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var game_score =0;


// Draw the cloud method
const drawCloud = ({ x, y, size }) => {
    fill(255);
    const deltax = 30;
    const deltay = 30;
    ellipse(x + deltax, y + deltay, size, size);
    ellipse(x + 30 + deltax, y + deltay, size, size * 1.5);
    ellipse(x + 60 + deltax, y + deltay, size, size);
}

// Mountan class 

const drawMountain = ({ x, y, size }) => {
    fill(220, 220, 220);
    triangle(x,
        y,
        x + size,
        y,
        x + size / 2,
        y - size);
}

// Draw Function Definition
const drawTree = ({ x, y }) => {
    // Tree draw arrow function.  x,y are the coordinatres of the tree
    noStroke();
    fill(255);
    const trunkDistance = 45;
    fill(139, 69, 19);

    rect(x + trunkDistance, y, 30, -80);
    fill(0, 155, 0);
    ellipse(x + (815 - 800) + trunkDistance, y + -(432 - 372) - 20, 50, 50);
    ellipse(x + (815 - 800) + trunkDistance, y + -(432 - 352) - 20, 70, 50);
    ellipse(x + (815 - 800) + trunkDistance, y + -(432 - 322) - 20, 50, 50);
}

// Draw Collectable
const drawCollectable = ({ t_collectable }) => {
    const draw = ({ x, y, size }) => {
        stroke(0);
        fill(255, 215, 0);
        ellipse(x, y, size, size);
        noFill();
        stroke(0);
        ellipse(x, y, size - 10, size - 10);
    };
    draw({
        x: t_collectable.x_pos,
        y: t_collectable.y_pos,
        size: t_collectable.size
    })
}

const drawCayon = ({ t_canyon }) => {
    const draw = ({ x, width }) => {
        fill(100, 155, 255);
        rect(x, 432, width, 144);
    };
    draw({ x: t_canyon.x_pos, width: t_canyon.width })
}

const checkCollectable = ({ t_collectable }) => {
    // Collectable item display disappear when collected
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 80) {
        if (!t_collectable.isFound) {game_score+=1};
        t_collectable.isFound = true;
    }
}

const checkCanyon = ({ t_canyon }) => {
    // Canyon character mechanics
    if (!isFalling & gameChar_x > t_canyon.x_pos + 10 & gameChar_x < t_canyon.x_pos + t_canyon.width - 10) {
        isPlummeting = true;
    }
}

const collectableMechanic = (c) => {
        if (!c.isFound) { drawCollectable({ t_collectable: c }) };
        // Check collectable
        checkCollectable({ t_collectable: c });
    }
    // END

// p5.js setup function
function setup() {

    //Canvas setup
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // START
    //Game Mechanics vars
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    cameraPosX = 0; //Camara x position

    // Colectable object
    collectables = [{ x_pos: 900, y_pos: floorPos_y - 50, size: 50, isFound: false },
        { x_pos: 50, y_pos: floorPos_y - 50, size: 50, isFound: false }
    ];

    //Canyon object
    canyons = [{ x_pos: 100, width: 100 }, { x_pos: 700, width: 100 }]

    // Trees x positions
    trees_x = [400, 450, 600];

    // Cloud array of objects
    clouds = [{ x_pos: 400, y_pos: 50, size: 40 },
        { x_pos: 120, y_pos: 40, size: 55 },
        { x_pos: 700, y_pos: 30, size: 40 },
        { x_pos: 800, y_pos: 80, size: 50 }
    ];

    // Cloud array of objects
    mountains = [{ x_pos: 300, y_pos: floorPos_y, size: 80 },
        { x_pos: 800, y_pos: floorPos_y, size: 200 },
        { x_pos: 900, y_pos: floorPos_y, size: 150 }
    ];
    // END
}



function draw() {

    // Draw sky blue color
    background(100, 155, 255);

    //Draw the Ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);

    // START

    // Side Scrolling
    push();
    cameraPosX = gameChar_x - width / 2; //Center the camera (half screen) on character
    translate(-cameraPosX, 0);

    //Draw the canyon
    canyons.forEach(c => {
        drawCayon({ t_canyon: c });
        checkCanyon({ t_canyon: c })
    });

    //Draw the trees
    for (var i = 0; i < trees_x.length; i++) {
        drawTree({
            x: trees_x[i],
            y: floorPos_y
        });
    }

    // Draw the clouds
    clouds.forEach(c => drawCloud({
        x: c.x_pos,
        y: c.y_pos,
        size: c.size
    }));

    // Draw the mountains
    mountains.forEach(c => drawMountain({
        x: c.x_pos,
        y: c.y_pos,
        size: c.size
    }));


    collectables.forEach(c => collectableMechanic(c));


    //Draw the game character
    if (isLeft && isFalling) {
        // add your jumping-left code
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 12, gameChar_y - 10, 7, 7);
        rect(gameChar_x + 1, gameChar_y - 10, 7, 7);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    } else if (isRight && isFalling) {
        // add your jumping-right code
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 5, gameChar_y - 10, 7, 7);
        rect(gameChar_x + 5, gameChar_y - 10, 7, 7);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    } else if (isLeft) {
        // add your walking left code
        // add your jumping facing forwards code
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 12, gameChar_y - 10, 7, 13);
        rect(gameChar_x + 1, gameChar_y - 10, 7, 13);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    } else if (isRight) {

        // add your jumping facing forwards code
        // add your standing front facing code
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 5, gameChar_y - 10, 7, 13);
        rect(gameChar_x + 5, gameChar_y - 10, 7, 13);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    } else if (isFalling || isPlummeting) {
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 10, gameChar_y - 10, 7, 7);
        rect(gameChar_x + 3, gameChar_y - 10, 7, 7);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    } else {
        // add your standing front facing code
        fill(100, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
        fill(0, 0, 0);
        //legs
        rect(gameChar_x - 10, gameChar_y - 10, 7, 13);
        rect(gameChar_x + 3, gameChar_y - 10, 7, 13);
        fill(255);
        //eyes
        rect(gameChar_x - 7, gameChar_y - 40, 6, 3);
        rect(gameChar_x + 2, gameChar_y - 40, 6, 3);
        // mouth
        fill(0);
        rect(gameChar_x, gameChar_y - 35, 3, 3);
        //arms
        rect(gameChar_x - 11, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 7, gameChar_y - 35, 5, 15);
    }
    
    // Side scrolling
    pop();

    // Update collectable

    fill(255)
    noStroke();
    text(`Game Score: ${game_score}`, 20,20)
    // Character Movement
    // Move character left and right
    if (isLeft == true) {
        gameChar_x -= 3;
    } else if (isRight == true) {
        gameChar_x += 3;
    }
    // Check if character is falling, if it is then free fall 
    if (gameChar_y < floorPos_y) {
        gameChar_y += 3;
        isFalling = true;
    } else {
        isFalling = false;
    }

    // Plummeting mechanics
    if (isPlummeting) {
        gameChar_y += 4
    }

    
    //END
}


function keyPressed() {
    // START
    // Key movement controls
    if (keyCode == 65 & !isPlummeting) {
        isLeft = true;
    } else if (keyCode == 68 & !isPlummeting) {
        isRight = true;
    } else if (keyCode == 87 & isFalling == false & !isPlummeting) {
        gameChar_y -= 100
    };
    // END
}

function keyReleased() {
    //START
    // Key release movement controls
    if (keyCode == 65) {
        isLeft = false;
    } else if (keyCode == 68) {
        isRight = false;
    };
    //END
} //END