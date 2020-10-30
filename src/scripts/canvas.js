import config from './config';
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const overlay = document.querySelector('#overlay');

// Handle window resizing
resizeHandler();
window.addEventListener('resize', resizeHandler);

function resizeHandler() {
  config.canvas.width = canvas.width = overlay.width = window.innerWidth * 0.6;
  config.canvas.height = canvas.height = overlay.height =
    window.innerWidth * 0.6 * (320 / 480);

  config.canvas.height = canvas.height = overlay.height =
    window.innerHeight * 0.9;
  config.canvas.width = canvas.width = overlay.width =
    window.innerHeight * 0.9 * (480 / 320);
}
