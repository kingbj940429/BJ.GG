var matchDto = require('../../axios/matchDto');

var champDataDragon = require('./champDataDragon.js');
var spellDataDragon = require('./spellDataDragon.js');
//console.time("소요시간"); 시간 측정 
//console.timeEnd("소요시간");
const participantIdentities = async (summoner_getGameId, searchedName) => {
    try {
        
        var participantList = {}; //게임정보 다 들어가 있음
        const searchedName_eachGame_number = []; //검색된 소환사의 각 게임당 위치를 저장
        const MatchDto = [];
        var team_number = []; //검색된 소환사가 어느 팀이였는지 구별해주는 변수
        var game_of_times = process.env.GAME_TIMES; //게임 횟수
        var my_champKey = [];//챔피언 키
        var champ_list= [];//챔피언에 대한 리스트
        var item_url = [];
        var champion_img_url = [];
        
        for (i = 0; i < game_of_times; i++) { //최근 N개의 게임만을 나타내기 위함
            MatchDto[i] = await matchDto(summoner_getGameId[i]);//최근 N게임의 gameid를 가지고있음
        }
        //검색된 소환사의 게임당 순번 및 팀
       
        var count =0;
        for (k = 0; k < game_of_times; k++) {
            participantList[k] = [];
            for (i = 0; i < MatchDto[k].data.participantIdentities.length; i++) {
                participantList[k].push(MatchDto[k].data.participantIdentities[i].player.summonerName);
                if (MatchDto[k].data.participantIdentities[i].player.summonerName === searchedName) {
                    searchedName_eachGame_number[k] = i; //검색된 소환사의 이름의 순번. index이므로 0부터 시작
                    count++;
                }
                if(count===11)break;
            }
            if (searchedName_eachGame_number[k] < 5) {//id가 5 미만은 blue팀
                team_number[k] = 0;
            } else {//id가 5이상은 purple팀
                team_number[k] = 1;
            }
        }
   
        //챔피언 사진 이름 관련 
        //검색된 소환사가 한 각 챔피언들의 key값을 받아냄. 내가 플레이한 사진만
        //검색된 소환사의 다른 소환사들 사진 
        var other_summoner_champKey = [];
        var other_summoner_champ_list = [];
        var other_summoner_champ_url = [];
        for(var i = 0; i<game_of_times;i++){
            my_champKey.push(MatchDto[i].data.participants[searchedName_eachGame_number[i]].championId);
            other_summoner_champKey[i] = [];
            for(k=0;k<10;k++){
                other_summoner_champKey[i].push(MatchDto[i].data.participants[k].championId);
            }
        }
        other_summoner_champ_list = await champDataDragon(other_summoner_champKey,my_champKey);
        
        //내가 플레이한 챔피언 사진
        //같이 플레이한 소환사들의 챔피언 사진
        for(var i=0;i<game_of_times;i++){
            champ_list[i] = `http://ddragon.leagueoflegends.com/cdn/${process.env.CHAMP_VERSION}/img/champion/${other_summoner_champ_list.my_champ_id[i]}.png`;
            champion_img_url.push(champ_list[i]);
            other_summoner_champ_url[i] = [];
            for(var k=0;k<10;k++){
                other_summoner_champ_url[i].push(`http://ddragon.leagueoflegends.com/cdn/${process.env.CHAMP_VERSION}/img/champion/${other_summoner_champ_list.champ_id[i][k]}.png`);
            }
        }
        //##챔피언 사진 이름 관련 
        //아이템 관련
        for(k=0;k < searchedName_eachGame_number.length; k++){
            var participants = MatchDto[k].data.participants[searchedName_eachGame_number[k]];
            var stats = participants.stats;
            var item = {
                version : `${process.env.ITEM_VERSION}`,
                items : [stats.item0,stats.item1,stats.item2,stats.item3,stats.item4,stats.item5,stats.item6]
            };
            item_url[k] = [];
            for(i= 0 ;i<7;i++){
                if(item.items[i]==0){
                    item_url[k].push("/images/gray-background.jpg");
                 }else{
                    item_url[k].push(`http://ddragon.leagueoflegends.com/cdn/${item.version}/img/item/${item.items[i]}.png`);
                 }
            }
        }
        //##아이템 관련
        //소환사 스펠 관련
        var spell=[];
        var spell_list = {};
        var spell1=[];
        var spell2=[];
        for(i=0;i < searchedName_eachGame_number.length; i++){
            var participants = MatchDto[i].data.participants[searchedName_eachGame_number[i]];
            spell[i] = {
                spell1 : participants.spell1Id,
                spell2 : participants.spell2Id,
            }
        }
        spell_list = await spellDataDragon(spell);
        
        //##소환사 스펠 관련
        for(i=0;i<process.env.GAME_TIMES;i++){
             spell1.push(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_list.spell1[i]}.png`);
             spell2.push(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/img/spell/${spell_list.spell2[i]}.png`);
        }
        const spell_result={
            spell1 : spell1,
            spell2 : spell2,
        }
      
        //최종적으로 pug에 렌더링 해줄 것들
        var team_number_count = 0;
        for (i = 0; i < process.env.GAME_TIMES; i++) {
            var participants = MatchDto[i].data.participants[searchedName_eachGame_number[i]];//검색된 소환사의 게임에서의 번호
            var stats = participants.stats;
            var kill = stats.kills, death = stats.deaths, assist = stats.assists,kda =(kill+assist)/death;
            var total_cs = stats.totalMinionsKilled + stats.neutralMinionsKilled;
            var level = stats.champLevel;
           
            kda = (Math.round(kda * 100) / 100).toFixed(2);
            if(kda === 'Infinity'){
                kda= "Perfect";
            }
           
            participantList[game_of_times] = {
                gameTime: Math.round(MatchDto[i].data.gameDuration / 60),
                gameWinFail: MatchDto[i].data.teams[team_number[team_number_count]].win, //이거 어느 팀이냐에 따라 다르게 나와야함
                championId: participants.championId,
                kills: kill,
                deaths: death,
                assists: assist,
                kda : kda,
                champ_name : other_summoner_champ_list.my_champ_name,
                champ_img : champion_img_url,
                total_cs : total_cs,
                level : level,
                item : item_url[i],
                spell1 : spell_result.spell1[i],
                spell2 : spell_result.spell2[i],
                otherChamps : other_summoner_champ_url[i],
            }
            game_of_times++;
            team_number_count++;
        }
    
        return participantList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = participantIdentities;