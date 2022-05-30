const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg, boat;
var canvas, angle, tower, ground, cannon;
var balls = [];

// 08) criar array de boats
var boats = [];

function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
  // 09) criar obj boat (width - 80, height - 60, 170, 170, -80)
  boat = new Boat(width - 80, height - 60, 170, 170, -80);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }

  cannon.display();
 
  // 10) boat display. Barco parado. como mover?
  boat.display();

  // 11) Matter.Body.setVelocity()
  Matter.Body.setVelocity(boat, {x: -0.5, y:0} )
  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}


// 12) func mostra os navios
function showBoats() {
  
  if(boats.length > 0){
    if (boats[boats.length - 1].body.position.x < width - 300){

      var positions = [-40, -60, -70, -20];
      var pos = random(positions);

      var boat = new Boat(width, height - 100, 170, 170, pos);
      boats.push(boat);
    }


    for (var i = 0; i < boats.length; i++){
      if (boats[i]){
        Matter.Body.setVelocity(boats[i].body, {x:-0.9 , y:0});
      }
      boats[i].display();
    }
  } else {
    boat = new Boat(width + 10, height -60, 170, 170, -80);
    boats.push(boat);
  }
    
}

