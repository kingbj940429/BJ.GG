var champDataDragon = require('../../axios/champDataDragon');
// [
//     [
//       202, 517, 16, 238,
//       157, 111, 67,  24,
//        56,  54
//     ],
//     [
//       76,  51, 157, 111,  2,
//       58, 238, 875,  81, 60
//     ],
const Champion_Data_Dragon = async (champKey, my_champKey)=>{
    try {
        const champ_Data_Dragon = await champDataDragon();
        const champs = champ_Data_Dragon.data.data;
        var champ_name = [];
        var champ_id = [];
        var champKey_count = process.env.GAME_TIMES;
        var my_champ_id = [];
        var my_champ_name = [];
        for(i=0;i< champKey_count;i++){
            champ_name[i]=[];
            champ_id[i]=[];
            for(j=0;j<champKey_count;j++){
                for (let champ of Object.values(champs)) {
                    if(parseInt(champ.key) === champKey[i][j]){
                        champ_name[i].push(champ.name);
                        champ_id[i].push(champ.id);
                    }
                }
            }
        }

        for(i=0;i<champKey_count;i++){
            for (let champ of Object.values(champs)) {
                if(parseInt(champ.key) === my_champKey[i]){
                    my_champ_id.push(champ.id);
                    my_champ_name.push(champ.name);
                }
            }
        }
       

        const champion_data = {
            champ_name : champ_name,
            champ_id : champ_id,
            my_champ_id : my_champ_id,
            my_champ_name : my_champ_name,
        }

        return champion_data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = Champion_Data_Dragon;