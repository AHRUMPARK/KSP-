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

**기능**


`REST API 사용` 

- 로그인 & 로그아웃 ⇒ 세션 생성
- 회원 가입 / 회원 탈퇴 / 회원 정보 수정 / 유저 게시글 연결 /  좋아요 관리 기능

Node.js multter  ⇒  이미지 업로드 기능

Bootstap 라이브러리 ⇒ 마이페이지 제외 사용 ( 마이페이지 css grid )

**Cherrio** **Crawling** ⇒  음원 사이트 데이터 추출


**`디자인 및 기획`**


프로젝트 전반적 계획 설계

로그인, 회원 가입, 회원 정보 페이지, 마이페이지 등 Figma 디자인
<br />

<img src="https://user-images.githubusercontent.com/116782319/226579163-7ab74f3c-69f2-4e3e-be06-ffe31c98b2dd.png"  width="1000" align="center" />



   <br/>
<h3>💡 느낀 점 & 배운 점</h3>
<hr />

1. 반응형을 두 가지 모드로 했는데, 팀원들 핸드폰마다 다르게 나오는 문제가 있었다.
    
    알고 보니, 사람들이 쓰는 기기 별로 모두 미디어 쿼리로 지정해줘야 한다.
    
2. 최상위 js 파일에서 세션 정의가 라우터 설정보다 위에 있어야 한다.
    
    req.session.id는 쓰면 안된다. 
    
     접속 시 기본적으로 저장되는 세션 값 id말고 다른 명으로 지칭
    
3. 업로드 관련 : 네트워크는 같은 명의 데이터면 2번째 인식 x 
    
    캐시 비활성화 (웹페이지, 코드 둘 다 해주기) 
    
4. GIT 관련 충돌, 오류 차분하게 대처하자, 다양한 협업 툴 사용하고 활용하자

1. DB 도 관계를 지을 수 있는데, 다음에는 설계 할 때 써보고 싶다.

6. 팀원들과 매일 일지 기록 했던 것이 좋았다.

