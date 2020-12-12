const matchDto = require('../../axios/matchDto');

const dateDiff = require('./dateDiff');
const yyyymmdd = require('./yyyymmdd.js');
const dbPool = require('../../config/config');

const participantIdentities = async (summoner_getGameId, searchedName, game_number) => {
    try {
        var results = [];
        for (i = 0; i < game_number; i++) { //최근 N개의 게임만을 나타내기 위함
            var result = {};
            var temp;
            var MatchDto = await matchDto(summoner_getGameId[i]);//최근 N게임의 gameid를 가지고있음
            game_id = MatchDto.gameId;

            /**
             * 플레이했던 날짜 
             * game_date_diff => 12일 전
             * game_date => 2020년 10월 31일 3:36 AM
             */
            game_date_diff = dateDiff(new Date(MatchDto.gameCreation), new Date());
            game_date = yyyymmdd((MatchDto.gameCreation));
            seconds = MatchDto.gameDuration;
            game_duration = `${parseInt((seconds%3600)/60)}분 ${seconds%60}초`;
            result= {
                search_name : searchedName,
                game_id,
                game_date_diff,
                game_date,
                game_duration,
            }

            /**
             * 검색한 소환사의 참가 번호
             * searched_participantId => 4 (4번)
             */
            for(var k in MatchDto.participantIdentities){
                if(MatchDto.participantIdentities[k].player.summonerName == searchedName){
                        result.searched_participantId = MatchDto.participantIdentities[k].participantId;
                        summoner_index = MatchDto.participantIdentities[k].participantId - 1;
                }
            }

            /**
             * 검색한 소환사가 포함된 팀 아이디과 승패
             */
            result.team_id = MatchDto.participants[summoner_index].teamId;
            if(MatchDto.participants[summoner_index].stats.win == false) result.win_fail = '패배';
            else result.win_fail = '승리';

            /**
             * 검색한 소환사의 챔피언
             */
            const Mp = MatchDto.participants[summoner_index];

            temp = await dbPool(`
            SELECT standard_key, name_bj, key_bj, title_bj 
            FROM ${process.env.DB_DATABASE}.champions_bj 
            WHERE 1=1 
                AND key_bj = ${Mp.championId}
                AND version_bj = '${process.env.CHAMP_VERSION}'
            `);

            result.champion_standard_key = temp[0].standard_key;
            result.champion_name = temp[0].name_bj;
            result.champion_key = temp[0].key_bj;
            result.champion_title = temp[0].title_bj;
            result.champion_img = `http://ddragon.leagueoflegends.com/cdn/${process.env.GAME_VERSION}/img/champion/${temp[0].standard_key}.png`;

            /**
             * 검색한 소환사의 스펠과 룬
             */
            temp = await dbPool(`
            SELECT standard_key, name_bj, description_bj, key_bj 
            FROM ${process.env.DB_DATABASE}.summoner_spells_bj 
            WHERE 1=1
                AND key_bj IN(${Mp.spell1Id},${Mp.spell2Id})`
            );
            result.spell1_standard_key = temp[0].standard_key;
            result.spell1_name = temp[0].name_bj;
            result.spell1_description = temp[0].description_bj;
            result.spell1_key = temp[0].key_bj;
            result.spell1_img = `https://opgg-static.akamaized.net/images/lol/spell/${temp[0].standard_key}.png`;
            result.spell2_standard_key = temp[1].standard_key;
            result.spell2_name = temp[1].name_bj;
            result.spell2_description = temp[1].description_bj;
            result.spell2_key = temp[1].key_bj;
            result.spell2_img = `https://opgg-static.akamaized.net/images/lol/spell/${temp[1].standard_key}.png`;
            result.perk0 = `https://opgg-static.akamaized.net/images/lol/perk/${Mp.stats.perk0}.png`;
            result.perkSubStyle = `https://opgg-static.akamaized.net/images/lol/perkStyle/${Mp.stats.perkSubStyle}.png`;
            /**
             * 검색한 소환사의 아이템
             */
            const Mps = Mp.stats;
            var items = [];
            for(var k=0;k<7;k++){
                temp = await dbPool(`
                SELECT standard_key, name_bj, description_bj 
                FROM ${process.env.DB_DATABASE}.items_bj 
                WHERE 1=1
                    AND standard_key = ${Mps[`item${k}`]}`);
                if(temp[0] == undefined){
                    temp = await dbPool(`
                    SELECT standard_key, name_bj, description_bj 
                    FROM ${process.env.DB_DATABASE}.items_old_bj 
                    WHERE 1=1
                        AND standard_key = ${Mps[`item${k}`]}`);
                }
                description = temp[0].description_bj.replace(/<(\/br|br)([^>]*)>/gi,"\r\n\r\n");
                description = description.replace(/(<([^>]+)>)/ig,"");
                item = {
                    standard_key : temp[0].standard_key,
                    name : temp[0].name_bj,
                    // description : temp[0].description_bj.replace(/(<([^>]+)>)/ig,""),
                    description : description,
                    item_img : `https://opgg-static.akamaized.net/images/lol/item/${temp[0].standard_key}.png`
                }
                items.push(item);
            }
            result.items = items;
            
            /**
             * 소환사 kda
             */
            result.kills = Mps.kills;
            result.deaths = Mps.deaths;
            result.assists = Mps.assists;

            if(Mps.deaths == 0){
                kda = "Perfect";
            }else{
                kda = ((Mps.kills + Mps.assists) / Mps.deaths).toFixed(2);
            }
            result.kda = kda ;

            /**
             * 소환사 기타 정보
             */
            result.champLevel = Mps.champLevel;
            result.goldEarned = Mps.goldEarned.toLocaleString();
            result.totalDamageDealtToChampions = Mps.totalDamageDealtToChampions.toLocaleString();
            result.totalMinionsKilled = Mps.totalMinionsKilled + Mps.neutralMinionsKilled;
            result.perMinuteMinionKilled = ((Mps.totalMinionsKilled + Mps.neutralMinionsKilled) / parseInt((seconds%3600)/60)).toFixed(1);

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
                temp = await dbPool(`
                SELECT standard_key, name_bj 
                FROM ${process.env.DB_DATABASE}.champions_bj 
                WHERE 1=1
                    AND key_bj = ${Mpart[k].championId}`);

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
                    // champion_name : "",
                    // champion_key : "",
                    // champion_img : ""
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

module.exports = participantIdentities;