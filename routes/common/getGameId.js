const getSummonerInfo = require('../../axios/summonerInfo');
const getSummonerId = require('../../axios/summonerId');
const getGameIdAxios = require('../../axios/getGameId');
const champMastery = require('../../axios/champMatsery.js');


const getGameId = async (req, res) => {
    var add_game_count=0;
    const searchedName = req.query.summonerName
    const searchedSummonerId = await getSummonerId(searchedName); //쿼리스트링의 이름을 axios.getSummonerId에 넣어서 값 받기 AccountId : searchedSummonerId.data.accountId
    const summoner = await getSummonerInfo(searchedSummonerId.id); //소환사 기본 정보 콜백함수
    const champ_mastery = await champMastery(searchedSummonerId.id);
    const summoner_getGameId = await getGameIdAxios(searchedSummonerId.accountId, add_game_count); //gameId : summoner_getGameId.data.matches[0].gameId
    
    return summoner_getGameId;
}

module.exports = {
    getGameId
}