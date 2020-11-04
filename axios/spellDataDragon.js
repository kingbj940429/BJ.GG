//DataDragon을 통한 스펠 정보
const axios = require('axios');
const dbPool = require('../config/config');

const spellDataDragon = async () => {
  try {
    var spell_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/data/ko_KR/summoner.json`);
  
    return spell_List;
  } catch (error) {
    console.error(error);
  }
};

module.exports = spellDataDragon;