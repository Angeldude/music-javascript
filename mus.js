(function(){
  "use strict"

  let Letter = function(aleph, num){
    if(aleph !== undefined){
      var upped = aleph.charAt(0).toUpperCase() + aleph.slice(1);
    }
    var valid = { "C": 0, "C#": 1, "Db": 1, "D": 2,
                  "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6,
                  "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10,
                  "Cb": 11, "B": 11 }

    if(valid[upped] === undefined){
      throw "Not a valid pitch name!";
    }

    return {
      letter: [upped, num].join(''),
      pc: valid[upped]
    }
  }

  let Note = function(letter, octave, duration){
    if(!(this instanceof Note)){
      return new Note(letter, octave, duration);
    }

    this.letter = Letter(letter, octave);
    this.duration = duration;
  }

  Note.prototype.noteName = function(){
    return this.letter.letter;
  }

  Note.prototype.pitchClass = function(){
    return this.letter.pc;
  }























})();
