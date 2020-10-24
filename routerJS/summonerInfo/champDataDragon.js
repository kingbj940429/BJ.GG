var champDataDragon = require('../../axios/champDataDragon');

const Champion_Data_Dragon = async (champKey, my_champKey)=>{
    try {
        const champ_Data_Dragon = await champDataDragon();
        const champs = champ_Data_Dragon.data.data;
        var count;
        var champ_id = [];
        var champ_name = [];
        var my_champ_id = [];
        var my_champ_name = [];

        for(i=0;i< process.env.GAME_TIMES;i++){
            champ_id[i]=[];
            champ_name[i]=[];
            count=0;
            for(j=0;j<10;j++){//소환사가 총 10명이여서 10
                for (let champ of Object.values(champs)) {
                   
                    if(parseInt(champ.key) === champKey[i][j]){
                        champ_id[i].push(champ.id);
                        champ_name[i].push(champ.name);
                        count++;
                    }
                    if(count==10)break;
                }
            }
        }

        for(i=0;i<process.env.GAME_TIMES;i++){
            count=0;
            for (let champ of Object.values(champs)) {
                if(parseInt(champ.key) === my_champKey[i]){
                    my_champ_id.push(champ.id);
                    my_champ_name.push(champ.name);
                    count++;
                }
                if(count==10)break;
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