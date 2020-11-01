var add_others = (submit_number) => {
    $('.loading').css('display','')

    $.ajax({
        type: 'POST',
        url: `/summonerInfo/otherSummonerInfo`,
        data: {
            gameId: $(`.other_summoner_btn${submit_number} > button`).val(),
        },
        success: function (res) {
            console.log("요청 성공");
            const add_count = 3;
            console.log(res);
            $('.loading').css('display','none');
        },error:function(err){
            alert("요청 실패");
        }
    })
    
    //})
}

