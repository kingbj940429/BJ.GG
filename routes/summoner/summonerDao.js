const dbPool = require('../../config/config')
const {getGameId} = require('../common/getGameId');
const allSummonersPerGame = require('./func/allSummonersPerGame');

const summonerList = async (req, res) => {
    var gameId = await getGameId(req, res);
    //const participantList = await matchDto_JS(summoner_getGameId, searchedName);
    return gameId;
}

const detailGame = async (game_id, summonerName) => {
    const gameId = [];
    const game_number = 1;
    gameId.push(game_id);
    const result =  await allSummonersPerGame(gameId, summonerName, game_number);
    console.log(result);
    console.log(result[0].items);
    return result;
}

const summonerDaoUpdate = async (req, res) => {

}

const summonerDaoDelete = async (req, res) => {

}
module.exports = {
    summonerList,
    detailGame,
}