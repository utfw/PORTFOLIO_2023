import React from 'react';
import mainstyle from '../styles/Main.module.scss';
import indexstyle from '../styles/Index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIndex, RootState, updateIndex } from '@/store/store';
import sharkStyles from '../styles/Shark.module.scss';

function Index() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state: RootState) => state.index.Index);
  const Index = useSelector((state: RootState) => state.scrollPosition.Scroll);
  const height = useSelector((state: RootState) => state.sectionHeights.Height);
  const content_name = ["FESCARO", "삼성전기", "CJ ONE", "TALK APP", "NETFLIX APP", "PURE CSS"];
  const color = [`48, 207, 208`, `69, 220, 195`, `108, 231, 175`, `152, 240, 152`, `199, 246, 130`, `249, 248, 113`];
  const file_name = ["fescaro", "samsung", "cjone", "talk", "netflix", ""];

  function onClickScroll(number: number) {
    dispatch(updateIndex(number + 1));
    dispatch(toggleIndex(false));
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    e.currentTarget.style.background = `rgb(${color[index]})`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    e.currentTarget.style.background = index !== Index - 2 ? `rgba(255,255,255,.3)` : `rgba(${color[index]},.3)`;
  };

  return (
    <div
      className={`z-[11] w-full h-screen px-20 pb-20 text-[var(--gray2)] ${indexstyle.index} ${
        isIndexToggle ? indexstyle['index-on'] : ''
      } `}
      style={{ top: Index * height + 'px' }}
    >
      <h2 className={`${mainstyle.title1} mb-10`}>INDEX</h2>
      <div>
        <ul className={`index`}>
          {content_name.map((name, index) => (
            <li
              key={index}
              className={`${indexstyle.li} ${index === Index - 2 && indexstyle.on}`}
              style={index === Index - 2 ? { background: `rgba(${color[index]},.3)` } : undefined}
              onClick={() => onClickScroll(index + 1)}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={(e) => handleMouseLeave(e, index)}
            >
              <p>{`0${index + 1}`}</p>
              <div>
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full bg-[url(/portfolio_2023/images/m_16.svg)] bg-contain bg-no-repeat`}>
                    <div className={indexstyle.img_wrap}>
                      {index < content_name.length - 1 ? (
                        <img
                          src={`images/${file_name[index]}/${file_name[index]}.png`}
                          alt={file_name[index]}
                          className={index == 3 ? indexstyle?.kakao : ''}
                        />
                      ) : (
                        <div className={sharkStyles.hor}>
                          <div className={`${sharkStyles.wave} ${sharkStyles.wave1}`}></div>
                          <div className={`${sharkStyles.wave} ${sharkStyles.wave2}`}></div>
                          <div className={`${sharkStyles.wave} ${sharkStyles.wave3}`}></div>
                          <div className={`${sharkStyles.wave} ${sharkStyles.wave4}`}></div>
                          <div className={`${sharkStyles.wave} ${sharkStyles.wave5}`}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <h3>{name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Index;
