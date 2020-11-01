var add_others_jqueries = () => {

    $(`.other_summoner_btn0`).submit((e) => {
        e.preventDefault();
        add_others(0);
    });
    $(`.other_summoner_btn1`).submit((e) => {
        e.preventDefault();
        add_others(1);
    });
    $(`.other_summoner_btn2`).submit((e) => {
        e.preventDefault();
        add_others(2);
    });
}

