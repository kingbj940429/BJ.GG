# 프로그램 설명
Node.js 기반 리그오브레전드 관련 정보 사이트 입니다.

비슷한 사이트로는 OP.GG가 있습니다.
# 개발 환경
백엔드 : Node.js, MySQL

프론트엔드 : Pug 템플릿 엔진

API : RIOT
# 실행 방법
1) git clone해서 다운받습니다.
2) 본인 API_KEY를 RIOT developer에서 발급받습니다.
3) .env 파일을 만들어서 아래와 같은 정보를 넣어줍니다. 
```js
// ★★★★★ .env 파일에 주석이 있으면 안됨. 따라서 다 지워줘야함★★★★★
//.env 파일은 따로 만들어야 합니다. 위치는 폴더 가장 상위
API_KEY = "본인 API_KEY를 넣으세요" //★★API_KEY는 매일매일 바뀌므로 매일 업데이트 해줘야함★★
ITEM_VERSION = "현재 버전" //각 json 버전 ex)10.19.1
CHAMP_VERSION = "현재 버전"
SPELL_VERSION = "현재 버전"
GAME_TIMES = 3 //검색할 게임 수
MASTERY_TIMES = 4 //숙련도 표시할 챔피언 갯수


/**
* DB
*/
DB_HOST = "호스트"
DB_USER = "계정"
DB_PASSWORD = "계정 비밀번호"
DB_DATABASE = "데이터베이스(스키마)"

```
4) 터미널에서 npm i 명령어로 필요한 npm들을 다운 받습니다.
5) 터미널에서 npm i -D nodemon로 nodemon를 다운 받습니다.
6) 터미널에서 npm start 로 실행시켜줍니다.
# 구현 목표
1) 소환사 이름 검색시 해당하는 소환사의 정보 보여주기 ex) 티어, 승패수, 숙련도 높은 챔피언 top3 등등

2) 검색한 소환사가 했던 최근 10게임의 정보 ex) 플레이했던 챔피언, cs, 레벨, 스펠, 아이템, 같이 플레이한 나머지 9명의 소환사 정보

3) 모든 챔피언에 대한 정보 보여주기 ex) 챔피언의 스토리, 스킬, 패시브 등

4) 내가 원하는 챔피언에 대한 템트리와 룬트리를 DB에 저장하여 나만의 방식이 가능하도록 구현

# 작업 내역
### 2020-09-11(시작)
* Riot Developer를 통해 Riot API의 사용법을 익혔다. (죄다 영어여서 좀 힘들었다..)
* API가 전부 json 형식으로 되어 있었기 때문에 데이터 파악을 했다. 데이터 양이 어마어마 하다..
* Node.JS에서 어떻게 json 형식의 url 데이터를 가져오는지 공부하였다.

### 2020-09-22 
* 본격적으로 구현 시작
* 검색된 소환사와 같이 플레이를 한 소환사 9명(검색된 소환사 제외)의 닉네임 모두 표시

### 2020-09-24 
* 검색된 소환사에 따른 승패여부 표시 (항상 블루팀이 아니고 소환사가 포함된 팀의 승패 표시)

### 2020-09-25 
* 승패에 따른 wrap의 색깔변화 추가 (승리면 파랑색, 패배면 빨간색)
승패에 따른 wrap 색 구분해주는게 너무 어려웠다. 사실 pug를 5개 다 따로 만들면 되지만 그러면 너무 무거워지기에
매치정보에 대한 pug는 1개만 만들어서 반복문으로 클라이언트에게 뿌려주려고 했다. 하지만 이미 설정되어 있는
태그들의 이름은 정적이였고, 게임에 따른 태그 이름을 부여해야했다. 태그 클래스 명을 바꾸는데 너무 고생했다.
KDA 추가

### 2020-09-28 
* 검색된 소환사가 했던 챔피언 표시
=> riot api는 GameId에 대한 각각 소환사의 챔피언를 이름이 아닌 숫자로 나타냈고있다. 예를 들면 "제드"가 아닌 "238" 이런식으로 말이다. 심지어는
이 숫자들이 순서가 아니고 다 뒤죽박죽이다. "238" 다음에 오는 챔피언인데 "517" 막 이런식으로 가지고 있다.(왜 이렇게 만들었는지는 모르겠다) 그리고 이를 기반으로 DataDragon에서 key값에 해당하는 챔피언 이름을 가져오려는데 챔피언 이름의 하위요소로 key값을 가지고 있다. 즉, 챔피언 이름을 "제드"라고 알아야지 "제드"에 해당하는 key값을 가져올수 있는 것이다. 필자는 그래서 결국 for문으로 챔피언에 대한 key값들을 모두 추출하고 key값에 해당하는 챔피언을 찾았다. 
* 각 게임에 대한 아이템 출력 버전을 변수로 두어 itemjson의 버전이 바뀌어도 
에러없이 가져올수 있으며, pug에 아이템 이미지 src 자체를 받을수 있게끔 하였다.
문제는 itemId = 0 일때이다...
==> 비어있는 아이템들은 회색 처리함
* 검색된 소환사가 플레이한 챔피언 이미지를 표시
* 소환사 스펠 추가 여기도 소환사 key처럼 key의 상위요소에 이름이 있어서 챔피언 name 얻는 것처럼 수행하였다.
* 검색된 소환사와 같이 플레이한 소환사들의 챔프 이미지를 보여준다.
==> 이또한 역시 url을 문자열로 받아 html에 src로 뿌려주는 방식으로 처리

