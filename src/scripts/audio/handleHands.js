// import instruments from './instruments';
import * as Tone from 'tone';
import { Distortion, Phaser } from 'tone';

const synth1 = new Tone.Synth();
const synth2 = new Tone.Synth();
const gain = new Tone.Gain(0.7);
const reverb = new Tone.Reverb({ decay: 0.5 });
const distortion = new Distortion(0.1);
const phaser = new Phaser({
  frequency: 15,
  octaves: 5,
  baseFrequency: 1000,
});
const pitchShift = new Tone.PitchShift();

gain.toDestination();

synth1.chain(pitchShift, gain);
synth2.connect(gain);

const notes1 = 'C4 D4 E4 F4 G4 A4 B4 C5'.split(' ');
const notes2 = 'C3 D3 E3 F3 G3 A3 B3 C4'.split(' ');

let store = [];
let s1, s2;

export default function (inputs, canvasConfig) {
  let [c1, c2] = inputs;
  let { width, height } = canvasConfig;

  if (c1 && c1[0] > width / 2) {
    s1 = getSection(c1[1], 8, height, height / 10);
  }

  if (c2 && c2[0] < width / 2) {
    s2 = getSection(c2[1], 8, height, height / 10);
  }

  store.push(c1);
}

setInterval(() => {
  console.log(store);
  s1 && synth1.triggerAttackRelease(notes1[8 - s1], '8n');
  // synth2.triggerAttackRelease(notes2[s2], '8n');
  s2 && (pitchShift.pitch = s2);
  // console.log(phaser.octaves);
}, 1000);

// only update if last 3 values fall within threshold (set as percentage of canvas)
// use rampto to soften the change

function getSection(position, totalSections, total, border) {
  let section = 0;
  let sectionLength = (total - 2 * border) / totalSections;
  let currentSection = sectionLength + border;
  while (position > currentSection) {
    currentSection += sectionLength;
    section++;
  }
  return section;
}
