var champDataDragon = require('../axios/champDataDragon');

const Champion_Data_Dragon = async (champKey)=>{
    try {
        const champ_Data_Dragon = await champDataDragon();
        const champs = champ_Data_Dragon.data.data;
        const champ_name = [];
        var champKey_count = 5;

        for(i=0;i< champKey_count;i++){
            for (let champ of Object.values(champs)) {
                if(parseInt(champ.key) === champKey[i]){
                    champ_name.push(champ.name);
                }
            }
        }
        
        return champ_name;
    } catch (error) {
        console.error(error);
    }
}

module.exports = Champion_Data_Dragon;