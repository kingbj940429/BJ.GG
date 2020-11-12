const {
    query
} = require('express');
var matchDto = require('../../axios/matchDto');
const dbPool = require('../../config/config.js') //DB 연동

const OtherparticipantIdentities = async (summoner_getGameId, searchedName) => {
    try {
        var results = {};
        var participantList = []; //게임정보 다 들어가 있음
        const searchedName_eachGame_number = []; //검색된 소환사의 각 게임당 위치를 저장
        var item_version = process.env.ITEM_VERSION;


        /**
         * 해당 게임 ID의 JSON 정보 불러오기
         */
        const MatchDto = await matchDto(summoner_getGameId); //최근 N게임의 gameid를 가지고있음
        //console.log(MatchDto.participants[0]);

        /**
         * 소환사들의 각 챔피언 키값들
         */
        var other_champKey = [];
        for (k = 0; k < 10; k++) {
            other_champKey.push(MatchDto.participants[k].championId);
        }

        /**
         * 소환사들의 각 챔피언 정보
         * other_champ_name [{id, name, title}]
         */
        var other_champ_name = []
        for (var i in other_champKey) {
            var temp = await dbPool(`SELECT id_bj, name_bj, title_bj, key_bj FROM champions_bj WHERE key_bj = "${other_champKey[i]}"`);
            other_champ_name.push({
                id: temp[0].id_bj,
                name: temp[0].name_bj,
                title: temp[0].title_bj,
                key: temp[0].key_bj,
            })
        }
        results.other_champ_name = other_champ_name;

        /**
         * 해당 게임의 각 소환사 정보
         */
        for (var k in MatchDto.participants) {
            var Mp = MatchDto.participants[k];
            spell1_key = await dbPool(`SELECT standard_key FROM bjgg.summoner_spells_bj WHERE key_bj = '${Mp.spell1Id}'`);
            spell2_key = await dbPool(`SELECT standard_key FROM bjgg.summoner_spells_bj WHERE key_bj = '${Mp.spell2Id}'`);

            participantList[k] = {
                participantId: Mp.participantId,
                teamId: Mp.teamId,
                championId: Mp.championId,
                spell1Id: Mp.spell1Id,
                spell2Id: Mp.spell2Id,
                spell1Id_img: `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell1_key[0].standard_key}.png`,
                spell2Id_img: `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell2_key[0].standard_key}.png`,
                win: Mp.stats.win,
                item0: Mp.stats.item0,
                item1: Mp.stats.item1,
                item2: Mp.stats.item2,
                item3: Mp.stats.item3,
                item4: Mp.stats.item4,
                item5: Mp.stats.item5,
                item6: Mp.stats.item6,
                item0_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item0}.png`,
                item1_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item1}.png`,
                item2_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item2}.png`,
                item3_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item3}.png`,
                item4_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item4}.png`,
                item5_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item5}.png`,
                item6_img: `http://ddragon.leagueoflegends.com/cdn/${item_version}/img/item/${Mp.stats.item6}.png`,
                perk0: Mp.stats.perk0,
                perkSubStyle: Mp.stats.perkSubStyle,
                perk0_img: `https://opgg-static.akamaized.net/images/lol/perk/${Mp.stats.perk0}.png`,
                perkSubStyle_img: `https://opgg-static.akamaized.net/images/lol/perkStyle/${Mp.stats.perkSubStyle}.png`,
                kills: Mp.stats.kills,
                deaths: Mp.stats.deaths,
                assists: Mp.stats.assists,
                goldEarned: Mp.stats.goldEarned,
                champLevel: Mp.stats.champLevel,
                totalMinionsKilled: Mp.stats.totalMinionsKilled,
                champion_id: other_champ_name[k].id,
                champion_key: other_champ_name[k].key,
                champion_name: other_champ_name[k].name,
                champion_title: other_champ_name[k].title,
                champion_img: `http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${other_champ_name[k].id}.png`,
                summonerName: MatchDto.participantIdentities[k].player.summonerName,
                accountId: MatchDto.participantIdentities[k].player.accountId,
                summonerId: MatchDto.participantIdentities[k].player.summonerId
            }
            /**
             * 게임 ID의 정보를 데이터베이스 저장, 만약 동일 게임 ID이 중복되서 저장되지 않는다.
             * 예를 들어 게임 ID 당 소환사는 총 10명이므로 게임 ID 당 10명의 소환사 정보를 갖는다.
             * 동일 게임 ID가 들어오면 중복되서 저장되지 않는다.
             */
            var temp = `INSERT INTO gameid (gameid_key, participantId, teamId, championId, spell1Id, spell2Id, spell1Id_img, spell2Id_img, 
                win, item0, item1, item2, item3, item4, item5, item6, item0_img, item1_img, item2_img, item3_img, item4_img, item5_img, 
                item6_img, perk0, perkSubStyle, perk0_img, perkSubStyle_img, kills, deaths, assists, goldEarned, champLevel, totalMinionsKilled, 
                champion_id, champion_key, champion_name, champion_title, champion_img, summonerName, accountId, summonerId)
                SELECT * FROM (SELECT '${summoner_getGameId}' AS gameid_key,'${participantList[k].participantId}' AS participantId, '${participantList[k].teamId}' AS teamId, '${participantList[k].championId}' AS championId, '${participantList[k].spell1Id}' AS spell1Id, '${participantList[k].spell2Id}' AS spell2Id, '${participantList[k].spell1Id_img}' AS spell1Id_img, 
                '${participantList[k].spell2Id_img}' AS spell2Id_img, '${participantList[k].win}' AS win, '${participantList[k].item0}' AS item0, '${participantList[k].item1}' AS item1, '${participantList[k].item2}' AS item2, '${participantList[k].item3}' AS item3, 
                '${participantList[k].item4}' AS item4, '${participantList[k].item5}' AS item5, '${participantList[k].item6}' AS item6, '${participantList[k].item0_img}' AS item0_img, '${participantList[k].item1_img}' AS item1_img, '${participantList[k].item2_img}' AS item2_img, 
                '${participantList[k].item3_img}' AS item3_img, '${participantList[k].item4_img}' AS item4_img, '${participantList[k].item5_img}' AS item5_img, '${participantList[k].item6_img}' AS item6_img, '${participantList[k].perk0}' AS perk0, '${participantList[k].perkSubStyle}' AS perkSubStyle,'${participantList[k].perk0_img}' AS perk0_img,'${participantList[k].perkSubStyle_img}' AS perkSubStyle_img, 
                '${participantList[k].kills}' AS kills, '${participantList[k].deaths}' AS deaths, '${participantList[k].assists}' AS assists, '${participantList[k].goldEarned}' AS goldEarned, '${participantList[k].champLevel}' AS champLevel, '${participantList[k].totalMinionsKilled}' AS totalMinionsKilled, 
                '${participantList[k].champion_id}' AS champion_id, '${participantList[k].champion_key}' AS champion_key, '${participantList[k].champion_name}' AS champion_name, '${participantList[k].champion_title}' AS champion_title, '${participantList[k].champion_img}' AS champion_img, 
                '${participantList[k].summonerName}' AS summonerName, '${participantList[k].accountId}' AS accountId, '${participantList[k].summonerId}' AS summonerId) AS tmp
                WHERE NOT EXISTS(
                    SELECT gameid_key FROM gameid WHERE gameid_key = '${summoner_getGameId}' AND participantId = '${participantList[k].participantId}'
                ) LIMIT 1`;
            console.log(temp);
            await dbPool(temp);
            
        }
        
        //console.log(participantList);

        return 1;
    } catch (error) {
        console.error(error);
    }
}

module.exports = OtherparticipantIdentities;