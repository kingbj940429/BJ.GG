const axios = require('axios');

const League = async (encryptedSummonerId) => {
  try {
    var LeagueList = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${process.env.API_KEY}`);
    LeagueList = LeagueList.data;
    
    return LeagueList;
  } catch (error) {
    console.error(error);
  }
};

module.exports = League;


// [
//   {
//       "leagueId": "",
//       "queueType": "RANKED_FLEX_SR",
//       "tier": "PLATINUM",
//       "rank": "IV",
//       "summonerId": "",
//       "summonerName": "엔마왓슨",
//       "leaguePoints": 47,
//       "wins": 32,
//       "losses": 22,
//       "veteran": false,
//       "inactive": false,
//       "freshBlood": false,
//       "hotStreak": false
//   },
//   {
//       "leagueId": "",
//       "queueType": "RANKED_SOLO_5x5",
//       "tier": "MASTER",
//       "rank": "I",
//       "summonerId": "",
//       "summonerName": "엔마왓슨",
//       "leaguePoints": 0,
//       "wins": 425,
//       "losses": 406,
//       "veteran": false,
//       "inactive": false,
//       "freshBlood": false,
//       "hotStreak": false
//   }
// ]