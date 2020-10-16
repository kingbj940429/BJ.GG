//소환사의 이름을 검색했을 때 summonerId를 가져와 줍니다.
const axios = require('axios');

const getSummonerId = async (searchedName) => {
  try {
    var result = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(searchedName)}?api_key=${process.env.API_KEY}`);
    result=result.data;
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getSummonerId;