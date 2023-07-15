/*

The Game Project Part 4 side scrolling

Note: START and END comments are sections of code personally wrote without assistance.
*/

// Variable declarations
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;

// START
// Class Definitions
class Cloud {
    constructor({ x_pos, y_pos, size }) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.size = size;
    }

    // Draw the cloud method
    draw() {
        fill(255);
        const deltax = 30;
        const deltay = 30;
        ellipse(this.x_pos + deltax, this.y_pos + deltay, this.size, this.size);
        ellipse(this.x_pos + 30 + deltax, this.y_pos + deltay, this.size, this.size * 1.5);
        ellipse(this.x_pos + 60 + deltax, this.y_pos + deltay, this.size, this.size);
    }
}

// Mountan class 
class Mountain {
    constructor({ x_pos, y_pos, size }) {
            this.x_pos = x_pos;
            this.y_pos = y_pos;
            this.size = size;
        }
        // Draw the mountain method
    draw() {
        fill(220, 220, 220);
        triangle(this.x_pos,
            this.y_pos,
            this.x_pos + this.size,
            this.y_pos,
            this.x_pos + this.size / 2,
            this.y_pos - this.size);
    }
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
    collectable = { x_pos: 900, y_pos: floorPos_y - 50, size: 50, isFound: false };

    //Canyon object
    canyon = { x_pos: 100, width: 100 }

    // Trees x positions
    trees_x = [400, 450, 600];

    // Cloud array of objects
    clouds = [new Cloud({ x_pos: 400, y_pos: 50, size: 40 }),
        new Cloud({ x_pos: 120, y_pos: 40, size: 55 }),
        new Cloud({ x_pos: 700, y_pos: 30, size: 40 }),
        new Cloud({ x_pos: 800, y_pos: 80, size: 50 })
    ];

    // Cloud array of objects
    mountains = [new Mountain({ x_pos: 300, y_pos: floorPos_y, size: 80 }),
        new Mountain({ x_pos: 800, y_pos: floorPos_y, size: 200 }),
        new Mountain({ x_pos: 900, y_pos: floorPos_y, size: 150 })
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
    fill(100, 155, 255);
    rect(canyon.x_pos, 432, canyon.width, 144);

    //Draw the trees
    for (var i = 0; i < trees_x.length; i++) {
        drawTree({ x: trees_x[i], y: floorPos_y });
    }

    // Draw the clouds
    clouds.forEach(c => c.draw());

    // Draw the mountains
    mountains.forEach(c => c.draw());

    // Draw the collectable item
    if (!collectable.isFound) {
        stroke(0);
        fill(255, 215, 0);
        ellipse(collectable.x_pos, collectable.y_pos, collectable.size, collectable.size);
        noFill();
        stroke(0);
        ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 10, collectable.size - 10);
    }

    // Collectable item display disappear when collected
    if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 80) {
        collectable.isFound = true;
    }

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
    // Canyon character mechanics
    if (!isFalling & gameChar_x > canyon.x_pos + 10 & gameChar_x < canyon.x_pos + canyon.width - 10) {
        isPlummeting = true;
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
}