var dateFormat = function (date) {
    var time = new Date(date);
    function timeAdd0(str) {
        if (str < 10) {
            str = '0' + str;
        }
        return str
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
}


export default dateFormat;