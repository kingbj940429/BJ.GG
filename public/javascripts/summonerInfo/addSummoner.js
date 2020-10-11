var add_Summoner = (submit_number) => {

    //$('.game_form').submit((e) => {
    //    e.preventDefault();
    $.ajax({
        url: `/summonerInfo/add_summoner`,
        data: {
            summoner_query: $('.summoner_query').val(),
        },
        success: function (res) {
            const add_count = 3;
            console.log(res);

            //첫번째
            for (var i = 0; i < add_count; i++) {
                $(`.gameRecord_add_con${submit_number}`).append($(`.gameRecord_box${i}`).html());

                //값 대입
                $(`.gameRecord_add_con${submit_number} .win_fail_check${i}`).text(`${res.participantList[i+3].gameWinFail}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_info_time`).text(`${res.participantList[i+3].gameTime}분`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_champ_img img`).attr("src", `${res.participantList[i+3].champ_img[i]}`);


                //승패에 따른 색깔 구분
                if ($(`.gameRecord_add_con${submit_number} .win_fail_check${i}`).text() === 'Fail') {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i}`).css("background-color", "#ef9a9a ");
                } else {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i}`).css("background-color", "#90caf9");
                }
            }

            alert("ajax 성공");
        }
    })
    //})
}