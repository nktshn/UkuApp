var neckMatrix = [];
var fullChordMap = {};
var majorScales = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var minorScales = ['Am', 'A#m', 'Bm', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'];

function chordNeckStart() {
    formMatrix();
    //major:
    addChordIntoChordMap("A", [{x: 3, y: 3}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 2}], null, 0, 'maj');
    addChordIntoChordMap("A#", [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}], null, 0, 'maj');
    addChordIntoChordMap("B", [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 5}], null, 0, 'maj');
    addChordIntoChordMap("C", [{x: 0, y: 4}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], null, 0, 'maj');
    addChordIntoChordMap("C#", [{x: 0, y: 5}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}], null, 0, 'maj');
    addChordIntoChordMap("D", [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}], 0, 0, 'maj');
    addChordIntoChordMap("D#", [{x: 0, y: 2}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}], null, 0, 'maj');
    addChordIntoChordMap("E", [{x: 0, y: 3}, {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5}], null, 0, 'maj');
    addChordIntoChordMap("F", [{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 3}], null, 0, 'maj');
    addChordIntoChordMap("F#", [{x: 0, y: 2}, {x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 4}], null, 0, 'maj');
    addChordIntoChordMap("G", [{x: 0, y: 3}, {x: 1, y: 4}, {x: 2, y: 3}, {x: 3, y: 1}], null, 0, 'maj');
    addChordIntoChordMap("G#", [{x: 0, y: 3}, {x: 1, y: 4}, {x: 2, y: 3}, {x: 3, y: 5}], null, 2, 'maj');
    //minor:
    addChordIntoChordMap("Am", [{x: 3, y: 3}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], null, 0, 'min');
    addChordIntoChordMap("A#m", [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 4}], null, 0, 'min');
    addChordIntoChordMap("Bm", [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 5}], null, 0, 'min');
    addChordIntoChordMap("Cm", [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 1}], null, 0, 'min');
    addChordIntoChordMap("C#m", [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 5}], null, 3, 'min');
    addChordIntoChordMap("Dm", [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 0, y: 1}], null, 0, 'min');
    addChordIntoChordMap("D#m", [{x: 0, y: 2}, {x: 1, y: 3}, {x: 2, y: 4}], 3, 0, 'min');
    addChordIntoChordMap("Em", [{x: 0, y: 3}, {x: 1, y: 4}, {x: 2, y: 5}, {x: 3, y: 1}], null, 0);
    addChordIntoChordMap("Fm", [{x: 0, y: 4}, {x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 2}], null, 0);
    addChordIntoChordMap("F#m", [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 3}], null, 0);
    addChordIntoChordMap("Gm", [{x: 0, y: 2}, {x: 1, y: 4}, {x: 2, y: 3}, {x: 3, y: 1}], null, 0);
    addChordIntoChordMap("G#m", [{x: 0, y: 3}, {x: 1, y: 5}, {x: 2, y: 4}, {x: 3, y: 5}], null, 0);
    //diminished:
    addChordIntoChordMap("Adim", [{x: 0, y: 4}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 3, y: 3}], null, 4, 'dim');
    addChordIntoChordMap("A#dim", [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 4}], null, 0, 'dim');
    addChordIntoChordMap("Bdim", [{x: 0, y: 3}, {x: 1, y: 2}, {x: 2, y: 3}], 3, 0, 'dim');
    addChordIntoChordMap("Cdim", [{x: 0, y: 4}, {x: 1, y: 3}, {x: 2, y: 4}], 3, 0, 'dim');
    addChordIntoChordMap("C#dim", [{x: 0, y: 4}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 1}], null, 2, 'dim');
    addChordIntoChordMap("Ddim", [{x: 0, y: 4}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 1}], null, 3, 'dim');
    addChordIntoChordMap("D#dim", [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 3}], null, 0, 'dim');
    addChordIntoChordMap("Edim", [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 5}, {x: 3, y: 1}], null, 0, 'dim');
    addChordIntoChordMap("Fdim", [{x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 3}], 0, 3, 'dim');
    addChordIntoChordMap("F#dim", [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 3, y: 3}], null, 0, 'dim');
    addChordIntoChordMap("Gdim", [{x: 0, y: 2}, {x: 1, y: 4}, {x: 2, y: 2}, {x: 3, y: 1}], null, 0, 'dim');
    addChordIntoChordMap("G#dim", [{x: 0, y: 3}, {x: 1, y: 5}, {x: 2, y: 3}, {x: 3, y: 2}], null, 0, 'dim');

}
function renderAllChords() {
    //rendering:
    majorScales.forEach(function (item) {
        renderFullNeckForScale(formProgression(item, 'maj', arrayInRange(1, 7)), item);
    });
    minorScales.forEach(function (item) {
        renderFullNeckForScale(formProgression(item.slice(0, -1), 'min', arrayInRange(1, 7)), item);
    })

}

