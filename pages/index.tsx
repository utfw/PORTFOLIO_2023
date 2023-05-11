import Image from 'next/image'
import { GetStaticProps } from 'next';
import { Montserrat, Noto_Sans_KR } from 'next/font/google'
import Head from 'next/head';
import mainstyle from '../styles/Main.module.scss'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faJsSquare, faReact, faHtml5, faCss3, faSass, faJava, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faRocket, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import Index from '@/components/Index';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, getSectionHeight, openDoc, updateIndex,  } from '@/store/store';
import Shark from '@/components/Shark';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import Validation from '@/components/Validation';
import Explosion from '@/components/Explosion';
import Loading from '@/components/Loading';
import { notoSansKR, montserrat } from './_app';

export default function Home() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state:RootState) => state.index.Index);
  const index = useSelector((state:RootState)=> state.scrollPosition.Scroll);
  const [sections, setSections] = useState<NodeListOf<HTMLElement>>();
  const [sectionsTop, setSectionsTop] = useState<number[]>([]);
  const [animationWrap, setAnimationWrap] = useState<NodeListOf<HTMLElement>>();
  const animationDelayed = 300;
  const sectionHeight = useSelector((state:RootState)=>state.sectionHeights.Height);
  
  const [isVideoLoad, setIsVideoLoad] = useState(true);
  const docOpen = useSelector((state:RootState)=> state.openDoc.Index);
  //테스트용 임시 true

useLayoutEffect(()=>{ //초기화 + 정보읽기 => 로딩이 필요함
  const sections = document.querySelectorAll("section");
  setSections(sections);

  let heights = Array.from(sections).map((section) => section.offsetTop);
  setSectionsTop(heights);
  dispatch(getSectionHeight(window.innerHeight));
  const texts = Array.from(document.querySelectorAll(".animate_text"));
  // 부모요소에 ${mainstyle.title} animate_text클래스를 넣으면 자식 span에 적용
  for(let el of texts){
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((text: HTMLElement, i: number) => {
      text.style.animationDelay = `${animationDelayed + (50 * i)}ms`;
    })
  }
},[isVideoLoad]);

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  if(isIndexToggle !== true){
    if(event.deltaY > 0 && index < sectionsTop.length-1){
      // console.log(`아래로 스크롤`)
      dispatch(updateIndex(index+1));
    } else if(event.deltaY < 0 && index > 0){
      // console.log(`위로 스크롤`)
      // setI(i-1);
      dispatch(updateIndex(index-1));
    }
  // console.log(`스크롤이동 ${index}`);
  }
};

useEffect(() => {
  if(sectionHeight > 800){
  window.addEventListener('wheel', handleWheel, {passive: false});
  window.scroll({
    top:sectionHeight*index,
    behavior:'smooth'
    })
  if(sections){active(sections,index);}
  
  return () => window.removeEventListener('wheel', handleWheel);
  } else {
    dispatch(updateIndex(0));
    sections?.forEach((section)=>{
      section.classList.add("active");
    })
  }
}, [index, isIndexToggle, sections]);

const active = (el:NodeListOf<HTMLElement>,i:number) =>{
  el.forEach((item:HTMLElement) => {
    item.classList.remove("active");
  });
  el[i].classList.add("active");
  // console.log(`${i} active`);
}

function resize(){
  const sections = document.querySelectorAll("section");
  setSections(sections);
    var heights = Array.from(sections).map((section) => section.offsetTop);
    setSectionsTop(heights);
    dispatch(getSectionHeight(window.innerHeight));
}

useEffect(()=>{
  window.addEventListener('resize',resize);
  return () => {
    window.removeEventListener('resize', resize);
  };
},[]);

// const [videoCount, setVideoCount] = useState(0);

// useEffect(()=>{
//   setVideo();
// },[])

// function setVideo(){
//   const videos = document.querySelectorAll('video');

  // videos.forEach((video,i)=>{
  //   video.addEventListener('loadeddata', ()=>{
  //     setVideoCount(prev=>prev+1);
  //   })
  // })
// }
// console.log(videoCount);

const [videos, setVideos] = useState([]);

