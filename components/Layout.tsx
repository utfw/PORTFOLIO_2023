import React from 'react'
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import mainstyle from '../styles/Main.module.scss'
import Validation from './Validation';
type LayoutProps = {children:React.ReactNode};

function Layout({children}:LayoutProps) {
  const index = useSelector((state:RootState)=>state.scrollPosition.Scroll);
  const isIndexToggle = useSelector((state:RootState) => state.index.Index);
  const Height = useSelector((state:RootState)=>state.sectionHeights.Height);
  const docOpen = useSelector((state:RootState)=> state.openDoc.Index);
  return (
    <>
    {Height > 800 && document.body.clientWidth > 768 && <Menu />}
    {/* {index > 1 && index < 5 ? <Validation /> : ("")} */}
    <div id='container' className={mainstyle.container}>
      <div className={`${isIndexToggle? mainstyle.index_open : ""} ${docOpen? mainstyle.doc_open : ""}`} >
        {children}
      </div>
    </div>
    </>
  )
}

export default Layout