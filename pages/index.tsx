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
import { RootState, getSectionHeight, updateIndex,  } from '@/store/store';
import Shark from '@/components/Shark';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import Validation from '@/components/Validation';
import Explosion from '@/components/Explosion';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight:["100","300","400","500","700","900"], 
});
const notoSansKR = Noto_Sans_KR({ // 다운이 정상적으로 안됨.
  weight:["100","300","400","500","700","900"],
  preload:false, 
}) //구글 폰트에 요청할 필요가 없다함. 

export default function Home() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state:RootState) => state.index.Index);
  const index = useSelector((state:RootState)=> state.scrollPosition.Scroll);
  const [sections, setSections] = useState<NodeListOf<HTMLElement>>();
  const [sectionsTop, setSectionsTop] = useState<number[]>([]);
  const [animationWrap, setAnimationWrap] = useState<NodeListOf<HTMLElement>>();
  const animationDelayed = 300;
  const sectionHeight = useSelector((state:RootState)=>state.sectionHeights.Height);
  
  const docOpen = false; //테스트용 임시 true

  // console.log(`메뉴 ${isIndexToggle}`); //메뉴 토글 확인용
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
},[]);

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  if(isIndexToggle !== true){
    if(event.deltaY > 0 && index < sectionsTop.length-1){
      console.log(1)
      dispatch(updateIndex(index+1));
    } else if(event.deltaY < 0 && index > 0){
      console.log(2)
      // setI(i-1);
      dispatch(updateIndex(index-1));
    }
  // console.log(`스크롤이동 ${index}`);
  }
};

useEffect(() => {
  window.addEventListener('wheel', handleWheel, {passive: false});
  window.scroll({
    top:sectionHeight*index,
    behavior:'smooth'
    })
  if(sections){active(sections,index);}
  
  return () => window.removeEventListener('wheel', handleWheel);

}, [index, sections, isIndexToggle]);

