import { cfg } from "./constants";
import { drawLine, getChessPos } from './helper';
export default class Controller {
  constructor(ctx, unit) {
    console.log("new");
    this.ctx = ctx
    this.l = unit
  }

  drawSelecting(chess) {
    const { l } = this
    let { x, y } = getChessPos(chess, l)
    this.drawCircle(x, y)
  }

  drawState(from, to) {
    const { l, ctx } = this
    ctx.strokeStyle = 'green'

    this.drawPos((from.x + 1) * l, (from.y + 1) * l, 18)
    this.drawPos((to.x + 1) * l, (to.y + 1) * l, cfg.chessSize + 5)
  }

  drawPos(x, y, size) {
    const { ctx } = this

    drawLine(ctx, x + size, y + size, x + size, y + size - 10);
    drawLine(ctx, x + size, y + size, x + size - 10, y + size);

    drawLine(ctx, x - size, y + size, x - size, y + size - 10);
    drawLine(ctx, x - size, y + size, x - size + 10, y + size);

    drawLine(ctx, x - size, y - size, x - size, y - size + 10);
    drawLine(ctx, x - size, y - size, x - size + 10, y - size);

    drawLine(ctx, x + size, y - size, x + size, y - size + 10);
    drawLine(ctx, x + size, y - size, x + size - 10, y - size);
  }

  drawCircle(x, y) {
    const { ctx } = this
    // draw circle
    ctx.lineWidth = cfg.lineWidth;

    ctx.strokeStyle = 'green'

    ctx.beginPath();
    ctx.arc(x, y, cfg.chessSize + 2, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  }
}

