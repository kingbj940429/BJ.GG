const dbPool = require('../../config/config')
//const matchDto_JS = require('../routerJS/summonerInfo/matchDto.js');
const {getGameId} = require('../common/getGameId');

const summonerList = async (req, res) => {
    var gameId = await getGameId(req, res);
    //const participantList = await matchDto_JS(summoner_getGameId, searchedName);
    return gameId;
}

const summonerDaoInsert = async (req, res) => {

}

const summonerDaoUpdate = async (req, res) => {

}

const summonerDaoDelete = async (req, res) => {

}
module.exports = {
    summonerList,
}