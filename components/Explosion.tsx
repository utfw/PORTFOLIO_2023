import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Matter, { Bodies, Engine, Render, World } from 'matter-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function Explosion() {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const wall = useRef<Matter.Body[]>([]);
  const Height = useSelector((state:RootState)=>state.sectionHeights.Height);
  const cw = document.body.clientWidth;
  const ch = document.body.clientHeight;
  
  useEffect(()=>{
    //mount 
    //canvas 생성
    engine.current.world.gravity.x = 0;
    engine.current.world.gravity.y = 0.05;

    if (scene.current) {
      var render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          wireframes: false,
          background: 'transparent',
        },
      });
      Render.run(render);
    }
    // 테두리 생성
    const walls = [
      Bodies.rectangle(cw/2, -10, cw, 20, {
        isStatic:true,
        render:{
          fillStyle:'transparent'
        }
      }),
      Bodies.rectangle(cw/2, ch, cw, 20, {        
        isStatic:true,
        render:{
          fillStyle:'#transparent'
        }})
    ]

    // const invisibleWalls = [];
    // for (let i = 0; i < 6; i++) {
    //   const size = 40;
    //   const sizeDouble = size*2
    //   const x = Math.random() * (cw - sizeDouble) + size; // 중심점 x 좌표
    //   const y = Math.random() * (ch - sizeDouble) + size; // 중심점 y 좌표
    //   const wall = Bodies.circle(x, y, size, {
    //     isStatic: true,
    //     render: {
    //       fillStyle: 'transparent'
    //     }
    //   });
    //   invisibleWalls.push(wall);
    // }
    // World.add(engine.current.world, invisibleWalls);

    World.add(engine.current.world, walls);

    // World.add(engine.current.world, boxs)
    Engine.run(engine.current);
   
    const intervalId = setInterval(handleAddBox,Math.floor(Math.random() * (1000 - 500 + 1) + 500));

    return() =>{
      clearInterval(intervalId);
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    }
  },[]) // /useEffect

  const handleAddBox = () =>{
      const boxSize = 40 + Math.random() * 30;
      const alpha = (Math.floor(Math.random() * 71) + 30)/100;
      const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`,];
      const colorIndex = Math.floor(Math.random() * color.length);
      const randomX = Math.floor(Math.random() * cw);
      const randomY = (Math.floor(Math.random() * ch)/2);

      const box = Bodies.rectangle(
       randomX, randomY, boxSize, boxSize,
        {
          mass:10,
          restitution: 0.8,
          friction: 0.005,
          render:{
            fillStyle:  `rgba(${color[colorIndex]}, ${alpha})`
          }
        }
      )
      World.add(engine.current.world, box);
      setTimeout(() => {
      World.remove(engine.current.world, box);
      }, 6000);
  }

  return (
    <div className={`absolute w-full h-full`} onClick={handleAddBox}>
    <div ref={scene} className={`w-full h-full [&>canvas]:w-full [&>canvas]:h-full`}>
    </div>
    </div>
  )
}

export default Explosion