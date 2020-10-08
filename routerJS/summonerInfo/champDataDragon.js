var champDataDragon = require('../../axios/champDataDragon');

const Champion_Data_Dragon = async (champKey, my_champKey)=>{
    try {
        const champ_Data_Dragon = await champDataDragon();
        const champs = champ_Data_Dragon.data.data;
        var count;
        var champ_id = [];
        var my_champ_id = [];
        var my_champ_name = [];

        for(i=0;i< process.env.GAME_TIMES;i++){
            champ_id[i]=[];
            count=0;
            for(j=0;j<process.env.GAME_TIMES;j++){
                for (let champ of Object.values(champs)) {
                    if(parseInt(champ.key) === champKey[i][j]){
                        champ_id[i].push(champ.id);
                        count++;
                    }
                    if(parseInt(champ.key) === my_champKey[i]){
                        my_champ_id.push(champ.id);
                        my_champ_name.push(champ.name);
                        count++;
                    }
                    if(count==20)break;
                }
            }
        }

        const champion_data = {
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