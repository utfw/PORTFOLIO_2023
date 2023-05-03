import React from 'react'
import sharkStyles from '../styles/Shark.module.scss'
function Shark() {
  return (
    <div className={sharkStyles.container}>
        <div className={sharkStyles.shark}>
            <div className={sharkStyles.move}>
                <div className={sharkStyles.fin_1}></div>
                <div className={sharkStyles.fin_2}></div>
                <div className={sharkStyles.tail}></div>
                <div className={sharkStyles.body}></div>
                <div className={sharkStyles.face}>
                <div className={sharkStyles.eye}></div>
                <div className={sharkStyles.mouth}>
                    <div className={sharkStyles.teeth}></div>
                </div>
                </div>
                <div className={sharkStyles.fin_3}></div>
            </div>
        </div>
        <div className={sharkStyles.hor}>
            <div className={`${sharkStyles.wave} ${sharkStyles.wave1}`}></div>
            <div className={`${sharkStyles.wave} ${sharkStyles.wave2}`}></div>
            <div className={`${sharkStyles.wave} ${sharkStyles.wave3}`}></div>
            <div className={`${sharkStyles.wave} ${sharkStyles.wave4}`}></div>
            <div className={`${sharkStyles.wave} ${sharkStyles.wave5}`}></div>
        </div>
    </div>
  )
}

export default Shark