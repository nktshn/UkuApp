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

function findMaxInArray(arr) {
    var i = arr[0];
    for (var x = 1; x < arr.length; x++) {
        if (arr[x] > i) {
            i = arr[x];
        }
    }
    return i;
}
