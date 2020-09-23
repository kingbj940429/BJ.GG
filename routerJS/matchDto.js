var matchDto = require('../axios/matchDto');

const participantIdentities = async(summoner_getGameId, searchedName) => {
    try {
        var participantList ={};
        const searchedName_eachGame_number = [];
        const MatchDto = [];
        for (i = 0; i < 5; i++) { //최근 5개의 게임만을 나타내기 위함
            MatchDto[i] = await matchDto(summoner_getGameId.data.matches[i].gameId);
        }
        for (k = 0; k < 5; k++) {
            participantList[k] = [];
            for (i = 0; i < MatchDto[k].data.participantIdentities.length; i++) {
                participantList[k].push(MatchDto[k].data.participantIdentities[i].player.summonerName);
                if(MatchDto[k].data.participantIdentities[i].player.summonerName === searchedName){
                    searchedName_eachGame_number[k] = i;//검색된 소환사의 이름의 순번. index이므로 0부터 시작
                }
            }
        }
        var k=5;
        for(i=0;i<searchedName_eachGame_number.length;i++){
            participantList[k] = {
                gameTime : Math.round(MatchDto[i].data.gameDuration/60),
                gameWinFail : MatchDto[i].data.teams[0].win,//이거 어느 팀이냐에 따라 다르게 나와야함
                championId : MatchDto[i].data.participants[searchedName_eachGame_number[i]].championId,
                kills : MatchDto[i].data.participants[searchedName_eachGame_number[i]].stats.kills,
                deaths : MatchDto[i].data.participants[searchedName_eachGame_number[i]].stats.deaths,
                assists : MatchDto[i].data.participants[searchedName_eachGame_number[i]].stats.assists,
            }
            //console.log(MatchDto[i].data.participantIdentities[searchedName_eachGame_number[i]].player.summonerName);
            //console.log(MatchDto[i].data.participants[searchedName_eachGame_number[i]].stats.kills);//5게임의 킬수 잘들어감.
            k++;
        }
        
        console.log(participantList);
        return participantList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = participantIdentities;