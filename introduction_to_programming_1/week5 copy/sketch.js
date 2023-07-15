/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {x_pos: 0, width: 100}
	
	collectable = {x_pos: 100, y_pos: 100, size: 50}
	cloud = {x_pos: 400, y_pos: 50, size: 40}
	mountain = {x_pos: 200, y_pos: floorPos_y-100/2, size: 100}

}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, height, width - floorPos_y); //draw some green ground


	//cloud
    fill(255);
    const deltax = 30;
    const deltay = 30;
    ellipse(cloud.x_pos + deltax, cloud.y_pos + deltay, cloud.size, cloud.size);
    ellipse(cloud.x_pos + 30 + deltax, cloud.y_pos + deltay, cloud.size, cloud.size*1.5);
    ellipse(cloud.x_pos + 60 + deltax, cloud.y_pos + deltay, cloud.size, cloud.size);

	//mountain
	fill(139, 69, 19);
    triangle(mountain.x_pos-mountain.size/2, 
	         mountain.y_pos+mountain.size/2, 
			 mountain.x_pos+mountain.size/2, 
			 mountain.y_pos+mountain.size/2, 
			 mountain.x_pos, 
			 mountain.y_pos-mountain.size/2);

	//tree

    noStroke();
    fill(255);
    const deltax2 = 45;
	fill(139, 69, 19);

    rect(treePos_x + deltax2, treePos_y + 65, 30, 80);
    fill(0, 155, 0);
    ellipse(treePos_x+ (815-800) + deltax2, treePos_y+ (432-372)-20, 50, 50);
    ellipse(treePos_x+ (815-800) + deltax2, treePos_y+ (432-352)-20, 70, 50);
    ellipse(treePos_x+ (815-800) + deltax2, treePos_y+ (432-322)-20, 50, 50);

	//canyon 
	fill(100, 155, 255);
    rect(canyon.x_pos, 432, canyon.width, 144);


	//collectable

    stroke(0);
    fill(255, 215, 0);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size, collectable.size);
    noFill();
    stroke(0);
    ellipse(collectable.x_pos, collectable.y_pos, collectable.size-10, collectable.size-10);

	//game character
	//body
	fill(100,0,0);
	rect(gameChar_x-10,gameChar_y-50,20,40);
	fill(0,0,0);
	//legs
	rect(gameChar_x-10,gameChar_y-10,7,13);
	rect(gameChar_x+3,gameChar_y-10,7,13);
	fill(255);
	//eyes
	rect(gameChar_x-7,gameChar_y-40,6,3);
	rect(gameChar_x+2,gameChar_y-40,6,3);
	// mouth
	fill(0);
	rect(gameChar_x,gameChar_y-35,3,3);
	//arms
	rect(gameChar_x-11,gameChar_y-35,5,15);
	rect(gameChar_x+7,gameChar_y-35,5,15);

	

	// -------------------------------


}

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;

}
