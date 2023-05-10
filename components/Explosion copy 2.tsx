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

    const numCols = Math.ceil(cw / 40);
    const numRows = Math.ceil(ch / 40);
    //canvas 생성
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
          fillStyle:'#000'
        }
      }),
      Bodies.rectangle(-10, ch/2, 20, ch, {        
        isStatic:true,
        render:{
          fillStyle:'#000'
        }}),
      Bodies.rectangle(cw/2, ch, cw, 20, {        
        isStatic:true,
        render:{
          fillStyle:'#000'
        }}),
      Bodies.rectangle(cw+10, ch/2, 20, ch, {        
        isStatic:true,
        render:{
          fillStyle:'#000'
        }}),
    ]
    wall.current.push(...walls);
    World.add(engine.current.world, walls)
    // World.add(engine.current.world, boxs)
    Engine.run(engine.current);
   
    const handleResize = () => {
      if (scene.current) {
        const ch = window.innerHeight
        const cw = window.innerWidth;
        render.canvas.height = ch;
        render.canvas.width = cw;
      }
    };
    window.addEventListener("resize", handleResize);
    console.log(scene.current.render)
    return() =>{
      Render.stop(render)
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {}
    }
  },[]) // /useEffect


  const isPressed = useRef(false);

  const handleDown = () =>{
    isPressed.current = true;
  }

  const handleUp = () =>{
    isPressed.current = false
  }

  const handleAddBox = (e:MouseEvent) =>{
    if(isPressed.current){
      const boxSize = 40 + Math.random() * 30;
      const alpha = (Math.floor(Math.random() * 101)/100);
      const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`,];
      const colorIndex = Math.floor(Math.random() * color.length);
      const randomX = Math.floor(Math.random() * cw);
      const randomY = Math.floor(Math.random() * ch);


      const box = Bodies.rectangle(
       randomX, randomY, boxSize, boxSize,
        {
          mass:0,
          restitution: 0.0,
          friction: 0.005,
          render:{
            fillStyle:  `rgba(${color[colorIndex]}, ${alpha})`
          }
        }
      )
      World.add(engine.current.world, box)
    }
  }

  const handleRemoveWalls = (e) =>{
    wall.current.forEach((body) => {
      World.remove(engine.current.world, body);
    });
    wall.current = [];
  }

  return (
    <div className={`absolute w-full h-full`} onMouseDown={handleDown} onMouseUp={handleUp} onMouseMove={handleAddBox} onScroll={handleRemoveWalls}>
    <div ref={scene} className={`w-full h-full [&>canvas]:w-full [&>canvas]:h-full`}>
    </div>
    </div>
  )
}

export default Explosion