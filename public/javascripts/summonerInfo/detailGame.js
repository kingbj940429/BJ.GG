$(() => {
    const TOTAL_GAME = $('#total_game').val();
    for (var k = 0; k < TOTAL_GAME; k++) {
        (function (game_seq) {
            $(`#detail_btn_${game_seq}`).click(() => {
                $('.loading').css('display', '') //로딩 온
                if ($(`#game_box${game_seq} > #dc_show_hide`).val() === 'show') {
                    $(`#game_box${game_seq} > .detail_con`).show()
                    var game_id = $(`.detail_btn_${game_seq}`).val();
                    var summoner_name = $(`#summonerName`).val();
                    // ajax
                    $.ajax({
                        type: 'POST',
                        url: '/summonerList/detailGame',
                        data: {
                            game_id,
                            summoner_name,
                        },
                        success: (res) => {
                            $('.loading').css('display', 'none'); //로딩 오프
                            alert("성공");
                            addDetailGame(game_seq, res);
                            $(`#game_box${game_seq} > #dc_show_hide`).attr("value", "hide");
                        },
                        error: (error) => {
                            alert("실패");
                        }
                    });
                    // //ajax
                } else {
                    $(`#game_box${game_seq} > #dc_show_hide`).attr("value", "show");
                    $(`#game_box${game_seq} > .detail_con`).html("");
                }
            });
        })(k); //클로저 사용 [출처] : https://blog.outsider.ne.kr/506
    }
    // 마지막 괄호    

    /**
     * if you click this #detail_btn_${game_seq}, this func will run
     * @param {*} game_seq 
     */
    const addDetailGame = (game_seq, res) => {
        for (var k = 0; k < 10; k++) {
            (function (index) {
                $(`#game_box${game_seq} > .detail_con`).append(`
                <div class="detail_inner" id="detail_inner_${k}">
                    <div class="col-12">
                        <div class="detail_champ_img">
                            <img src=${res.result[index].champion_img} class="champion_img">
                        </div>
                        <div class="detail_spell">
                            <div class="detail_spell_1">
                                <img src=${res.result[index].spell1_img}>
                            </div>
                            <div class="detail_spell_2">
                                <img src=${res.result[index].spell2_img}>
                            </div>
                        </div>
                        <div class="detail_perk">
                            <div class="detail_perk0">
                                <img src=${res.result[index].perk0}>
                            </div>
                            <div class="detail_perkSubStyle">
                                <img src=${res.result[index].perkSubStyle}>
                            </div>
                        </div>
                        <div class="detail_summ_name">
                            <div>
                                ${res.result[index].summonerName}
                            </div>
                        </div>
                        <div class="detail_tier">
                            <div>
                                Gold 3
                            </div>
                        </div>
                        <div class="detail_bjscore">
                            <div>
                                10
                            </div>
                        </div>
                        <div class="detail_kill_death_ass">
                            <div class="detail_kda">
                                ${res.result[index].kda}
                            </div>
                            <div>
                                ${res.result[index].kills}/${res.result[index].deaths}/${res.result[index].assists}
                            </div>
                        </div>
                        <div class="detail_items">
                            <div class="detail_items_img" tooltip="${res.result[index].items[0].name}\r\n\r\n${res.result[index].items[0].description}">
                                <input type="hidden" id="item_0" value=${res.result[index].items[0].name}>
                                <img src=${res.result[index].items[0].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[1].name}\r\n\r\n${res.result[index].items[1].description}">
                                <input type="hidden" id="item_1" value=${res.result[index].items[1].name}>    
                                <img src=${res.result[index].items[1].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[2].name}\r\n\r\n${res.result[index].items[2].description}">
                                <input type="hidden" id="item_2" value=${res.result[index].items[2].name}>
                                <img src=${res.result[index].items[2].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[3].name}\r\n\r\n${res.result[index].items[3].description}">
                                <input type="hidden" id="item_3" value=${res.result[index].items[3].name}>
                                <img src=${res.result[index].items[3].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[4].name}\r\n\r\n${res.result[index].items[4].description}">
                                <input type="hidden" id="item_4" value=${res.result[index].items[4].name}>
                                <img src=${res.result[index].items[4].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[5].name}\r\n\r\n${res.result[index].items[5].description}">
                                <input type="hidden" id="item_5" value=${res.result[index].items[5].name}>
                                <img src=${res.result[index].items[5].item_img}>
                            </div>
                            <div class="detail_items_img" tooltip="${res.result[index].items[6].name}\r\n\r\n${res.result[index].items[6].description}">
                                <input type="hidden" id="item_6" value=${res.result[index].items[6].name}>    
                                <img src=${res.result[index].items[6].item_img}>
                            </div>
                        </div>
                    </div>
                </div>
                `);
            })(k);
        }
    }
})