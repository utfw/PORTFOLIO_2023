import React from 'react'
import Image from 'next/image'
import mainstyle from '../styles/Main.module.css'


function Validation() {
  return (
    <section className={`z-10 fixed top-0 left-0 w-[1136px] h-full bg-white px-20`}>
      <h2 className={`${mainstyle.title1} text-[var(--gray2)] mt-20`}>Validation</h2>
      <div className={`absolute top-4 right-4 button`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L30 30M2 30L30 2" stroke="var(--gray2)" strokeWidth="4"/>
          </svg>
      </div>
      {/* 검사이미지 레이아웃 */}
      <div className={`flex justify-between w-full mt-11`}>
      {/* 왼쪽레이아웃 */}
        <div className={`flex flex-col`}>
          <div><h3 className={`${mainstyle.title_sub2} text-[]var(--gray2)`}>html</h3>
            <Image width={455} height={0} src={`https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/cjone%2Flighthouse.PNG?alt=media&token=9ea16385-bc67-4cee-b419-ee4c5b210aef`} alt=''></Image>
          </div>
          <div>css</div>
        </div>
        <div>accessibility
        <Image width={455} height={0} src={`https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/cjone%2Flighthouse.PNG?alt=media&token=9ea16385-bc67-4cee-b419-ee4c5b210aef`} alt=''></Image>
        </div>
      </div>
    </section>
  )
}

export default Validation