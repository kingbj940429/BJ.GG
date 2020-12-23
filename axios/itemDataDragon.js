// //DataDragon을 통한 아이템 정보
// const axios = require('axios');
// const dbPool = require('../config/config');

// const itemDataDragon = async(para)=>{
//     try {
//         result = []
      
       
//         var item_List = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.ITEM_VERSION}/data/ko_KR/item.json`);
//         const keys = item_List.data.data;


//         for (var i = 0;i<7;i++){
//             arr=[]
//             for (let key of Object.keys(keys)) {
//                 var values = keys[key];
//                 if(para.items[i] === 0 ){
//                     result.push({name : "아이템 없음", description: "", gold : ""})
//                     break;
//                 }
//                 else if(String(para.items[i])===key){
//                     values.name= values.name.replace(`${values.name}`, `${values.name}`)
//                     values.description = values.description.replace(/<(\/br|br)([^>]*)>/gi,"\r\n");
//                     values.description = values.description.replace(/<(\/stat|stat)([^>]*)>/gi,"");
//                     values.description = values.description.replace(/<(\/unique|unique)([^>]*)>/gi,"\n");
//                     values.description = values.description.replace(/<(\/active|active)([^>]*)>/gi,"\n");
//                     values.description = values.description.replace(/(<([^>]+)>)/ig,"");
//                     //values.gold.total = values.gold.total.replace(`${values.gold.total}`,`\n가격 : ${values.gold.total}`);
//                     result.push({name : values.name, description: values.description, gold : `\n\n 가격 : ${values.gold.total}`})
//                     //newText = oriText.replace(/<(\/span|span)([^>]*)>/gi,"");
//                     //result.push({name : values.name, description: values.description})
//                 }
//               }
//         }
        
        
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// }

// module.exports = itemDataDragon;