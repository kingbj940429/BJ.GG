//DataDragon을 통한 챔프 정보
const axios = require('axios');
const fs = require('fs');

const champDataDragon = async () => {
  try {
    var champion_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.CHAMP_VERSION}/data/ko_KR/champion.json`);
    
    return champion_List;
  } catch (error) {
    console.error(error);
  }
};

module.exports = champDataDragon;