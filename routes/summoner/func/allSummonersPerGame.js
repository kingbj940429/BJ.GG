const dbPool = require('../../../config/config');
const matchDto = require('../../../axios/matchDto');

const allSummonersPerGame = async (gameId, summonerName, game_number) => {
    try {
        for (i = 0; i < game_number; i++) { //최근 N개의 게임만을 나타내기 위함
            var result = [];
            var temp, spells;
            var MatchDto = await matchDto(gameId[i]); //최근 N게임의 gameid를 가지고있음
            game_id = MatchDto.gameId;

            /**
             * 다른 소환사들 정보
             */
            var Mpart = MatchDto.participants;
            for (var k in MatchDto.participantIdentities) {
                var all_summoners;
                if (Mpart[k].stats.deaths == 0) {
                    var kda = "Perfect";
                } else {
                    var kda = ((Mpart[k].stats.kills + Mpart[k].stats.assists) / Mpart[k].stats.deaths).toFixed(2);
                }
                temp = await dbPool(`SELECT standard_key, name_bj FROM champions_bj WHERE key_bj = ${Mpart[k].championId}`);

                /**
                 * 검색한 소환사의 스펠과 룬
                 */
                spells = await dbPool(`SELECT standard_key, name_bj, description_bj, key_bj FROM summoner_spells_bj WHERE key_bj IN(${Mpart[k].spell1Id},${Mpart[k].spell2Id})`);
                
                /**
                 * 아이템
                 */
                const Mps = Mpart[k].stats;
                var items = [];
                for(var m=0;m<7;m++){
                    temp_item = await dbPool(`SELECT standard_key, name_bj, description_bj FROM items_bj WHERE standard_key = ${Mps[`item${m}`]}`);
                    if(temp_item[0] == undefined){
                        temp_item = await dbPool(`SELECT standard_key, name_bj, description_bj FROM items_old_bj WHERE standard_key = ${Mps[`item${m}`]}`);
                    }
                    description = temp_item[0].description_bj.replace(/<(\/br|br)([^>]*)>/gi,"\r\n\r\n");
                    description = description.replace(/(<([^>]+)>)/ig,"");
                    item = {
                        standard_key : temp_item[0].standard_key,
                        name : temp_item[0].name_bj,
                        // description : temp_item[0].description_bj.replace(/(<([^>]+)>)/ig,""),
                        description : description,
                        item_img : `https://opgg-static.akamaized.net/images/lol/item/${temp_item[0].standard_key}.png`
                    }
                    items.push(item);
                }

                /**
                 * 최종 객체
                 */
                all_summoners = {
                    participantId: Mpart[k].participantId,
                    accountId: MatchDto.participantIdentities[k].player.accountId,
                    summonerName: MatchDto.participantIdentities[k].player.summonerName,
                    summonerId: MatchDto.participantIdentities[k].player.summonerId,
                    teamId: Mpart[k].teamId,
                    kills: Mpart[k].stats.kills,
                    deaths: Mpart[k].stats.deaths,
                    assists: Mpart[k].stats.assists,
                    kda: kda,
                    champion_name: temp[0].name_bj,
                    champion_key: temp[0].standard_key,
                    champion_img: `http://ddragon.leagueoflegends.com/cdn/${process.env.GAME_VERSION}/img/champion/${temp[0].standard_key}.png`,
                    spell1_name : spells[0].name_bj,
                    spell1_description : spells[0].description_bj,
                    spell1_img : `https://opgg-static.akamaized.net/images/lol/spell/${spells[0].standard_key}.png`,
                    spell2_name : spells[1].name_bj,
                    spell2_description : spells[1].description_bj,
                    spell2_img : `https://opgg-static.akamaized.net/images/lol/spell/${spells[1].standard_key}.png`,
                    perk0 : `https://opgg-static.akamaized.net/images/lol/perk/${Mpart[k].stats.perk0}.png`,
                    perkSubStyle : `https://opgg-static.akamaized.net/images/lol/perkStyle/${Mpart[k].stats.perkSubStyle}.png`,
                    items,
                };
                result.push(all_summoners);
            }
            //result.all_summoners = all_summoners;
            //result.push(all_summoners);
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
module.exports = allSummonersPerGame;
