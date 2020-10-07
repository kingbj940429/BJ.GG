var spellDataDragon = require('../../axios/spellDataDragon');

const Spell_Data_Dragon = async (spellKey)=>{
    try {
        const spell_Data_Dragon = await spellDataDragon();
        const spells = spell_Data_Dragon.data.data;
        var spell1;
        var spell2;
        var spellKey_count = process.env.GAME_TIMES;

        for(i=0;i< spellKey_count;i++){
            for (let spell of Object.values(spells)) {
                if(parseInt(spell.key) === spellKey.spell1){
                    spell1 = spell.id;
                }
                if(parseInt(spell.key) === spellKey.spell2){
                    spell2 = spell.id;
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