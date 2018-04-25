var chordsProg = [];
var transposingCounter = 0;

function transpose_init() {

}

function transposeProgression(prog, steps) {
    var res = [];
    prog.forEach(function (elem) {
        if (elem == "Separator") {
            res.push(elem);
            return;
        }
        if (minorScales.indexOf(elem) == -1) { //means major
            if (majorScales.indexOf(elem) + steps > majorScales.length - 1) {
                var delta = majorScales.indexOf(elem) - (majorScales.length);
                var pos = delta + steps;
                res.push(majorScales[pos]);
            } else {
                var index = majorScales.indexOf(elem);
                res.push(majorScales[index + steps]);
            }

        } else { //means minor chord
            if (minorScales.indexOf(elem) + steps > minorScales.length - 1) {
                var delta2 = minorScales.indexOf(elem) - (minorScales.length);
                var pos2 = delta2 + steps;
                res.push(minorScales[pos2]);
            } else {
                var index2 = minorScales.indexOf(elem);
                res.push(minorScales[index2 + steps]);
            }
        }
    });
    return res; //returns new prog
}

function addChordToTranspose() {
    var e = document.getElementsByClassName('transpose-chord-selector')[0];
    var chord = e.options[e.selectedIndex].value;
    if (chord === "separator") {
        chord = "|";
    }
    chordsProg.push(chord);
    //C(chordsProg);
    renderProg();
}

function up() {
    chordsProg = transposeProgression(chordsProg, 1);
    renderProg();
    formTransposeCounter(1);
}

function down() {
    chordsProg = transposeProgression(chordsProg, 11);
    renderProg();
    formTransposeCounter(-1);
}

function formTransposeCounter(step) {
    transposingCounter = (transposingCounter === -11 || transposingCounter === 11) ? 0 : transposingCounter + step;
    var transposingCounterString = (transposingCounter > 0) ? "+" + transposingCounter.toString() : transposingCounter;
    document.getElementById('transposing-counter').innerHTML = "Transposing counter: " + transposingCounterString;
}
function renderProg() {
    var parent = document.getElementsByClassName('prog-board-chords')[0];
    parent.innerHTML = "";
    var elems = [];
    for (var i = 0; i < chordsProg.length; i++) {
        var el = document.createElement('span');
        el.innerHTML = chordsProg[i];
        el.className = "prog-board-chord btn";
        el.style.backgroundColor = (chordsProg[i].slice(chordsProg[i].length - 1, chordsProg[i].length) == 'm') ? notesColors[chordsProg[i].slice(0, -1)] : notesColors[chordsProg[i]];
        el.style.color = 'white';
        if (chordsProg[i] === "Separator") {
            el.innerHTML = "-"
        }
        elems.push(el);
    }
    elems.forEach(function (elem, index) {
        parent.appendChild(elem);

        //rendering X marks:
        var xMark = document.createElement('div');
        xMark.setAttribute('class', 'x-mark');
        xMark.setAttribute('chordid', index.toString());
        var func = "deleteChordboardItem(this)";
        xMark.setAttribute('onclick', func);
        xMark.innerHTML = "<span>x</span>";
        elem.appendChild(xMark);
    });
}

function clearProg() {
    chordsProg = [];
    renderProg();
    clearInterval(intervalIndex || 0);
    transposingCounter = 0;
    formTransposeCounter(transposingCounter);
}

function relax() {
    chordsProg = majorScales.slice(0, 9);
    intervalIndex = setInterval(function () {
        up();
    }, 50)

}

var intervalIndex;

function addSeparator() {
    chordsProg.push("Separator");
    renderProg();
}

function deleteChordboardItem(id) {
    var index = id.getAttribute('chordid');
    chordsProg.splice(Number(index), 1);
    renderProg();
}