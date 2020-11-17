var dog,happyDog;
var dogSprite;
var database;
var foodS,foodStock;
var time;
var thing,thing2;
var foodObj;
var over,timeOver;
var lastFed, FeedTime, fedTime;
var bedRoomIMG,washRoomIMG,gardenIMG;
var gameState, readState;
var currentTime;
var timer;
var back1;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  BedRoomIMG = loadImage("Bed_Room.png");
  WashRoomIMG = loadImage("Wash_Room.png");
  GardenIMG = loadImage("Garden.png");
  sadDogIMG = loadImage("deadDog.png");
}

function setup()
{
  createCanvas(1000, 500);
    thing = 0;
    thing2 = 0;
    time = 1;
    over = 1;
    timer = 0;
    

    database = firebase.database();
      
   dogSprite = createSprite(750,250,50,50);
   dogSprite.addImage("dogImage",dog);
   dogSprite.scale = 0.2;

   foodStock = database.ref('Food');
   foodStock.on("value",readStock);

   fedTime = database.ref('lastFed');
   fedTime.on("value",function(data)
   {
     lastFed = data.val();
   })


   readState = database.ref('gameState');
   readState.on("value",function(data)
   {
    gameState = data.val();
   })



   foodObj = new Food();

   
  invisibleGround = createSprite(650,330,400,10);
  invisibleGround.visible = false;
}


function draw()
{  
  if(time == 1)
  {
    background(52, 216, 235);
  }
  if(gameState == "Hungry" && time == 0)
  {
  background(46, 139, 87);
  }
  if(gameState == "Playing" && time == 0)
  {
  background(GardenIMG);
  }
  if(gameState == "Sleeping" && time == 0)
  {
  background(BedRoomIMG);
  }
  if(gameState == "Bathing" && time == 0)
  {
  background(WashRoomIMG);
  }
  drawSprites();
  console.log(currentTime);
  console.log(timer);
  console.log(gameState);
   
 foodObj.display2();

  dogSprite.visible = false;

  if(time == 0)
  {
    dogSprite.visible = true;
  }
  
  dogSprite.velocityY = dogSprite.velocityY + 0.5;
  dogSprite.collide(invisibleGround);

 

  if(foodS <= 0)
  {
    foodS = 0;
    over = 0;
  }

  if(over == 0)
  {
      textSize(60);
      fill("red");
      text("WARNING: YOUR FOOD IS ZERO!",30,200);
      text("PLEASE BUY MORE FOOD!",150,250);
      over = 1;
  }

  fill(255,255,254);
  textSize(25);

  if(gameState == "Hungry")
  {

  if(time == 0)
  {
  
  if(lastFed >= 12)
  {
    text("Last Feed : " + lastFed % 12 + " PM",350,50);
  }
  else if(lastFed == 0)
  {
    text("Last Feed : 12 AM",350,50);
  }
  else 
  {
    text("Last Feed : " + lastFed + " AM",350,50);
  }
  }

}

  currentTime = hour();


  if(currentTime == (lastFed + 1))
  {
    UpdateState("Playing"); 
  }
  else if(currentTime == (lastFed + 2))
  {
    UpdateState("Sleeping");
  }
  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    UpdateState("Bathing");
  }
  else 
  {
   UpdateState("Hungry");
    foodObj.display();
    if(gameState == "Hungry")
    {
    if(time == 0)
    {
    foodObj.display1();
    }
  }
  }


  foodObj.display3();

}

function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  database.ref('/').update({
  Food: x
  })
}

function writeStock1(x)
{
  database.ref('/').update({
  lastFed: x
  })
}

function UpdateState(State)
{
   database.ref('/').update({
     gameState: State
   })
}
function bedroom()
{
    if(timer == 1)
    {
    
    background(BedRoomIMG, 550,500);
    }
}
function garden()
{
    if(timer == 1)
    {
    background(GardenIMG, 550, 500);
    }
}
function washroom() 
{
    if(timer == 1)
    {
    background(WashRoomIMG, 550,500);
    }
}



