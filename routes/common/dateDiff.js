
const dateDiff = (_date1, _date2)=>{
    var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
    
    diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth(), diffDate_1.getDate());
    diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth(), diffDate_2.getDate());
   
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    if(diff == 0 ){
        diff='오늘';
    }else{
        diff = diff+'일 전';
    }
    
    return diff;
}

module.exports = dateDiff;