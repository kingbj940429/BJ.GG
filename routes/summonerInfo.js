var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');
var getGameId = require('../axios/getGameId');


var matchDto_JS = require('../routerJS/summonerInfo/matchDto.js');

/* GET users listing. */
router.get('/', function (req, res, next) {

    const getSummoner_information = async () => {
        try {
            const searchedName = req.query.summonerName; //소환사 이름 ex) 여의도 한량이
            console.time("getSummonerId");
            const searchedSummonerId = await getSummonerId(searchedName); //쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기 AccountId : searchedSummonerId.data.accountId
            console.timeEnd("getSummonerId");
            console.time("getSummonerInfo");
            var summoner = await getSummonerInfo(searchedSummonerId.data.id); //소환사 기본 정보 콜백함수
            console.timeEnd("getSummonerInfo");
            const summoner_getGameId = await getGameId(searchedSummonerId.data.accountId); //gameId : summoner_getGameId.data.matches[0].gameId
           
            const participantList = await matchDto_JS(summoner_getGameId, searchedName); //소환사 10명 모두 가져옴
            // line 23이 오래걸림
            res.render('summonerInfo.pug', {
                summoner: summoner,
                result: participantList,
            });
           
        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

module.exports = router;
