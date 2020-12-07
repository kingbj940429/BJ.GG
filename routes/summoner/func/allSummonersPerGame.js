const dbPool = require('../../../config/config');
const matchDto = require('../../../axios/matchDto');

const allSummonersPerGame = async (gameId, summonerName, game_number)=>{
    try {
        var results = [];
        for (i = 0; i < game_number; i++) { //최근 N개의 게임만을 나타내기 위함
            var result = {};
            var temp;
            var MatchDto = await matchDto(gameId[i]);//최근 N게임의 gameid를 가지고있음
            game_id = MatchDto.gameId;

            /**
             * 다른 소환사들 정보
             */
            var Mpart = MatchDto.participants;
            var all_summoners = [];
            for(var k in MatchDto.participantIdentities){
                if(Mpart[k].stats.deaths == 0){
                   var kda = "Perfect";
                }else{
                   var  kda = ((Mpart[k].stats.kills + Mpart[k].stats.assists) / Mpart[k].stats.deaths).toFixed(2);
                }
                temp = await dbPool(`SELECT standard_key, name_bj FROM champions_bj WHERE key_bj = ${Mpart[k].championId}`);
                all_summoners.push({
                    participantId : Mpart[k].participantId,
                    accountId : MatchDto.participantIdentities[k].player.accountId,
                    summonerName : MatchDto.participantIdentities[k].player.summonerName,
                    summonerId : MatchDto.participantIdentities[k].player.summonerId,
                    teamId : Mpart[k].teamId,
                    kills : Mpart[k].stats.kills,
                    deaths : Mpart[k].stats.deaths,
                    assists : Mpart[k].stats.assists,
                    kda : kda,
                    champion_name : temp[0].name_bj,
                    champion_key : temp[0].standard_key,
                    champion_img : `http://ddragon.leagueoflegends.com/cdn/${process.env.GAME_VERSION}/img/champion/${temp[0].standard_key}.png`
                });
            }
            result.all_summoners = all_summoners;
            
            /**
             * 최종 데이터
             */
            results.push(result);
        }
        return results;
    } catch (error) {
        console.error(error);
    }
}
module.exports = allSummonersPerGame;
