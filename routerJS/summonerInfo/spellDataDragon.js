var spellDataDragon = require('../../axios/spellDataDragon');

const Spell_Data_Dragon = async (spellKey)=>{
    try {
        
        const spell_Data_Dragon = await spellDataDragon();
        const spells = spell_Data_Dragon.data.data;
        var spell1=[];
        var spell2=[];

        for(i=0;i< process.env.GAME_TIMES;i++){
            for (let spell of Object.values(spells)) {
                if(parseInt(spell.key) === spellKey[i].spell1){
                    spell1.push({id : spell.id,name : spell.name, description : spell.description });
                }
                if(parseInt(spell.key) === spellKey[i].spell2){
                    spell2.push({id : spell.id,name : spell.name, description : spell.description });
                }
            }
        }
        
        const spell_data = {
            spell1 : spell1,
            spell2 : spell2,
        }
       
        return spell_data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = Spell_Data_Dragon;