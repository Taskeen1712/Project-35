var database;
var balloon;
var backGround;
var position;
var balloonIMG2,balloonIMG3//,balloonIMG4

function preload(){
  backGround=loadImage("Hot Air Balloon-01.png");
  balloonIMG2=loadImage("Hot Air Balloon-02.png");
  balloonIMG3=loadImage("Hot Air Balloon-03.png");
  //balloonIMG4=loadImage("Hot Air Balloon-04.png");
}

function setup() {
  createCanvas(500,500);
  
  database=firebase.database();
  balloon=createSprite(250, 250, 50, 50);
  balloon.addAnimation("moving");
  balloon.scale=0.4;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(backGround);
  
  if(keyDown(UP_ARROW)){
     balloon.y=balloon.y-10;
     balloon.addAnimation("hotAirBallon",balloonIMG2);
     balloon.scale=balloon.scale-0.01;
   }
   else if(keyDown(DOWN_ARROW)){
     balloon.y=balloon.y+10;
     balloon.addAnimation("hotAirBallon",balloonIMG3);
     balloon.scale=balloon.scale+0.01;
   }
   else if(keyDown(RIGHT_ARROW)){
     balloon.x=balloon.x+10;
   }
   else if(keyDown(LEFT_ARROW)){
      balloon.x=balloon.x-10;
   }  
  
   drawSprites();

   textSize(20);
  stroke("black");
  text("Use arrow keys to move the balloon",10,30);
}

function writeHeight(x,y){
  database.ref('balloon/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}

function readHeight(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("there is an error in reading position from database");
}