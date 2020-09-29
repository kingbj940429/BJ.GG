var matchDto = require('../axios/matchDto');

var champDataDragon = require('../routerJS/champDataDragon.js');
var spellDataDragon = require('../routerJS/spellDataDragon.js');


const participantIdentities = async (summoner_getGameId, searchedName) => {
    try {
        var participantList = {}; //게임정보 다 들어가 있음
        const searchedName_eachGame_number = []; //검색된 소환사의 각 게임당 위치를 저장
        const MatchDto = [];
        var team_number = []; //검색된 소환사가 어느 팀이였는지 구별해주는 변수
        var game_of_times = process.env.GAME_TIMES; //게임 횟수
        var champKey = [];//챔피언 키
        var champ_list;//챔피언에 대한 리스트
        var item_url = [];
        var champion_img_url = [];
        var spell_list = [];
        var spell_url = [];

        for (i = 0; i < game_of_times; i++) { //최근 5개의 게임만을 나타내기 위함
            MatchDto[i] = await matchDto(summoner_getGameId.data.matches[i].gameId);//최근 5게임의 gameid를 가지고있음
        }

        //검색된 소환사의 게임당 순번 및 팀
        for (k = 0; k < game_of_times; k++) {
            participantList[k] = [];
            for (i = 0; i < MatchDto[k].data.participantIdentities.length; i++) {
                participantList[k].push(MatchDto[k].data.participantIdentities[i].player.summonerName);
                if (MatchDto[k].data.participantIdentities[i].player.summonerName === searchedName) {
                    searchedName_eachGame_number[k] = i; //검색된 소환사의 이름의 순번. index이므로 0부터 시작
                }
            }
            if (searchedName_eachGame_number[k] < 5) {//id가 5 미만은 blue팀
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

        for(i = 0;i<game_of_times;i++){
            champ_list.champ_id[i] = `http://ddragon.leagueoflegends.com/cdn/${process.env.CHAMP_VERSION}/img/champion/${champ_list.champ_id[i]}.png`;
            champion_img_url.push(champ_list.champ_id[i]);
        }

        //검색된 소환사의 다른 소환사들 사진 
        var other_summoner_champKey = [];
        var other_summoner_champ_list = [];
        var other_summoner_champ_url = [];
        for(var i = 0; i<game_of_times;i++){
            other_summoner_champKey[i] = [];
            for(k=0;k<game_of_times;k++){
                other_summoner_champKey[i].push(MatchDto[i].data.participants[k].championId);
            }
            other_summoner_champ_list[i] = await champDataDragon(other_summoner_champKey[i]);
        }
        //console.log(other_summoner_champ_list);
        for(var i=0;i<game_of_times;i++){
            other_summoner_champ_url[i] = [];
            for(var k=0;k<game_of_times;k++){
                other_summoner_champ_url[i].push(`http://ddragon.leagueoflegends.com/cdn/${process.env.CHAMP_VERSION}/img/champion/${other_summoner_champ_list[i].champ_id[k]}.png`);
            }
        }

        //아이템 관련
        for(k=0;k < searchedName_eachGame_number.length; k++){
            var participants = MatchDto[k].data.participants[searchedName_eachGame_number[k]];
            var stats = participants.stats;

            item_url[k] = [];
            for(i= 0 ;i<7;i++){
                var item = {
                    version : `${process.env.ITEM_VERSION}`,
                    items : [stats.item0,stats.item1,stats.item2,stats.item3,stats.item4,stats.item5,stats.item6]
                };
                 item_url[k].push(`http://ddragon.leagueoflegends.com/cdn/${item.version}/img/item/${item.items[i]}.png`);
            }
        }
        //소환사 스펠 관련
        for(k=0;k < searchedName_eachGame_number.length; k++){
            var participants = MatchDto[k].data.participants[searchedName_eachGame_number[k]];
            var spell = {
                spell1 : participants.spell1Id,
                spell2 : participants.spell2Id,
            }
            spell_list.push(await spellDataDragon(spell));
            spell_url.push(spell_list[k]);
            spell_url[k].spell1 = `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_url[k].spell1}.png`;
            spell_url[k].spell2 = `http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_url[k].spell2}.png`;
        }

        //최종적으로 pug에 렌더링 해줄 것들
        var team_number_count = 0;
        for (i = 0; i < searchedName_eachGame_number.length; i++) {
            var participants = MatchDto[i].data.participants[searchedName_eachGame_number[i]];//검색된 소환사의 게임에서의 번호
            var stats = participants.stats;
            var kill = stats.kills, death = stats.deaths, assist = stats.assists,kda =(kill+assist)/death;
            var total_cs = stats.totalMinionsKilled + stats.neutralMinionsKilled;
            var level = stats.champLevel;
           
            kda = (Math.round(kda * 100) / 100).toFixed(2);



            participantList[game_of_times] = {
                gameTime: Math.round(MatchDto[i].data.gameDuration / 60),
                gameWinFail: MatchDto[i].data.teams[team_number[team_number_count]].win, //이거 어느 팀이냐에 따라 다르게 나와야함
                championId: participants.championId,
                kills: kill,
                deaths: death,
                assists: assist,
                kda : kda,
                champ_name : champ_list.champ_name,
                champ_img : champion_img_url,
                total_cs : total_cs,
                level : level,
                item : item_url[i],
                spell : spell_url[i],
                otherChamps : other_summoner_champ_url[i],
            }
            game_of_times++;
            team_number_count++;
        }
        console.log(participantList);
        return participantList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = participantIdentities;