# KSP 음원 사이트 랭킹 모아보기

**`Frontend`** 1명  **`FULL`** 3명

**`진행기간`**  2022.12.15 ~ 2022.12.29 총 2 주간 진행

<img src="https://user-images.githubusercontent.com/116782319/226580731-2e7847b6-29ae-4e4b-9ac7-a92706ab38b0.jpg"  width="800" align="center" />

<h4>🔗demo http://49.50.172.207:8080/</h4>
   
   <br/>
<h3>🎵 서비스 소개</h3>
<hr />

<aside>
   
🧑‍💻 **음원 사이트의 랭킹을 한눈에 볼 수 있는 서비스**를 제공합니다.

</aside>

<aside>
   
🙂 음악에 관심 있는 누구나 서로 **소통 할 수 있는 공간**을 제공하고자 하였습니다.
   
자유 게시판에서 자신의 작곡, 노래, 기타 작업 등을 올리고 의견을 나눠보세요.

</aside>


   <br/>
<h3>🛠️ 사용 기술 & 라이브러리</h3>

**`Frontend`**

• html / css / javaScript / jquery 

**`Backend`**

• node / Express / Sequelize / Mysql


**`Library`**

• bootstrap, Cherrio, Chart.js, Puppeteer


**`Communication`**

• Slack / kakaotalk / Notion / Figma


   <br/>
<h3>✒ 구현 기능</h3>
<hr />


**LOGIN 페이지**

**`REST API 사용`** ⇒ User DB 관련 작업

**`Session 생성`**  ⇒ 성공시 메인페이지 이동

- Session 이 없으면, 사이트 기능 이용 불가 ⇒ 로그인 페이지 이동
- Session 값에 따라 UI 가 다름

<br />

 **회원가입 페이지**

**`Form validation`  ⇒ 클라이언트 유효성 검사 (실시간 동적 폼 기능)**

**`Sequilze`  ⇒ 서버에서 중복 값 체크**

성공하면 메인 페이지로 이동

<br />

**회원 정보 수정** 

닉네임, 비밀번호 수정 가능

회원 탈퇴 기능 ⇒ Session Destroy & user DB 데이터 삭제

<br />

**마이 페이지**

Session 이 있으면 접속 가능

**`Node.js multter`** ⇒ 이미지 업로드 미들웨어 사용

서버에서 좋아요 & 게시글 갯수 제한

Bootstap 라이브러리 ⇒ 마이페이지 제외 사용 ( 마이페이지 css grid )


<br />

**`디자인 및 기획`**


프로젝트 전반적 계획 설계

로그인, 회원 가입, 회원 정보 페이지, 마이페이지 등 Figma 디자인
<br />

<img src="https://user-images.githubusercontent.com/116782319/226579163-7ab74f3c-69f2-4e3e-be06-ffe31c98b2dd.png"  width="1000" align="center" />




   <br/>
<h3>💡 느낀 점 & 배운 점</h3>
<hr />

🤣 반응형을 두 가지 모드로 했는데, 팀원들 핸드폰마다 다르게 나오는 문제가 있었다.

알고 보니, 사람들이 쓰는 기기 별로 모두 미디어 쿼리로 지정해줘야 한다.

😥 최상위 js 파일에서 세션 정의가 라우터 설정보다 위에 있어야 한다.

req.session.id는 쓰면 안된다. 

 접속 시 기본적으로 저장되는 세션 값 id말고 다른 명으로 지칭

🤦‍♀️ 업로드 관련 : 네트워크는 같은 명의 데이터면 2번째 인식 x 

캐시 비활성화 (웹페이지, 코드 둘 다 해주기) 

🙌 GIT 관련 충돌, 오류 차분하게 대처하자, 다양한 협업 툴 사용하고 활용하자

💕 팀원들과 매일 일지 기록 했던 것이 좋았다.

API 명세서 : https://tricolor-fern-8f6.notion.site/f9d78bfeadeb433885927ad6d02b7895?v=a34d8ca69a7f4b45a415299ea33aa1b8&p=269c07d990024247b016a6d49bf7428a&pm=s


 
