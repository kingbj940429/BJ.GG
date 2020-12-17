const dateUtil = function(){
    /*
        함수가 생성되면 해당 함수에 constructor(생성자) 자격 부여가 생기고,
        함수를 생성해주면 함수만 정의되는 것이 아니라, Prototype Object라는 것도 생성이 된다.
        그리고 생성된 함수의 속성인 prototype으로 인해 prototype Object에 접근 가능하다.
        prototype Object는 일반적인 객체와 같으면 속성으로 constructor(생성자)와 __proto__를 가집니다.
        함수의 prototype은 prototype Object를 가리키고, prototype object의 constructor는 생성된 함수를 가르킵니다.
    */
}

dateUtil.prototype = {
    init : function(){
        
    },

    dateDiff: function (_date1, _date2) {
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth(), diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth(), diffDate_2.getDate());

        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());

        diff = Math.ceil(diff / (1000 * 3600 * 24));
        if (diff == 0) {
            diff = '오늘';
        } else {
            diff = diff + '일 전';
        }

        return diff;
    },

    yyyymmdd: function (timestamp) {
        var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM  
        time = yyyy + '년 ' + mm + '월 ' + dd + '일 ' + h + ':' + min + ' ' + ampm;

        return time;
    }
}

module.exports = dateUtil;