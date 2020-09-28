var matchDto = require('../axios/matchDto');
var champDataDragon = require('../routerJS/champDataDragon.js');

const participantIdentities = async (summoner_getGameId, searchedName) => {
    try {
        var participantList = {}; //게임정보 다 들어가 있음
        const searchedName_eachGame_number = []; //검색된 소환사의 각 게임당 위치를 저장
        const MatchDto = [];
        var team_number = []; //검색된 소환사가 어느 팀이였는지 구별해주는 변수
        var game_of_times = 5; //게임 횟수
        var champKey = [];//챔피언 키
        var champ_list;//챔피언에 대한 리스트

        for (i = 0; i < game_of_times; i++) { //최근 5개의 게임만을 나타내기 위함
            MatchDto[i] = await matchDto(summoner_getGameId.data.matches[i].gameId);//최근 5게임의 gameid를 가지고있음
        }

        for (k = 0; k < game_of_times; k++) {
            participantList[k] = [];
            for (i = 0; i < MatchDto[k].data.participantIdentities.length; i++) {
                participantList[k].push(MatchDto[k].data.participantIdentities[i].player.summonerName);
                if (MatchDto[k].data.participantIdentities[i].player.summonerName === searchedName) {
                    searchedName_eachGame_number[k] = i; //검색된 소환사의 이름의 순번. index이므로 0부터 시작
                }
            }
            if (searchedName_eachGame_number[k] < game_of_times) {//id가 5 미만은 blue팀
                team_number[k] = 0;
            } else {//id가 5이상은 purple팀
                team_number[k] = 1;
            }
        }

        //검색된 소환사가 한 각 챔피언들의 key값을 받아냄.
        for(i = 0;i<game_of_times;i++){
            champKey.push(MatchDto[i].data.participants[searchedName_eachGame_number[i]].championId);
        }
        champ_list =  await champDataDragon(champKey);
        console.log(champ_list);

        //최종적으로 pug에 렌더링 해줄 것들
        var team_number_count = 0;
        for (i = 0; i < searchedName_eachGame_number.length; i++) {
            var participants = MatchDto[i].data.participants[searchedName_eachGame_number[i]];//검색된 소환사의 게임에서의 번호
            var kill = participants.stats.kills, death = participants.stats.deaths, assist = participants.stats.assists,kda =(kill+assist)/death;

            participantList[game_of_times] = {
                gameTime: Math.round(MatchDto[i].data.gameDuration / 60),
                gameWinFail: MatchDto[i].data.teams[team_number[team_number_count]].win, //이거 어느 팀이냐에 따라 다르게 나와야함
                championId: participants.championId,
                kills: kill,
                deaths: death,
                assists: assist,
                kda : Math.round(kda * 100) / 100,
                champ_name : champ_list,
            }
            game_of_times++;
            team_number_count++;
        }

        //console.log(participantList);
        

        return participantList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = participantIdentities;