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

  canvas = document.getElementById('myCanvas');
  var engine = Engine.create();
  var world = engine.world;
  engine.world.gravity.y = 0;
  var render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      wireframes: false, // 테두리 여부
      background: 'trasnparent',
      width: window.innerWidth,
      height: window.innerHeight,
    }
  });

  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
  World.add(world, mouseConstraint);

  let draggableBodies = [];
for (let i = 0; i < 10; i++) {
  const body = Bodies.rectangle(
    100 + i * 50,
    200,
    50,
    50,
    {
      density: 0.04,
      friction: 1,
      frictionAir: 0.01,
      restitution: 0.8,
      render: {
        fillStyle: 'red'
      }
    }
  );
  
  draggableBodies.push(body);
  World.add(world, body);
}







Engine.run(engine);
Render.run(render);
