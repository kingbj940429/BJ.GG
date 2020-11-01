var add_others = (submit_number) => {
    $('.loading').css('display','')

    $.ajax({
        type: 'POST',
        url: `/summonerInfo/otherSummonerInfo`,
        data: {
            gameId: $(`.other_summoner_btn${submit_number} button`).val(),
            summoner_query: $('.summoner_query').val(),
        },
        success: function (res) {
            
            alert("요청 성공");
            $('.loading').css('display','none');
        },error:function(err){
            alert("요청 실패");
            $('.loading').css('display','none');
        }
    })
    
    //})
}

