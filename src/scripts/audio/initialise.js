import * as Tone from 'tone';

export default function () {
  const activate = document.getElementById('activate');


  
  activate.addEventListener('click', () => Tone.Transport.start());
}
