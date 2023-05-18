# utfw's portfolio_2023

## 개요

이 README 파일은 Next.js로 제작된 포트폴리오에 대한 내용입니다. 포트폴리오는 반응형 페이지로 구성되어 있으며, 해상도 1920 * 1080에 최적화되어 있습니다. 페이지에는 Matter.js를 사용하여 구현된 물리 효과를 가진 사각형이 생성됩니다. 스크롤 이벤트를 통해 원스크롤 기능이 구현되었으며, 스크롤 위치에 따라 사각형 생성 이벤트가 변화합니다. 또한, 성능을 최적화하기 위해 화면 내에 보이는 윈도우 영역에서만 사각형이 생성되도록 설정되어 있습니다.

목차는 부모 요소에 perspective 속성을 부여하고 rotateY를 사용하여 회전하는 방식으로 구현되었습니다. perspective 속성으로 인해 position 값을 fixed로 설정할 수 없었기 때문에 스크립트를 사용하여 본문 섹션의 높이 값을 참조하여 위치를 변경하도록 구현되었습니다.

웹 표준 검사 컴포넌트는 높이에 따라 사진의 주소 값이 변경되어 해당 섹션에 적합한 사진이 표시되도록 구현되었습니다.

## 사용된 기술 스택

1. [Next.js](http://nextjs.org)
2. [Node.js](https://nodejs.org/ko)
3. [React Redux](https://react-redux.js.org/)
4. [Redux Toolkit](https://redux-toolkit.js.org/)
5. [TypeScript](https://www.typescriptlang.org/)
6. Matter.js

## 목차

1. 타이틀
2. 자기소개
3. 기업사이트 클론 [FESCARO](https://github.com/utfw/clone_fescaro)
4. 기업사이트 클론 [삼성전기](https://github.com/utfw/clone_samsung)
5. 기업사이트 클론 [CJ ONE](https://github.com/utfw/clone_CJONE)
6. React App [Talk](https://github.com/utfw/react_chat_firebase_2023)
7. React App [Netflix](https://github.com/utfw/react_search_movie_2023)
