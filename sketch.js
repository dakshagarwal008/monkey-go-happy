var PLAY=0;
var END=1;
var gameState= PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running" ,monkey_running) ; 
  monkey.scale=0.1;
 
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
 
   
}


function draw() {

  background(255);
  
  
  if(gameState===PLAY){
    
    stroke("white");
  textSize(20);
  fill("white");
  text("score"+score,200,50);
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/getFrameRate());
  text("SurvivalTime:"+survivalTime,100,50); 
    
    
    if(ground.x<0) {
    
    ground.x=ground.width/2;
    
  }

    if (obstacleGroup.isTouching(monkey)){
      
      gameState=END;
      
      
     
      
    }
    
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    
  }  
    
    console.log(monkey.y)
    
  if(keyDown("space")&&monkey.y>=314) {
    
    monkey.velocityY=-15;      
  } 
  
    
    
    
    
  monkey.velocityY=monkey.velocityY+0.8;
     
  }
    else if(gameState===END){
    
      ground.velocityX=0;
      banana.velocityX=0;
      obstacle.velocityX=0;  
      monkey.velocityY=0;
      
    
    }
  
  food();
  spawnObstacle();
  
  
  
  
  console.log(monkey.y)
  
  monkey.collide(ground);
  
  
  
  drawSprites();
}

function food(){
  
  if(frameCount%80===0){
    
    banana=createSprite(600,250,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=200;          
    FoodGroup.add(banana);
  }
  
  
}

function spawnObstacle(){
  
  if (frameCount%300===0){
    
    obstacle=createSprite(600,330,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=160;
    obstacle.velocityX=-4;
    obstacleGroup.add(obstacle);
    
    obstacle.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
    
    
  }
  
  
  
  
}











