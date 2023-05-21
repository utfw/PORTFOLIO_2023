import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image'
import mainstyle from '../styles/Main.module.scss';
import validationstyle from '../styles/Validation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState} from '@/store/store';

function Validation() {
  const project_names = ["fescaro","samsung","cjone"]
  const validation = ["html","css","accessibility"]
  const docOpen = useSelector((state:RootState)=> state.openDoc.Index);
  const section = useRef<HTMLDivElement>(null);
  const height = useSelector((state: RootState) => state.sectionHeights.Height);
  const Index = useSelector((state:RootState) => state.scrollPosition.Scroll);
  const [zoom, setZoom] = useState(0);
  let idx = 0;

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    let scroll = 10;
    if (zoom===2) {
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
  
  const onClickArr = useCallback((direction: 'left' | 'right') => {
    setZoom(prev => {
      if (direction === 'left') {
        return prev > 0 ? prev - 1 : prev;
      } else {
        return prev < 2 ? prev + 1 : prev;
      }
    });
  }, []);
  useEffect(()=>{setZoom(0);},[docOpen]);

  return (
    <div ref={section} className={`${validationstyle.validation_wrap} ${docOpen && validationstyle.on}`} style={{ top: Index * height + 'px' }}>
      {Index > 1 && Index < project_names.length+2 ? (
        <>
        <h2 className={`${mainstyle.title1}`}>Validation</h2>
        <div className={validationstyle.img_wrap} ref={img_wrap}>
          {validation.map((name,index)=>(
            <div className={`${validationstyle.img} ${index === zoom && validationstyle.on}`} key={index} style={{zIndex:3-index}}>
              <div className={validationstyle.img_box}>
                <h3 className={`${mainstyle.title_sub2} text-[var(--gray2)}`}>{name}</h3>
                <Image width={455} height={0} src={`images/${project_names[Index-2]}/${name}-validation.png`} alt={`${name}-validation.png`} onWheel={handleWheel} onMouseLeave={WheelInit}></Image>
              </div>
            </div>
            ))
          }
        </div>
        <div className={`${validationstyle.arr} left`} onClick={() => onClickArr('left')}>
          <svg width="50" height="80" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 80L0 40L40 0L49.3333 9.33333L18.6667 40L49.3333 70.6667L40 80Z" fill="#393939" />
          </svg>
        </div>
        <div className={`${validationstyle.arr} right`} onClick={() => onClickArr('right')}>
          <svg width="50" height="80" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33333 80L0 70.6667L30.6667 40L0 9.33333L9.33333 0L49.3333 40L9.33333 80Z" fill="#393939" />
          </svg>
        </div>
        </>
      ) : "1234"}
    </div>
  )
}

export default Validation