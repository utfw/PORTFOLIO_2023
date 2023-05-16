import React, { useEffect, useLayoutEffect, useState } from 'react'
import loading from '../styles/Loading.module.scss'
import mainsyle from '../styles/Main.module.scss'
import { notoSansKR } from '@/pages/_app'

// const notoSansKR = Noto_Sans_KR({ // 다운이 정상적으로 안됨.
//   weight:["100","300","400","500","700","900"],
//   preload:false, 
// })

function Loading() {
  const loadingText = [
    "포트폴리오에는 Next.js, Redux Toolkit, TypeScript 그리고 Matter.js가 사용되었습니다.",
    "해당 포트폴리오는 해상도 1920*1080에 최적화 되어있습니다.",
    "동영상 불러오기를 기준으로 로딩이 완료됩니다.",
    "2번째 문구까지 나오게 하기 위해서 로딩은 최소 시간이 설정 되어있습니다.",
    "지연시간이 과연 적절한가요?",
    "utfw = 움바바두바바 트롤 분노 전사"
  ]
  const [num, setNum] = useState(0);
  let count = 0;

  useEffect(()=>{
    const timer = setInterval(() =>{
      if (count >= loadingText.length-1){
        count = 0;
        console.log(1)
      } else count++;
      setNum(count);
    }, 2400);
    return () => clearInterval(timer);
  },[])
 
  return (
    <section className={loading.page}>
      <i className={loading.loader}></i>
      <p className={`${loading.text} ${mainsyle.body2} ${notoSansKR.className}`}>{loadingText[num]}</p>
    </section>
  )
}

export default Loading