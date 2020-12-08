var express = require('express');
var router = express.Router();
const summonerService = require('./summonerService');

/* GET home page. */
// router.get('/', function (req, res, next) {
//     const summonerName = req.query['summonerName'];

//     res.render('./summoner/summonerLayout', {
//         summonerName,
//     })
// });

router.get('/summonerList', async (req, res, next)=>{
    var result = await summonerService.summonerList(req, res);
    const total_game = process.env.TOTAL_GAME;
    const summonerName = req.query.summonerName;
    //console.log(result);
    //console.log(result[2].all_summoners);
    res.render('./summoner/summonerGameHistory', {
        result,
        total_game,
        summonerName,
    })
});

router.post('/summonerList/detailGame', async (req, res, next)=>{
    const result = await summonerService.detailGame(req, res);
    res.json({
        message : '성공',
        game_id,
        result,
    })
});

module.exports = router;
