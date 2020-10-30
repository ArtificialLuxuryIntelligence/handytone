import config from './../config';

export default function paintOverlay(ctx) {
  let { width, height } = config.canvas;
  ctx.clearRect(0, 0, width, height);
  //   ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(0,200,0,0.9)';
  ctx.fillRect(0, 0, width / 2, height);
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(width / 2, (i * height) / 10, 5, 5);
  }
}
