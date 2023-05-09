var Engine = Matter.Engine,
  World = Matter.World,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Render = Matter.Render,
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Events = Matter.Events;
  
const bodyWidth = 44;
const bodyHeight = 44; 

var engine = Engine.create();
engine.world.gravity.y = 0;
var stackA = Composites.stack(0, 0, Math.ceil(window.innerWidth / boxWidth), Math.ceil(window.innerHeight / boxHeight), 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, boxWidth, boxHeight, {
    density:0.002,
    restitution: 1,
    render: {
      fillStyle: "#333",
      strokeStyle: "#000", 
    }
  });
});

World.add(engine.world, [stackA]);

var canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
// console.log(window);
var render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    wireframes: false, // 테두리 여부
    background: 'trasnparent',
    width: canvas.width,
    height: canvas.height,
  }
});

var mouse = Mouse.create(canvas),
mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});
World.add(engine.world, mouseConstraint);

Events.on(mouseConstraint, 'mousemove', function(){

})
Events.on(mouseConstraint, 'mousedown', function(e) {
  // console.log(mouseConstraint.body); //눌린 대상
  engine.world.gravity.y = 0.8;
  var clickedBody = mouseConstraint.body;
  var x = clickedBody.position.x;
  var y = clickedBody.position.y;
  setExplosion(x,y);
  // Events.off(mouseConstraint, 'mousedown'); // 해당 요소의 'mousedown'이벤트를 제거함. 
  // canvas.classList.add("backword");
});

function setExplosion(x,y){
  for (var i = 0; i < stackA.bodies.length; i++) {
    var body = stackA.bodies[i];
    var randomNum = Math.random();
    const xForce = 16;
    const yForce = 3;
    var xDiff = x - stackA.bodies[i].position.x;
    var yDiff = y - stackA.bodies[i].position.y;
    Body.setVelocity(body, {x: 0, y: Math.random() * 24});
    var xDir = (xDiff < -1) ? randomNum / xForce : -(randomNum / xForce);
    var yDir = (yDiff < -1) ? randomNum / yForce : -(randomNum / yForce);
    Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: xDir, y: yDir});

    const distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
    const brightness = 120/distance;
    ctx.fillStyle = `rgba(33, 33, 33, ${brightness})`;
    ctx.fillRect(body.position.x - boxWidth/2, body.position.y - boxHeight/2, boxWidth, boxHeight);
  }
}

Engine.run(engine);
Render.run(render);
