(function() {
    "use strict"

    const Letter = function(aleph, num = 4) {
        if (aleph !== undefined) {
            var upped = aleph.charAt(0).toUpperCase() + aleph.slice(1);
        }
        var valid = {
            "C": 0,
            "C#": 1,
            "Db": 1,
            "D": 2,
            "D#": 3,
            "Eb": 3,
            "E": 4,
            "F": 5,
            "F#": 6,
            "Gb": 6,
            "G": 7,
            "G#": 8,
            "Ab": 8,
            "A": 9,
            "A#": 10,
            "Bb": 10,
            "Cb": 11,
            "B": 11
        }

        if (valid[upped] === undefined) {
            throw "Not a valid pitch name!";
        } else if (Number.isNaN(num)) {
            throw "Not a valid Octave number!";
        }

        return {
            letter: [upped, num].join(''),
            pc: valid[upped]
        }
    }

    const Duration = function() {

    }

    const Note = function(letterOct, duration) {
        if (!(this instanceof Note)) {
            return new Note(letterOct, duration);
        }
        if (letterOct !== undefined) {
            var octave = parseInt(letterOct.split('').slice(-1)[0]);
            var name = letterOct.split(/\d/g)[0];
        } else {
          throw "Needs a proper note name";
        }

        this.letter = Number.isNaN(octave) ? Letter(name) : Letter(name, octave);
        this.duration = duration;
    }

    Note.prototype.noteName = function() {
        return this.letter.letter;
    }

    Note.prototype.pitchClass = function() {
        return this.letter.pc;
    }

    var g = new Note('b');
    console.log(g.pitchClass());









})();
