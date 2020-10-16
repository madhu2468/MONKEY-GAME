
var PLAY = 0;
var  END = 1;
var gameState = PLAY;

var monkey,monkey_running;
var ground,invisibleGround;
var banana,bananaimg;
var obstacle,obstacleimg;

var survivaltime = 0;


function preload(){
  
monkey_running =
  loadAnimation("sprite_0.png","sprite_0.png",             
  "sprite_0.png","sprite_0.png","sprite_0.png",       
      "sprite_0.png","sprite_0.png");

  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("obstacle.png");
}



function setup() {
    createCanvas(600,300);


  
monkey = createSprite(40,260,10,20);
monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(100,295,600,10);
    ground.x = ground.width /2;
    ground.velocityX = -4;

   obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  
  invisibleGround = createSprite(100,300,400,10);
  invisibleGround.visible = false;
  
 monkey.setCollider("circle",0,0);
  //monkey.debug = true;
  
}


function draw() {
  background("blue");
  
  fill("black");
      text("SURVIVALTIME- "+ survivaltime,450,50);

  
  if(gameState === PLAY){
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 100){
     monkey.velocityY = -12;
     }
  
  monkey.velocityY = monkey.velocityY + 0.8; 
 
  monkey.collide(invisibleGround);
  
  createBanana ();
  spawnObstacle ();
    
  survivaltime = survivaltime + Math.round(getFrameRate()/60);

    
 if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
}
  else if(gameState === END){
       ground.velocityX = 0;
       monkey.velocityY = 0;
  

    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
    
       }

  
  
  
  
  drawSprites();

  
}

function createBanana (){
  if(frameCount % 80 === 0){
      banana = createSprite(200,200,10,10);
     banana.y = Math.round(random(120,200));
  banana.addImage(bananaimg);
  banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.lifetime = 55 ;  

      banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);

     }
} 

function spawnObstacle (){
  if(frameCount % 60 === 0){
  obstacle = createSprite(300,275,10,20);
  obstacle.x = Math.round(random(120,200));
   obstacle.addImage(obstacleimg);
  obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 60;
    
  obstaclesGroup.add(obstacle);
    
obstacle.setCollider("rectangle",0,0,400,400);
   //  obstacle.debug = true;

}
  
  
}





