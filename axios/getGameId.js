//소환사의 이름을 검색했을 때 summonerId를 가져와 줍니다.
const axios = require('axios');

const getGameId = async (accountId) => {
  try {
    var result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${process.env.API_KEY}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGameId;