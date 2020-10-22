import * as handTrack from 'handtrackjs';
import config from './config';
import modelParams from './config';
import handleHands from './../audio/handleHands';

const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// output visible
const cvis = document.querySelector('#cvis');
const ctxvis = cvis.getContext('2d');

export default function initialise() {
  let model;

  video.width = config.video.width;
  video.height = config.video.height;

  //

  Navigator.getUserMedia =
    Navigator.getUserMedia ||
    Navigator.webkitUserMedia ||
    Navigator.mozUserMedia ||
    Navigator.msUserMedia;
  const modelParams = {
    flipHorizontal: true, // flip e.g for video
    // imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.79, // confidence threshold for predictions.
  };

  // handtracking //

  handTrack.startVideo(video).then((status) => {
    if (status) {
      navigator.getUserMedia(
        { video: {} },
        (stream) => {
          video.srcObject = stream;
          runDetection();
        },
        (err) => console.log(err)
      );
    }
  });

  function runDetection() {
    model.detect(video).then((predictions) => {
      if (predictions.length > 0) {
        console.log(predictions);
        handleDetection(predictions, canvas, context, video);
      }

      context.fillStyle = 'rgba(0,0,0,0.2)';
      context.fillRect(0, 0, config.canvas.width, config.canvas.height);
      requestAnimationFrame(runDetection);
    });
  }

  function handleDetection(predictions, canvas, context, video) {
    model.renderPredictions(predictions, cvis, ctxvis, video);
    let bboxs = predictions.map((hand) => hand.bbox);

    // ---------------handle canvas output

    let c1, c2;
    bboxs.forEach((box, i) => {
      let centerPoint = [box[0] + box[2] / 2, box[1] + box[3] / 2];
      let centerPointCanvas = scalePoint(centerPoint);
      context.fillStyle = i == 0 ? 'blue' : 'red';
      context.fillRect(centerPointCanvas[0], centerPointCanvas[1], 5, 5);
      i == 0 ? (c1 = centerPointCanvas) : (c2 = centerPointCanvas);
    });

    if (c1 && c2) {
      context.strokeStyle = 'rgb(255,255,255)';
      context.beginPath();
      context.moveTo(c1[0], c1[1]);
      context.lineTo(c2[0], c2[1]);
      context.stroke();
    }

    // -----------------handle audio output

    handleHands([c1, c2], {
      width: config.canvas.width,
      height: config.canvas.height,
    });
  }

  handTrack.load(modelParams).then((lmodel) => {
    model = lmodel;
  });

  // Handle window resizing
  resizeHandler();
  window.addEventListener('resize', resizeHandler);

  function resizeHandler() {
    config.canvas.width = canvas.width = window.innerWidth * 0.6;
    config.canvas.height = canvas.height =
      window.innerWidth * 0.6 * (320 / 480);
  }
}

///

// scaling helper
function scalePoint(coords) {
  let [x, y] = coords;
  y = y * (config.canvas.width / config.video.width);
  x = x * (config.canvas.height / config.video.height);
  return [Math.round(x), Math.round(y)];
}
