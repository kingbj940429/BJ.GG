var express = require('express');
var router = express.Router();
var getSummonerInfo = require('../axios/summonerInfo');
var getSummonerId = require('../axios/summonerId');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const getSummoner = async () => {
        try {
            const searchedName = req.query.summonerName;

            const searchedSummonerId = await getSummonerId(searchedName);
           
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

    getSummoner();
});

module.exports = router;
