//DataDragon을 통한 아이템 정보
const axios = require('axios');

const itemDataDragon = async()=>{
    try {
        var item_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.ITEM_VERSION}/data/ko_KR/item.json`);
        return item_List;
    } catch (error) {
        console.error(error);
    }
}

module.exports = itemDataDragon;