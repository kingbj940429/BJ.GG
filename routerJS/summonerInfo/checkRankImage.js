// summonername: summoner.data[0].summonerName,
// queueType: summoner.data[0].queueType,
// tier: summoner.data[0].tier,
// leaguePoints: summoner.data[0].leaguePoints,
// wins: summoner.data[0].wins,
// losses: summoner.data[0].losses,
const Check_Rank_Image =  (summoner)=>{
    var tier = summoner.data[0].tier;
    const tier_img_src = `/images/ranked_emblems/${tier}.png`;
    console.log(tier_img_src);
    return summoner;
}

module.exports =  Check_Rank_Image;