import * as Tone from 'tone';

const synth1 = new Tone.Synth();
const synth2 = new Tone.Synth();

const gain = new Tone.Gain(0.2);
gain.toDestination();

synth1.connect(gain);
synth2.connect(gain);

// var pattern = new Tone.Pattern(
//   function (time, note) {
//     synth.triggerAttackRelease(note, '32n');
//   },
//   ['C4', 'D4', 'E4', 'G4', 'A4']
// );
// pattern.start(0);

const instruments = { synth1, synth2 };

export default instruments;
