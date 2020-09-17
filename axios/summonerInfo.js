const axios = require('axios');

const getSummonerInfo = async (searchedSummonerId) => {
  try {//encodeURI(searchedSummonerId)
    var result = await axios.get('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/' + searchedSummonerId + '?api_key=' + process.env.API_KEY);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getSummonerInfo;