### 2020-10-06 
* 기존에 onerror로 했지만 500ms나 잡아먹어서 예외처리 따로 해줌
=>구매하지 않은 아이템 이미지 예외 처리 완료

### 2020-10-07
* 티어에 맞는 이미지 추가 및 정렬
* gnb.pug 추가하여 모든 페이지에 gnb 가능하도록 구현
* await champDataDragon(other_summoner_champKey,my_champKey); 를 10번 반복했지만 await가 검색 속도를 느리게 했다
* 1차 시간 개선전 검색 시간은 5.22초 였다. 하지만 1차 시간 개선후 4.17초를 기록했다 1초 단축시켰다.

### 2020-10-08
* 검색 시간을 단축 시킬려고 for문을 최소한으로 하고, await도 최소화 했지만 여전히 4초 이하로는 떨어지지 않는다.
* 원인은 var result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${process.env.API_KEY}`); 이였다.
* 10게임의 데이터를 불러와야 하므로 총 10번 반복해주는데 한번 하는데 350.000ms 정도 소모된다. 10번이니깐 저기만 3.5초 걸리는 것이다.
* 총 시간을 4.2초라고 가정하면 나머지는 로직은 0.7초 밖에 걸리지 않는 것이다.

### 2020-10-09
* 최근 플레이한 게임 정보 불러올 때 만약 최근 10게임이 아니라 7게임만 불러오고 싶게 할 시 좀 더 동적으로 반응할수 있도록 변수 설정

### 2020-10-10
* axios를 통한 서버 통신 관련 공부
* axios이 요청한 서버의 json 데이터중 일부만 가져올수 없을까? 왜냐 다 가져오기엔 데이터가 너무너무 방대하다... => 만약 가능하다면 검색 시간을 엄청 단축시킬수 있을것 같음.

### 2020-10-11
* axios 라이브러리를 파보았다. 버퍼와 스트림으로 요청 url에서 데이터를 가져오는건 알겠는데 이를 어떻게 긁어오는질 모르겠다.
* 결국 우선은 ajax를 이용하여 게임 전부를 가져오는게 아니라 조금조금씩 가져오기로 했다.
* 추가 버튼 누를때마다 각 3게임의 정보를 가져옴. ex) 가장 최근 3게임 -> 그 다음 3게임 -> 그 다음 3게임 ...
* ajax를 이용하여 추가 버튼 누를때마다 나올수 있도록 구현 성공 => 한번 로딩할때 1초 정도 걸림.
* ★★★ 소환사 닉네임 검색시 평균 2.5초 걸리고 ajax 호출 할때는 평균 1초 정도 걸림(처음 로딩시간은 10초 이상이였다. axios당 0.3초 정도 소모) ★★★

### 2020-10-12
* ajax로 추가된 div margin값 에러 수정
* 13게임 이상 불러올라고 하면 alert 뜨게 함.
* 같이 플레이한 소환사 누르면 해당 소환사 검색 가능

### 2020-10-13
* 소환사 스펠 이미지 에러 수정
* 자유랭크 솔로랭크 둘다 뷰에 표시
* 랭크가 없을 시 에외 처리

### 2020-10-15
* 승률 추가
* 폴더 파일 정리
* 메인 페이지에 동영상 추가

### 2020-10-16
* 소환사 검색시 아이콘 추가

### 2020-10-19
* 더보기 ajax 오류 수정
* 소환사 정보에 게임을 언제했는지에 대한 정보를 "n일전"으로 표시 (0일전은 오늘로 표시, 현재시간 기준 차이임)
* Win, Fail을 승리, 패배로 표시

### 2020-10-20
* 소환사 스펠 옆에 주요 룬 이미지 추가
* 다른 소환사 이름 너비 초과시 overflow 효과
* 챔피언에게 가한 데미지, 획득 골드량 추가
* 최근 게임 상황판 각각 항목 라인 맞춤

### 2020-10-22
* 아이템 이미지 오버 효과 추가 => 오버 시 해당 아이템의 정보를 보여준다.

### 2020-10-24
* 아이템 이미지 오버 효과 ajax로 불러오는 데이터들에도 적용
* 쓸데 없는 overflow:hidden 효과 다 제거
* 툴팁의 글자수가 많아지면 overflow 효과 때문에 계속 글자들이 짤림

=> mw-1200의 overflow:hidden 효과 때문에 잘리는 건데 이걸 없애주면 배치가 엉망이됨,

결국 mw-1200 풀어줄수 있는건 다 풀어주고 새롭게 배치 처리를 함. 이 과정이 너무 어려웠음

* 아이템 오버효과의 description 출력시 태그까지 출력되는데 정규식 표현을 써서 텍스트만 출력될 수 있도록 함.
* 아이템 오버효과에서 아이템의 이름뿐만 아니라 설명과 가격까지 출력될수 있게함(html태그까지 텍스트로 출력되서 정규식 사용하여 개행 시킴)
* 스펠 오버효과 시 스펠 이름과 설명 표시
* 다른 소환사 챔피언 이미지 오버효과시 챔피언 이름 표시
* N일 전에 오버효과로 실제 플레이한 시간 표시(ex. 2020년10월10일 12:00 AM)으로 표시
* 이외 기타 오버효과 추가

### 2020-10-25
* 챔피언 이미지 사진 오버효과로 타이틀 표시
* 숙련도 페이지를 만들어서 소환사의 숙련도가 높은 챔피언 top4를 뷰에 표시함
* 숙련도 top4에 대한 챔피언 이미지 뷰에 표시
* 페이지 이동간 로딩 표시함

### 2020-10-28
* ajax로 표시된 10명 소환사 닉네임 클릭했을 때도 로딩 뜸
* footer 작업

### 2020-11-01
```
1) 해당 게임의 다른 소환사들의 게임 정보를 보기위한 버튼 추가
2) 위에서 만든 버튼은 ajax방식으로 작동한다. ajax로 바로 서버에 요청한후 응답 받아 사용자에게 보여줄수 
있도록 구현할 것임
3) 현재는 우선 ajax로 서버에 보고 싶은 경기에 해당하는 gameID를 넘겨줌 
=> 요청으로 보낸 gameId를 가지고 서버에서 해당 데이터를 찾아 응답해줄것임
```

### 2020-11-03
```
1) mysql2 npm 설치 후 본인 깃허브에 있는 DBPool 모듈로 DB와 연동하고 앞으로 쿼리문을 동기식으로 처리할 수 있게됨.
2) .env에 추가적으로 DB 정보를 넣어주었다.
3) mysql로 스키마 bjgg 를 만든 후 champion이라는 테이블을 만들었다.
Table: champions
    Columns:
        key_champ varchar(10) PK 
        id varchar(45) 
        name varchar(45) 
        title varchar(500) 
        blurb varchar(1000)
