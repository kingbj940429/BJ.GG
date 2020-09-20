var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');
var getGameId = require('../axios/getGameId');
var matchDto = require('../axios/matchDto');

var test = require('../routerJS/test.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
    
    const getSummoner_information = async () => {
        try {
            const searchedName = req.query.summonerName;//소환사 이름 ex) 여의도 한량이

            const searchedSummonerId = await getSummonerId(searchedName);//쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기 AccountId : searchedSummonerId.data.accountId
        
            const summoner_getGameId = await getGameId(searchedSummonerId.data.accountId); //gameId : summoner_getGameId.data.matches[0].gameId
           
            test(searchedName);
           
            const MatchDto = await matchDto(summoner_getGameId.data.matches[0].gameId);
              
            console.log(MatchDto.data.teams[0].win);
            
            //summonerName : MatchDto.data.participantIdentities[0].player.summonerName
            
            const summoner = await getSummonerInfo(searchedSummonerId.data.id);//소환사 기본 정보 콜백함수
                res.render('summonerInfo.pug', 
                {
                    summonername: summoner.data[0].summonerName,
                    queueType: summoner.data[0].queueType,
                    tier: summoner.data[0].tier,
                    leaguePoints: summoner.data[0].leaguePoints,
                    wins: summoner.data[0].wins,
                    losses: summoner.data[0].losses,
                    participantIdentities01 : MatchDto.data.participantIdentities[0].player.summonerName,//생으로 코딩하기 싫은데..
                    participantIdentities02 : MatchDto.data.participantIdentities[1].player.summonerName,
                    participantIdentities03 : MatchDto.data.participantIdentities[2].player.summonerName,
                    participantIdentities04 : MatchDto.data.participantIdentities[3].player.summonerName,
                    participantIdentities05 : MatchDto.data.participantIdentities[4].player.summonerName,
                    participantIdentities06 : MatchDto.data.participantIdentities[5].player.summonerName,
                    participantIdentities07 : MatchDto.data.participantIdentities[6].player.summonerName,
                    participantIdentities08 : MatchDto.data.participantIdentities[7].player.summonerName,
                    participantIdentities09 : MatchDto.data.participantIdentities[8].player.summonerName,
                    participantIdentities10 : MatchDto.data.participantIdentities[9].player.summonerName

                });
            
        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

module.exports = router;
