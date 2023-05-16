import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image'
import mainstyle from '../styles/Main.module.scss';
import validationstyle from '../styles/Validation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, openDoc } from '@/store/store';

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

  const WheelInit = (e:React.MouseEvent<HTMLImageElement>) => {
    idx = 0;
    if (e.currentTarget) {
      e.currentTarget.style.transform = ``;
    }
  }
  const img_wrap = useRef<HTMLDivElement>(null); 
  let zoom = 0;
  
  const onClickArr = (e:React.MouseEvent<HTMLElement>) => {
    if(zoom > -1 && zoom < 3){
      const direction = e.currentTarget;
      const img = img_wrap.current?.querySelectorAll<HTMLDivElement>("&>div");
   
      if(img){
        img.forEach((img:HTMLDivElement) =>{
          img.classList.remove(validationstyle.on);
          img.style.zIndex = `1`;
        });

      if(direction.classList.contains('left')){
        if(zoom > 0) zoom--; 
        img[zoom+1].style.zIndex = `2`;
      } else {
        if(zoom < 2) zoom++;
        img[zoom-1].style.zIndex = `2`;
      }
        img[zoom].style.zIndex = `3`;
        img[zoom].classList.add(validationstyle.on);
      }
    }
  }

  return (
    <section ref={section} className={validationstyle.validation_wrap} style={{top:top}}>
      <h2 className={`${mainstyle.title1}`}>Validation</h2>

      {/* 검사이미지 레이아웃 */}
      <div className={validationstyle.img_wrap} ref={img_wrap}>
        {validation.map((name,index)=>(
          <div className={`${validationstyle.img} ${index ===0 && validationstyle.on}`} key={index} style={{zIndex:3-index}}>
            <div className={validationstyle.img_box}>
              <h3 className={`${mainstyle.title_sub2} text-[var(--gray2)}`}>{name}</h3>
              <Image width={455} height={0} src={`images/${project_names[Index-2]}/${name}-validation.png`} alt={`${name}-validation.png`} onWheel={handleWheel} onMouseLeave={WheelInit}></Image>
            </div>
          </div>
          ))
        }
      </div>
        <div className={`${validationstyle.arr} left`} onClick={onClickArr}>
        <svg width="50" height="80" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 80L0 40L40 0L49.3333 9.33333L18.6667 40L49.3333 70.6667L40 80Z" fill="#393939" />
        </svg>
        </div>
        <div className={`${validationstyle.arr} right`}onClick={onClickArr}>          
        <svg width="50" height="80" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 80L0 70.6667L30.6667 40L0 9.33333L9.33333 0L49.3333 40L9.33333 80Z" fill="#393939" />
        </svg>
          </div>
    </section>
  )
}

export default Validation