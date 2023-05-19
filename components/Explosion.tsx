import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, getSectionHeight } from '@/store/store';
import Matter, { Bodies, Body, Engine, Render, World } from 'matter-js';

interface ExplosionProps {
  staticBoxRef: React.RefObject<HTMLDivElement>;
}
function Explosion({staticBoxRef}:ExplosionProps) {
  const dispatch = useDispatch();
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Matter.Engine.create());
  
  const Height = useSelector((state:RootState)=>state.sectionHeights.Height);
  const Index = useSelector((state:RootState)=>state.scrollPosition.Scroll);
  
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [WindowHeight, setWindowHeight] = useState<number>(document.body.clientHeight);
  const renderRef = useRef<Matter.Render | null>(null);

  let walls;
  let mass = -0.01-(Math.random() * 0.003);
  let interval:NodeJS.Timer | undefined;

  useLayoutEffect(() => { // 초기 높이값 설정
    setWindowHeight(document.body.clientHeight);
  }, []);

  useEffect(()=>{ // layoutEffect 후 캔버스 생성
    if (scene.current) {
      renderRef.current  = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          wireframes: false,
          background: 'transparent',
          width: windowWidth,
          height: WindowHeight
        },
      });
    }
    
    if(renderRef.current) Render.run(renderRef.current);

    walls = [
      Bodies.rectangle(windowWidth / 2, -10, windowWidth, 20, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      Bodies.rectangle(windowWidth / 2, WindowHeight-70, windowWidth, 20, {
        isStatic: true,
        mass: 10,
        render: {
          fillStyle: 'trasparent',
        },
      }),
    ];
    World.add(engine.current.world, walls);

    Engine.run(engine.current);
    return () => {
      if(renderRef.current){
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.textures = {};
       }
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
    };
  },[WindowHeight, windowWidth]);

  const handleResize = useCallback(() => {
    dispatch(getSectionHeight(window.innerHeight));
    setWindowWidth(document.body.clientWidth);
    setWindowHeight(document.body.clientHeight);
    if (renderRef.current) {
      renderRef.current.canvas.width = document.body.clientWidth;
      renderRef.current.canvas.height = document.body.clientHeight;
    }
  },[]);

  useEffect(() =>{ // 리사이즈 관련
    const divRect = staticBoxRef.current?.getBoundingClientRect();
    let finbox:Matter.Body;
    if(divRect){
    const x = divRect.left + (divRect.width*0.5)
    const y = (WindowHeight-((Height*0.5)-(divRect.width*4)));
    finbox = Bodies.rectangle(x, y, divRect.width, divRect.width,{
      isStatic:true,
      render:{
        fillStyle:'transparent'
      }
    });
    World.add(engine.current.world, finbox);
    }
    
    engine.current.world.gravity.x = 0;
    engine.current.world.gravity.y = 0.003;
    
    window.addEventListener('resize', handleResize);

    return () =>{
      World.remove(engine.current.world, finbox); 
      window.removeEventListener('resize', handleResize);
    }
  },[Index, windowWidth, WindowHeight, handleResize]);

  useEffect(()=>{ // 스크롤 시 캔버스 변화    
    const handleAddBox = () =>{
      const boxSize = Math.floor(Math.random() * 20) + 8;
      const alpha = (Math.floor(Math.random() * 71) + 30)/100;
      const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`];
      const colorIndex = Math.floor(Math.random() * color.length);
      const height = (Height*(Index));
      let randomY;
      let randomX = Math.floor(Math.random() * windowWidth);
      if(Index === 7){
        const maxRange = height*1.2;
        const minRange = height*1;
        randomY = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
      } else {
        randomY = Math.floor((height)+(Math.random() * (Height*0.66)));
      }

      const sizeIncreasePerFrame = 1.1; 
      const totalFrames = 18;

      const box = Bodies.rectangle(
        randomX, randomY, boxSize, boxSize, {
          isStatic: true,
          mass: 0.0,
          restitution: 0.8,
          friction: 1,
          render: {
            fillStyle: `rgba(${color[colorIndex]}, ${alpha})`,
            strokeStyle: 'transparent',
          },
        }
      );
      World.add(engine.current.world, box);

      let currentFrame = 0;

      const intervalId = setInterval(() => {
        if(currentFrame < totalFrames ){
          const currentScale = box.render.sprite?.xScale;
          if(currentScale){
            var newScale = {
              x: currentScale * sizeIncreasePerFrame,
              y: currentScale * sizeIncreasePerFrame,
            };
          Body.scale(box, newScale.x, newScale.y);
          currentFrame++;
          }
        } else {
          World.remove(engine.current.world, box);
          const boxSize = box.bounds.max.x - box.bounds.min.x;
          var boxNum = 9;
          var smallboxWidth = boxSize / boxNum;
          var smallboxHeight = boxSize / boxNum;
          const boxs:Matter.Body[] = [];

          for(var i=0; i<boxNum;i++){
            var x = box.bounds.min.x + smallboxWidth * i;
            for(var j=0; j<boxNum;j++){
              var y = box.bounds.min.y + smallboxHeight * j;
              if(Index === 0){mass = -0.01-(Math.random() * 0.003);}
              var smallerBox = Bodies.rectangle(x, y, smallboxWidth, smallboxHeight,{
                mass: mass,
                restitution: 0.8,
                friction: 0.005,
                render: {
                  fillStyle: `rgba(${color[colorIndex]}, ${alpha})`,
                },
              });
              boxs.push(smallerBox);
            }
          }
          World.add(engine.current.world, boxs); 

          clearInterval(intervalId); 
          setTimeout(() => {
            boxs.forEach((box) => {
              World.remove(engine.current.world, box);
            });
          }, 5000);
        }
      }, 33);
    };
    switch (Index) {
      case 0:
        engine.current.world.gravity.y = 0.03;
        interval = setInterval(handleAddBox, Math.floor(800 + Math.random() * 501));
        break;
      case 1:
        interval = setInterval(handleAddBox, Math.floor(1000 + Math.random() * 301));
        break;
      case 7:
        engine.current.world.gravity.y = -0.01;
        mass = 1;
        interval = setInterval(handleAddBox, Math.floor(800 + Math.random() * 501));
        break;
      case 8:
        mass = 2;
        engine.current.world.gravity.y = 0.1;
        interval = setInterval(handleAddBox, Math.floor(620 + Math.random() * 501));
        break;
    }
    return () => {
      clearInterval(interval);
    };
  },[Index]);

  return (
    <div className={`absolute w-full h-full`} style={{background:`var(--bg-linear-gradient)`}}>
      <div ref={scene} className={`w-full h-full`}>
      </div>
    </div>
  )
}

export default Explosion