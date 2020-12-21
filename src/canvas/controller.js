import { cfg } from "./constants";
import { drawLine, getChessPos } from './helper';

const clear = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawSelecting = (ctx, l, chess) => {
  ctx.beginPath();
  ctx.lineWidth = cfg.lineWidth;
  ctx.strokeStyle = 'green'

  let { x, y } = getChessPos(chess, l)
  drawCircle(ctx, x, y)
  ctx.closePath();
}

const drawState = (ctx, l, from, to) => {
  ctx.beginPath();
  ctx.strokeStyle = 'green'

  drawPos(ctx, (from.x + 1) * l, (from.y + 1) * l, 18)
  drawPos(ctx, (to.x + 1) * l, (to.y + 1) * l, cfg.chessSize + 5)
  ctx.closePath();
}

const drawPos = (ctx, x, y, size) => {
  drawLine(ctx, x + size, y + size, x + size, y + size - 10);
  drawLine(ctx, x + size, y + size, x + size - 10, y + size);

  drawLine(ctx, x - size, y + size, x - size, y + size - 10);
  drawLine(ctx, x - size, y + size, x - size + 10, y + size);

  drawLine(ctx, x - size, y - size, x - size, y - size + 10);
  drawLine(ctx, x - size, y - size, x - size + 10, y - size);

  drawLine(ctx, x + size, y - size, x + size, y - size + 10);
  drawLine(ctx, x + size, y - size, x + size - 10, y - size);
}

const drawCircle = (ctx, x, y) => {
  ctx.arc(x, y, cfg.chessSize + 2, 0, Math.PI * 2, false);
  ctx.stroke();
}

export { clear, drawSelecting, drawState }