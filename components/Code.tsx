import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import mainstyle from '../styles/Main.module.scss';

function Code() {
  const Index = useSelector((state:RootState) => state.scrollPosition.Scroll);
  const textbox = useRef<HTMLDivElement>(null);
  const string = [
  `<head><title>페스카로(FESCARO)</title><br />
  <meta name="description" content="포트폴리오 페스카로 사이트 클론">
  <meta name="keywords" content="html, css, js, 페스카로">
  <meta name="author" content="https://github.com/utfw">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
  <link rel="stylesheet" href="css/main.css">
  <script defer src="https://kit.fontawesome.com/4bceaf1a9d.js" crossorigin="anonymous"></script>\n
  <script defer src="js/swiper-bundle.min.js"></script>\n
  <script defer src="js/header.js"></script>\n
  <script defer src="js/main.js"></script>\n
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
  <script defer src="js/autoscroll.js"></script>`,
  `function Home({user}) { 
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const [defaultFace, setDefaultFace] = useState(defaultProfile.profileURL);
    const [defaultComment, setDefaultComment] = useState(defaultProfile.comment);
  
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
        try {
          await setDoc(doc(db, authService.currentUser.uid}, profile),{
            displayName: user.displayName, 
            id: user.uid,
            photoURL: user.photoURL, 
            profileURL: defaultFace, 
            fileName:"", 
            comment: defaultComment, 
            date: Date.now()
          })
          console.log('초기 프로필 문서 업로드')
        } catch (error) {
          console.log(error)
        }
      }
  `,
  `function ProfilePage() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFace, setNewFace] = useState(defaultFace);
  const [newName, setNewName] = useState("");
  const [faceBefore, setFaceBefore] = useState(""); 
  const [nameBefore, setNameBefore] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  let profileInfo = {};
  let docSnapshot = [];
  const [fileName, setFileName] = useState("");
  useEffect(()=>{
    getProfiles()    
  },[])

  const getProfiles = async() => {
    const q = query(collection(db, {auth.currentUser.uid}));
    const querySnapshot = await getDocs(q);
    docSnapshot = querySnapshot.docs;
    setUserProfiles(docSnapshot);
  }
  if(userProfiles==""){
    console.log('페이지 로딩 시 프로필 불러오기');
    getProfiles();
  }

  const onChangeFace = (e) =>{
    setFaceBefore(newFace);
    const {target:{files}} = e;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (e) =>{
      const {currentTarget:{result}} = e;
      setNewFace(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onChangeName = useCallback((e) =>{
    const {target:{value}} = e;
    setNewName(value);
  },[]);`];

  console.log(string[3].split(""))
  let loopTimer: NodeJS.Timeout;
 
  let fescaro = string[0].split("");
  let samsung = string[1].split("");
  let cjone = string[2].split("");
  let kakao = string[3].split("");
  let netfilx = string[4].split("");

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
          case 3:
            if (kakao.length > 0){
              textbox.current.innerHTML += kakao.shift();
            }
            break;
          case 4:
            if (netfilx.length > 0){
              textbox.current.innerHTML += netfilx.shift();
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
        fescaro = string[0].split("");
        samsung = string[1].split("");
        cjone = string[2].split("");
        kakao = string[3].split("");
        netfilx = string[4].split("");
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
      <div id="text" ref={textbox} className={`w-full h-full overflow-hidden`} onMouseLeave={initText()}>_</div>
    </div>
  );
}

export default Code;
