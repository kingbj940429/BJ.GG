var champDataDragon = require('../axios/champDataDragon');

const Champion_Data_Dragon = async (champKey)=>{
    try {
        const champ_Data_Dragon = await champDataDragon();
        const champs = champ_Data_Dragon.data.data;
        const champ_name = [];
        const champ_id = [];
        var champKey_count = process.env.GAME_TIMES;

        for(i=0;i< champKey_count;i++){
            for (let champ of Object.values(champs)) {
                if(parseInt(champ.key) === champKey[i]){
                    champ_name.push(champ.name);
                    champ_id.push(champ.id);
                }
            }
        }
        
        const champion_data = {
            champ_name : champ_name,
            champ_id : champ_id,
        }

        return champion_data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = Champion_Data_Dragon;