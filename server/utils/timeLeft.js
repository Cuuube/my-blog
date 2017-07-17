module.exports = function (exp) {
    let time = Date.parse(new Date(exp)) - Date.parse(new Date());
    let sec = Math.floor(time / 1000);
    let data = {
        string: '',
        sec: sec
    };
    switch (true) {
        case (sec < 0): 
            data.string = 'Expired';
            break;
        case (sec < 59): 
            data.string = sec + ' seconds';
            break;
        case (sec < 3600): 
            data.string = Math.floor(sec/60) + ' minutes';
            break;
        case (sec < 86400): 
            data.string = Math.floor(sec/3600) + ' hours';
            break;
        case (sec < 2592000): 
            data.string = Math.floor(sec/86400) + ' days';
            break;
        case (sec < 31536000): 
            data.string = Math.floor(sec/2592000) + ' months';
            break;
        case (sec < 315360000): 
            data.string = Math.floor(sec/31536000) + ' years';
            break;
        default:
                data.string = 'Permanent';
    }
    return data;
}