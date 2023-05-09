// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
// engine.world.gravity.scale = 0; //turn off gravity (it's added back in later)

var stackA = Composites.stack(100, 100, 5, 5, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 15, 15); 
}); //네모들 위치 x축, y축, 갯수, 간격
// 15*15 사각형을 지정된 xy위치로 반환
//access stackA elements with:   stackA.bodies[i]   i = 1 through 6x6

// x축, y축, 가로길이, 세로길이
var wall = Bodies.rectangle(400, 300, 500, 20, {
  isStatic: true //고정되있는가.
});
World.add(engine.world, [stackA, wall]); // 공간에 추가

var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, {
    isStatic: true,
  }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, {
    isStatic: true,
  }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, {
    isStatic: true,
  })
]); // 테두리

// run the engine
// Engine.run(engine);

//render
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

window.onresize = function(event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff0';
  ctx.fillStyle = '#000';
function render() {
  Engine.update(engine, 16);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var bodies = Composite.allBodies(engine.world);
  ctx.beginPath();
  for (var i = 0; i < bodies.length; i += 1) {
    var vertices = bodies[i].vertices;
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var j = 1; j < vertices.length; j += 1) {
      ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.lineTo(vertices[0].x, vertices[0].y);
  }
  ctx.fill();
  ctx.stroke();
  
  window.requestAnimationFrame(render);
}
 window.requestAnimationFrame(render);