=> Riot의 DataDragonChampin.json으로 더 이상 챔피언 정보를 불러올 필요가 없다.
"Zyra":{
    "version":"10.22.1",
    "id":"Zyra",
    "key":"143",
    "name":"자이라",
    "title":"가시 덩굴의 복수",
=> 이런식으로 되어있는데 match.json에서는 챔피언 이름이 아닌 key 값으로 주기 때문에
   key 값으로 Zyra라는 객체에 접근할려면 for문을 돌려줘서 그에 맞는 name 값을 찾는 방법 밖에 없었다.
앞으로는 바로 위와 같은 방법 쓸 필요가 없게 된것이다.
```

### 2020-11-05
```
1) champions, spell, items, summoner_spells  각각의 테이블을 만듬
2) othersummoner.js에 각 소환사들의 챔피언 정보, 각 소환사들의 소환사 스펠 정보 들을 각각 객체화 시켜주었다.

** 테이블 만들 때 데이터가 너무 많기 때문에 일일이 다 집어넣기엔 무리가 있다. 따라서
테이블과 알맞은 컬럼들을 생성한 후 dbPool를 이용해 for(var key in keys)를 사용해 json의
모든 키값에 접근한 다음 await dbPool(`INSERT`) 해주었다. 노가다가 필요없다.
```

### 2020-11-09
```
1) __**BJ.AutoTable**__ 를 사용해서 기본이 되는 champions_bj, items_bj, summoner_bj 테이블을
생성시켜 주었다. 앞으로 버전이 바뀌여도 __**BJ.AutoTable**__ 이용해 쉽게 테이블 생성이 가능하다.
2) 각 게임 경기를  __**자세히**__ 봤을 때 view에 뿌려주는 모든 값(ex. 소환사 이름, 게임 닉네임,
등등 총 41개의 데이터)가 데이터베이스 저장된다.
3) 같은 게임 ID를 여러번 눌렀을 때 중복된 값이 계속 들어가기 때문에 이를 방지하고자
__**insert into () (select '') as tmp where not exists( )limit;**__ 으로 쿼리문을 짰다.
해당 코드는 __**otherSummoner.js line 100**__ 참고 바랍니다.
```