const active = (el:NodeListOf<HTMLElement>,i:number) =>{
  el.forEach((item:HTMLElement) => {
    item.classList.remove("active");
  });
  el[i].classList.add("active");
  console.log(`${i} active`);
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
}),[];

  return (
    <>
    <Head>
      <title>PORTFOLIO | 2023</title>
    </Head>
    {/* Index Component */}
    <Index />
    {docOpen && (<Validation></Validation>)}
    <main className={`min-h-screen overflow-hidden ${montserrat.className}
    [&>div>section]:w-full [&>div>section]:h-screen
    [&>div>section]:overflow-hidden
    [&>div>section>h2]:text-[var(--gray2)]`} id='container'>
    <div id='content1' className={`relative`}>
      {/* section1 */}
      {/* <Explosion></Explosion> */}
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
            <p className={`${mainstyle.title_sub} ${notoSansKR.className} ${mainstyle.title} animate_text`} style={{color:`var(--gray1)`}}><span>심리학 전공으로 학습한 논리적 사고 능력과 조사 연구 기술을 바탕으로, 인지와 생물 심리학, 그리고 AI와 UX/UI 디자인 분야에 관심이 있으며 지속적인 자기개발을 추구하는 사람입니다.</span></p>
            <ul className={`my-10 ${mainstyle.body} [&>li]:mb-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8 [&>li>svg]:h-8 [&>li>svg]:mr-2.5 [&>li>svg]:text-[var(--gray2)]`} style={{color:`var(--gray1)`}}>
            <li className={`${mainstyle.body2}`} ><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon><span>+82 10.4415.9901</span></li>
            <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon><Link href={'mailto:hwan.c.0330@gmail.com'} className={`${mainstyle.body2}`}>hwan.c.0330@gmail.com</Link></li>
            <li className={`${mainstyle.body2}`}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon><span className={`${mainstyle.body2}`}><a href='https://github.com/utfw'>github : https://github.com/utfw</a></span></li>
            </ul>
            <dl className={`pt-10`} style={{color:`var(--gray1)`}}>
            <dt className={`${mainstyle.title_sub2} pb-6`} style={{color:`var(--gray2)`}}>PROGRAMMING LANGUAGES</dt>
            <dd className={`flex ${mainstyle.body}`}>
              <ul className={`flex mr-10 [&>li]:mb-10 [&>li]:mr-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8 [&>li>svg]:h-8 [&>li>svg]:mr-1 [&>li>svg]:text-[var(--gray2)]`}>
              <li><FontAwesomeIcon icon={faJsSquare} /><span>JavaScript</span></li>
              <li><FontAwesomeIcon icon={faReact} /><span>React</span></li>
              <li><FontAwesomeIcon icon={faReact} /><span>Next</span></li>
              <li><FontAwesomeIcon icon={faHtml5} /><span>HTML</span></li>
              <li><FontAwesomeIcon icon={faCss3} /><span>CSS</span></li>
              <li><FontAwesomeIcon icon={faSass} /><span>SASS</span></li>
              <li><FontAwesomeIcon icon={faJava} /><span>Java</span></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2} pb-6`} style={{color:`var(--gray2)`}}>TOOLS</dt>
            <dd>
              <ul className={`flex mr-10 [&>li]:mb-11 [&>li]:mr-5 [&>li]:flex [&>li]:items-center [&>li>svg]:w-8  [&>li>svg]:h-8 [&>li>svg]:mr-1 [&>li>svg]:text-[var(--gray2)]`}>
              <li><FontAwesomeIcon icon={faFigma} /><span>Figma</span></li>
              <li><span>Adobe XD</span></li>
              <li><span>Adobe Photoshop</span></li>
              <li><span>Adobe Illustrator</span></li>
              </ul>
            </dd>
            </dl>
          </div>
          <div className={`w-[2px] mx-10 mt-4`} style={{ background:`var(--gray1)`, flex:`1`, maxWidth:`2px`}}></div>
          <div className='right'>
            <dl className={`flex flex-col justify-between h-full text-[var(--gray2)] [&>dt]:text-[var(--gray2)]`}>
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
      <section className={`relative`}>
        {/* <Particles></Particles> */}
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>FESCARO</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] min-w-[600px]
          [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-[50px]`}>
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
            [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)] [&>li>a]:rounded-e-full 
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
            [&>li>a:hover>span>svg]:text-[var(--bg)]
            `}>
              <li><a href='https://github.com/utfw/clone_fescaro' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/clone_fescaro/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              <li><a href='#'><span><FontAwesomeIcon icon={faClipboardCheck} /></span>github-pages</a></li>
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
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/fescaro%2Fvideos%2Fpc.mp4?alt=media&token=f1fde85b-1396-4d1d-bca2-39df0312fd5b' type='video/mp4'/>
                </video>
              </div>
            </div>
            <div className={mainstyle.mockup__tablet}>
              <div>
                <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/fescaro%2Fvideos%2Ftablet.mp4?alt=media&token=8ff0bd15-abf9-4392-8d1c-961fc00b638e' type='video/mp4'/>
                </video>
              </div>
            </div>
            <div className={mainstyle.mockup__mobile}>
              <div className='video__wrap'>
              <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/fescaro%2Fvideos%2Fmobile.mp4?alt=media&token=a1b22632-bcd8-47c1-9765-f429017a7a36' type='video/mp4'/>
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
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>삼성전기</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
        <dl className={`text-[var(--gray2)] min-w-[600px] h-full [&>dt]:text-[var(--gray2)] 
        [&>dd]:mb-[50px]`}>
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
          <dd className={`${mainstyle.body1} text-[var(--gray1)] ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
        </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end ${mainstyle.mockup}`}>
            <div className={mainstyle.mockup__pc}>
              <div className='video__wrap'>
                <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/samsung%2Fvideos%2Fpc.mp4?alt=media&token=bf9f1b1e-dc6a-468e-afdb-bd8d01aa33d4' type='video/mp4'/>
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
          [&>dd]:mb-[50px]`}>
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
            [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a]:ease-in-out
            [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)] [&>li>a]:rounded-e-full 
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
            [&>li>a:hover>span>svg]:text-[var(--bg)]
            `}>
              <li><a href='https://github.com/utfw/clone_CJONE' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/clone_CJONE/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              <li><a href='#'><span><FontAwesomeIcon icon={faClipboardCheck} /></span>github-pages</a></li>
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
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/cjone%2Fvideos%2Fpc.mp4?alt=media&token=37ae2bfe-0dec-4458-be8f-bc66c811ef31' type='video/mp4'/>
                </video>
              </div>
            </div>
            <div className={mainstyle.mockup__tablet}>
              <div>
                <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/cjone%2Fvideos%2Ftablet.mp4?alt=media&token=cc71c645-4eb2-4674-a32a-a20ff8beac29' type='video/mp4'/>
                </video>
              </div>
            </div>
            <div className={mainstyle.mockup__mobile}>
              <div className='video__wrap'>
              <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/cjone%2Fvideos%2Fmobile.mp4?alt=media&token=9c8046ce-ae12-4210-91f3-cb263d60cbea' type='video/mp4'/>
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
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>REACT TALK APP</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
          <dl className={`text-[var(--gray2)] min-w-[600px]
          [&>dt]:text-[var(--gray2)] 
          [&>dd]:mb-8 [&>dd]:text-[var(--gray1)]`}
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
            [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)] [&>li>a]:rounded-e-full 
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
            [&>li>a:hover>span>svg]:text-[var(--bg)]
            `}>
              <li><a href='https://github.com/utfw/react_chat_firebase_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
              <li><a href='https://utfw.github.io/react_chat_firebase_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
              </ul>
            </dd>
            <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
            <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / SCSS / JavaScript</span></dd>
            <dt className={`${mainstyle.title_sub2}`}>Used</dt>
            <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>React / Firebase / Axios</span></dd>
          </dl>
          {/* 목업 */}
          <div className={`relative flex justify-end ${mainstyle.mockup}`}>
            <div className={`${mainstyle.mockup__mobile} ${mainstyle.kko}`}>
              <div className='video__wrap'>
                <video autoPlay muted loop>
                  <source src='https://firebasestorage.googleapis.com/v0/b/portfolio-2023-f3390.appspot.com/o/kko%2Fvideos%2Fmobile.mp4?alt=media&token=cb4de3d5-7d08-410b-8bd9-64b3df006f22' type='video/mp4'/>
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
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2} mb-11`}>REACT NETFLIX APP</h2>
        <div className={`flex w-full pr-[144px] justify-between`}>
        <dl className={`text-[var(--gray2)] min-w-[600px]
        [&>dt]:text-[var(--gray2)] 
        [&>dd]:mb-8 [&>dd]:text-[var(--gray1)]`}>
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
            [&>li>a:hover]:bg-[var(--gray2)] [&>li>a:hover]:text-[var(--bg)] [&>li>a]:rounded-e-full 
            [&>li>a>span]:flex [&>li>a>span]:justify-center [&>li>a>span]:items-center [&>li>a>span]:w-10 [&>li>a>span]:h-10
            [&>li>a>span>svg]:w-8 [&>li>a>span>svg]:h-8 [&>li>a>span>svg]:mr-0.5 [&>li>a>span>svg]:text-[var(--gray2)]
            [&>li>a:hover>span>svg]:text-[var(--bg)]
            `}>
             <li><a href='https://github.com/utfw/react_search_movie_2023' target='blank'><span><FontAwesomeIcon icon={faGithub} /></span>github</a></li>
            <li><a href='https://utfw.github.io/react_search_movie_2023/' target='blank'><span><FontAwesomeIcon icon={faRocket} /></span>github-pages</a></li>
            </ul>
          </dd>
          <dt className={`${mainstyle.title_sub2}`}>Languages</dt>
          <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>HTML / CSS / JavaScript</span></dd>
          <dt className={`${mainstyle.title_sub2}`}>Used</dt>
          <dd className={`${mainstyle.body1} ${mainstyle.title} animate_text`}><span>React / TMDB / Firebase / Axios / styled-components</span></dd>
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
    <div id='content9'>
      {/* section9 */}
      <section>
        <h2 className={`${mainstyle.title1} ${mainstyle.gray2}`}>Extra Page</h2>
      </section>
      {/* //section9 */}
    </div>
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
              <li>github : https://github.com/utfw</li>
            </ul>
          </div>
          <div className={`w-11 h-11 mb-[5px] bg-[var(--gray1)]`}></div>
        </div>
      </div>
      <div className={`opacity-1 absolute left-0 top-[45%] w-full h-full bg-white transition-all duration-1000 ease-linear delay-500 ${index === 9 && (`translate-y-full`)}`}></div>
    </section>
    </div>
    </main>
    </>
  )
}
