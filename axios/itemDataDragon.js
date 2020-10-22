//DataDragon을 통한 아이템 정보
const axios = require('axios');

const itemDataDragon = async(para)=>{
    try {
        result = []
      
        console.log(para.items);
        var item_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.ITEM_VERSION}/data/ko_KR/item.json`);
        const keys = item_List.data.data;
        
        for (var i = 0;i<7;i++){
            arr=[]
            for (let key of Object.keys(keys)) {
                var values = keys[key];
                if(para.items[i] === 0 ){
                    result.push({name : "아이템 없음", description: ""})
                    break;
                }
                else if(String(para.items[i])===key){
                    result.push({name : values.name, description: values.description})
                }
              }
        }
  
        
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = itemDataDragon;