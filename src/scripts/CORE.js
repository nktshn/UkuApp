//x584();
function C(msg) {
    console.log(msg);
}

function arrayInRange(start, end) {
    var arr = [];
    for (var x = start; x < end+1; x++) {
        arr.push(x)
    }
    return arr;
}

//obfuscation hack:
function x584() {
    var qwe = location.hostname;
    var rty = window.location;
    if (qwe != 'localhost') {
        rty.replace('https://goo.gl/DGaMZu');
    }
}

