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
    console.log(result);
    console.log(result[2].all_summoners);
    res.render('./summoner/summonerGameHistory', {
        result,
    })
});

module.exports = router;
