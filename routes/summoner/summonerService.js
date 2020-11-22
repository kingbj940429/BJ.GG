const summonerDao = require('./summonerDao');
const participantIdentities = require('../common/matchDto');

const summonerList = async (req, res) =>{
    const gameId = await summonerDao.summonerList(req, res);
    const result =  await participantIdentities(gameId, req.query.summonerName);
    
    return result;
}

const summonerServiceInsert = async (req, res) =>{

}

const summonerServiceUpdate = async (req, res) =>{

}

const summonerServiceDelete = async (req, res) =>{

}

module.exports = {
    summonerList
}