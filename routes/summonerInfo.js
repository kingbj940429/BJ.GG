const express = require('express');
const router = express.Router();
const getSummonerInfo = require('../axios/summonerInfo');
const getSummonerId = require('../axios/summonerId');
const getGameId = require('../axios/getGameId');
const champMastery = require('../axios/champMatsery.js');

const matchDto_JS = require('../routerJS/summonerInfo/matchDto.js');
const otherSummoner = require('../routerJS/summonerInfo/otherSummoner.js');

const dbPool = require('../config/config.js') //DB 연동


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
           
            const summoner = await getSummonerInfo(searchedSummonerId.id); //소환사 기본 정보 콜백함수
            
            const champ_mastery = await champMastery(searchedSummonerId.id);
            
            summoner_getGameId = await getGameId(searchedSummonerId.accountId, add_game_count); //gameId : summoner_getGameId.data.matches[0].gameId
            
            const participantList = await matchDto_JS(summoner_getGameId, searchedName);
            
            res.render('summonerInfo.pug', {
                champ_mastery : champ_mastery,
                summonerLevel :searchedSummonerId.summonerLevel,
                profileIconId : searchedSummonerId.profileIconId,
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
        
            summoner_getGameId = await getGameId(searchedSummonerId.accountId, add_game_count);
            const participantList = await matchDto_JS(summoner_getGameId, searchedName);
           
            res.json({
                participantList: participantList,
            })

        } catch (error) {
            console.log(error);
        }
    };

    getSummoner_information();
});

router.post('/otherSummonerInfo', function(req, res, next){
    const otherSummonerInfo = async () => {

        try {
            console.log(req.body);
            const participantList = await otherSummoner(req.body.gameId, req.body.summoner_query);
        
            res.json({
                test: "test",
            })

        } catch (error) {
            console.log(error);
        }
    };

    otherSummonerInfo();
})

module.exports = router;
