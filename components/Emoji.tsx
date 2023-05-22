import React from 'react';
import emoji from '../styles/Emoji.module.scss';

function Emoji() {
  return (
    <div className={emoji.wrap}>
      <div className={`${emoji.emoji} ${emoji.emoji_like}`}>
        <div className={emoji.emoji_hand}>
          <div className={emoji.emoji_thumb}></div>
        </div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_love}`}>
        <div className={emoji.emoji_heart}></div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_haha}`}>
        <div className={emoji.emoji_face}>
          <div className={emoji.emoji_eyes}></div>
          <div className={emoji.emoji_mouth}>
            <div className={emoji.emoji_tongue}></div>
          </div>
        </div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_yay}`}>
        <div className={emoji.emoji_face}>
          <div className={emoji.emoji_eyebrows}></div>
          <div className={emoji.emoji_mouth}></div>
        </div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_wow}`}>
        <div className={emoji.emoji_face}>
          <div className={emoji.emoji_eyebrows}></div>
          <div className={emoji.emoji_eyes}></div>
          <div className={emoji.emoji_mouth}></div>
        </div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_sad}`}>
        <div className={emoji.emoji_face}>
          <div className={emoji.emoji_eyebrows}></div>
          <div className={emoji.emoji_eyes}></div>
          <div className={emoji.emoji_mouth}></div>
        </div>
      </div>
      <div className={`${emoji.emoji} ${emoji.emoji_angry}`}>
        <div className={emoji.emoji_face}>
          <div className={emoji.emoji_eyebrows}></div>
          <div className={emoji.emoji_eyes}></div>
          <div className={emoji.emoji_mouth}></div>
        </div>
      </div>
    </div>
  )
}

export default Emoji