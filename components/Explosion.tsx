import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Matter, { Bodies, Body, Engine, Render, World } from 'matter-js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, getSectionHeight } from '@/store/store';

function Explosion() {
  const dispatch = useDispatch();
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const wall = useRef<Matter.Body[]>([]);
  const Height = useSelector((state:RootState)=>state.sectionHeights.Height);
  
  const cw = document.body.clientWidth;
  const ch = document.body.clientHeight;
  let render:Matter.Render;
  let walls;

  useEffect(() => {
    //mount
    engine.current.world.gravity.x = 0;
    engine.current.world.gravity.y = 0.03;

    // 캔버스 생성
    if (scene.current) {
      // 캔버스 생성
      render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          wireframes: false,
          background: 'transparent',
          width: window.innerWidth,
          height: Height,
        },
      });
    }
    Render.run(render);

    // 테두리 생성
    walls = [
      Bodies.rectangle(cw / 2, -10, cw, 20, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      Bodies.rectangle(cw / 2, ch+40, cw, 20, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
    ];
    World.add(engine.current.world, walls);

    Engine.run(engine.current);

    const intervalId = setInterval(handleAddBox, Math.floor(200+Math.random() * 501));
    return () => {
      clearInterval(intervalId);
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []); // /useEffect

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      dispatch(getSectionHeight(window.innerHeight));
      render.canvas.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
    });

    return window.removeEventListener('resieze',()=>{
      render.canvas.height = Height;
      render.canvas.width = window.innerWidth;
    })
  },[]);

  const handleAddBox = () =>{
      const boxSize = Math.floor(Math.random() * 20) + 8;
      const alpha = (Math.floor(Math.random() * 71) + 30)/100;
      const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`];
      const colorIndex = Math.floor(Math.random() * color.length);
      const randomX = Math.floor(Math.random() * cw);
      const randomY = (Math.floor(Math.random() * ch)/2);

      const sizeIncreasePerFrame = 1.1; 
      const totalFrames = 18;
          const box = Bodies.rectangle(
            randomX,
            randomY,
            boxSize,
            boxSize,
            {
              isStatic: true,
              mass: 0.0,
              restitution: 0.8,
              friction: 1,
              render: {
                fillStyle: `rgba(${color[colorIndex]}, ${alpha})`,
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
          const mass = -0.01-(Math.random() * 0.003);
          for(var i=0; i<boxNum;i++){
            var x = box.bounds.min.x + smallboxWidth * i;
            for(var j=0; j<boxNum;j++){
              var y = box.bounds.min.y + smallboxHeight * j;
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
          }, 3000);
        }
      }, 33);
    };

  return (
    <div className={`absolute w-full h-full`} onClick={handleAddBox}>
    <div ref={scene} className={`w-full h-full`}>
    </div>
    </div>
  )
}

export default Explosion