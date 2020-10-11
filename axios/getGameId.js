//소환사의 이름을 검색했을 때 summonerId를 가져와 줍니다.
const axios = require('axios');

const getGameId = async (accountId, add_game_count) => {
  try {
    var result = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${process.env.API_KEY}`);
    var game_id=[];

    for(var i=0 + add_game_count;i< process.env.GAME_TIMES + add_game_count;i++){
      game_id.push(result.data.matches[i].gameId);
    }

    return game_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGameId;