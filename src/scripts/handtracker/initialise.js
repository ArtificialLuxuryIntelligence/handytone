import * as handTrack from 'handtrackjs';
import config from '../config';
import modelParams from '../config';
import paintHands from './paintHands';
import handleHandsAudio from './../audio/handleHands';

const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// output visible
const cvis = document.querySelector('#cvis');
const ctxvis = cvis.getContext('2d');

// Initialises handtracking and passes data do handleHnads

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
        // console.log(predictions);
        handleDetection(predictions, canvas, context, video);
      }

      requestAnimationFrame(runDetection);
    });
  }

  function handleDetection(predictions, canvas, context, video) {
    // model.renderPredictions(predictions, cvis, ctxvis, video);
    let bboxs = predictions.map((hand) => hand.bbox);

    // ---------------handle canvas output

    let c1, c2;
    bboxs.forEach((box, i) => {
      let centerPoint = [box[0] + box[2] / 2, box[1] + box[3] / 2];
      let centerPointCanvas = scalePoint(centerPoint);

      i == 0 ? (c1 = centerPointCanvas) : (c2 = centerPointCanvas);
    });

    // -----------------render user hands and line between them on canvas
    paintHands([c1, c2], context);

    // -----------------handle audio output (including audio overlay)

    handleHandsAudio([c1, c2]);
  }

  handTrack.load(modelParams).then((lmodel) => {
    model = lmodel;
  });

  // // Handle window resizing
  // resizeHandler();
  // window.addEventListener('resize', resizeHandler);

  // function resizeHandler() {
  //   config.canvas.width = canvas.width = window.innerWidth * 0.6;
  //   config.canvas.height = canvas.height =
  //     window.innerWidth * 0.6 * (320 / 480);
  // }
}

///

// scaling helper
function scalePoint(coords) {
  let [x, y] = coords;
  y = y * (config.canvas.width / config.video.width);
  x = x * (config.canvas.height / config.video.height);
  return [Math.round(x), Math.round(y)];
}
