const summonerDao = require('./summonerDao');
const participantIdentities = require('../common/matchDto');

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

    return result;
}

const summonerServiceUpdate = async (req, res) =>{

}

const summonerServiceDelete = async (req, res) =>{

}

module.exports = {
    summonerList,
    detailGame,
}