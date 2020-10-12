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
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_champ_name`).text(`${res.participantList[i+3].champ_name[i]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell01 img`).attr("src", `${res.participantList[i+3].spell.spell1}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell02 img`).attr("src", `${res.participantList[i+3].spell.spell2}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_kda`).text(`${res.participantList[i+3].kills} / ${res.participantList[i+3].deaths} / ${res.participantList[i+3].assists}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_average`).text(`${res.participantList[i+3].kda}:1 평점`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_level`).text(`${res.participantList[i+3].level} 레벨`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_CS`).text(`${res.participantList[i+3].total_cs} CS`);

                //아이템
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item0 img`).attr("src",`${res.participantList[i+3].item[0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item1 img`).attr("src",`${res.participantList[i+3].item[1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item2 img`).attr("src",`${res.participantList[i+3].item[2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item3 img`).attr("src",`${res.participantList[i+3].item[3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item4 img`).attr("src",`${res.participantList[i+3].item[4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item5 img`).attr("src",`${res.participantList[i+3].item[5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item6 img`).attr("src",`${res.participantList[i+3].item[6]}`);
               
                //소환사들 이름
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name0`).text(`${res.participantList[i][0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name1`).text(`${res.participantList[i][1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name2`).text(`${res.participantList[i][2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name3`).text(`${res.participantList[i][3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name4`).text(`${res.participantList[i][4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name5`).text(`${res.participantList[i][5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name6`).text(`${res.participantList[i][6]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name7`).text(`${res.participantList[i][7]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name8`).text(`${res.participantList[i][8]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name9`).text(`${res.participantList[i][9]}`);
                //소환사들 사진
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img0 img`).attr("src",`${res.participantList[i+3].otherChamps[0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img1 img`).attr("src",`${res.participantList[i+3].otherChamps[1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img2 img`).attr("src",`${res.participantList[i+3].otherChamps[2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img3 img`).attr("src",`${res.participantList[i+3].otherChamps[3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img4 img`).attr("src",`${res.participantList[i+3].otherChamps[4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img5 img`).attr("src",`${res.participantList[i+3].otherChamps[5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img6 img`).attr("src",`${res.participantList[i+3].otherChamps[6]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img7 img`).attr("src",`${res.participantList[i+3].otherChamps[7]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img8 img`).attr("src",`${res.participantList[i+3].otherChamps[8]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img9 img`).attr("src",`${res.participantList[i+3].otherChamps[9]}`);
              
                
                //승패에 따른 색깔 구분
                if ($(`.gameRecord_add_con${submit_number} .win_fail_check${i}`).text() === 'Fail') {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i}`).css("background-color", "#ef9a9a ");
                } else {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i}`).css("background-color", "#90caf9");
                }
            }

            alert("불러오기 성공");
        },error:function(err){
            alert("불러올 데이터가 없습니다.");
        }
    })
    
    //})
}