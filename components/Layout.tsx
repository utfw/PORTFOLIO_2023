import React from 'react'
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import mainstyle from '../styles/Main.module.scss'
type LayoutProps = {children:React.ReactNode};

function Layout({children}:LayoutProps) {
  const index = useSelector((state:RootState)=>state.scrollPosition.Scroll);
  const isIndexToggle = useSelector((state:RootState) => state.index.Index);
  const Height = useSelector((state:RootState)=>state.sectionHeights.Height);
  
  return (
    <>
    {Height > 800 && <Menu />}
    <div id='container' className={mainstyle.container}>
      <div className={isIndexToggle? mainstyle[`index-open`]:""}>
      {children}
      </div>
    </div>
    </>
  )
}

export default Layout