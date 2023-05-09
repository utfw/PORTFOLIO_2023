import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Bodies, Engine, Render, World } from 'matter-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function Explosion() {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const height = useSelector((state:RootState) => state.sectionHeights.Height);

  useEffect(()=>{

  },[height])

  useEffect(()=>{
    //mount 
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    if (scene.current) {
      var render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: 'transparent',
        },
      });
      Render.run(render);
    }

    World.add(engine.current.world,[
      Bodies.rectangle(cw/2, -10, cw, 20, {
        isStatic:true,
        render:{
          fillStyle:'transparent'
        }
      }),
      Bodies.rectangle(-10, ch/2, 20, ch, {        
        isStatic:true,
        render:{
          fillStyle:'transparent'
        }}),
      Bodies.rectangle(cw/2, ch+10, cw, 20, {        
        isStatic:true,
        render:{
          fillStyle:'transparent'
        }}),
      Bodies.rectangle(cw+10, ch/2, 20, ch, {        
        isStatic:true,
        render:{
          fillStyle:'transparent'
        }}),
    ])

    Engine.run(engine.current);
   

    return() =>{
      Render.stop(render)
      World.clear(engine.current.world,false);
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {}
    }
  },[])

  const isPressed = useRef(false);

  const handleDown = () =>{
    isPressed.current = true
  }

  const handleUp = () =>{
    isPressed.current = false
  }

  const handleAddCircle = (e:MouseEvent) =>{
    if(isPressed.current){
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass:10,
          restitution: 0.9,
          friction: 0.005,
          render:{
            fillStyle: '#ff00ff'
          }
        }
      )
      World.add(engine.current.world, [ball])
    }
  }
  // const setCanvas = () =>{
  //   var canvas = document.getElementById("myCanvas");

  // }

  return (
    <div className={`absolute`} onMouseDown={handleDown} onMouseUp={handleUp} onMouseMove={()=>handleAddCircle}>
    <div ref={scene} style={{width:`100%`, height:`100%`}}>
    </div>
    </div>
    // <section className={`relative`}>
    //   <canvas id='myCanvas' className={`absolute top-0 left-0 w-full h-full bg-black `}></canvas>
    // </section>
  )
}

export default Explosion