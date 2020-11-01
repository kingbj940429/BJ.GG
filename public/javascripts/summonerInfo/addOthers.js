var add_others = (submit_number) => {
    $('.loading').css('display','')

    $.ajax({
        url: `/summonerInfo/add_summoner`,
        data: {
            summoner_query: $('.summoner_query').val(),
        },
        success: function (res) {
            const add_count = 3;
            console.log(res);

        },error:function(err){
            alert("요청 실패");
        }
    })
    
    //})
}