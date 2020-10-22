//config options:
const videosize = {
  width: 480,
  height: 320,
};

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  // imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

//
const config = {
  video: {
    width: videosize.width,
    height: videosize.height,
  },
  canvas: {
    width: videosize.width,
    height: videosize.height,
  },
};

export default config;
export { modelParams };
