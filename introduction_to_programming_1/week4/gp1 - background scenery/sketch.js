/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup() {
    createCanvas(1024, 576);
}

function draw() {
    background(100, 155, 255); //fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144); //draw some green ground

    //1. a cloud in the sky
    //... add your code here

    noStroke();
    fill(255);
    text("cloud", 200, 100);
    const deltax = 30;
    const deltay = 30;
    ellipse(200 + deltax, 100 + deltay, 50, 50);
    ellipse(230 + deltax, 100 + deltay, 50, 75);
    ellipse(260 + deltax, 100 + deltay, 50, 50);

    //2. a mountain in the distance
    //... add your code here

    noStroke();
    fill(255);
    text("mountain", 500, 256);
    fill(139, 69, 19);
    triangle(500, 432, 700, 432, 600, 250);
    //3. a tree
    //... add your code here

    noStroke();
    fill(255);
    text("tree", 800, 346);
    fill(139, 69, 19);
    const deltax2 = 45;
    rect(800 + deltax2, 432, 30, -70);
    fill(0, 155, 0);
    ellipse(815 + deltax2, 372, 50, 50);
    ellipse(815 + deltax2, 352, 70, 50);
    ellipse(815 + deltax2, 322, 50, 50);

    //4. a canyon
    //NB. the canyon should go from ground-level to the bottom of the screen

    //... add your code here

    noStroke();
    fill(255);
    text("canyon", 100, 480);
    fill(100, 155, 255);
    rect(150, 432, 100, 144);

    //5. a collectable token - eg. a jewel, fruit, coins
    //... add your code here

    noStroke();
    fill(255);
    text("collectable item", 400, 400);
    noStroke();
    stroke(0);
    fill(255, 215, 0);
    ellipse(350, 390, 50, 50);
    noFill();
    stroke(0);
    ellipse(350, 390, 40, 40);

}