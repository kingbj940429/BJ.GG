const axios = require('axios');

const getSummonerInfo = async (searchedSummonerId) => {
  try {//encodeURI(searchedSummonerId)
    var result = await axios.get('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/' + searchedSummonerId + '?api_key=' + process.env.API_KEY);
    if(result.data[1] == undefined){
      result.data[1] = {
        tier : "Unranked",
        leaguePoints : "-",
        wins : "-",
        losses : "-",
      }
    }
      result.data[0].queueType = "솔로랭크";
      result.data[1].queueType = "자유 5:5 랭크";
      
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getSummonerInfo;