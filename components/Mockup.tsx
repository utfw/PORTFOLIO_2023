import React from 'react'
import mainstyle from '../styles/Main.module.scss';
import Code from './Code';
import { useSelector } from 'react-redux';
import { RootState, getSectionHeight, openDoc, updateIndex,  } from '@/store/store';

function Mockup() {
  const Index = useSelector((state:RootState) => state.scrollPosition.Scroll);

  return (
    <div className={`relative flex justify-end ${mainstyle.mockup}`}>
    <div className={mainstyle.mockup_wrap}>
      <div className={mainstyle.mockup__pc}>
        <div className='video__wrap'>
          <video preload='auto' muted loop>
            <source src='videos/fescaro/pc.mp4' type='video/mp4'/>
          </video>
        </div>
      </div>
      {Index !== 3 ? (
        <>
          <div className={mainstyle.mockup__tablet}>
            <div>
              <video preload='auto' muted loop>
                <source src='videos/fescaro/tablet.mp4' type='video/mp4'/>
              </video>
            </div>
          </div>
          <div className={mainstyle.mockup__mobile}>
            <div className='video__wrap'>
            <video preload='auto' muted loop>
                <source src='videos/fescaro/mobile.mp4' type='video/mp4'/>
              </video>
            </div>
          </div>
        </>
      ):(<></>)}


    </div>
    <Code />
  </div>
  )
}

export default Mockup