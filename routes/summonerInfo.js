var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');
var getGameId = require('../axios/getGameId');

var matchDto_JS = require('../routerJS/summonerInfo/matchDto.js');

var searchedName;
var summoner_getGameId;
var add_game_count;
var searchedSummonerId;
/* GET users listing. */
router.get('/', function (req, res, next) {

    const getSummoner_information = async () => {
        try {
            add_game_count=0;
            searchedName = req.query.summonerName; //소환사 이름 ex) 여의도 한량이

            searchedSummonerId = await getSummonerId(searchedName); //쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기 AccountId : searchedSummonerId.data.accountId
            
            var summoner = await getSummonerInfo(searchedSummonerId.data.id); //소환사 기본 정보 콜백함수
      
            summoner_getGameId = await getGameId(searchedSummonerId.data.accountId, add_game_count); //gameId : summoner_getGameId.data.matches[0].gameId
           
            const participantList = await matchDto_JS(summoner_getGameId, searchedName);
           
            res.render('summonerInfo.pug', {
                summoner_query: searchedName,
                summoner: summoner,
                result: participantList,
            });

        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

router.get('/add_summoner', function (req, res, next) {
    const getSummoner_information = async () => {

        try {
            add_game_count+=3;
            summoner_getGameId = await getGameId(searchedSummonerId.data.accountId, add_game_count);
            const participantList = await matchDto_JS(summoner_getGameId, searchedName);
            console.log(add_game_count);
           
            res.json({
                participantList: participantList,
            })

        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

module.exports = router;
