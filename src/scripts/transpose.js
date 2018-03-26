var chordsProg = [];

function transpose_init() {

}

function transposeProgression(prog, steps) {
    var res = [];
    prog.forEach(function (elem) {
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
    chordsProg.push(chord);
    //C(chordsProg);
    renderProg();
}

function up() {
    chordsProg = transposeProgression(chordsProg, 1);
    renderProg();
}

function down() {
    chordsProg = transposeProgression(chordsProg, 11);
    renderProg();
}

function renderProg() {
    var parent = document.getElementsByClassName('prog-board-chords')[0];
    parent.innerHTML = "";
    var elems = [];
    for (var i = 0; i < chordsProg.length; i++) {
        var el = document.createElement('span');
        el.innerHTML = chordsProg[i];
        el.className = "prog-board-chord";
        elems.push(el);
    }
    elems.forEach(function (elem) {
        parent.appendChild(elem);
    });
}

function clearProg() {
    chordsProg = [];
    renderProg();
}