function renderFullNeckForScale(prog, scale) {
    prog.forEach(function (item) {
        renderChordNeck(item, scale)
    })
}

function renderChordNeck(chord, boardId) {
    createChordNeck(chord, fullChordMap[chord].startPos, boardId);
}

function createChordNeck(chord, startPos, boardId) {
    //C(boardId);
    var parent = document.getElementById(boardId);
    var neck = document.createElement('div');
    neck.setAttribute('class', 'chordNeck');
    parent.appendChild(neck);
    //block
    var neckBlock = document.createElement('div');
    neckBlock.className = 'neckBlock';
    //colorize
    if (chord.indexOf('m') === 1 || chord.indexOf('m') === 2) {
        neck.style.backgroundColor = 'rgb(45, 55, 70)';
    }
    if (chord.indexOf('m') === -1) {
        neck.style.backgroundColor = 'rgb(70, 45, 45)';
    }
    if (chord.indexOf('m') === 3 || chord.indexOf('m') === 4) {
        neck.style.backgroundColor = 'rgb(45, 70, 55)';
    }
    //colorize end
    neck.appendChild(neckBlock);
    //lads
    for (var y = 1; y < 4; y++) {
        var e2 = document.createElement('div');
        e2.className = 'chordLads';
        e2.style.left = y * 25 + 'px';
        neckBlock.appendChild(e2);
    }
    //strings
    for (var x = 0; x < 2; x++) {
        var e = document.createElement('div');
        e.className = 'chordNeckStrings';
        neckBlock.appendChild(e);
    }
    //labels
    var chordName = document.createElement('span');
    chordName.className = 'chordLabel';
    chordName.innerHTML = chord;
    neckBlock.appendChild(chordName);
    //transpose label
    if (startPos !== 0) {
        var startPosLabel = document.createElement('span');
        startPosLabel.className = 'startPosLabel';
        startPosLabel.innerHTML = startPos;
        neckBlock.appendChild(startPosLabel);
    }

    showChord(chord, neckBlock);
    //showMatrix(neckBlock);
}

function formMatrix() {
    //debugger;
    for (var i = 1; i < 5; i++) {
        var data = [];
        for (var j = 1; j < 6; j++) {
            data[j] = {
                top: i * 17 - 24 + 'px',
                left: j * 25 - 43 + 'px'
            };
        }
        neckMatrix.push(data);
    }
}

function showMatrix(parent) { //DEBUG FUNC
    for (var i = 0; i < 5; i++) {
        for (var j = 1; j < 6; j++) {
            createWhitePoint(i, j, parent, i + ' ' + j);
        }
    }
}

function showChord(chord, parent) {
    fullChordMap[chord].whitePoses.forEach(function (item) {
        createWhitePoint(item.x, item.y, parent, '');
    });
    if (fullChordMap[chord].mutedString !== null) {
        createMutePoint(fullChordMap[chord].mutedString, 1, parent, '')
    }
}

function createWhitePoint(i, j, parent, mark) {
    var e;
    e = document.createElement('div');
    e.className = 'matrixPoint';
    e.innerHTML = mark;
    e.style.fontSize = '5px';
    e.style.top = neckMatrix[i][j].top;
    e.style.left = neckMatrix[i][j].left;
    if (j === 1) {
        e.style.opacity = 0.5;
    } else {
        e.style.opacity = 1;
    }
    parent.appendChild(e);
}

function createMutePoint(i, j, parent, mark) {
    var e;
    e = document.createElement('div');
    e.className = 'matrixPoint';
    e.innerHTML = mark;
    e.style.fontSize = '5px';
    e.style.top = neckMatrix[i][j].top;
    e.style.left = neckMatrix[i][j].left;
    parent.appendChild(e);
    var img = document.createElement('img');
    img.setAttribute('src', '../images/x-mark.png');
    img.className = 'mutePointImg';
    img.height = 8;
    img.width = 8;
    e.appendChild(img);
}

function addChordIntoChordMap(name, whitePoses, mutedString, startPos, type) {
    fullChordMap[name] = {
        whitePoses: whitePoses, mutedString: mutedString, startPos: startPos, type: type
    };

}

function toggle_details() {
    var e = document.getElementsByClassName('neckBoard');
    var btn = document.getElementById('minimize-btn');
    var state = btn.getAttribute('state');
    //C(state);
    if (state == 0) {
        for (var i = 0; i < e.length; i++) {
            e[i].removeAttribute('open');
            btn.innerHTML = 'Maximize all';
            btn.setAttribute('state', 1);
        }
    } else {
        for (var i = 0; i < e.length; i++) {
            e[i].setAttribute('open', 'open');
            btn.innerHTML = 'Minimize all';
            btn.setAttribute('state', 0);
        }
    }
}

