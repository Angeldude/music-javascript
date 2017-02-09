(function() {
    "use strict"

    function validate(check) {
        if (check !== undefined) {
            return check.charAt(0).toUpperCase() + check.slice(1);
        }
    }

    const Letter = function(aleph, num = 4) {
        var upped = validate(aleph);
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
            pc: valid[upped],
            octave: num
        }
    }

    const Duration = function(dur = "Q", rest = false) {
        var upped = validate(dur);
        var valid = {
            "W": 1,
            "H": 0.5,
            "Q": 0.25,
            "E": 0.125,
            "S": 0.0625
        };

        if (valid[upped] === undefined) {
            throw "Not a valid duration!";
        } else if (typeof rest !== 'boolean') {
            throw "True or false value only!";
        }

        return {
            dur: [upped, (rest ? "R" : "N")].join(''),
            ratio: valid[upped],
            rest: rest
        }
    }

    const Note = function(letterOct = 'c4', duration = "") {
        if (!(this instanceof Note)) {
            return new Note(letterOct, duration);
        }

        var octave = parseInt(letterOct.split(/\D/g).slice(-1));
        var name = letterOct.split(/\d/g)[0];
        var dur = duration.split('')[0]
        var rest = duration.toUpperCase().split('').slice(-1)[0]

        this.letter = Number.isNaN(octave) ? Letter(name) : Letter(name, octave);
        this.duration = rest === "R" ? Duration(dur, true) : Duration(dur);
    }

    Note.prototype.noteName = function() {
        return this.letter.letter;
    }

    Note.prototype.pitchClass = function() {
        return this.letter.pc;
    }

    Note.prototype.getDur = function(){
      return this.duration.dur;
    }

    Note.prototype.getRatio = function(){
      return this.duration.ratio;
    }

    var cool = new Note("G#");
    console.log(cool.letter);









})();
