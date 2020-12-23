// const axios = require('axios');
// var champDataDragon = require('./champDataDragon');

// const champMastery = async (searchedSummonerId) => {
//   try {
//     var result = await axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${searchedSummonerId}?api_key=${process.env.API_KEY}`);

//     list = [];
//     var mastery_champ_name =[];
//     for (var i = 0; i < process.env.MASTERY_TIMES; i++) {
//       list.push(result.data[i]);
//     }
    
//     const champ_Data_Dragon = await champDataDragon();
//     const champs = champ_Data_Dragon;
    
//     for (i = 0; i < process.env.MASTERY_TIMES; i++) {
//       count = 0;
//       for (let champ of Object.values(champs)) {
//         if (parseInt(champ.key) === list[i].championId) {
//           mastery_champ_name.push({
//             championName: champ.name,
//             championId: champ.id,
//             championLevel: list[i].championLevel,
//             championPoints: list[i].championPoints,
//             championImg : `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`
//           });
//           count++;
//         }
//         if (count == process.env.MASTERY_TIMES) break;
//       }
//     }
    
//     return mastery_champ_name;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = champMastery;