import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

function Particles() {
  const particlesRef = useRef(null);
  const [container, setContainer] = useState<HTMLElement>();
  const [isMove, setIsMove] = useState(false);
  var ROWS = 100;
  var COLS = 300;
  var NUM_PARTICLES = (ROWS*COLS),
  THICKNESS = Math.pow( 80, 2 ),
  SPACING = 3,
  MARGIN = 0,
  COLOR = 220,
  DRAG = 0.24,
  EASE = 0.25,

  particle:HTMLElement | null,
  canvas,
  mouse,
  stats,
  list,
  ctx,
  tog,
  man:Boolean,
  dx, dy,
  mx:number, my:number,
  d, t, f,
  a, b,
  i, n,
  w:Number, h:Number,
  p, s,
  r, c
  ;
  particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
  };

function step() {
  if (stats) stats.begin();
  if (tog = !tog) {
    // date로 숫자를 갱신, 임의적인 움직임을 가진 mx,my(마우스 위치값)을 부여한다.
    if (!isMove) {
      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      p = list[i];
      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;
      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }
    // 입자가 이전 위치로 되돌아오는 부분
      if(isMove){ // 마우스의 움직임이 없을때(처음) 되돌아와야함.
        p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
        p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;
      } else {
        p.x += ( p.vx *= DRAG );
        p.y += ( p.vy *= DRAG );
      }
    }
  } else {
    b = ( a = ctx.createImageData( w, h ) ).data;
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }
    ctx.putImageData( a, 0, 0 );
  }
  if ( stats ) stats.end();
  requestAnimationFrame( step );
}

function init() {
  let container:HTMLElement | null = document.getElementById('particles');
  if(container!==null) setContainer(container);

  let canvas = document.createElement( 'canvas' );
  ctx = canvas.getContext( '2d' );
  tog = true;
  list = [];
  w = COLS * SPACING + MARGIN * 2;
  h = ROWS * SPACING + MARGIN * 2;

  // console.log(container)
  for (i = 0; i < NUM_PARTICLES; i++) {
    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
    list[i] = p;
  }

  if(typeof Stats === 'function') {
    document.body.appendChild((stats = new Stats()).domElement);
  }
  container?.appendChild( canvas );
}  

useLayoutEffect(()=>{
    init();
    step();
    // console.log(container)
},[])

function handleMouseMove(e: MouseEvent) {
  setIsMove(true);
  var bounds:DOMRect | undefined = container?.getBoundingClientRect();
  if(bounds !== null){
  mx = e.clientX; // 커서를 기점으로 입자를 밀어냄
  my = e.clientY - bounds.top;
  }
  console.log(mx)
  console.log(isMove);
}

useEffect(()=>{
  if(container !==null){
    container?.addEventListener('mousemove', handleMouseMove);
    return () => {
    container?.removeEventListener('mousemove', handleMouseMove);
    };
  }
},[container, mx, my])

  return (
    <>
    <div id='particles' className={`z-10 absolute left-0 top-0 w-full h-full [&>canvas]:w-full [&>canvas]:h-full`}>
    </div>
    </>
  )
}

export default Particles