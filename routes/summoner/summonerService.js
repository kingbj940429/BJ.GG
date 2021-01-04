const summonerDao = require('./summonerDao');
const participantIdentities = require('../common/matchDto');
const summonerUtil = require('../common/summonerUtil');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const summonerList = async (req, res) =>{
    const game_number = process.env.GAME_TIMES;
    const gameId = await summonerDao.summonerList(req, res);// get gameId
    const result =  await participantIdentities(gameId, req.query.summonerName, game_number);
    
    return result;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const detailGame = async (req, res) =>{
    const gameId = req.body.game_id;
    const summonerName = req.body.summoner_name;
    const result = await summonerDao.detailGame(gameId, summonerName);
    
    var summonersName = [];

    var newSummUtil = new summonerUtil();
    return result;
}

/**
 * 10명의 소환사 정보를 더 자세하게 가져옵니다.
 * @param {*} detailGame 
 */
const league = async (detailGame) =>{
    var result = await summonerDao.leagueDao(detailGame);

    //언랭에 대한 예외처리
    for(var index in result){
        if(result[index].length < 2){
            result[index][0] = {
                tier : 'Unranked',
                rank :  ''
            }
        }
    }
    return result;
}

const summonerServiceDelete = async (req, res) =>{

}

module.exports = {
    summonerList,
    detailGame,
    league,
}