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
  let render;
  let walls;

  useEffect(() => {
    //mount
    engine.current.world.gravity.x = 0;
    engine.current.world.gravity.y = 0.05;

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
    Render.run(render);

    // 테두리 생성
    walls = [
      Bodies.rectangle(cw / 2, -10, cw, 20, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }),
      Bodies.rectangle(cw / 2, ch, cw, 20, {
        isStatic: true,
        render: {
          fillStyle: '#000',
        },
      }),
    ];
    World.add(engine.current.world, walls);

    Engine.run(engine.current);

    const intervalId = setInterval(handleAddBox, Math.floor(Math.random() * (1000 - 500 + 1) + 500));

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
      render.canvas.height = window.innerHeight;
      render.canvas.width = window.innerWidth;

      // walls[0].position.x = window.innerWidth/2;
      // walls[1].position.x = window.innerWidth/2;
      // walls[1].position.y = window.innerHeight;
    });

    return window.removeEventListener('resieze',()=>{
      render.canvas.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      // walls[0].position.x = window.innerWidth/2;
      // walls[1].position.x = window.innerWidth/2;
      // walls[1].position.y = window.innerHeight;
    })
  },[])

  const handleAddBox = () =>{
      const boxSize = Math.floor(30 + Math.random() * 51);
      const mass  = (boxSize-30)/50
      const alpha = (Math.floor(Math.random() * 71) + 30)/100;
      const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`,];
      const colorIndex = Math.floor(Math.random() * color.length);
      const randomX = Math.floor(Math.random() * cw);
      const randomY = (Math.floor(Math.random() * ch)/2);
      // console.log(boxSize)
      const box = Bodies.rectangle(
       randomX, randomY, boxSize, boxSize,
        {
          mass:10 * mass,
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
      }, 5000);
  }

  return (
    <div className={`absolute w-full h-full`} onClick={handleAddBox}>
    <div ref={scene} className={`w-full h-full`}>
    </div>
    </div>
  )
}

export default Explosion