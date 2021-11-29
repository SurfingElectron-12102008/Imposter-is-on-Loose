var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, imposter, laser, bg
var playerAn, imposterImg, laserImg, bgImg, playerImg

var obstacle, obstacleImg

var edge

var endPic, endImg, ID, PD

var score=0;

var laserSound, bgSound, dieSound;

var restart, RI;

function preload(){
  playerAn = loadAnimation("AP1.png", "AP2.png", "AP3.png", "AP4.png");
 
 playerImg = loadImage("PD.png");

  ID=loadImage("ID.png");

  PD=loadImage("PD.png");
  
 imposterImg = loadImage("AI.png");  
  
 laserImg = loadImage("LS.png");  
 
bgImg = loadImage("BG2.PNG");  

obstacleImg= loadImage("PetObstacle.png");

endImg=loadImage("Dying Scene.png")

laserSound=loadSound("Laser Gun Sound Effect.mp3");
bgSound=loadSound("gamebgsound.mp3");
dieSound=loadSound("Among Us (Kill) - Sound Effect (HD).mp3");

RI=loadImage("restart button.png");
}

function setup() {
  createCanvas(1200, 800);

  bg=createSprite(720,350)
bg.addImage("bg",bgImg)
bg.x = bg.width /2;
bg.scale=2

  player=createSprite(200,445,30,40)
  player.addAnimation("ruuning",playerAn);
  player.scale=0.7

laserGroup=createGroup()
imposterGroup=createGroup()
obstacleGroup=createGroup() 

player.setCollider("rectangle",0,0,50, 100);

restart=createSprite(600,450,600,350);
restart.addImage(RI);

endPic=createSprite(600,200,1200,700)
endPic.addImage(endImg);


}

function draw() {
  
edge=createEdgeSprites();

  background(0);

  textSize(40);
  stroke("white");
  fill("white")
  text("Score: "+score,500,750)

  if (bg.x < 100){
    bg.x = bg.width/2;
  }

  if (gameState===PLAY){
  score=score+Math.round(getFrameRate()/60)
  bg.velocityX=-(1+2*score/100)

restart.visible=false;

    endPic.visible=false;
  console.log(score);
  if(keyDown("space")){
    shootArrow();
    laserSound.play();
  }

 spawnImposter();


 if(laserGroup.isTouching(imposterGroup)){
  laserGroup.destroyEach()
  imposter.addImage(ID);
  dieSound.play();
  imposter.lifetime=8;
  imposter.scale=0.3;
  
 }
 if(laserGroup.isTouching(obstacleGroup)){
  laserGroup.destroyEach()
  obstacleGroup.destroyEach()
  dieSound.play();
 }
 spawnObstacle();
 spawnObstacle2();
 spawnObstacle3();
 
 if(keyDown("RIGHT_ARROW")){
   player.x=player.x+8
 }
 
 if(keyDown("LEFT_ARROW")){
   player.x=player.x-8
 }
 
 player.collide(edge);
 laserGroup.collide(edge);

 if(obstacleGroup.isTouching(player)){
  dieSound.play();
  player.destroy();
  gameState=END
}

if(imposterGroup.isTouching(player)){
  dieSound.play();
  
player.destroy();
 gameState=END;
}
  }
  drawSprites();

  if(gameState===END){
  obstacleGroup.velocityY=0;
  imposterGroup.velocityX=0;
  laserGroup.velocityX=0;
  player.VelocityX=0;
  endPic.visible=true;
restart.visible=true;
bg.velocityX=0;

  
if(mousePressedOver(restart)){
  reset();
}
  }
restart.depth=endPic.depth;
restart.depth=restart.depth+1;
}

function shootArrow(){
  laser=createSprite(player.x,395,10,2) 
laser.addImage(laserImg)
laser.velocityX=7.5
laser.scale=0.25
laserGroup.add(laser);
laser.setCollider("rectangle",0,0,40, 40);
laser.lifetime=-1;

}

function spawnImposter(){
  if (frameCount % 200 === 0) {
  imposter=createSprite(1300,375,30,40)
  imposter.addImage(imposterImg);
  
imposter.scale=0.5
imposterGroup.add(imposter);
imposter.setCollider("rectangle",0,7,40, 160);
imposter.lifetime=-1;
imposter.velocityX=-(2+2*score/100);
imposter.depth=endPic.depth;
endPic.depth=endPic.depth+1;
  }
}
 
function spawnObstacle(){
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(150,-10,40,10);
    obstacle.x = Math.round(random(0,300));
    obstacle.addImage(obstacleImg)
  
    obstacle.scale=0.3
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,140, 180);
    obstacle.depth=endPic.depth;
  endPic.depth=endPic.depth+1;
  obstacle.lifetime=-1;
  obstacle.velocityY=(1+2*score/100);

  }
}

function spawnObstacle2(){
  if (frameCount % 70 === 0) {
    var obstacle = createSprite(500,-10,40,10);
    obstacle.x = Math.round(random(350,650));
    obstacle.addImage(obstacleImg)
    
    obstacle.scale=0.3
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,140, 180);
    obstacle.depth=endPic.depth;
    endPic.depth=endPic.depth+1;
    obstacle.lifetime=-1;
    obstacle.velocityY=(1+2*score/100);

  }
}

function spawnObstacle3(){
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(850,-10,40,10);
    obstacle.x = Math.round(random(700,1000));
    obstacle.addImage(obstacleImg)

    obstacle.scale=0.3
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,140, 180);
    obstacle.depth=endPic.depth;
    endPic.depth=endPic.depth+1;
    obstacle.lifetime=-1;
    obstacle.velocityY=(1+2*score/100);
  
  }
}

function reset(){
  gameState = PLAY
  restart.visible = false;
  obstacleGroup.destroyEach();
  imposterGroup.destroyEach();
  score = 0;
  }