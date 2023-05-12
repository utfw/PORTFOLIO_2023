import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import mainstyle from '../styles/Main.module.scss'
import validationstyle from '../styles/Validation.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, openDoc } from '@/store/store'

function Validation({top}:{top:number}) {
  const dispatch = useDispatch();
  const project_names = ["fescaro","samsung","cjone"]
  const validation = ["html","css","accessibility"]
  const docOpen = useSelector((state:RootState)=> state.openDoc.Index);
  const section = useRef<HTMLElement>(null);
  const Height = useSelector((state:RootState)=> state.sectionHeights.Height);
  const Index = useSelector((state:RootState) => state.scrollPosition.Scroll);
  let idx = 0;

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    let scroll = 10;

    if (e.currentTarget && e.currentTarget.offsetHeight > window.innerHeight / 2) {
      if (e.deltaY > 0 && idx > -5) {
        idx--;
      } else if (e.deltaY < 0 && idx < 0) {
        idx++;
      }
      scroll = scroll * idx;
      e.currentTarget.style.transform = `translateY(${scroll}%)`;
    }
  }

  const WheelInit = (e: React.MouseEvent<HTMLImageElement>) => {
    idx = 0;
    if (e.currentTarget) {
      e.currentTarget.style.transform = ``;
    }
  }

  return (
    <section ref={section} className={validationstyle.validation_wrap} style={{top:top}}>
      <h2 className={`${mainstyle.title1}`}>Validation</h2>
      <div className={`${mainstyle.menu} ${validationstyle.close}`} onClick={()=>{dispatch(openDoc(false))}}>
        <div className={`${mainstyle.menu_box}`}>        
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L30 30M2 30L30 2" stroke="var(--gray2)" strokeWidth="4"/>
          </svg>
        </div>
      </div>
      {/* 검사이미지 레이아웃 */}
      <div className={validationstyle.img_wrap}>
        {validation.map((name,index)=>(
        <div className={validationstyle.img} key={index} style={{zIndex:3-index}}>
          <div className={validationstyle.img_box}>
          <h3 className={`${mainstyle.title_sub2} text-[var(--gray2)}`}>{name}</h3>
          <Image width={455} height={0} src={`images/${project_names[Index-2]}/${name}-validation.png`} alt={`${name} css-validation.png`} onWheel={handleWheel} onMouseLeave={WheelInit}></Image>
        </div></div>
        ))
        }
      </div>
    </section>
  )
}

export default Validation