[https://tricolor-fern-8f6.notion.site/f9d78bfeadeb433885927ad6d02b7895?v=a34d8ca69a7f4b45a415299ea33aa1b8&p=269c07d990024247b016a6d49bf7428a&pm=s]회원가입 & 로그인 & 회원 정보 수정

| 이름 | METHOD | URL | req.body | response | 비고 |  |
| --- | --- | --- | --- | --- | --- | --- |
| 로그인 user_login() | POST | /signin | let user = {
id : form.id.value,
pw : form.pw.value
} | 1. 서버의 아이디와 비번이 맞는 한 데이터 조회
User.findAll({
where : { id : http://req.body.id/, pw : http://req.body.pw/ },
limit : 1
})

2. 유저아이디 세션 생성
if( result.length > 0 ){
req.session.user = http://req.body.id/;
3. 세션성공 후 로그인 성공
alert('로그인 성공');
window.location.href="/main";

3. 조회값이 없으면 다시 폼 리셋
alert('로그인 실패');
form.reset(); |  |  |
| 로그아웃
user_logout() | DELETE | /logout |  | 세션 삭제
req.session.destroy(function (err){
if(err) throw err ;
res.send(true);
});

alert('로그아웃 하셨습니다.');
window.location.href = "/";
 |  |  |
| 회원가입register() | POST | /signup | let user = {
id: form.id.value,
name: form.name.value,
pw: form.pw.value,
rePw: form.rePw.value,
e_mail: form.e_mail.value
} | 서버에 데이터 추가
User.create(data)
.then((result)=>{
res.send(true);
});

alert('회원가입 성공');
window.location.href="/";

else {
alert('비밀번호가 맞지 않습니다.');
} | 유효성 검사 목록을 통과하면
true값을 주었다.
밑에 목록 중 값이 그대로 fasle로 
뜨면, 가입할 수 없다.

var validity = {
id: false,
name: false,
pw: false,
rePw: false,
e_mail: false,
agree: false
};

for (const [type, value] of Object.entries(validity)) {
if (!value) {
// console.log(validity);
alert('형식에 맞지 않습니다.')
return false;
}
}

 |  |
| 검사 목록
1.idValidity()
2.nickValidity()
3.pwValidity()
4.rePwValidity()
5.mailValidity()
6.agree_check() | 중복검사
idValidity()
nickValidity()
mailValidity()
POST 요청
 | /check_id
/check_name /check_mail
 | 중복 검사는 유효성 검사를 통과하지 못하면 끝내고, 통과하면 서버에 요청을 보낸다.
data: { id: form.id.value }
data: { name: e.value }
data: { e_mail: e.value }

이메일 같은 경우는 
input type="email”로 해주면, 알아서 유효성 검사가 된다.
 | 중복검사 조회에 필요한  findOne를 씁니다.
result 값이 있으면 중복 > false
값이 없으면 true

let result = await User.findOne({
where : { id : http://req.body.id/ }
});
if ( result != null ){
res.send (true);
} else {
res.send (false);
};
};

result.data가 있으면 
$('#id_check_sucess').html('<p style="color:red;"> 중복된 아이디 입니다.');

없으면
$('#id_check_sucess').html('<p style="color:blue;">사용 가능한 아이디 입니다.');
validity["id"] = true;
유효성 검사할 목록은 마지막에 true값을 준다. |  |  |
| 회원 정보 수정
Edit_info_update() | patch | /Edit_info_update | 비밀번호값이 같거나
닉네임 체크검사가 true이고
if (form.pw.value == form.rePw.value || form.name.checkValidity())

닉네임값을 데이터에 보낸다.
그리고 비밀번호값이 있으면, data에 넣어서 보낸다.
var data = { name: form.name.value };
if (form.pw.value != "") data["pw"] = form.pw.value;

data: data

위의 조건에 해당 안될 때
alert('형식에 맞지 않습니다.'); | 수정할 세션 아이디
let result = await User.update(req.body,
{ where : { id : ${req.session.user} }
});
res.send({ data : result });

var form = document.getElementById('Edit_info');
form.name.value = http://response.data.name/;
window.location.href = "/";
alert('정보 수정 성공'); | // 1. name은 form.name.value (바뀌든 안바뀌든 입력값으로 수정)
// 2. pw가 만약 값이 있으면, data객체의 "pw"값에 입력값을 보낸다.
// 3. pw가 만약 값이 없으면, data객체에 값을 보내지 않는다 => 수정되지 않는다. |  |
| 회원 탈퇴
delete_info() | delete | /user_delete | data: { id: form.id.value } | 세션 삭제
let result = await User.destroy(
{ where : { id : ${req.session.user} }}
);
req.session.destroy(function (err){
if(err) throw err ;
res.send(true);
});

alert('회원 탈퇴 하셨습니다.');
window.location.href = "/"; |  |  |
| 마이페이지
프로필 업로드
$('#upload_file').on('click', function(){
$('#userfile').trigger('click'); | post | /upload_file,

upload.single('img') | 만약 인풋값에 변화가 생기면
서버에 요청을 보낸다.
$('#userfile').change(function(){
var form = document.getElementById('profile_info');
var formData = new FormData(form);

 | 파일값이 있으면, user_img에
세션아이디+확장자명으로 db에 저장
if(req.file) {
User.update({
user_img : req.file.filename
},
{ where : { id : ${req.session.user} } }
);
res.send({ path : req.file.filename });
}

받은데이터를
”경로” + 세션아이디+확장자 로 업데이트
document.getElementById('profile_img').src = "static/profile_img/" + reuslt.path;

 |  |  |
| 마이페이지
 | get | /mypage | 1.세션체크 
2.유저 닉네임 체크
3.프로필 이미지 체크
4.좋아요 이미지 체크
5. 내 게시글 체크
 | 1.세션체크
let result = {id : req.session.user};
    if(req.session.user) {
        result["isLogin"] = true;    

2.유저 닉네임 체크
let result2 = await User.findOne({
where : { id : ${req.session.user}}
});

3.프로필 이미지 체크
이미지값이 없으면, 지정한 사진을 넣는다.
if(!result2.user_img) {
result2.user_img = 'd_img.png';
}

4.좋아요 이미지 체크
좋아요db에서 세션아이디 조회
데이터를 역순으로 가져온다.
LikeSing.findAll({
where: {
user_id: ${req.session.user}
},
order: [['no', 'DESC']]

}).then((rows) => {

//만약 갯수가 3개이하면?
if(rows.length < 4) {
for(let i = 0; i < 4; i++) {
//3개만큼 반복할건데  정보가 없는 데이터는 밑에 데이터로 클라이언트에 보낸다.
if(rows[i] === undefined) {
let likeData = {
user_id : '정보 없음',
title : '정보 없음',
singer : '정보 없음',
album_img : '/static/res/image/empty_list.jpg'
};
rows.push(likeData);
//해당 데이터를 result.likesing 에 넣는다.
result["likesing"] = rows;

//4개 이상인 경우 
else {
result["likesing"] = rows; };

5. 내 게시글 체크
게시판 데이터 역순 조회
Board.findAll({
where: {
id: ${req.session.user}
},
order: [["number", "DESC"]],
}).then((rows)=>{

//만약 4개 이하 일 경우
데이터가 없는 목록은 아래 데이터로 대체한다.
if(rows.length < 5) {
for(let i=0; i < 5; i++ ){
if((rows[i] === undefined)){
let boardData = {
number : '정보 없음',
title : '정보 없음',
id : '정보 없음',
content : '정보 없음',
filename : '정보 없음',
date : '정보 없음',
hit : '정보 없음'
};
rows.push(boardData);
}
}
result["Board"] = rows;
res.render('mypage', { data : result2, result});
}

//만약 5개 이상일 경우
else {
result["Board"] = rows;
res.render('mypage', { data : result2, result});
}
});

6. 만약 세션아이디가 없다면
else {
result["isLogin"] = false;
res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
}
 |  |  |
|  |  |  |  |  |  |  |

| 이름 | METHOD | URL | req.body | response | 비고 |
| --- | --- | --- | --- | --- | --- |
| 유튜브 실시간 음원 순위 시간 변경 | GET | /youtubeRealChart/:num | req.session.user,
req.params.num | result {
   id: req.session.user,
   isLogin: true,
   youtubedata: {data, filelist, fileHour},
   geniedata: {data: ''},
   melondata: {data: ''},
   likeSing: {data: rows}
}

result {
  id: req.session.user,
  isLogin: false
}
<script>
alert('로그인 후 이용가능합니다.');
location.href='/login';
</script> |  |
| 유튜브 뮤직비디오 순위 시간 변경 | GET | /youtubeMovieChart/:num | req.session.user,
req.params.num | result {
   id: req.session.user,
   isLogin: true,
   youtubedata: {data, filelist, fileHour},
   likeSing: {data: rows}
}

result {
  id: req.session.user,
  isLogin: false
}
<script>
alert('로그인 후 이용가능합니다.');
location.href='/login';
</script> |  |
| 멜론 실시간 음원 순위 시간 변경 | GET | /melonRealChart/:num | req.session.user,
req.params.num | result {
   id: req.session.user,
   isLogin: true,
   youtubedata: {data: ‘’},
   geniedata: {data: data, filelist, fileHour},
   melondata: {data: ''},
   likeSing: {data: rows}
}

result {
  id: req.session.user,
  isLogin: false
}
<script>
alert('로그인 후 이용가능합니다.');
location.href='/login';
</script> |  |
| 지니 실시간 음원 순위 시간 변경 | GET | /genieRealChart/:num | req.session.user,
req.params.num | result {
   id: req.session.user,
   isLogin: true,
   youtubedata: {data: ‘’},
   geniedata: {data: ‘’},
   melondata: {data: data, filelist, fileHour},
   likeSing: {data: rows}
}

result {
  id: req.session.user,
  isLogin: false
}
<script>
alert('로그인 후 이용가능합니다.');
location.href='/login';
</script> |  |
| 지니 뮤직비디오 순위 시간 변경 | GET | /genieMovieChart/:num | req.session.user,
req.params.num | result {
   id: req.session.user,
   isLogin: true,
   genieMoviedata: {data, filelist, fileHour},
   likeSing: {data: rows}
}

result {
  id: req.session.user,
  isLogin: false
}
<script>
alert('로그인 후 이용가능합니다.');
location.href='/login';
</script> |  |
| 좋아요 등록 | POST | /likeSingRegister | req.session.user,
req.body.likeTitle,
req.body.likeSinger,
req.body.likeImg | true |  |
| 좋아요 삭제 | POST | /likeSingDelete | req.session.user,
req.body.likeTitle,
req.body.likeSinger | true |  |

 
