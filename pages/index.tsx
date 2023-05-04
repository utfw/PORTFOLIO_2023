import Image from 'next/image'
import { GetStaticProps } from 'next';
import { Montserrat, Noto_Sans_KR } from 'next/font/google'
import Head from 'next/head';
import mainstyle from '../styles/Main.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faJsSquare, faReact, faHtml5, faCss3, faSass, faJava, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faRocket, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import Index from '@/components/Index';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, toggleIndex } from '@/store/store';
import Shark from '@/components/Shark';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { test } from 'node:test';

const montserrat = Montserrat({ subsets: ['latin'] });
const notoSansKR = Noto_Sans_KR({ // 다운이 정상적으로 안됨.
  preload:false, 
  weight:["100","300","400","500","700","900"]
}) //구글 폰트에 요청할 필요가 없다함. 

export default function Home() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state:RootState) => state.index);
  const [sections, setSections] = useState<NodeListOf<HTMLElement>>();
  const [sectionsTop, setSectionsTop] = useState<number[]>([]);
  const [i, setI] = useState<number>(0);
  const [animationWrap, setAnimationWrap] = useState<NodeListOf<HTMLElement>>();
  const animationDelayed = 300;
  
  //console.log(`메뉴 ${isIndexToggle}`); //메뉴 토글 확인용
  useLayoutEffect(()=>{ //초기화 + 정보읽기 => 로딩이 필요함
    setI(0);
    const sections = document.querySelectorAll("section");
    setSections(sections);
  
    const heights = Array.from(sections).map((section) => section.offsetTop);
    setSectionsTop(heights);
    const texts = Array.from(document.querySelectorAll(".animate_text"));


    // 부모요소에 ${mainstyle.title} animate_text ${i===1 && (`${mainstyle.play}`)} 클래스를 넣으면 자식 span에 적용
    for(let el of texts){
      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((text: HTMLElement, i: number) => {
        text.style.animationDelay = `${animationDelayed + (50 * i)}ms`;
      })
    }
  },[]);

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  console.log(event)
  console.log('scrolling', event.deltaY);
  if(event.deltaY > 0 && i < sectionsTop.length-1){
    console.log(1)
    setI(i+1); 
  } else if(event.deltaY < 0 && i > 0){
    console.log(2)
    setI(i-1);
  }
  console.log(`스크롤이동 ${i}`)
};

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, {passive: false});
    return () => window.removeEventListener('wheel', handleWheel);
  }, [i, sections]);

  useEffect(() =>{
    // console.log(`스크롤이동`)
    window.scroll({
      top:sectionsTop[i],
      behavior:'smooth'
      })

      if(sections){active(sections,i);}
  },[i, sections])

  const active = (el:NodeListOf<HTMLElement>,i:number) =>{
    el.forEach((item:HTMLElement) => {
      item.classList.remove("active");
    });
    el[i].classList.add("active");
  }

  return (
    <>
    <Head>
      <title>PORTFOLIO | 2023</title>
    </Head>
    {/* Index Component */}
    <Index /> 
    <main className={`min-h-screen ${montserrat.className}
    [&>div>section]:w-full [&>div>section]:h-screen [&>div>section]:px-20
    [&>div>section>h2]:mt-[41px] [&>div>section>h2]:text-[var(--gray2)]`} id='container'>
    <div id='content1'>
      {/* section1 */}
      <section className={`w-full h-screen border border-red-600 ${i===0 && (`${mainstyle.play}`)}`}>
        <div className={mainstyle.title_box}>
          <h1 className={`${montserrat.className} ${mainstyle.h1} ${mainstyle.title} animate_text ${i===0 && (`${mainstyle.play}`)}`}>
            {/* 효과를 우선 마우스 오버로 함 자동적으로 되게 해야함 */}
            <span>2023&nbsp;</span><span>P</span><span>O</span><span>R</span><span >T</span><span>F</span><span>O</span><span>L</span><span >I</span><span>O</span></h1>
          <p className={`${montserrat.className} ${mainstyle.title_sub} tracking-[-.054em]`}>Logical thinking skills and research techniques, with interests as well as AI and UX/UI design</p>
        </div>
      </section>
      {/* //section1 */}
    </div>
    <div id='content2'>
      {/* section2 */}
      <section className={`border border-red-600`} style={{boxSizing:`border-box`}}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} `}>HELLO</h2>
        <div className={`${mainstyle.section__inner}`}>
          <div className={`${mainstyle.left}`}>
            <p className={`${mainstyle.title_sub} ${notoSansKR.className} ${mainstyle.title} animate_text ${i===1 && (`${mainstyle.play}`)}`} style={{color:`var(--gray1)`}}><span>심리학 전공으로 학습한 논리적 사고 능력과 조사 연구 기술을 바탕으로, 인지와 생물 심리학, 그리고 AI와 UX/UI 디자인 분야에 관심이 있으며 지속적인 자기개발을 추구하는 사람입니다.</span></p>
            <ul className={`my-11 ${mainstyle.body} [&>li]:mb-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8  [&>li>svg]:h-8 [&>li>svg]:mr-2.5 [&>li>svg]:text-[var(--gray2)]`} style={{color:`var(--gray1)`}}>
            <li className={`${mainstyle.body2}`} ><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon><span>+82 10.4415.9901</span></li>
            <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon><Link href={'mailto:hwan.c.0330@gmail.com'} className={`${mainstyle.body}`}>hwan.c.0330@gmail.com</Link></li>
            <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon><span className={`${mainstyle.body}`}>github : https://github.com/utfw</span></li>
            </ul>
            <dl style={{color:`var(--gray1)`}}>
            <dt className={`${mainstyle.title_sub2} pb-6`} style={{color:`var(--gray2)`}}>SKILLS</dt>
            <dd className={`flex ${mainstyle.body}`}>
              <ul className={`mr-10 [&>li]:mb-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8  [&>li>svg]:h-8 [&>li>svg]:mr-1 [&>li>svg]:text-[var(--gray2)]`}>
              <li><FontAwesomeIcon icon={faJsSquare} /><span>JavaScript</span></li>
              <li><FontAwesomeIcon icon={faReact} /><span>React</span></li>
              <li><FontAwesomeIcon icon={faHtml5} /><span>HTML</span></li>
              <li><FontAwesomeIcon icon={faCss3} /><span>CSS</span></li>
              <li><FontAwesomeIcon icon={faSass} /><span>SASS</span></li>
              </ul>
              <ul className={`mr-10 [&>li]:mb-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8  [&>li>svg]:h-8 [&>li>svg]:mr-1 [&>li>svg]:text-[var(--gray2)]`}>
              <li><FontAwesomeIcon icon={faJava} /><span>Java</span></li>
              <li><FontAwesomeIcon icon={faFigma} /><span>Figma</span></li>
              <li><span>Adobe XD</span></li>
              <li><span>Adobe Photoshop</span></li>
              <li><span>Adobe Illustrator</span></li>
              </ul>
            </dd>
            </dl>
          </div>
          <div className={`w-0.5 mx-10 mt-4`} style={{height:`775px`, background:`var(--gray1)`}}></div>
          <div className='right'>
            <dl className={`text-[var(--gray2)] [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] [&>dd]:mb-[50px]`}>
            <dt className={`${mainstyle.title_sub2}`}>EDUCATION</dt>
            <dd>
              <ul className={`mb-11 [&>li]:mb-5 [& *]:text-[var(--gray2)]`}>
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
            <dt className={`${mainstyle.title_sub2}`}>LANGUAGES</dt>
            <dd>
            <ul className={`mb-11 [&>li]:mb-5 [& *]:text-[var(--gray2)]`}>
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
          </div>
        </div>
      </section>
      {/* //section2 */}
    </div>
    <div id='content3'>
      {/* section3 */}
      <section className={`border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>FESCARO</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] 
          [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-[50px]`}>
            <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
            <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text ${i===2 && (`${mainstyle.play}`)}`}><span>미디어쿼리를 사용하여 반응형으로 제작한 기업사이트입니다.<br />
            스크롤 위치에 따라 메뉴 색상이 변경됩니다.</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Description</dt>
            <dd>
              <ul className={`${mainstyle.body1} ${notoSansKR.className}
              [&>li]:text-[var(--gray1)]`}>
              <li>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</li>
              <li>2. HTML / CSS w3c 검사 통과</li>
              <li>3. CSS와 JavaScript로 인터랙션 적용</li>
              <li>4. 반응형 페이지 제작</li>
              <li>5. Swiper.js 사용하여 오토배너를 구현</li>
              </ul>
              <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:mr-5 [&>li>a]:items-center
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]`}>
              <li><a href='https://github.com/utfw/clone_fescaro' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/clone_fescaro/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              <li><a href='#'><span><FontAwesomeIcon icon={faClipboardCheck} /></span>github-pages</a></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
            <dd className={`${mainstyle.body1} text-[var(--gray1)]`}>HTML / CSS / JavaScript</dd>
          </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end items-end`}>
            <div className={`w-[737px] h-[570px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_24.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            <div>
            <div className={`absolute bottom-3.5 right-[404px] w-[512px] h-[310px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            </div>
            <div className={`absolute bottom-3 right-[940px] w-[207px] h-[207px]`}>
              <div className={`w-full h-full
              bg-[url('../images/i_13.svg')] bg-contain bg-no-repeat`}>
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
      <section className={`border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>삼성전기</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
        <dl className={`text-[var(--gray2)] 
        [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] 
        [&>dd]:mb-[50px]`} style={{width:`600px`}}>
          <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
          <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text ${i===3 && (`${mainstyle.play}`)}`}><span>웹 컨텐츠 접근성 지침과 웹표준을 준수하여<br />삼성전기 기업 웹 사이트를 제작 하였습니다.</span></dd>
          <dt className={`${mainstyle.title_sub2}`}>Description</dt>
          <dd>
            <ul className={`${mainstyle.body1} ${notoSansKR.className}
            [&>li]:text-[var(--gray1)]`}>
            <li>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</li>
            <li>2. HTML / CSS w3c 검사 통과</li>
            <li>3. CSS와 JavaScript로 인터랙션 적용</li>
            </ul>
            <ul className={`flex mt-3 
            [&>li>a]:flex [&>li>a]:items-center [&>li>a]:mr-5 [&>li>a]:pr-2 
            [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
            [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)] [&>li>a]:rounded-e-full 
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
            [&>li>a:hover>span>svg]:text-[var(--bg)]
            `}>
            <li><a href='https://github.com/utfw/clone_samsung' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
            <li><a href='https://utfw.github.io/clone_samsung/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
            <li><a href='#'><span><FontAwesomeIcon icon={faClipboardCheck} /></span>github-pages</a></li>
            </ul>
          </dd>
          <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
          <dd className={`${mainstyle.body1} text-[var(--gray1)]`}>HTML / CSS / JavaScript</dd>
        </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end items-end`}>
            <div className={`w-[737px] h-[570px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_24.svg')] bg-contain bg-no-repeat`}>
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
      <section className={`border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>CJ ONE</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] 
          [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-[50px]`}>
            <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
            <dd className={`${mainstyle.body1} ${notoSansKR.className} text-[var(--gray1)] ${mainstyle.title} animate_text ${i===4 && (`${mainstyle.play}`)}`}><span>미디어쿼리를 사용하여 반응형 웹으로 제작하였으며<br />메뉴에 sprite animation을 적용하였습니다.</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Description</dt>
            <dd>
              <ul className={`${mainstyle.body1} ${notoSansKR.className}
              [&>li]:text-[var(--gray1)]`}>
              <li>1. 웹 콘텐츠의 접근성 지침과 웹 표준 준수</li>
              <li>2. HTML / CSS w3c 검사 통과</li>
              <li>3. CSS와 JavaScript로 인터랙션 적용</li>
              <li>4. 반응형 페이지 제작</li>
              </ul>
              <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:mr-5 [&>li>a]:items-center
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]`}>
              <li><a href='https://github.com/utfw/clone_CJONE' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/clone_CJONE/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              <li><a href='#'><span><FontAwesomeIcon icon={faClipboardCheck} /></span>github-pages</a></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
            <dd className={`${mainstyle.body1} text-[var(--gray1)]`}>HTML / CSS / JavaScript</dd>
          </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end items-end`}>
            <div className={`w-[737px] h-[570px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_24.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            <div>
            <div className={`absolute bottom-3.5 right-[404px] w-[512px] h-[310px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            </div>
            <div className={`absolute bottom-3 right-[940px] w-[207px] h-[207px]`}>
              <div className={`w-full h-full
              bg-[url('../images/i_13.svg')] bg-contain bg-no-repeat`}>
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
      <section className={`border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>REACT TALK APP</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] 
          [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-8 [&>dd]:text-[var(--gray1)]`}
          >
            <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
            <dd className={`${mainstyle.body1} ${notoSansKR.className} ${mainstyle.title} animate_text ${i===5 && (`${mainstyle.play}`)}`}><span>React로 제작한 메신저 앱입니다.<br />google의 Firebase를 사용하여 데이터를 전송하고 관리할 수 있습니다.</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Description</dt>
            <dd>
              <ul className={`${mainstyle.body1} ${notoSansKR.className}
              `}>
              <li>1. Firebase 인증서비스로 사용자 관리</li>
              <li>2. Firebase Database로 채팅 내역 송수신</li>
              <li>3. 사용자 정보를 문서로 Database에 저장</li>
              <li>4. Storage로 이미지 파일 업로드</li>
              <li>5. 프로필 업데이트 시 기존 파일을 Storage에서 제거</li>
              <li>6. Axios 비동기 라이브러리 사용</li>
              </ul>
              <ul className={`flex mt-3 
              [&>li>a]:flex [&>li>a]:mr-5 [&>li>a]:items-center
              [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
              [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]`}>
              <li><a href='https://github.com/utfw/react_chat_firebase_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/react_chat_firebase_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
            <dd className={`${mainstyle.body1}`}>HTML / CSS / SCSS / JavaScript</dd>
            <dt className={`${mainstyle.title_sub2}`}>Used</dt>
            <dd className={`${mainstyle.body1}`}>React / Firebase / Axios</dd>
          </dl>
          {/* 목업 */}
          <div className={`relative flex bottom-[148px] justify-end items-end`}>
            <div className={`w-[737px] h-[570px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_24.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            <div>
            <div className={`absolute bottom-3.5 right-[404px] w-[512px] h-[310px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
            </div>
            <div className={`absolute bottom-3 right-[940px] w-[207px] h-[207px]`}>
              <div className={`w-full h-full
              bg-[url('../images/i_13.svg')] bg-contain bg-no-repeat`}>
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
      <section className={`border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>REACT NETFLIX APP</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
        <dl className={`text-[var(--gray2)] 
        [&>dt]:pb-6 [&>dt]:text-[var(--gray2)] 
        [&>dd]:mb-8 [&>dd]:text-[var(--gray1)]`}>
          <dt className={`${mainstyle.title_sub2}`}>Overview</dt>
          <dd className={`${mainstyle.body1} ${notoSansKR.className} ${mainstyle.title} animate_text ${i===6 && (`${mainstyle.play}`)}`}><span>styled-componet를 사용하여 제작한 React Netflix App입니다.<br />The Movie DataBase API를 사용하여 영화 정보를 가져옵니다.</span></dd>
          <dt className={`${mainstyle.title_sub2}`}>Description</dt>
          <dd>
          <ul className={`${mainstyle.body1} ${notoSansKR.className}
            `}>
            <li>1. Firebase 인증서비스로 사용자 관리</li>
            <li>2. 사용자 정보를 문서로 Database에 저장하여 관리</li>
            <li>3. Storage로  프로필 이미지 파일 업로드</li>
            <li>4. 문서 정보를 토대로 프로필 정보 갱신</li>
            <li>5. Axios 비동기 라이브러리 사용</li>
            <li>6. styled-components 사용하여 일부 컴포넌트 구현</li>
            </ul>
            <ul className={`flex mt-3 
            [&>li>a]:flex [&>li>a]:mr-5 [&>li>a]:items-center
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]`}>
             <li><a href='https://github.com/utfw/react_search_movie_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
            <li><a href='https://utfw.github.io/react_search_movie_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
            </ul>
          </dd>
          <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
          <dd className={`${mainstyle.body1}`}>HTML / CSS / JavaScript</dd>
          <dt className={`${mainstyle.title_sub2}`}>Used</dt>
          <dd className={`${mainstyle.body1}`}>React / TMDB / Firebase / Axios / styled-components</dd>
        </dl>
        {/* 목업 */}
        <div className={`relative flex bottom-[148px] justify-end items-end`}>
          <div className={`w-[737px] h-[570px]`}>
            <div className={`w-full h-full
            bg-[url('../images/m_24.svg')] bg-contain bg-no-repeat`}>
            </div>
          </div>
          <div>
            <div className={`absolute bottom-3.5 right-[404px] w-[512px] h-[310px]`}>
              <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
              </div>
            </div>
          </div>
            <div className={`absolute bottom-3 right-[940px] w-[207px] h-[207px]`}>
              <div className={`w-full h-full
              bg-[url('../images/i_13.svg')] bg-contain bg-no-repeat`}>
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
      <section className={`w-full h-screen border border-red-600 relative`}>
        <h2 className={`${mainstyle.title1}`}>PURE CSS</h2>
          <Shark></Shark>
      </section>
      {/* //section8 */}
    </div>
    <div id='content9'>
      {/* section9 */}
      <section className={`w-full h-screen border border-red-600`}>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2}`}>Extra Page</h2>
      </section>
      {/* //section9 */}
    </div>
    <div id='content10'>
    <section className={`w-full h-screen border border-red-600 relative`}>
      <div className={`absolute top-1/2 left-1/2 w-[518px] -translate-x-1/2 -translate-y-1/2 text-[var(--gray2)]`}>
        <p className={`w-full text-justify ${mainstyle.title1} leading-none tracking-[.054em]`}>THANKS</p>
        <p className={`text-[62px] text-justify tracking-[.013em]`}>FOR WATCHING</p>
        <div className='flex justify-between flex-row-reverse items-end mt-[81px]'>
          <div className={`text-[var(--gray2)] text-right`}>
            <ul className={`[&>li]:mb-5 [&>li:last-child]:mb-0`}>
              <li>+82 10.4415.9901</li>
              <li><Link href={'mailto:hwan.c.0330@gmail.com'}>hwan.c.0330@gmail.com</Link></li>
              <li>github : https://github.com/utfw</li>
            </ul>
          </div>
          <div className={`w-11 h-11 mb-[5px] bg-[var(--gray1)]`}></div>
        </div>
      </div>
    </section>
    </div>
    </main>
    </>
  )
}
