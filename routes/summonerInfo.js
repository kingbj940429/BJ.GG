var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');
var getGameId = require('../axios/getGameId');
var matchDto = require('../axios/matchDto');

/* GET users listing. */
router.get('/', function (req, res, next) {
    
    const getSummoner_information = async () => {
        try {
            const searchedName = req.query.summonerName;//소환사 이름 ex) 여의도 한량이

            const searchedSummonerId = await getSummonerId(searchedName);//쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기
            //id : searchedSummonerId.data.id
            //AccountId : searchedSummonerId.data.accountId
            const summoner_getGameId = await getGameId(searchedSummonerId.data.accountId);
            //gameId : summoner_getGameId.data.matches[0].gameId
            
            const MatchDto = await matchDto(summoner_getGameId.data.matches[0].gameId);
            for(i=0;i<MatchDto.data.participantIdentities.length;i++){
                console.log(MatchDto.data.participantIdentities[i].player.summonerName);
            }
            //summonerName : MatchDto.data.participantIdentities[0].player.summonerName
            
            const summoner = await getSummonerInfo(searchedSummonerId.data.id);
                res.render('summonerInfo.pug', {
                    summonername: summoner.data[0].summonerName,
                    queueType: summoner.data[0].queueType,
                    tier: summoner.data[0].tier,
                    leaguePoints: summoner.data[0].leaguePoints,
                    wins: summoner.data[0].wins,
                    losses: summoner.data[0].losses,
                });
            
        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

module.exports = router;
