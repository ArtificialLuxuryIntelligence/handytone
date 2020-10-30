import config from './../config';

export default function paintHands(centers, ctx) {
  // repaint screen
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);

  ctx.lineWidth = 10;

  let [c1, c2] = centers;
  if (c1) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    // ctx.fillRect(c1[0], c1[1], 5, 5);

    ctx.beginPath();
    ctx.arc(c1[0], c1[1], 20, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if (c2) {
    ctx.beginPath();
    ctx.arc(c2[0], c2[1], 20, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if (c1 && c2) {
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.beginPath();
    ctx.moveTo(c1[0], c1[1]);
    ctx.lineTo(c2[0], c2[1]);
    ctx.stroke();
  }
}
