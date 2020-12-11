import { cfg } from "./constants";
import { drawLine } from "./helper";

export default class Chessboard {
  constructor(ctx, unit, state = []) {
    this.ctx = ctx
    this.state = state
    this.l = unit
    this.height = 11 * unit
    this.width = 10 * unit
    // this.drawBoard();
    // this.drawChess();
  }

  render(){
    this.drawBoard()
  }

  drawBoard = () => {
    console.log("render board");
    const ctx = this.ctx;
    const l = this.l;
    // draw background
    ctx.fillStyle = cfg.background;
    ctx.fillRect(0, 0, this.width, this.height);

    // draw horizontal lines
    ctx.strokeStyle = cfg.lineColor;
    ctx.lineWidth = cfg.lineWidth;

    for (let i = 1; i <= 10; i++) {
      drawLine(ctx, l, i * l, 9 * l, i * l);
    }
    // draw vertical lines
    for (let i = 1; i <= 9; i++) {
      if (i === 1 || i === 9) {
        drawLine(ctx, i * l, l, i * l, 10 * l);
      } else {
        drawLine(ctx, i * l, l, i * l, 5 * l);
        drawLine(ctx, i * l, 6 * l, i * l, 10 * l);
      }
    }
    // draw x lines
    ctx.beginPath();
    ctx.lineWidth = cfg.lineWidth / 2;
    drawLine(ctx, 4 * l, l, 6 * l, 3 * l);
    drawLine(ctx, 4 * l, 3 * l, 6 * l, l);
    drawLine(ctx, 4 * l, 8 * l, 6 * l, 10 * l);
    drawLine(ctx, 4 * l, 10 * l, 6 * l, 8 * l);
    ctx.closePath();

    // draw stat pos
    this.drawStartPos()

    // draw border
    ctx.beginPath();
    ctx.lineWidth = cfg.lineWidth * 2;
    drawLine(ctx, l - 5, l - 5, 9 * l + 5, l - 5);
    drawLine(ctx, l - 5, l - 5, l - 5, 10 * l + 5);
    drawLine(ctx, l * 9 + 5, l * 10 + 5, 9 * l + 5, l - 5);
    drawLine(ctx, l * 9 + 5, l * 10 + 5, l - 5, 10 * l + 5);
    ctx.closePath();
  }

  drawStartPos() {
    const { ctx, l } = this

    var chessList = { ...cfg.startPos.red }

    Object.keys(chessList).forEach((key) =>
      chessList[key] = [...cfg.startPos.red[key], ...cfg.startPos.black[key]]
    )

    chessList.soldier.concat(chessList.cannon).forEach(x => {
      if (x.c !== 8) {
        drawLine(ctx, (x.c + 1) * l + 4, (x.r + 1) * l + 5, (x.c + 1) * l + 15, (x.r + 1) * l + 5);
        drawLine(ctx, (x.c + 1) * l + 5, (x.r + 1) * l + 4, (x.c + 1) * l + 5, (x.r + 1) * l + 15);

        drawLine(ctx, (x.c + 1) * l + 4, (x.r + 1) * l - 5, (x.c + 1) * l + 15, (x.r + 1) * l - 5);
        drawLine(ctx, (x.c + 1) * l + 5, (x.r + 1) * l - 4, (x.c + 1) * l + 5, (x.r + 1) * l - 15);

      }
      if (x.c !== 0) {
        drawLine(ctx, (x.c + 1) * l - 4, (x.r + 1) * l - 5, (x.c + 1) * l - 15, (x.r + 1) * l - 5);
        drawLine(ctx, (x.c + 1) * l - 5, (x.r + 1) * l - 4, (x.c + 1) * l - 5, (x.r + 1) * l - 15);

        drawLine(ctx, (x.c + 1) * l - 4, (x.r + 1) * l + 5, (x.c + 1) * l - 15, (x.r + 1) * l + 5);
        drawLine(ctx, (x.c + 1) * l - 5, (x.r + 1) * l + 4, (x.c + 1) * l - 5, (x.r + 1) * l + 15);
      }
    })
  }
}

