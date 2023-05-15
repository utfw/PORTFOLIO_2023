import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import mainstyle from '../styles/Main.module.scss';


function Code() {
  const textbox = useRef<HTMLDivElement>(null);
  const string = useRef([
  `<head><title>페스카로(FESCARO)</title>
  <meta name="description" content="포트폴리오 페스카로 사이트 클론">
  <meta name="keywords" content="html, css, js, 페스카로">
  <meta name="author" content="https://github.com/utfw">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
  <link rel="stylesheet" href="css/main.css">
  <script defer src="https://kit.fontawesome.com/4bceaf1a9d.js" crossorigin="anonymous"></script>
  <script defer src="js/swiper-bundle.min.js"></script>
  <script defer src="js/header.js"></script>
  <script defer src="js/main.js"></script>
  </head>`,

  `<head><title>삼성전기</title>
  <meta name="description" content="포트폴리오 삼성전기 사이트 클론">
  <meta name="keywords" content="html, css, js, 삼성전기">
  <meta name="author" content="https://github.com/utfw">
  <link rel="stylesheet" href="css/import.css">
  <link rel="stylesheet" href="css/main.css">
  <script src="js/main.js"></script>
  <script defer src="js/autoscroll.js"></script>
  </head>`,

  `<head><title>메인 | CJ ONE</title>
  <meta name="description" content="포트폴리오 CJONE 사이트 클론">
  <meta name="keywords" content="html, css, js, CJONE">
  <meta name="author" content="https://github.com/utfw">
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-barun-gothic.css" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
  <script src="https://kit.fontawesome.com/4bceaf1a9d.js" crossorigin="anonymous"></script>
  <script defer src="js/main.js"></script>
  <script defer src="js/autoscroll.js"></script>`]);

  let loopTimer: NodeJS.Timeout;
  const Index = useSelector((state:RootState) => state.scrollPosition.Scroll);
 
  let fescaro = string.current[0].split("");
  let samsung = string.current[1].split("");
  let cjone = string.current[2].split("");

  const frameLooper = () => {
    let index = Index - 2;


      if (textbox.current) {
        switch (index) {
          case 0:
            if (fescaro.length > 0) {
            textbox.current.innerHTML += fescaro.shift();
            }
            break;
          case 1:
            if (samsung.length > 0) {
            textbox.current.innerHTML += samsung.shift();
            }
            break;
          case 2:
            if (cjone.length > 0) {
            textbox.current.innerHTML += cjone.shift();
            }
            break;
          default:
            break;
        }
    } else {
      clearTimeout(loopTimer);
    }
    loopTimer = setTimeout(frameLooper, 50); /* change 70 for speed */
  };

  const initText = () =>{
    const element = textbox.current;
    return () => {
      if (element) {
        fescaro = string.current[0].split("");
        samsung = string.current[1].split("");
        cjone = string.current[2].split("");
        element.innerHTML = "";
      }
      clearTimeout(loopTimer);
    };
  }
  
  useEffect(() => {
    const element = textbox.current;
    if (element) {

      element.addEventListener('mouseenter', frameLooper);
    }
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', frameLooper);
        element.innerHTML = "";
      }
      clearTimeout(loopTimer);
    };
  }, [Index]);

  return ( 
    <div className={mainstyle.mockup__code}>
      <div id="text" ref={textbox} className={`w-full h-full overflow-hidden`} onMouseLeave={initText()}></div>
    </div>
  );
}

export default Code;
