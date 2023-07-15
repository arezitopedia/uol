/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft; 
var isRight; 
var isFalling; 
var isPlummeting;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	isLeft = false; 
	isRight = false; 
	isFalling = false; 
	isPlummeting = false;

	collectable = {x_pos: 900, y_pos: floorPos_y-50, size: 50, isFound: false};
	canyon = {x_pos: 100, width: 100}


}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon

	//canyon 
	fill(100, 155, 255);
	rect(canyon.x_pos, 432, canyon.width, 144);

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		fill(100,0,0);
		rect(gameChar_x-10,gameChar_y-50,20,40);
		fill(0,0,0);
		//legs
		rect(gameChar_x-12,gameChar_y-10,7,7);
		rect(gameChar_x+1,gameChar_y-10,7,7);
		fill(255);
		//eyes
		rect(gameChar_x-7,gameChar_y-40,6,3);
		rect(gameChar_x+2,gameChar_y-40,6,3);
		// mouth
		fill(0);
		rect(gameChar_x-2,gameChar_y-35,3,3);
		//arms
		rect(gameChar_x-11,gameChar_y-35,5,15);
		rect(gameChar_x+7,gameChar_y-35,5,15);	
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		fill(100,0,0);
		rect(gameChar_x-10,gameChar_y-50,20,40);
		fill(0,0,0);
		//legs
		rect(gameChar_x-5,gameChar_y-10,7,7);
		rect(gameChar_x+5,gameChar_y-10,7,7);
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
	}
	else if(isLeft)
	{
		// add your walking left code
		// add your jumping facing forwards code
		fill(100,0,0);
		rect(gameChar_x-10,gameChar_y-50,20,40);
		fill(0,0,0);
		//legs
		rect(gameChar_x-12,gameChar_y-10,7,13);
		rect(gameChar_x+1,gameChar_y-10,7,13);
		fill(255);
		//eyes
		rect(gameChar_x-7,gameChar_y-40,6,3);
		rect(gameChar_x+2,gameChar_y-40,6,3);
		// mouth
		fill(0);
		rect(gameChar_x-2,gameChar_y-35,3,3);
		//arms
		rect(gameChar_x-11,gameChar_y-35,5,15);
		rect(gameChar_x+7,gameChar_y-35,5,15);
	}
	else if(isRight)
	{

		// add your jumping facing forwards code
		// add your standing front facing code
		fill(100,0,0);
		rect(gameChar_x-10,gameChar_y-50,20,40);
		fill(0,0,0);
		//legs
		rect(gameChar_x-5,gameChar_y-10,7,13);
		rect(gameChar_x+5,gameChar_y-10,7,13);
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
	}
	else if(isFalling || isPlummeting)
	{
		fill(100,0,0);
		rect(gameChar_x-10,gameChar_y-50,20,40);
		fill(0,0,0);
		//legs
		rect(gameChar_x-10,gameChar_y-10,7,7);
		rect(gameChar_x+3,gameChar_y-10,7,7);
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
	}
	else
	{
		// add your standing front facing code
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
	}

	//collectable
	if (dist(gameChar_x,gameChar_y,collectable.x_pos, collectable.y_pos)<80){
		collectable.isFound = true;
	}



	
	if (!collectable.isFound){
		stroke(0);
		fill(255, 215, 0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size, collectable.size);
		noFill();
		stroke(0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size-10, collectable.size-10);
	}
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isLeft==true){
		gameChar_x-=3;
	}else if (isRight==true){
        gameChar_x+=3;
	}
	if (gameChar_y<floorPos_y){
		gameChar_y+=3;
		isFalling=true;
	}else{
		isFalling=false;
	}

	if ( !isFalling & gameChar_x>canyon.x_pos+10 & gameChar_x<canyon.x_pos+canyon.width-10){
		isPlummeting = true;
	}

	if(isPlummeting){
		gameChar_y+=4
	}
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if (keyCode==65 & !isPlummeting){
		isLeft=true;
	}else if(keyCode==68 & !isPlummeting){
		isRight=true;
	}else if(keyCode==87 & isFalling==false & !isPlummeting){
		gameChar_y-=100
	};
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	if (keyCode==65){
		isLeft=false;
	}else if(keyCode==68){
		isRight=false;
	};
}
