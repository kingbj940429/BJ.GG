//var getSummonerId = require('../axios/summonerInfo');

const test = (searchedName) => {
    try {
       console.log("test.js 모듈에서 보내는 로그 입니다 : " + searchedName);
    } catch (error) {
        console.error(error);
    }
}

module.exports = test;