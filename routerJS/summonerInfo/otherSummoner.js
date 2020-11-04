var matchDto = require('../../axios/matchDto');

var champDataDragon = require('./champDataDragon.js');
const dateDiff = require('./dateDiff');
var spellDataDragon = require('./spellDataDragon.js');
const itemDataDragon = require('../../axios/itemDataDragon.js');
const yyyymmdd = require('../other/yyyymmdd.js');
const dbPool = require('../../config/config.js') //DB 연동

const OtherparticipantIdentities = async (summoner_getGameId, searchedName) => {
    try {

        var participantList = []; //게임정보 다 들어가 있음
        const searchedName_eachGame_number = []; //검색된 소환사의 각 게임당 위치를 저장
        var team_number = []; //검색된 소환사가 어느 팀이였는지 구별해주는 변수
        var game_of_times = process.env.GAME_TIMES; //게임 횟수
        var my_champKey = []; //챔피언 키
        var champ_list = []; //챔피언에 대한 리스트
        var item_url = [];
        var champion_img_url = [];
        var game_date = [];
        var game_date_tool = [];
        var gameId = [];

        /**
         * 해당 게임 ID의 JSON 정보 불러오기
         */
        const MatchDto = await matchDto(summoner_getGameId); //최근 N게임의 gameid를 가지고있음
        //console.log(MatchDto.participants);

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
        for(var i in other_champKey){
            var temp = await dbPool(`SELECT id, name, title FROM champions WHERE key_champ = "${other_champKey[i]}"`);
            other_champ_name.push({
                id : temp[0].id,
                name : temp[0].name,
                title : temp[0].title,
            }) 
        }
        //console.log(other_champ_name);
        
        /**
         * 소환사 스펠 관련
         */

        var summoner_spells = []
        for (k = 0; k < 10; k++) {
            //MatchDto.participants[k].spell1Id;
            var temp = await dbPool(`SELECT * FROM summoner_spells WHERE key_spell = ${MatchDto.participants[k].spell1Id}`);
            var temp2 = await dbPool(`SELECT * FROM summoner_spells WHERE key_spell = ${MatchDto.participants[k].spell2Id}`);
            summoner_spells.push({
                key_spell : temp[0].key_spell,
                key_spell2 : temp2[0].key_spell,
                id : temp[0].id,
                id2 : temp2[0].id,
                name : temp[0].name,
                name2 : temp2[0].name,
                description : temp[0].description,
                description2 : temp2[0].description,
                spell_img : `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${temp[0].id}.png`,
                spell_img2 : `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${temp2[0].id}.png`
            });
        }
        //console.log(summoner_spells);

        //##아이템 관련
        //소환사 스펠 관련
        // var spell=[];
        // var spell_list = {};
        // var spell1=[];
        // var spell2=[];
        // for(i=0;i < searchedName_eachGame_number.length; i++){
        //     var participants = MatchDto[i].participants[searchedName_eachGame_number[i]];
        //     spell[i] = {
        //         spell1 : participants.spell1Id,
        //         spell2 : participants.spell2Id,
        //     }
        // }
        // spell_list = await spellDataDragon(spell);

        //##소환사 스펠 관련
        // for(i=0;i<process.env.GAME_TIMES;i++){
        //      spell1.push(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_list.spell1[i].id}.png`);
        //      spell2.push(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_list.spell2[i].id}.png`);
        // }
        // const spell_result={
        //     spell1 : spell1,
        //     spell2 : spell2,
        // }

        //최종적으로 pug에 렌더링 해줄 것들
        // var team_number_count = 0;
        // for (i = 0; i < process.env.GAME_TIMES; i++) {
        //     var participants = MatchDto.participants[searchedName_eachGame_number[i]];//검색된 소환사의 게임에서의 번호
        //     var stats = participants.stats;
        //     var kill = stats.kills, death = stats.deaths, assist = stats.assists,kda =(kill+assist)/death;
        //     var totalDamageDealtToChampions = stats.totalDamageDealtToChampions;
        //     var goldEarned = stats.goldEarned;
        //     var perk0 = stats.perk0;
        //     var perkSubStyle = stats.perkSubStyle;
        //     var total_cs = stats.totalMinionsKilled + stats.neutralMinionsKilled;
        //     var level = stats.champLevel;
        //     var gameWinFail_kor;

        //     /**
        //      * perk은 DD에 없어서 OP.GG 소스 주소를 가져옴
        //      */
        //     perk0 = `https://opgg-static.akamaized.net/images/lol/perk/${perk0}.png`;
        //     perkSubStyle = `https://opgg-static.akamaized.net/images/lol/perkStyle/${perkSubStyle}.png`;

        //     kda = (Math.round(kda * 100) / 100).toFixed(2);
        //     if(kda === 'Infinity'){
        //         kda= "Perfect";
        //     }

        //     if(MatchDto[i].teams[team_number[team_number_count]].win == 'Win'){
        //         gameWinFail_kor = '승리';
        //     }else{
        //         gameWinFail_kor = '패배';
        //     }
        //     /**
        //      * 전송 데이터
        //      */
        //     participantList[game_of_times] = {
        //         game_date : game_date,
        //         game_date_tool : game_date_tool[i],
        //         gameTime: Math.round(MatchDto[i].gameDuration / 60),
        //         gameWinFail: MatchDto[i].teams[team_number[team_number_count]].win, //이거 어느 팀이냐에 따라 다르게 나와야함
        //         gameWinFail_kor : gameWinFail_kor,
        //         championId: participants.championId,
        //         perk0 : perk0,
        //         perkSubStyle : perkSubStyle,
        //         kills: kill,
        //         deaths: death,
        //         assists: assist,
        //         kda : kda,
        //         totalDamageDealtToChampions : totalDamageDealtToChampions,
        //         goldEarned : goldEarned,
        //         champ_name : other_summoner_champ_list.my_champ_name,
        //         champ_img : champion_img_url,
        //         champ_title : other_summoner_champ_list.my_champ_title,
        //         total_cs : total_cs,
        //         level : level,
        //         item : item_url[i],
        //         item_list : item_list,
        //         spell1 : spell_result.spell1[i],
        //         spell2 : spell_result.spell2[i],
        //         spell_list1 : spell_list.spell1[i],
        //         spell_list2 : spell_list.spell2[i],
        //         otherChamps : other_summoner_champ_url[i],
        //         otherChampName : other_summoner_champ_list.champ_name[i],
        //         gameId : gameId[i],
        //     }
        //     game_of_times++;
        //     team_number_count++;
        // }

        //return participantList;
        return 1;
    } catch (error) {
        console.error(error);
    }
}

module.exports = OtherparticipantIdentities;