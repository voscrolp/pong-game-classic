var playerPaddle,computerPaddle;
var ball;
var dottedLine;
var gameState;

var playerScore,computerScore;

function preload(){
  dottedLine = loadImage("dotted line.png");
}

function setup() {
  createCanvas(800,600);
  computerPaddle = createSprite(50,300,10,75);
  computerPaddle.shapeColor = 'white';

  playerPaddle = createSprite(750,300,10,75);
  playerPaddle.shapeColor = 'white';

  ball = createSprite(400,300,10,10);
  ball.shapeColor = 'white';

  playerScore = 0;
  computerScore = 0;

  gameState = "serve";
}

function draw() {
  background(0);
  console.log(gameState);

  if(gameState == "serve"){
    //serve ball
    if(keyWentDown("space")){
      serve();
    }

    //change state when score = 5
    if(playerScore == 5 || computerScore == 5){
      gameState = "end";
    }
  }
  

  //create dotted line
  imageMode(CENTER);
  image(dottedLine,400,300,20,600);

  if(gameState == "play"){
  //create playerPaddle movement
  if(keyDown('up')){
    playerPaddle.y = playerPaddle.y - 10;
  }

  if(keyDown('down')){
    playerPaddle.y = playerPaddle.y + 10;
  }

  //reset ball when score
  if(ball.isTouching(edges[0])){
    reset();
    playerScore = playerScore + 1;
  }

  if(ball.isTouching(edges[1])){
    reset();
    computerScore = computerScore + 1;
  }
}

  if(gameState == "end"){
    if(keyWentDown('r' || 'R')){
      bigboireset();
    }
  }

  

  //create computerPaddle movement
  computerPaddle.y = ball.y;

  //ball bounce off walls and paddles
  edges = createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);

  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);






  drawSprites();

  //create text for score
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text(computerScore,325,100);
  text(playerScore,475,100);

  textSize(25)
  //display serve text
  if(gameState == "serve"){
    text("Press Space to Serve",400,250);
  }

  if(gameState == "end"){
    text("Game Over! Press R to restart",400,250);
  }
}

function serve(){
  ball.velocityX = 6;
  ball.velocityY = 8;
  gameState = "play";
}

function reset(){
  ball.velocityX = 0;
  ball.velocityY = 0;
  ball.x = 400;
  ball.y = 300;
  playerPaddle.y = 300;
  computerPaddle.y = 300;
  gameState = "serve";
}

function bigboireset(){
  ball.velocityX = 0;
  ball.velocityY = 0;
  ball.x = 400;
  ball.y = 300;
  playerPaddle.y = 300;
  computerPaddle.y = 300;
  gameState = "serve";

  playerScore = 0;
  computerScore = 0;
}