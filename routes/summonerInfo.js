var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');
var getGameId = require('../axios/getGameId');

//var champDataDragon = require('../routerJS/champDataDragon.js');
var matchDto_JS = require('../routerJS/matchDto.js');
/* GET users listing. */
router.get('/', function (req, res, next) {

    const getSummoner_information = async () => {
        try {
            const searchedName = req.query.summonerName; //소환사 이름 ex) 여의도 한량이

            const searchedSummonerId = await getSummonerId(searchedName); //쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기 AccountId : searchedSummonerId.data.accountId

            const summoner = await getSummonerInfo(searchedSummonerId.data.id); //소환사 기본 정보 콜백함수

        
            const summoner_getGameId = await getGameId(searchedSummonerId.data.accountId); //gameId : summoner_getGameId.data.matches[0].gameId
           
            const participantList = await matchDto_JS(summoner_getGameId, searchedName); //소환사 10명 모두 가져옴

            res.render('summonerInfo.pug', {
                summonername: summoner.data[0].summonerName,
                queueType: summoner.data[0].queueType,
                tier: summoner.data[0].tier,
                leaguePoints: summoner.data[0].leaguePoints,
                wins: summoner.data[0].wins,
                losses: summoner.data[0].losses,
                result: participantList,
            });
        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

module.exports = router;
