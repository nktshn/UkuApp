var popularProgressions = {
    inMajor: [
        [1, 5, 6, 4],//chaperone
        [1, 4, 6, 5],//goner
        [1, 2, 6, 4],//ride
        [1, 5, 2, 4]
    ],
    inMinor: [
        [1, 4, 6, 7],//shape of you
        [1, 6, 3, 7],//numb
        [1, 3, 6, 4],//leave all out the rest
        [6, 4, 1, 1],//stressed out
        [1, 7, 6, 3],//stressed out
        [5, 4, 1, 1],//
        [1, 3, 7, 6],//counting stats
        [1, 7, 3, 6]
    ]
};

function progressions_init() {
    //formProgression('A', 'min', [6, 7, 1, 3]);
    //formProgression('C', 'maj', [1, 5, 4, 1]);
}

var roots = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']; //0-11

function formProgression(root, scale, progression) { //['C'], ['min'], [1, 3, 5, 6]
    var chords, newProg = [];
    var newRoot = formNewRoot(root);
    //C(newRoot);
    if (scale === 'min') {
        chords = formMinorChords(newRoot);
    } else {
        chords = formMajorChords(newRoot)
    }
    //C(chords);
    for (var x = 0; x < progression.length; x++) {
        newProg[x] = chords[progression[x] - 1];
    }
    //C(newProg);
    return newProg;
}

function formNewRoot(root) {
    var t = [];
    var index = roots.indexOf(root);
    for (var x = 0; x < 13; x++) {
        if (index !== 12) {
            t.push(roots[index]);
            index++;
        } else {
            index = 0;
        }
    }
    return t;
}

function formMinorChords(formedRoot) {
    var chords = [];
    chords.push(formedRoot[0] + 'm');
    chords.push(formedRoot[2] + 'dim');
    chords.push(formedRoot[3]);
    chords.push(formedRoot[5] + 'm');
    chords.push(formedRoot[7] + 'm');
    chords.push(formedRoot[8]);
    chords.push(formedRoot[10]);
    return chords;
}

function formMajorChords(formedRoot) {
    var chords = [];
    chords.push(formedRoot[0]);
    chords.push(formedRoot[2] + 'm');
    chords.push(formedRoot[4] + 'm');
    chords.push(formedRoot[5]);
    chords.push(formedRoot[7]);
    chords.push(formedRoot[9] + 'm');
    chords.push(formedRoot[11] + 'dim');
    return chords;
}

function renderPopProgressions() {
    var scale = document.querySelector('input[name="scaleRadio"]:checked').value;
    var parent = 'progression-board';
    document.getElementById(parent).innerHTML = '';
    var progs = [];
    if (scale[1] === 'm' || scale[2] === 'm') {
        //minor
        popularProgressions.inMinor.forEach(function (item) {
            progs.push(formProgression(scale.slice(0, -1), 'min', item))
        })
    } else {
        //major
        popularProgressions.inMajor.forEach(function (item) {
            progs.push(formProgression(scale, 'maj', item))
        })
    }
    progs.forEach(function (item) {
        item.forEach(function (i) {
            renderChordNeck(i.toString(), parent)
        });
        document.getElementById(parent).appendChild(document.createElement('hr'));
    })
}

