/**
 * Created by hp on 2017/3/8.
 */

var Tools = {

    getSystemTime: function () {
        var timerStr = "";
        var time = new Date();
        timerStr += time.getFullYear()+"";
        var s = (time.getMonth()+1).toString();
        s = s.length>1?s:"0"+s;
        timerStr += s+"";

        s = (time.getDate()).toString();
        s = s.length>1?s:"0"+s;
        timerStr += s+"";

        s = (time.getHours()).toString();
        s = s.length>1?s:"0"+s;
        timerStr += s+":";

        s = time.getMinutes().toString();
        s = s.length>1?s:"0"+s;
        timerStr += s+":";
        s = time.getSeconds().toString();
        s = s.length>1?s:"0"+s;
        timerStr += s;
        return timerStr;
    },

    formatTime: function (time) {
        var time = time.toFixed(2)
        var strs = time.split(".")
        var real = parseInt(strs[0])

        var tempStr = strs[1];
        var mode = real % 60
        if (mode >=0 && mode<10) {
            tempStr = "0"+mode+":"+tempStr;
        }
        else
            tempStr = "" + mode+":"+tempStr
        real = Math.floor(real/60)
        while (real > 0) {
            mode = real % 60
            if (mode >0 && mode<10) {
                tempStr = "0"+mode+":"+tempStr;
            }
            else
                tempStr = "" + mode+":"+tempStr
            real = Math.floor(real/60)
        }
        return tempStr
    }
}