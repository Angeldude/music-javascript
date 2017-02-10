(function() {
    "use strict"

    function zip(arr1, arr2){
      var result = [];
      for(let i = 0; i < arr1.length; ++i){
        result[i] = [arr1[i], arr2[i]]
      }
      return result;
    }

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

    var melody = ['g', 'c4', 'e', 'db4', 'f#', 'ab', 'c3', 'b3'];
    var rhythm = ['q','h','s','s','w','q','q','q'];

    var zipped = zip(melody, rhythm);

    var phrase = zipped.map(note => {
      return new Note(note[0], note[1]);
    })

    var toPlay = []
    phrase.forEach(function(u){
      toPlay.push(u.noteName());
    })

    var instr = {};
    // EFFECTS SETUP
    instr.vol = new Tone.Gain(0.5).toMaster();
    instr.reverb = new Tone.JCReverb(0.4);
    instr.delay = new Tone.FeedbackDelay(0.5).connect(instr.vol);

    //  INSTRUMENT SETUP
    instr.rand = function(){ return (Math.floor(Math.random() * 7))};
    instr.sound = new Tone.PolySynth(1, Tone.Synth).chain(instr.reverb, instr.delay);
    instr.synth = new Tone.Synth().toMaster();



    var pattern = new Tone.Pattern(function(time, note){
      instr.synth.triggerAttackRelease( note, "4n", time);
    }, toPlay, "alternateDown");
    pattern.start(0)

    Tone.Transport.bpm.value = 280;

    // Tone.Transport.start();


})();
