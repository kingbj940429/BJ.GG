const dbPool = require('../../config/config')
const {getGameId} = require('../common/getGameId');
const allSummonersPerGame = require('./func/allSummonersPerGame');
const league = require('../../axios/League');

const summonerList = async (req, res) => {
    var gameId = await getGameId(req, res);
    //const participantList = await matchDto_JS(summoner_getGameId, searchedName);
    return gameId;
}

const detailGame = async (game_id, summonerName) => {
    const gameId = [];
    const game_number = 1;
    var leagueList = [];
    gameId.push(game_id);
    const result =  await allSummonersPerGame(gameId, summonerName, game_number);
    //const leagueList = await league(test);
    
    // for(var index in result){
    //     var temp = result[index].summonerId
    //     leagueList.push(await league(temp));
    // }
    // result.push(leagueList);
    
    return result;
}

const leagueDao = async (result) => {
    var leagueList = [];
    for(var index in result){
        var temp = result[index].summonerId
        leagueList.push(await league(temp));
    }
    
    return leagueList;
}

const summonerDaoDelete = async (req, res) => {

}
module.exports = {
    summonerList,
    detailGame,
    leagueDao,
}