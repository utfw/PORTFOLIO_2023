import React from 'react'
import mainstyle from '../styles/Main.module.css'
import indexstyle from '../styles/Index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleIndex, RootState } from '@/store/store'

function Index() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state: RootState) => state.index);

  return (
    <div className={`z-[11] fixed w-full h-screen p-20 text-[var(--gray2)] bg-[var(--bg)] ${indexstyle.index} ${isIndexToggle ? indexstyle['index-on'] : ''}`}>
      <h2 className={`${mainstyle.title1} mb-11`}>INDEX</h2>
      <div>
        <ul className={`index
        flex w-full h-[708px]
        [&>li]:border [&>li]:border-red-600 
        [&>li]:flex [&>li]:flex-col [&>li]:items-center
        [&>li]:relative 
        [&>li]:w-[140px]
        [&>li]:transition-all ease-in-out duration-300`}>
          <li className={indexstyle.li}>
            <p className={`${mainstyle.index_title}`}>01</p>
            <div className={indexstyle.img}>img</div>
            <h3 className={`${mainstyle.index_name} ${indexstyle.name}`}>FESCARO</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>02</p>
            <h3 className={`${mainstyle.index_name}`}>삼성전기</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>03</p>
            <h3>CJ ONE</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>04</p>
            <h3>REACT TALK APP</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>05</p>
            <h3>REACT NETFLIX APP</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>06</p>
            <h3>PURE CSS</h3>
            <div></div>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>07</p>
            <h3>앱 기획</h3>
          </li>
          <li>
          <p className={`${mainstyle.index_title}`}>08</p>
            <h3>Extra Page</h3>
          </li>
        </ul>
      </div>
      {/* <div className={mainstyle.menu}>
        <div className={`${mainstyle.menu_box} flex justify-center items-center mb-8`} onClick={()=>dispatch(toggleIndex(false))}>
          <FontAwesomeIcon icon={faXmark} className={mainstyle.menu_icon} />
        </div>
      </div> */}
    </div>
  )
}

export default Index