useEffect(() => {
  const getVideo = () => {
    const promises:Promise<HTMLVideoElement>[] = []; // Promise 객체를 담을 배열 생성

    const videos = document.querySelectorAll('video');

    videos.forEach((video, i) => {
      const promise:Promise<HTMLVideoElement> = new Promise((resolve, reject) => {
        video.addEventListener('loadeddata', () => {
          resolve(video); // Promise 객체를 통해 비디오 요소 반환
        });
        video.addEventListener('error', () => {
          reject(new Error('비디오 로딩 중 오류가 발생했습니다.')); // Promise 객체를 통해 에러 반환
        });
      });      
      promises.push(promise); // Promise 객체를 배열에 추가
    });
    return promises; // Promise 객체 배열 반환
  };

  Promise.all(getVideo())
    .then(() => {
      setInterval(()=>setIsVideoLoad(false),5200);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

const toggleDoc = (e:MouseEvent)=>{
  console.log(1)
  e.preventDefault();
  dispatch(openDoc(true));
}

  return (
    <>
    <Head>
      <title>PORTFOLIO | 2023</title>
    </Head>
    {/* Index Component */}
    <Index />

    {isVideoLoad ? (
     <Loading></Loading>
    ):(
      <main className={`min-h-screen overflow-hidden ${montserrat.className} [&>div>section]:w-full
      ${sectionHeight > 800 && `[&>div>section]:h-screen`} 
      [&>div>section]:overflow-hidden [&>div>section>h2]:text-[var(--gray2)]`} id='container'>
      {docOpen && (<Validation top={index*sectionHeight}></Validation>)}
      <div id='content1' className={`relative`}>
        {/* section1 */}
        {index == 0 && <Explosion />}
        <section className={`flex w-full h-screen justify-center items-center`}>
          <div className={`block`}>
            <h1 className={`${montserrat.className} ${mainstyle.h1} ${mainstyle.title} animate_text`}>
              {/* 효과를 우선 마우스 오버로 함 자동적으로 되게 해야함 */}
              <span>2023&nbsp;</span><span>P</span><span>O</span><span>R</span><span >T</span><span>F</span><span>O</span><span>L</span><span >I</span><span>O</span></h1>
            <p className={`${montserrat.className} ${mainstyle.title_sub} tracking-[-.054em] text-[var(--gray1)]`}>Logical thinking skills and research techniques, with interests as well as AI and UX/UI design</p>
          </div>
        </section>
        {/* //section1 */}
      </div>
      <div id='content2'>
        {/* section2 */}
        <section className={`flex flex-col pb-20`} style={{boxSizing:`border-box`}}>
          <h2 className={`${mainstyle.title1}`}>HELLO</h2>
          <div className={`${mainstyle.section__inner}`} style={{flex:`1`}}>
            <div className={mainstyle.left}>
              <div>
                <p className={`${mainstyle.title_sub} ${notoSansKR.className} ${mainstyle.title} animate_text`} style={{color:`var(--gray1)`}}><span>심리학 전공으로 학습한 논리적 사고 능력과 조사 연구 기술을 바탕으로, 인지와 생물 심리학, 그리고 AI와 UX/UI 디자인 분야에 관심이 있으며 지속적인 자기개발을 추구하는 사람입니다.</span></p>
                <ul className={`my-10 ${mainstyle.body} [&>li]:mb-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8 [&>li>svg]:h-8 [&>li>svg]:mr-2.5 [&>li>svg]:text-[var(--gray2)]`} style={{color:`var(--gray1)`}}>
                <li className={`${mainstyle.body2}`} ><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon><span>+82 10.4415.9901</span></li>
                <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon><Link href={'mailto:hwan.c.0330@gmail.com'} className={`${mainstyle.body2}`}>hwan.c.0330@gmail.com</Link></li>
                <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon><span className={`${mainstyle.body2}`}><a href='https://github.com/utfw'>github : https://github.com/utfw</a></span></li>
                </ul>
              </div>
              <dl className={`pt-10 h-full`} style={{color:`var(--gray1)`}}>
              <dt className={`${mainstyle.title_sub2} pb-6`} style={{color:`var(--gray2)`}}>PROGRAMMING LANGUAGES</dt>
              <dd className={`flex ${mainstyle.body}`}>
                <ul className={`flex mr-10 [&>li]:mb-10 [&>li]:mr-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8 [&>li>svg]:h-8 [&>li>svg]:mr-2 [&>li>svg]:text-[var(--gray2)]`}>
                <li><FontAwesomeIcon icon={faJsSquare} /><span>JavaScript</span></li>
                <li><FontAwesomeIcon icon={faReact} /><span>React</span></li>
                <li>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_170_265)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.60517e-07 15.9999C0.000103065 13.239 0.714622 10.5251 2.07408 8.12211C3.43354 5.71912 5.39168 3.70878 7.75809 2.28659C10.1245 0.864405 12.8187 0.0787558 15.5786 0.0060398C18.3385 -0.0666762 21.0703 0.576016 23.5083 1.87162C25.9464 3.16723 28.0076 5.07166 29.4917 7.39974C30.9759 9.72782 31.8323 12.4003 31.9778 15.1574C32.1233 17.9144 31.5528 20.6622 30.322 23.1336C29.0911 25.6049 27.2417 27.7157 24.9536 29.2607L10.4683 8.98123C10.337 8.7973 10.1508 8.6598 9.93632 8.58856C9.72189 8.51732 9.49037 8.51601 9.27515 8.58482C9.05993 8.65364 8.87212 8.78902 8.7388 8.97145C8.60547 9.15388 8.53353 9.37394 8.53333 9.5999V25.5999H10.6667V12.9279L23.104 30.3402C20.6643 31.5491 17.9565 32.1154 15.2368 31.9855C12.5172 31.8557 9.87564 31.0339 7.56226 29.598C5.24888 28.1621 3.34019 26.1597 2.01687 23.7801C0.693538 21.4006 -0.000652719 18.7227 4.60517e-07 15.9999ZM21.3333 21.3332V8.53323H23.4667V21.3332H21.3333Z" fill="#393939"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_170_265">
                  <rect width="32" height="32" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>Next</span></li>
                <li><FontAwesomeIcon icon={faHtml5} /><span>HTML</span></li>
                <li><FontAwesomeIcon icon={faCss3} /><span>CSS</span></li>
                <li><FontAwesomeIcon icon={faSass} /><span>SASS</span></li>
                <li><FontAwesomeIcon icon={faJava} /><span>Java</span></li>
                </ul>
              </dd>
              <dt className={`${mainstyle.title_sub2} pb-6`} style={{color:`var(--gray2)`}}>TOOLS</dt>
              <dd>
                <ul className={`flex mr-10 [&>li]:mr-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8 [&>li>svg]:h-8 [&>li>svg]:mr-2 [&>li>svg]:text-[var(--gray2)]`}>
                <li><FontAwesomeIcon icon={faFigma} /><span>Figma</span></li>
                <li>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_151_536)">
                  <path d="M26 0.475736C26 0.0413683 26 0 25.5873 0H0.515873C0.103175 0 0 0.0413683 0 0.455052V25.5863C0 26 0.0619048 26 0.453968 26H25.5873C25.9175 26 26 25.9173 26 25.5863C25.9794 21.4081 26 17.2092 26 13.031V0.475736ZM11.9064 19.2363L9.90476 14.7271L7.8 19.2363H5.48889L8.48095 13.1758L5.69524 6.76372L8.06825 6.78441L9.82222 10.9833L11.9683 6.76372H14.1968L11.1841 12.8449L14.1762 19.2363H11.9064ZM20.9032 6.99125V18.6985C20.9032 19.0088 20.8619 19.1949 20.5524 19.2156C19.1079 19.4017 17.6635 19.6086 16.2397 19.1949C14.6921 18.7605 13.8048 17.5402 13.7429 15.8648C13.6603 13.7963 14.4444 12.3691 15.9714 11.7072C16.9206 11.2936 17.8905 11.2729 18.9841 11.3763V6.78441H20.9032V6.99125ZM16.8794 17.6229C17.5603 17.8091 18.2413 17.747 18.9429 17.6229V13.4861C18.9429 13.424 18.8603 13.2999 18.7984 13.2792C18.0349 13.1551 17.2508 13.1551 16.5286 13.5481C15.7857 13.9618 15.3937 14.8305 15.4762 15.8441C15.5381 16.7749 16.0333 17.3747 16.8794 17.6229Z" fill="#393939"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_151_536">
                  <rect width="26" height="26" rx="6" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>Adobe XD</span></li>
                <li>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_151_545)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.2062 8.45325C9.45831 8.26536 8.70939 8.32569 7.91903 8.44878C7.91903 9.83105 7.91619 11.1761 7.92655 12.5214C7.92695 12.5903 8.03034 12.7101 8.09737 12.7193C8.95923 12.8357 9.81642 12.845 10.6224 12.4522C11.4562 12.0459 11.881 11.1965 11.7709 10.1991C11.671 9.29094 11.1333 8.68624 10.2062 8.45325ZM25.7969 12.9925V0.667266C25.7969 0.241516 25.8015 0.203125 25.3882 0.203125H0.706672C0.304688 0.203125 0.203125 0.241719 0.203125 0.647156V25.3287C0.203125 25.7386 0.254313 25.7392 0.651828 25.7392C8.88956 25.7394 17.1519 25.7374 25.3896 25.7467C25.7091 25.7471 25.7948 25.662 25.794 25.3488C25.7831 21.23 25.7969 17.1108 25.7969 12.9925ZM11.4465 14.1787C10.3177 14.5813 9.14062 14.6039 7.92188 14.5094V19.0938H5.6875V18.809C5.6875 14.9709 5.66983 11.1333 5.65906 7.29544C5.65784 6.97674 5.70842 6.82277 6.06755 6.7862C7.75998 6.61314 9.44287 6.41855 11.1258 6.81322C12.9348 7.23714 13.9778 8.43314 14.0571 10.0856C14.1552 12.1318 13.2559 13.5334 11.4465 14.1787ZM20.447 16.7694C20.3608 17.9416 19.6999 18.7113 18.6158 19.0834C17.1651 19.5815 15.7223 19.4659 14.3045 18.9024C14.0723 18.81 14.0274 18.693 14.104 18.4563C14.2435 18.0245 14.3457 17.5805 14.4534 17.1795C15.0528 17.3554 15.6228 17.575 16.2132 17.6788C16.6303 17.7521 17.081 17.709 17.5049 17.6426C17.885 17.5829 18.1584 17.3249 18.2207 16.9171C18.2841 16.5025 18.1592 16.1434 17.7931 15.9228C17.5023 15.7477 17.1817 15.6223 16.8744 15.4755C16.3802 15.2393 15.8535 15.054 15.3977 14.7585C13.6039 13.5952 14.1879 11.4307 15.3849 10.6155C16.0253 10.1796 16.734 9.98624 17.4927 9.95963C18.385 9.92834 19.2443 10.0823 20.0883 10.4924L19.6424 12.0746C19.289 11.9494 18.9599 11.7869 18.6125 11.7223C18.2004 11.6456 17.7682 11.6027 17.3522 11.6366C16.7944 11.6823 16.4678 12.0673 16.4678 12.5446C16.4678 12.8273 16.575 13.0666 16.8108 13.2037C17.1492 13.4006 17.5084 13.5629 17.8642 13.7276C18.2494 13.9057 18.656 14.0426 19.0267 14.246C20.0159 14.7883 20.5309 15.6272 20.447 16.7694Z" fill="#393939"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_151_545">
                  <rect width="26" height="26" rx="6" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>Adobe Photoshop</span></li>
                <li>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_151_555)">
                  <path d="M11.4075 11.6241C11.2992 11.2883 11.2017 10.9633 11.0933 10.6275C10.985 10.2916 10.8875 9.97745 10.8008 9.66328C10.7142 9.35995 10.6383 9.07829 10.5625 8.81828H10.5408C10.4433 9.28412 10.3242 9.74995 10.1725 10.2158C10.01 10.7358 9.8475 11.2775 9.67417 11.8191C9.5225 12.3716 9.36 12.8808 9.1975 13.3358H11.9492C11.8842 13.1072 11.7975 12.8375 11.7 12.5547C11.6025 12.2633 11.505 11.9491 11.4075 11.6241ZM21.3958 0.324951H4.60417C2.05833 0.324951 0 2.38328 0 4.92912V21.0708C0 23.6166 2.05833 25.675 4.60417 25.675H21.3958C23.9417 25.675 26 23.6166 26 21.0708V4.92912C26 2.38328 23.9417 0.324951 21.3958 0.324951ZM15.925 18.2325H13.6598C13.585 18.2433 13.5092 18.1891 13.4875 18.1133L12.5992 15.535H8.56917L7.74583 18.0808C7.72417 18.1783 7.6375 18.2433 7.54 18.2335H5.50333C5.38417 18.2335 5.35167 18.1675 5.38417 18.0385L8.8725 7.99495C8.905 7.88662 8.9375 7.76745 8.98083 7.63745C9.02417 7.40995 9.04583 7.17162 9.04583 6.93328C9.035 6.87912 9.07833 6.82495 9.1325 6.81412H11.9383C12.025 6.81412 12.0683 6.84662 12.0792 6.90078L16.0333 18.0591C16.0658 18.1772 16.0333 18.2325 15.925 18.2325ZM19.6083 18.07C19.6083 18.1891 19.5661 18.2433 19.4686 18.2433H17.3442C17.2358 18.2433 17.1817 18.1772 17.1817 18.07V9.72828C17.1817 9.61995 17.2261 9.57662 17.3236 9.57662H19.4686C19.5661 9.57662 19.6083 9.63078 19.6083 9.72828V18.07ZM19.3819 8.28745C19.254 8.41739 19.0997 8.51845 18.9295 8.58384C18.7593 8.64924 18.577 8.67746 18.395 8.66662C18.0375 8.67745 17.6908 8.53662 17.4298 8.28745C17.1815 8.01607 17.0494 7.65836 17.0614 7.29078C17.0506 6.92245 17.1914 6.57578 17.4503 6.32662C17.7125 6.07745 18.0592 5.94745 18.4167 5.94745C18.8403 5.94745 19.1631 6.07745 19.4025 6.32662C19.6408 6.58662 19.7708 6.93328 19.76 7.29078C19.7708 7.65912 19.6408 8.01662 19.3819 8.28745Z" fill="#393939"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_151_555">
                  <rect width="26" height="26" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>Adobe Illustrator</span></li>
                </ul>
              </dd>
              </dl>
            </div>
            <div className={`w-[2px] mx-10 mt-4`} style={{ background:`var(--gray1)`, flex:`1`, maxWidth:`2px`}}></div>
            <div className='right flex flex-col justify-between [&>dl]:mb-5'>
              <dl className={`text-[var(--gray2)] [&>dt]:text-[var(--gray2)]`}>
              <dt className={`${mainstyle.title_sub2}`}>EDUCATION</dt>
              <dd>
                <ul className={`[&>li]:mb-5 [& *]:text-[var(--gray2)]`}>
                <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)]`}>
                  <span className={`${mainstyle.body1} ${notoSansKR.className}`}>이젠아카데미 평생교육원</span>
                  <span className={`${mainstyle.body2} `}>UI/UX 웹&앱 디자인 & 프론트엔드 / 2022 - 2023</span>
                </li>
                <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)]`}>
                  <span className={`${mainstyle.body1} ${notoSansKR.className}`}>강원대학교</span>
                  <span className={`${mainstyle.body2}`} >심리학 학사 / 2010 - 2017</span>
                </li>
                <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)]`}>
                  <span className={`${mainstyle.body1} ${notoSansKR.className}`}>강원창조경제혁신센터</span>
                  <span className={`${mainstyle.body2}`} >AI Tutor / 2017</span>
                </li>
                </ul>
              </dd>
              </dl>
              <dl className={`text-[var(--gray2)] [&>dt]:text-[var(--gray2)]`}>
              <dt className={`${mainstyle.title_sub2}`}>LANGUAGES</dt>
              <dd>
              <ul className={`mb-10 [&>li]:mb-5 [& *]:text-[var(--gray2)]`}>
              <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)] `}>
                <span className={`${mainstyle.body1}`}>Korean</span>
                <span>Mother language</span>
              </li>
              <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)]`}>
                <span className={`${mainstyle.body1}`}>English</span>
                <span>Independent</span>
              </li>
              <li className={`[&>span:first-child]:mb-0.5 [&>span]:block [&>span:last-child:text-[var(--gray1)] `}>
                <span className={`${mainstyle.body1}`}>Germany</span>
                <span>Basic</span>
              </li>
              </ul>
              </dd>
              </dl>
              {sectionHeight >= 1050 &&(
                <dl className={`h-full text-[var(--gray2)] [&>dt]:text-[var(--gray2)]`}>
                <dt className={`${mainstyle.title_sub2}`}>INTERESTS</dt>
                <dd>
                  <ul className={`flex [&>li]:mr-5 [&>li]:text-[var(--gray2)]`}>
                  <li>Technology</li>
                  <li>Game</li>
                  <li>Swimming</li>
                  <li>Life</li>
                  </ul>
                </dd>
                </dl>
              )}
            </div>
          </div>
        </section>
        {/* //section2 */}
      </div>
      <div id='content3'>
        {/* section3 */}
        <section className={`relative`}>
          {/* <Particles></Particles> */}
          <h2 className={`${mainstyle.title1} mb-11`}>FESCARO</h2>
          <div className={`flex w-full pr-[144px] justify-between`}>
            <dl className={`text-[var(--gray2)] min-w-[600px]
            [&>dt]:text-[var(--gray2)] 
            [&>dd]:mb-[50px] ${mainstyle.inner_left}`}>
              <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
              <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>미디어쿼리를 사용하여 반응형으로 제작한 기업사이트입니다.<br />
              스크롤 위치에 따라 메뉴 색상이 변경됩니다.</span></dd>
              <dt className={`${mainstyle.title_sub2}`}>Description</dt>
              <dd>
                <ul className={`${mainstyle.body1} ${notoSansKR.className}
                [&>li]:text-[var(--gray1)]`}>
                <li className={`${mainstyle.title} animate_text`}><span>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</span></li>
                <li className={`${mainstyle.title} animate_text`}><span>2. HTML / CSS w3c 검사 통과</span></li>
                <li className={`${mainstyle.title} animate_text`}><span>3. CSS와 JavaScript로 인터랙션 적용</span></li>
                <li className={`${mainstyle.title} animate_text`}><span>4. 반응형 페이지 제작</span></li>
                <li className={`${mainstyle.title} animate_text`}><span>5. Swiper.js 사용하여 오토배너를 구현</span></li>
                </ul>
                <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
              [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
              [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)]
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
              [&>li>a:hover>span>svg]:text-[var(--bg)]
              `}>
                <li><a href='https://github.com/utfw/clone_fescaro' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
                <li><a href='https://utfw.github.io/clone_fescaro/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
                <li><a href='#' onClick={toggleDoc}><span><FontAwesomeIcon icon={faClipboardCheck} /></span>Verification</a></li>
                </ul>
              </dd>
              <dt className={`${mainstyle.title_sub2}`}><span>Languages</span></dt>
              <dd className={`${mainstyle.body1} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
            </dl>
            {/* 목업 */}
            <div className={`relative flex justify-end ${mainstyle.mockup}`}>
              <div className={mainstyle.mockup__pc}>
                <div className='video__wrap'>
                  <video autoPlay muted loop>
                    <source src='videos/fescaro/pc.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
              <div className={mainstyle.mockup__tablet}>
                <div>
                  <video autoPlay muted loop>
                    <source src='videos/fescaro/tablet.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
              <div className={mainstyle.mockup__mobile}>
                <div className='video__wrap'>
                <video autoPlay muted loop>
                    <source src='videos/fescaro/mobile.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
            </div>
            {/* //목업 */}
          </div>
        </section>
        {/* //section3 */}
      </div>
      <div id='content4'>
        {/* section4 */}
        <section>
          <h2 className={`${mainstyle.title1} mb-11`}>삼성전기</h2>
          <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] min-w-[600px] h-full [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-[50px] ${mainstyle.inner_left}`}>
            <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
            <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>웹 컨텐츠 접근성 지침과 웹표준을 준수하여<br />삼성전기 기업 웹 사이트를 제작 하였습니다.</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Description</dt>
            <dd>
              <ul className={`${mainstyle.body1} ${notoSansKR.className}
              [&>li]:text-[var(--gray1)]`}>
              <li className={`${mainstyle.title} animate_text`}><span>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>2. HTML / CSS w3c 검사 통과</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>3. CSS와 JavaScript로 인터랙션 적용</span></li>
              </ul>
              <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
              [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
              [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)]
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
              [&>li>a:hover>span>svg]:text-[var(--bg)]
              `}>
              <li><a href='https://github.com/utfw/clone_samsung' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/clone_samsung/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              <li><a href='#' onClick={toggleDoc}><span><FontAwesomeIcon icon={faClipboardCheck} /></span>Verification</a></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
            <dd className={`${mainstyle.body1} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
          </dl>
            {/* 목업 */}
            <div className={`relative flex justify-end ${mainstyle.mockup}`}>
              <div className={mainstyle.mockup__pc}>
                <div className='video__wrap'>
                  <video autoPlay muted loop>
                    <source src='videos/samsung/pc.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
            </div>
            {/* //목업 */}
          </div>
        </section>
        {/* //section4 */}
      </div>
      <div id='content5'>
        {/* section5 */}
        <section>
          <h2 className={`${mainstyle.title1} mb-11`}>CJ ONE</h2>
          <div className={`flex w-full pr-[144px] justify-between`}>
            <dl className={`text-[var(--gray2)] min-w-[600px]
            [&>dt]:text-[var(--gray2)] 
            [&>dd]:mb-[50px] ${mainstyle.inner_left}`}>
              <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
              <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>미디어쿼리를 사용하여 반응형 웹으로 제작하였으며<br />메뉴에 sprite animation을 적용하였습니다.</span></dd>
              <dt className={`${mainstyle.title_sub2}`}>Description</dt>
              <dd>
                <ul className={`${mainstyle.body1} ${notoSansKR.className}
                [&>li]:text-[var(--gray1)]`}>
                <li className={`${mainstyle.title} animate_text`}><span>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>2. HTML / CSS w3c 검사 통과</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>3. CSS와 JavaScript로 인터랙션 적용</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>4. 반응형 페이지 제작</span></li>
                </ul>
                <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
              [&>li>a]:transition-all [&>li>a]:duration-500 [&>li>a]:ease-in-out
              [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)]
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
              [&>li>a:hover>span>svg]:text-[var(--bg)]
              `}>
                <li><a href='https://github.com/utfw/clone_CJONE' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
                <li><a href='https://utfw.github.io/clone_CJONE/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
                <li><a href='#' onClick={toggleDoc}><span><FontAwesomeIcon icon={faClipboardCheck} /></span>Verification</a></li>
                </ul>
              </dd>
              <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
              <dd className={`${mainstyle.body1} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
            </dl>
            {/* 목업 */}
            <div className={`relative flex justify-end ${mainstyle.mockup}`}>
              <div className={mainstyle.mockup__pc}>
                <div className='video__wrap'>
                  <video autoPlay muted loop>
                    <source src='videos/cjone/pc.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
              <div className={mainstyle.mockup__tablet}>
                <div>
                  <video autoPlay muted loop>
                    <source src='videos/cjone/tablet.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
              <div className={mainstyle.mockup__mobile}>
                <div className='video__wrap'>
                <video autoPlay muted loop>
                    <source src='videos/cjone/mobile.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
            </div>
            {/* //목업 */}
          </div>
        </section>
        {/* //section5 */}
      </div>
      <div id='content6'>
        {/* section6 */}
        <section>
          <h2 className={`${mainstyle.title1} mb-11`}>REACT TALK APP</h2>
          <div className={`flex w-full pr-[144px] justify-between`}>
            <dl className={`z-10 text-[var(--gray2)] min-w-[600px]
            [&>dt]:text-[var(--gray2)] 
            [&>dd]:mb-8 [&>dd]:text-[var(--gray1)] ${mainstyle.inner_left}`}
            >
              <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
              <dd className={`${mainstyle.body1} ${notoSansKR.className} ${mainstyle.title} animate_text`}><span>React로 제작한 메신저 앱입니다.<br />google의 Firebase를 사용하여 데이터를 전송하고 관리할 수 있습니다.</span></dd>
              <dt className={`${mainstyle.title_sub2}`}>Description</dt>
              <dd>
                <ul className={`${mainstyle.body1} ${notoSansKR.className}
                `}>
                <li className={`${mainstyle.title} animate_text `}><span>1. Firebase 인증서비스로 사용자 관리</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>2. Firebase Database로 채팅 내역 송수신</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>3. 사용자 정보를 문서로 Database에 저장</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>4. Storage로 이미지 파일 업로드</span></li>
                <li className={`${mainstyle.title} animate_text `}><span>5. 프로필 업데이트 시 기존 파일을 Storage에서 제거</span></li>
                <li className={`${mainstyle.title} animate_text`}><span>6. Axios 비동기 라이브러리 사용</span></li>
                </ul>
                <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
              [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
              [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)]
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
              [&>li>a:hover>span>svg]:text-[var(--bg)]
              `}>
                <li><a href='https://github.com/utfw/react_chat_firebase_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
                <li><a href='https://utfw.github.io/react_chat_firebase_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
                </ul>
              </dd>
              {sectionHeight <= 1060 ? (
              <>
              <dt className={`${mainstyle.title_sub2}`}>Used</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript / React / Firebase / Axios</span></dd>
              </>
            ):(
              <>
              <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
              <dt className={`${mainstyle.title_sub2}`}>Used</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>React / Firebase / Axios</span></dd>
              </>
            )}
            </dl>
            {/* 목업 */}
            <div className={`relative flex justify-end ${mainstyle.mockup}`}>
              <div className={`${mainstyle.mockup__mobile} ${mainstyle.kakao}`}>
                <div className='video__wrap'>
                  <video autoPlay muted loop>
                    <source src='videos/kakao/mobile.mp4' type='video/mp4'/>
                  </video>
                </div>
              </div>
          </div>
            {/* //목업 */}
          </div>
        </section>
        {/* //section6 */}
      </div>
      <div id='content7'>
        {/* section7 */}
        <section>
          <h2 className={`${mainstyle.title1} mb-11`}>REACT NETFLIX APP</h2>
          <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`z-10 text-[var(--gray2)] min-w-[600px]
          [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-8 [&>dd]:text-[var(--gray1)] ${mainstyle.inner_left}`}>
            <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
            <dd className={`${mainstyle.body1} ${notoSansKR.className} ${mainstyle.title} animate_text`}><span>styled-componet를 사용하여 제작한 React Netflix App입니다.<br />The Movie DataBase API를 사용하여 영화 정보를 가져옵니다.</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Description</dt>
            <dd>
            <ul className={`${mainstyle.body1} ${notoSansKR.className}
              `}>
              <li className={`${mainstyle.title} animate_text`}><span>1. Firebase 인증서비스로 사용자 관리</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>2. 사용자 정보를 문서로 Database에 저장하여 관리</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>3. Storage로  프로필 이미지 파일 업로드</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>4. 문서 정보를 토대로 프로필 정보 갱신</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>5. Axios 비동기 라이브러리 사용</span></li>
              <li className={`${mainstyle.title} animate_text`}><span>6. styled-components 사용하여 일부 컴포넌트 구현</span></li>
              </ul>
              <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
              [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
              [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)]
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
              [&>li>a:hover>span>svg]:text-[var(--bg)]
              `}>
               <li><a href='https://github.com/utfw/react_search_movie_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/react_search_movie_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              </ul>
            </dd>
            {sectionHeight <= 1060 ? (
              <>
              <dt className={`${mainstyle.title_sub2}`}>Used</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript / React / TMDB / Firebase / Axios / styled-components</span></dd>
              </>
            ):(
              <>
              <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
              <dt className={`${mainstyle.title_sub2}`}>Used</dt>
              <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>React / TMDB / Firebase / Axios / styled-components</span></dd>
              </>
            )}
          </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end ${mainstyle.mockup}`}>
            <div className={mainstyle.mockup__pc}>
              <div>
              </div>
            </div>
              <div className={mainstyle.mockup__tablet}>
                <div>
                </div>
            </div>
            <div className={mainstyle.mockup__mobile}>
              <div>
              </div>
            </div>
          </div>
          {/* //목업 */}
          </div>
        </section>
        {/* //section7 */}
      </div>
      <div id='content8'>
        {/* section8 */}
        <section className={`relative`}>
          <h2 className={`${mainstyle.title1}`}>PURE CSS</h2>
            <Shark></Shark>
        </section>
        {/* //section8 */}
      </div>
      {/* <div id='content9'>
        <section>
          <h2 className={`${mainstyle.title1} ${mainstyle.gray2}`}>Extra Page</h2>
        </section>
      </div> */}
      <div id='content10'>
      <section className={`relative`}>
        <div className={`absolute top-1/2 left-1/2 w-[518px] text-[var(--gray2)] ${mainstyle.finbox} ${index === 9 && mainstyle.play}`}>
          <p className={`w-full text-justify ${mainstyle.title_fin} leading-none`}>THANKS</p>
          <p className={`text-[62px] text-justify tracking-[.013em]`}>FOR WATCHING</p>
          <div className='flex justify-between flex-row-reverse items-end mt-[81px]'>
            <div className={`text-[var(--gray2)] text-right`}>
              <ul className={`[&>li]:mb-5 [&>li:last-child]:mb-0`}>
                <li>+82 10.4415.9901</li>
                <li><Link href={'mailto:hwan.c.0330@gmail.com'}>hwan.c.0330@gmail.com</Link></li>
                <li><Link href={'https://github.com/utfw'}>github : https://github.com/utfw</Link></li>
              </ul>
            </div>
            <div className={`w-11 h-11 mb-[5px] bg-[var(--gray2)]`}></div>
          </div>
        </div>
      </section>
      </div>
      </main>
    )}

    </>
  )
}
