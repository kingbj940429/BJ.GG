# 실행 방법
1) git clone해서 다운받습니다.
2) 본인 API_KEY를 RIOT developer에서 발급받습니다.
3) .env 파일을 만들어서 아래와 같은 정보를 넣어줍니다. 
```js
//.env 파일은 따로 만들어야 합니다. 위치는 폴더 가장 상위
API_KEY = "본인 API_KEY를 넣으세요"
ITEM_VERSION = 10.19.1 //각 json 버전
CHAMP_VERSION = 10.19.1
SPELL_VERSION = 10.19.1
GAME_TIMES = 10 //검색할 게임 수
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
### 2020-09-11
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

### 2020-10-8
* 검색 시간을 단축 시킬려고 for문을 최소한으로 하고, await도 최소화 했지만 여전히 4초 이하로는 떨어지지 않는다.
* 원인은 var result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${process.env.API_KEY}`); 이였다.
* 10게임의 데이터를 불러와야 하므로 총 10번 반복해주는데 한번 하는데 350.000ms 정도 소모된다. 10번이니깐 저기만 3.5초 걸리는 것이다.
* 총 시간을 4.2초라고 가정하면 나머지는 로직은 0.7초 밖에 걸리지 않는 것이다.

