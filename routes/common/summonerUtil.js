/**
 * 소환사에 대한 정보를 가져오는 유틸리티
 */
const getSummonerId = require('../../axios/summonerId');


function summonerUtil(){
    this.summonerName = null;
}

summonerUtil.prototype = {
    init : function(){

    },

    getSummonerName : function(summonerName){
        this.summonerName = summonerName;
        return this.summonerName;
    },

    getSummonerAccount : function(){

    },

    getSummonerTiers : function(){
        //const searchedSummonerId = await getSummonerId(searchedName);
    },

    getSummonerChamp : function(){
        
    },

    getSummonerId : async function(summonerName){
        const summonerId = await getSummonerId(summonerName);
        return summonerId;
    }
}

module.exports = summonerUtil;