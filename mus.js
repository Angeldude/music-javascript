(function() {
    "use strict"

    function validate(check) {
        if (check !== undefined) {
            return check.charAt(0).toUpperCase() + check.slice(1);
        }
    }

    const pitch = function(aleph, num = 4) {
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

        return Object.freeze({
            letter: [upped, num].join(''),
            pc: valid[upped],
            octave: num
        })
    }

    const duration = function(dur = "Q", rest = false) {
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

        return Object.freeze({
            dur: [upped, (rest ? "R" : "N")].join(''),
            ratio: valid[upped],
            rest: rest
        })
    }

    const Note = function(letterOct = 'c4', timeVal = "") {
        if (!(this instanceof Note)) {
            return new Note(letterOct, timeVal);
        }

        var octave = parseInt(letterOct.split(/\D/g).slice(-1));
        var name = letterOct.split(/\d/g)[0];
        var dur = timeVal.split('')[0]
        var rest = timeVal.toUpperCase().split('').slice(-1)[0]

        this.pitch = Number.isNaN(octave) ? pitch(name) : pitch(name, octave);
        this.duration = rest === "R" ? duration(dur, true) : duration(dur);
    }

    Note.prototype.noteName = function() {
        return this.pitch.letter;
    }

    Note.prototype.pitchClass = function() {
        return this.pitch.pc;
    }

    Note.prototype.getDur = function(){
      return this.duration.dur;
    }

    Note.prototype.getRatio = function(){
      return this.duration.ratio;
    }

    Note.prototype.freq = function(){
      var SEMI = 12;
      var TUNING = 440;
      var BASE = 69;
      var OCTAVE = 2;
      var pch =  this.pitch.pc;
      var oct = this.pitch.octave + 1;
      var calculation = (oct * SEMI) + pch;
      return TUNING * (OCTAVE**((calculation - BASE) / SEMI));
    };

  








})();
