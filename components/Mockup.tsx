import React, { useEffect, useRef, useState } from 'react'
import mockup from '../styles/Mockup.module.scss'
import { useSelector } from 'react-redux'
import { RootState, } from '@/store/store';

interface MockupProps {
  Index: number;
}

function Mockup({Index}:MockupProps) {
  const names = useSelector((state:RootState)=> state.content.Content);

  const textbox = useRef<HTMLPreElement>(null);
  const string = [
  `<head><title>페스카로(FESCARO)</title>
  <meta name="description" content="포트폴리오 페스카로 
  사이트 클론">
  <meta name="keywords" content="html, css, js, 페스카로">
  <meta name="author" content="https://github.com/utfw">
  <-- ... -->
  <div id="wrap"> 
    <!-- skip_navi --> 
    <div id="skip_navi"><a href="#container">본문바로가기
    </a></div> 
    <!-- //skip_navi --> 
    <hr />
    <!-- btns -->
    <div class="btns">
      <div class="btn_contact"><a href="#" title="문의하기">
      <span>CONTACT</span><i class="xi-pen"></i></a></div>
`,

  `<head><title>삼성전기</title>
  <meta name="description" content="포트폴리오 삼성전기 
  사이트 클론">
  <meta name="keywords" content="html, css, js, 삼성전기">
  <meta name="author" content="https://github.com/utfw">
  <-- ... -->
  <body>
  <!-- 본문바로가기 -->
  <div id="skipNavi" class="blind"><a href="#container">
  본문으로 바로가기</a></div>
  <!-- //본문바로가기 -->
  <div id="wrap">
    <!-- header -->
    <div id="header">
    </div>
    <!-- //header -->
    <hr />`,

  `<head><title>메인 | CJ ONE</title>
  <meta name="description" content="포트폴리오 CJONE 
  사이트 클론">
  <meta name="keywords" content="html, css, js, CJONE">
  <meta name="author" content="https://github.com/utfw">
  <-- ... -->
  <body>
    <!-- skip_navi -->
    <div id="skip_navi" class="blind">
      <a href="#conteiner">본문 바로가기</a>
    </div>
    <!-- //skip_navi -->
    <div class="bg"></div>
    <hr />
    <div class="mobBtn"><a href="#"><img src="images/btn_gnb_open.
    png" alt="" /></a></div>
    <div class="mobBtn_close"><a href="#">메뉴 전체보기 닫기</a>
    </div>`,

  `function Home({user}) { 
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    /* ... */
    const [defaultComment, setDefaultComment] = useState(
      defaultProfile.comment);
  
    useEffect(() =>{
      getFriends();
      setProfile();
    }, [defaultFace, defaultComment]);
    const setProfile = async () => {
      if(authService.currentUser.displayName === null){
        await updateProfile(authService.currentUser, {
          displayName: 'Click to change',
          photoURL: defaultProfile.photoURL
        })
        try { await setDoc(doc(db, '{authService.
          currentUser.uid}', 
          'profile'),{
            displayName: user.displayName, // 사용자이름
            id: user.uid, // 사용자 uid`,
  `function ProfilePage() {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    /* ... */
    useEffect(()=>{
      getProfiles()    
    },[])
  
    const getProfiles = async() => {
      const q = query(collection(db, '{auth.currentUser.uid}'));
      const querySnapshot = await getDocs(q);
      docSnapshot = querySnapshot.docs;
      setUserProfiles(docSnapshot);
    }
    if(userProfiles==""){
      getProfiles();
    }`];
  
  const [videoSrc, setVideoSrc] = useState<string[]>();
  const [videoError, setVideoError] = useState<boolean[]>([false, false, false])

  let loopTimer: NodeJS.Timeout;

  const strings = string.map((text) => text.split(""));
  
  const videoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      const videos = videoRef.current.querySelectorAll('video'); 
      videos.forEach((video)=>{
        video?.load();
      })
    }
  }, [Index]);
  
  useEffect(() => {
      setVideoSrc([
        `videos/${names[Index]}/pc.mp4`,
        `videos/${names[Index]}/tablet.mp4`,
        `videos/${names[Index]}/mobile.mp4`,
      ])
  }, [Index]);

  const handleVideoError = (index: number) => {
    setVideoError((prevError: boolean[]) => {
      const newError = [...prevError];
      newError[index] = true;
      return newError;
    });
  };
  
  const frameLooper = () => {
    if (textbox.current) {
      const currentString = strings[Index];
      if (currentString.length > 0) {
        textbox.current.innerHTML += currentString.shift();
      }
    } else {
      clearTimeout(loopTimer);
    }
    loopTimer = setTimeout(frameLooper, 50);
  };

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
  }, []);
  
  return (
    <div className={`relative w-full h-full`}>
      <div
      className={`flex justify-end ${mockup.mockup}`}
      onMouseEnter={(e) => {
        e.currentTarget.classList.add(mockup.on);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove(mockup.on);
      }}>
        <div ref={videoRef} className={`${mockup.mockup_wrap} mock_up`}>
          {videoSrc?.map((src, index) => (
            videoError &&
            videoError[index] ? null : (
              <div key={index} className={`${mockup[`mockup__${index === 0 ? 'pc' : index === 1 ? 'tablet' : 'mobile'}`]} ${Index === 3 ? mockup.kakao : ''}`}>
                <div>
                  <video preload="auto" muted loop onError={() => handleVideoError(index)}>
                    <source src={src} type="video/mp4" />
                  </video>
                  <img></img>
                </div>
              </div>
            )
          ))}
        </div>
        <div className={mockup.mockup__code}>
          <pre id="text" ref={textbox} className="w-full h-full overflow-hidden">
            <code></code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Mockup