// Variable declarations
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var game_score;
var gameChar_world_x;
var flagpole;
var lives = 3;
var endGame = false;

// Draw the cloud method
const drawCloud = ({
    x,
    y,
    size
}) => {
    fill(255);
    const deltax = 30;
    const deltay = 30;
    ellipse(x + deltax, y + deltay, size, size);
    ellipse(x + 30 + deltax, y + deltay, size, size * 1.5);
    ellipse(x + 60 + deltax, y + deltay, size, size);
}

// Mountan class 
const drawMountain = ({
    x,
    y,
    size
}) => {
    fill(220, 220, 220);
    triangle(x,
        y,
        x + size,
        y,
        x + size / 2,
        y - size);
}

// Draw Function Definition
const drawTree = ({
    x,
    y
}) => {
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



// Draw Function Definition
const drawHeart = ({
    x,
    y
}) => {
    // Edited Heart function extracted from p5js scketch. Added color change.
    // Mithru (2023) Heart function (Version 1.0) [Source code]. https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg. 
    function heart(x, y, size) {
        noStroke();
        fill(255, 87, 51);
        beginShape();
        vertex(x, y);
        bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        endShape(CLOSE);
        noFill();
    }

    heart(x, y, 25);

}

// Draw Collectable
const drawCollectable = ({
    t_collectable
}) => {
    const draw = ({
        x,
        y,
        size
    }) => {
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

const drawCayon = ({
    t_canyon
}) => {
    const draw = ({
        x,
        width
    }) => {
        fill(100, 155, 255);
        rect(x, 432, width, 144);
    };
    draw({
        x: t_canyon.x_pos,
        width: t_canyon.width
    })
}

const drawCharcter = () => {
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
}

function renderFlagpole() {
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(123, 52, 255);
    noStroke();

    if (flagpole.isReached) {
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    } else {
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);

    }
    pop();
}

function checkFlagpole() {

    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 20) {
        return true
    } else {
        return false
    }

}

const checkCollectable = ({
    t_collectable
}) => {
    // Collectable item display disappear when collected
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 80) {
        if (!t_collectable.isFound) {
            game_score += 1
        };
        t_collectable.isFound = true;
    }
}

const checkCanyon = ({
    t_canyon
}) => {
    // Canyon character mechanics
    if (!isFalling & gameChar_x > t_canyon.x_pos + 10 & gameChar_x < t_canyon.x_pos + t_canyon.width - 10) {
        isPlummeting = true;
    }
}

const checkPlayerDie = () => {

    if (gameChar_y >= height) {
        if (lives > 0) {
            //Decrease one life counter
            lives -= 1;

            //If lives remaingn start game
            startGame();
        }
    } else {
        return false
    }
}

const collectableMechanic = (c) => {
    if (!c.isFound) {
        drawCollectable({
            t_collectable: c
        })
    };
    // Check collectable
    checkCollectable({
        t_collectable: c
    });
}

const DrawEndText = (message) => {
    fill(0, 0, 0, 120);
    rect(0, 0, width, height);
    fill(255, 255, 255)
    noStroke();
    textSize(45);
    textFont('Georgia');
    textAlign(CENTER);
    text(message, width / 2, height / 2);
}

//game setup

const startGame = () => {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Variable to control background scrolling
    scrollPos = 0;

    // START
    //Game Mechanics vars
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    game_score = 0;
    gameChar_world_x;
    flagpole = {
        isReached: false,
        x_pos: 900
    };

    // Colectable object
    collectables = [{
        x_pos: 900,
        y_pos: floorPos_y - 50,
        size: 50,
        isFound: false
    },
    {
        x_pos: 50,
        y_pos: floorPos_y - 50,
        size: 50,
        isFound: false
    }
    ];

    //Canyon object
    canyons = [{
        x_pos: 100,
        width: 100
    }, {
        x_pos: 700,
        width: 100
    }]

    // Trees x positions
    trees_x = [400, 450, 600];

    // Cloud array of objects
    clouds = [{
        x_pos: 400,
        y_pos: 50,
        size: 40
    },
    {
        x_pos: 120,
        y_pos: 40,
        size: 55
    },
    {
        x_pos: 700,
        y_pos: 30,
        size: 40
    },
    {
        x_pos: 800,
        y_pos: 80,
        size: 50
    }
    ];

    // Cloud array of objects
    mountains = [{
        x_pos: 300,
        y_pos: floorPos_y,
        size: 80
    },
    {
        x_pos: 800,
        y_pos: floorPos_y,
        size: 200
    },
    {
        x_pos: 900,
        y_pos: floorPos_y,
        size: 150
    }
    ];
    // END

}
// p5.js setup function
function setup() {

    //Canvas setup
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;

    //Start game
    startGame();
}



function draw() {
    // If endgame disable draw
    if (endGame) return

    // Draw sky blue color
    background(100, 155, 255);

    //Draw the Ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);

    // START

    // Side Scrolling
    push();
    translate(scrollPos, 0);

    //Draw the canyon
    canyons.forEach(c => {
        drawCayon({
            t_canyon: c
        });
        checkCanyon({
            t_canyon: c
        })
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

    // Draw Collactables
    collectables.forEach(c => collectableMechanic(c));

    // Draw Character
    drawCharcter();


    // Render FlagPole
    renderFlagpole();
    // Side scrolling
    pop();

    // Score
    fill(0, 0, 0)
    noStroke();
    textSize(25);
    textFont('Georgia')
    text(`Game Score: ${game_score}`, 40, 40)

    // Draw Lives
    textSize(25);
    textFont('Georgia')
    text(`Lives`, 40, 70)
    Array.from(Array(lives).keys()).forEach(c => {
        drawHeart({
            "x": c * 35 + 130,
            "y": 53
        });
    });


    // Character Mechanics
    gameChar_world_x = gameChar_x + scrollPos;

    // Plummeting
    if (isPlummeting) {
        gameChar_y += 4
    }

    //Scrolling 
    if (isLeft) {
        if (gameChar_world_x > width * 0.2) {
            gameChar_x -= 5;
        } else {
            gameChar_x -= 5;
            scrollPos += 5;
        }

    }
    if (isRight) {
        if (gameChar_world_x < width * 0.8) {
            gameChar_x += 5;
        } else {
            gameChar_x += 5;
            scrollPos -= 5;
        }

    }

    // Check if character is falling, if it is then free fall 
    if (gameChar_y < floorPos_y) {
        gameChar_y += 3;
        isFalling = true;
    } else {
        isFalling = false;
    }

    // Check if Flagpole has been reached
    if (flagpole.isReached == false) {
        flagpole.isReached = checkFlagpole();
    }

    //Check if player died
    checkPlayerDie()

    //EndGame Message
    if (lives === 0) {
        endGame = true;
        DrawEndText("Game Over. Press Space to Restart");
    }
    //Next Level message
    if (flagpole.isReached) {
        DrawEndText("Level Complete. Press Space to Restart");
        // 0.5 Second timer render flagpole to up position
        setTimeout(function () {
            endGame = true;
        }, 500);
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
} //END