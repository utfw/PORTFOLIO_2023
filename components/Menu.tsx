import React from 'react'
import mainstyle from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Menu() {
  
  return (
    <div className={mainstyle.menu}>
      <div className={`${mainstyle.menu_box}`}>
        <svg className={mainstyle.menu_icon} viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 28V23.3333H42V28H0ZM0 16.3333V11.6667H42V16.3333H0ZM0 4.66667V0H42V4.66667H0Z" fill="var(--gray2)"/>
        </svg>
      </div>
      <ul className={`flex justify-center items-center flex-col
      [&>li]:w-[8px] [&>li]:h-[23px] [&>li]:mb-2 [&>li.on]:bg-[var(--gray2)] [&>li]:bg-[#BFBFBF]`}>
      <li className='on'></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      </ul>
  </div>
  )
}

export default Menu