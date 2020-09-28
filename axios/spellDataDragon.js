//DataDragon을 통한 스펠 정보
const axios = require('axios');

const spellDataDragon = async () => {
  try {
    var champion_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.SPELL_VERSION}/data/ko_KR/summoner.json`);
    return champion_List;
  } catch (error) {
    console.error(error);
  }
};

module.exports = spellDataDragon;