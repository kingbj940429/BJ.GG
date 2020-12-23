const summonerDao = require('./summonerDao');
const participantIdentities = require('../common/matchDto');
const summonerUtil = require('../common/summonerUtil');

const summonerList = async (req, res) =>{
    const game_number = process.env.GAME_TIMES;
    const gameId = await summonerDao.summonerList(req, res);// get gameId
    const result =  await participantIdentities(gameId, req.query.summonerName, game_number);
    
    return result;
}

const detailGame = async (req, res) =>{
    const gameId = req.body.game_id;
    const summonerName = req.body.summoner_name;
    const result = await summonerDao.detailGame(gameId, summonerName);
    
    var summonersName = [];

    var newSummUtil = new summonerUtil();
    
    /**
     * 각 정보가져오기
     */
    // for(var index in result){
    //     var temp = await newSummUtil.getSummonerId(result[index].summonerName);
    //     summonersName.push(temp);
    // }
    //console.log(summonersName);

    return result;
}

const league = async (detailGame) =>{
    var result = await summonerDao.leagueDao(detailGame);
    return result;
}

const summonerServiceDelete = async (req, res) =>{

}

module.exports = {
    summonerList,
    detailGame,
    league,
}