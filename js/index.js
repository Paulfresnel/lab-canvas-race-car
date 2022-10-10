  let frames = 0;


class Car {
  constructor (){
    this.x = 222;
    this.y = 600;
    this.points = 0;
  
  const img = new Image();
  img.src = 'images/car.png';
  img.addEventListener('load', ()=>{
    this.img = img;
    this.draw();
  });
}
moveLeft(){
  if (this.x > 83){
  this.x -= 15
  }
}
moveRight(){
  if (this.x < 368){
  this.x += 15
  }
}
draw(){
  mainCtx.drawImage(this.img,this.x,this.y, 60, 85);
}
left() {
        return this.x;
      }
right() {
        return this.x + this.width;
      }
top() {
        return this.y;
      }
bottom() {
        return this.y + this.height;
      }
crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }
}

const playerCar = new Car();

window.onload = () => {

  document.getElementById('start-button').onclick = () => {
    startGame();
  };

};

function startGame() {
  let intervalId = setInterval(gameOnGoing ,20);
  // mainCtx.clearRect(0,0, 500,700);
  //updateObstacles();
  //checkGameOver();
  //updateCanvas();
}

function gameOnGoing(){
  backgroundMoveDraw();
  updateObstacles();
  checkGameOver();
  updateCanvas();
  drawPoints();
}

function updateCanvas(){
  playerCar.draw();
  //let requestId1 = requestAnimationFrame(updateCanvas)
}

function drawPoints(){
  playerCar.points = Math.floor(frames/5);
  mainCtx.font = "50px serif";
  mainCtx.fillStyle = 'red';
  mainCtx.fillText(`Score: ${playerCar.points}`, 50, 50);
}

const img2 = new Image();
img2.src = 'images/road.png';

let backgroundCanvas, backgroundCtx, mainCanvas, mainCtx;


img2.onload = () => {
  backgroundCanvas = document.querySelector('#canvas');
  backgroundCtx = backgroundCanvas.getContext('2d');

  mainCanvas = document.querySelector('#canvas');
  mainCtx = mainCanvas.getContext('2d');
}


const backgroundImage = {
  img: img2,
  x:0,
  y:0, 
  speed: -4,
  move: function() {
    this.y -= this.speed; // controls the vertical movement
    this.y %= this.img.height; // this is the best way i found to make the image loop and avoid white space in background
  },
  draw: function() {
    backgroundCtx.drawImage(this.img, 0, this.y, backgroundCanvas.width,backgroundCanvas.height);
    if (this.speed < 0) {
      backgroundCtx.drawImage(this.img, 0, this.y - this.img.height, backgroundCanvas.width, backgroundCanvas.height);
    }
  },
};


function backgroundMoveDraw(){
    backgroundImage.move();
    backgroundImage.draw();
}

window.addEventListener('keydown', (event) => {
  console.log(event.keyCode);
  if (event.keyCode === 39){
    playerCar.moveRight();
  } else if (event.keyCode === 37){
    playerCar.moveLeft();
  }
}
)

class Obstacle{
  constructor(width, height, color, x){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;  
    this.y = 0;
  }
  update(){
    console.log(this);
    this.y += 4;
    mainCtx.fillRect(this.x, this.y, this.width, this.height);
    mainCtx.fillStyle = this.color;
  }
left() {
        return this.x;
      }
right() {
        return this.x + this.width;
      }
top() {
        return this.y;
      }
bottom() {
        return this.y + this.height;
      }
}

const myObstacles = [];


function updateObstacles(){

  console.log('frame: ' + frames);

  for (i=0; i<myObstacles.length;i++){
    myObstacles[i].update();
  }

  frames += 1;
  if (frames % 120 === 0 ){
    let x = Math.floor(Math.random()* (300 - 83 +1) + 83);
    let height = 15;
    let width = Math.floor(Math.random()* (150-20 + 1) + 20);
    myObstacles.push(new Obstacle(width, height, 'red', x));
    console.log(myObstacles);
  }  
  //let requestId3 = requestAnimationFrame(updateObstacles);
}

function checkGameOver() {
    // check if one obstacle has had a collision with player
    const crashed = myObstacles.some(function (obstacle) { 
      return playerCar.crashWith(obstacle);
    });
   
    if (crashed) { // if there's a collision
      console.log('crashed');
      clearInterval(intervalId);
      clearInterval(intervalIdBackground);
    }
    //requestAnimationFrame(checkGameOver);
  }
