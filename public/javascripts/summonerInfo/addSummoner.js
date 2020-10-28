var add_Summoner = (submit_number) => {
    $('.loading').css('display','')

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
                $(`.gameRecord_add_con${submit_number} .win_fail_check${i}`).text(`${res.participantList[i+3].gameWinFail_kor}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_info_gameTime`).text(`${res.participantList[i+3].game_date[i]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_info_gameTime`).attr('tooltip',`${res.participantList[i+3].game_date_tool}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_info_time`).text(`${res.participantList[i+3].gameTime}분`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_champ_img img`).attr("src", `${res.participantList[i+3].champ_img[i]}`);//(tooltip2=""+result[i+game_times].champ_title[i]  flow="up")
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_champ_top`).attr("tooltip2", `${res.participantList[i+3].champ_title[i]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_champ_name`).text(`${res.participantList[i+3].champ_name[i]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell01 img`).attr("src", `${res.participantList[i+3].spell1}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell01`).attr("tooltip", `${res.participantList[i+3].spell_list1.name}\n\n${res.participantList[i+3].spell_list1.description}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell02 img`).attr("src", `${res.participantList[i+3].spell2}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_spell02`).attr("tooltip", `${res.participantList[i+3].spell_list2.name}\n\n${res.participantList[i+3].spell_list2.description}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_perks_1 img`).attr("src", `${res.participantList[i+3].perk0}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_perks_2 img`).attr("src", `${res.participantList[i+3].perkSubStyle}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_kda`).text(`${res.participantList[i+3].kills} / ${res.participantList[i+3].deaths} / ${res.participantList[i+3].assists}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_average`).text(`${res.participantList[i+3].kda}:1 평점`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_totalDamage_bottom`).text(`${res.participantList[i+3].totalDamageDealtToChampions}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_level`).text(`${res.participantList[i+3].level} 레벨`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_CS`).text(`${res.participantList[i+3].total_cs} CS`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_goldEarned_under`).text(`${res.participantList[i+3].goldEarned} gold`);
                /**
                 * 아이템 result[i+game_times].item_list[i][0].description + "" + result[i+game_times].item_list[i][0].gold
                 */
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item0 img`).attr("src",`${res.participantList[i+3].item[0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item0`).attr("tooltip",`${res.participantList[i+3].item_list[i][0].name}\n\n${res.participantList[i+3].item_list[i][0].description}${res.participantList[i+3].item_list[i][0].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item0`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item1 img`).attr("src",`${res.participantList[i+3].item[1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item1`).attr("tooltip",`${res.participantList[i+3].item_list[i][1].name}\n\n${res.participantList[i+3].item_list[i][1].description}${res.participantList[i+3].item_list[i][1].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item1`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item2 img`).attr("src",`${res.participantList[i+3].item[2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item2`).attr("tooltip",`${res.participantList[i+3].item_list[i][2].name}\n\n${res.participantList[i+3].item_list[i][2].description}${res.participantList[i+3].item_list[i][2].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item2`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item3 img`).attr("src",`${res.participantList[i+3].item[3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item3`).attr("tooltip",`${res.participantList[i+3].item_list[i][3].name}\n\n${res.participantList[i+3].item_list[i][3].description}${res.participantList[i+3].item_list[i][3].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item3`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item4 img`).attr("src",`${res.participantList[i+3].item[4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item4`).attr("tooltip",`${res.participantList[i+3].item_list[i][4].name}\n\n${res.participantList[i+3].item_list[i][4].description}${res.participantList[i+3].item_list[i][4].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item4`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item5 img`).attr("src",`${res.participantList[i+3].item[5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item5`).attr("tooltip",`${res.participantList[i+3].item_list[i][5].name}\n\n${res.participantList[i+3].item_list[i][5].description}${res.participantList[i+3].item_list[i][5].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item5`).attr("flow",`up`);

                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item6 img`).attr("src",`${res.participantList[i+3].item[6]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item6`).attr("tooltip",`${res.participantList[i+3].item_list[i][6].name}\n\n${res.participantList[i+3].item_list[i][6].description}${res.participantList[i+3].item_list[i][6].gold}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .item6`).attr("flow",`up`);
               
                /**
                 * 소환사들 이름
                 */
                for(var k=0;k<10;k++){
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name${k}`).text(``);
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name${k}`).append(`<a>${res.participantList[i][k]}</a>`);
                    $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .gameRecord_row_name${k} a`).attr("href",`/summonerInfo?summonerName=${res.participantList[i][k]}`);
                }

                /**
                 * 소환사들 사진
                 */
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img0 img`).attr("src",`${res.participantList[i+3].otherChamps[0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img0`).attr("tooltip2",`${res.participantList[i+3].otherChampName[0]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img1 img`).attr("src",`${res.participantList[i+3].otherChamps[1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img1`).attr("tooltip2",`${res.participantList[i+3].otherChampName[1]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img2 img`).attr("src",`${res.participantList[i+3].otherChamps[2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img2`).attr("tooltip2",`${res.participantList[i+3].otherChampName[2]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img3 img`).attr("src",`${res.participantList[i+3].otherChamps[3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img3`).attr("tooltip2",`${res.participantList[i+3].otherChampName[3]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img4 img`).attr("src",`${res.participantList[i+3].otherChamps[4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img4`).attr("tooltip2",`${res.participantList[i+3].otherChampName[4]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img5 img`).attr("src",`${res.participantList[i+3].otherChamps[5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img5`).attr("tooltip2",`${res.participantList[i+3].otherChampName[5]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img6 img`).attr("src",`${res.participantList[i+3].otherChamps[6]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img6`).attr("tooltip2",`${res.participantList[i+3].otherChampName[6]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img7 img`).attr("src",`${res.participantList[i+3].otherChamps[7]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img7`).attr("tooltip2",`${res.participantList[i+3].otherChampName[7]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img8 img`).attr("src",`${res.participantList[i+3].otherChamps[8]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img8`).attr("tooltip2",`${res.participantList[i+3].otherChampName[8]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img9 img`).attr("src",`${res.participantList[i+3].otherChamps[9]}`);
                $(`.gameRecord_add_con${submit_number} .gameRecord_wrap${i} .other_champion_img9`).attr("tooltip2",`${res.participantList[i+3].otherChampName[9]}`);
                
                /**
                 * 로딩
                 */
                $('.gameRecord_row a').click(function() { 
                    $('.loading').css('display','')
                    $('.gameRecord_row a').submit(); 
                  });
                //승패에 따른 색깔 구분
                if ($(`.gameRecord_add_con${submit_number} .win_fail_check${i}`).text() === '패배') {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_con${i}`).css("background-color", "#ef9a9a ");
                } else {
                    $(`.gameRecord_add_con${submit_number} .gameRecord_con${i}`).css("background-color", "#90caf9");
                }
            }

            $('.loading').css('display','none')
        },error:function(err){
            alert("요청 실패");
        }
    })
    
    //})
}