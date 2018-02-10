var neckNotesPos = {
    "C": [3, 20, 35, 18],
    "C#": [4, 19, 21, 36],
    "D": [5, 22, 37],
    //"Db": [4, 19, 21, 36],
    "D#": [6, 23, 38],
    "E": [10, 7, 24, 39],
    //"Eb": [6, 23, 38],
    "F": [11, 25, 8],
    "F#": [12, 26, 9],
    "G": [13, 27, 30],
    //"Gb": [12, 26, 9],
    "G#": [14, 28, 31],
    "A": [0, 32, 15, 29],
    //"Ab": [14, 28, 31],
    "A#": [1, 33, 16],
    "B": [2, 34, 17]
    //"Bb": [1, 33, 16]
};
var neckIndexer = [];

var notesColors = {
    "C": "#db2525",
    "C#": "#db4a30",
    "D": "#db9a3e",
    "Db": "#db4a30",
    "D#": "#dbc439",
    "E": "#b9db4b",
    "Eb": "#dbc439",
    "F": "#82db49",
    "F#": "#4fdb62",
    "G": "#3adbae",
    "Gb": "#4fdb62",
    "G#": "#31cbdb",
    "A": "#4295db",
    "Ab": "#31cbdb",
    "A#": "#827cdb",
    "B": "#ca60db",
    "Bb": "#827cdb"
};

var fullScaleMap = {};

function formNeckIndexer() {
    var counter = 0;
    for (var x = 0; x < 40; x++) {
        for (k in neckNotesPos) {
            var t = neckNotesPos[k];
            t.forEach(function (item) {
                if (item === counter) {
                    neckIndexer.push(k);
                }
            });
        }
        counter++;
    }
}

var neckTextPoses = [];
var neckBorderPoses = [];

function notesInit() {
    var p = [];
    var counter = 0;
    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 10; y++) {
            var e = document.createElement('span');
            var border = document.createElement('div');
            border.appendChild(e);
            border.style.position = 'absolute';
            border.style.top = 15 + x * 35 + 'px';
            border.style.left = y * 70 - 48 + 'px';
            border.setAttribute('class', 'noteBorder');
            border.setAttribute('name', counter.toString());
            var funcForBorder = 'showByNeckClick(' + counter.toString() + ')';
            border.setAttribute('onclick', funcForBorder);
            e.setAttribute('class', 'noteText');
            document.getElementById('neckboard').appendChild(border);
            p.push(e);
            neckBorderPoses.push(border);
            counter++;
        }
    }
    neckTextPoses = p;
}


function showByNeckClick(num) {
    showNotes(neckIndexer[num]);
    var e = document.getElementsByName(num);
    e[0].setAttribute('onclick', 'hideByNeckClick(' + e[0].getAttribute('name') + ')');
    var cs = document.getElementsByClassName('scale-checkbox');
    for (var x = 0; x < cs.length; x++) {
        if (cs[x].getAttribute('value') === neckIndexer[num]) {
            cs[x].checked = true;
        }
    }
    suggestScale();
}

function hideByNeckClick(num) {
    hideNotes(neckIndexer[num]);
    var e = document.getElementsByName(num);
    e[0].setAttribute('onclick', 'showByNeckClick(' + e[0].getAttribute('name') + ')');
    var cs = document.getElementsByClassName('scale-checkbox');
    for (var x = 0; x < cs.length; x++) {
        if (cs[x].getAttribute('value') === neckIndexer[num]) {
            cs[x].checked = false;
        }
    }
    suggestScale();
}

function showNotes(note) {
    var p = neckNotesPos[note];
    p.forEach(function (item, i, p) {
        neckTextPoses[item].innerHTML = note;
        neckBorderPoses[item].style.backgroundColor = notesColors[note];
        neckBorderPoses[item].style.opacity = 0.9;
        neckBorderPoses[item].setAttribute('onclick', 'hideByNeckClick(' + neckBorderPoses[item].getAttribute('name') + ')');
    });
    suggestScale();
}


function hideNotes(note) {
    var p = neckNotesPos[note];
    p.forEach(function (item, i, p) {
        neckTextPoses[item].innerHTML = '';
        neckBorderPoses[item].style.opacity = 0;
        neckBorderPoses[item].setAttribute('onclick', 'showByNeckClick(' + neckBorderPoses[item].getAttribute('name') + ')');
    });
    suggestScale();

}

function clearNotes() {
    neckTextPoses.forEach(function (item, i, p) {
        item.innerHTML = '';
    });
    neckBorderPoses.forEach(function (item, i, p) {
        item.style.opacity = 0;
        item.setAttribute('onclick', 'showByNeckClick(' + item.getAttribute('name') + ')');
    });
    var cs = document.getElementsByClassName('scale-checkbox');
    for (var y = 0; y < cs.length; y++) {
        cs[y].checked = false;
    }
}

function NECK_START() {
    notesInit();
    formNeckIndexer();
    formFullScaleMap();
}

function selectAll() {
    var cs = document.getElementsByClassName('scale-checkbox');
    for (var y = 0; y < cs.length; y++) {
        cs[y].checked = true;
    }
    show();
}

function suggestScale() {
    var field = document.getElementById('position-scale-suggestion');
    var cs = document.getElementsByClassName('scale-checkbox');
    var checkedLength = 0;
    var checkedNotes = [];
    for (var y = 0; y < cs.length; y++) {
        if (cs[y].checked) {
            checkedLength++;
            checkedNotes.push(cs[y].value);
        }
    }
    var text = "Suggested scale: ";
    if (checkedLength > 3 && checkedLength < 8) {
        var suggestedScales = [];
        var scaleAndWeight = [];
        //logic:
        for (var scale in fullScaleMap) {
            scaleAndWeight.push([scale, compareNotesOfScale(fullScaleMap[scale], checkedNotes)]);
        }
        var overlapValues = [];
        scaleAndWeight.forEach( function (item) {
           overlapValues.push(item[1]);
        });
        var max = findMaxInArray(overlapValues);
        scaleAndWeight.forEach(function (item) {
           if (item[1] === max) {
               suggestedScales.push(item[0]);
           }
        });
        C(suggestedScales);
        field.innerHTML = text + " " + suggestedScales;
    } else {
        field.innerHTML = text + "(choose between 4 and 7 notes)";
    }
}

function formMinorScale(formedRoot) {
    var scale = [];
    scale.push(formedRoot[0]);
    scale.push(formedRoot[2]);
    scale.push(formedRoot[3]);
    scale.push(formedRoot[5]);
    scale.push(formedRoot[7]);
    scale.push(formedRoot[8]);
    scale.push(formedRoot[10]);
    return scale;
}

function formMajorScale(formedRoot) {
    var scale = [];
    scale.push(formedRoot[0]);
    scale.push(formedRoot[2]);
    scale.push(formedRoot[4]);
    scale.push(formedRoot[5]);
    scale.push(formedRoot[7]);
    scale.push(formedRoot[9]);
    scale.push(formedRoot[11]);
    return scale;
}

function formFullScaleMap() {
    roots.forEach( function (key) {
        var newRoot = formNewRoot(key);
        fullScaleMap[key] = formMajorScale(newRoot);
        fullScaleMap[key+"m"] = formMinorScale(newRoot);
    });
}

function compareNotesOfScale(scaleArray, checkedNotes){
    var counter = 0;
    for (var i = 0; i < checkedNotes.length; i++) {
        for (var j = 0; j < scaleArray.length; j++) {
            if (checkedNotes[i] === scaleArray[j]) {
                counter++;
            }
        }
    }
    return counter;
}