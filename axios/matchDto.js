//소환사의 이름을 검색했을 때 summonerId를 가져와 줍니다.
const axios = require('axios');

const matchDto = async (gameId) => {
  try {
    var result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${process.env.API_KEY}`);
    result = result.data;
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = matchDto;