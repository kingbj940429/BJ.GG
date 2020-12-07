$(() => {
    const TOTAL_GAME = $('#total_game').val();
    for (var k = 0; k < TOTAL_GAME; k++) {
        (function (game_seq) {
            $(`#detail_btn_${game_seq}`).click(() => {
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
        $(`#game_box${game_seq} > .detail_con`).append(`<h1>${res.game_id}</h>`)
    }
})