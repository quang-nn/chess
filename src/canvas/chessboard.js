import { cfg } from "./constants";

export default class Chessboard {
  render = (ctx, unit, state = []) => {
    this.ctx = ctx
    this.state = state
    this.l = unit
    this.height = 11 * unit
    this.width = 10 * unit
    this.drawBoard();
    this.drawChess();
  }

  drawBoard = () => {
    const ctx = this.ctx;
    const l = this.l;
    // draw background
    ctx.fillStyle = cfg.background;
    ctx.fillRect(0, 0, this.width, this.height);

    // draw horizontal lines
    ctx.strokeStyle = cfg.lineColor;
    ctx.lineWidth = cfg.lineWidth;

    for (let i = 1; i <= 10; i++) {
      this.drawLine(ctx, l, i * l, 9 * l, i * l);
    }
    // draw vertical lines
    for (let i = 1; i <= 9; i++) {
      if (i === 1 || i === 9) {
        this.drawLine(ctx, i * l, l, i * l, 10 * l);
      } else {
        this.drawLine(ctx, i * l, l, i * l, 5 * l);
        this.drawLine(ctx, i * l, 6 * l, i * l, 10 * l);
      }
    }
    // draw x lines
    this.drawLine(ctx, 4 * l, l, 6 * l, 3 * l);
    this.drawLine(ctx, 4 * l, 3 * l, 6 * l, l);
    this.drawLine(ctx, 4 * l, 8 * l, 6 * l, 10 * l);
    this.drawLine(ctx, 4 * l, 10 * l, 6 * l, 8 * l);

    // draw stat pos
    this.drawStartPos()

    // draw border
    ctx.beginPath();
    ctx.lineWidth = cfg.lineWidth * 2;
    this.drawLine(ctx, l - 5, l - 5, 9 * l + 5, l - 5);
    this.drawLine(ctx, l - 5, l - 5, l - 5, 10 * l + 5);
    this.drawLine(ctx, l * 9 + 5, l * 10 + 5, 9 * l + 5, l - 5);
    this.drawLine(ctx, l * 9 + 5, l * 10 + 5, l - 5, 10 * l + 5);
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
        this.drawLine(ctx, (x.c + 1) * l + 4, (x.r + 1) * l + 5, (x.c + 1) * l + 15, (x.r + 1) * l + 5);
        this.drawLine(ctx, (x.c + 1) * l + 5, (x.r + 1) * l + 4, (x.c + 1) * l + 5, (x.r + 1) * l + 15);

        this.drawLine(ctx, (x.c + 1) * l + 4, (x.r + 1) * l - 5, (x.c + 1) * l + 15, (x.r + 1) * l - 5);
        this.drawLine(ctx, (x.c + 1) * l + 5, (x.r + 1) * l - 4, (x.c + 1) * l + 5, (x.r + 1) * l - 15);

      }
      if (x.c !== 0) {
        this.drawLine(ctx, (x.c + 1) * l - 4, (x.r + 1) * l - 5, (x.c + 1) * l - 15, (x.r + 1) * l - 5);
        this.drawLine(ctx, (x.c + 1) * l - 5, (x.r + 1) * l - 4, (x.c + 1) * l - 5, (x.r + 1) * l - 15);

        this.drawLine(ctx, (x.c + 1) * l - 4, (x.r + 1) * l + 5, (x.c + 1) * l - 15, (x.r + 1) * l + 5);
        this.drawLine(ctx, (x.c + 1) * l - 5, (x.r + 1) * l + 4, (x.c + 1) * l - 5, (x.r + 1) * l + 15);
      }
    })
  }

  drawChess() {
    const ctx = this.ctx;
    const chessList = this.state.flat(2).filter(el => el != null)

    chessList.forEach(chess => {
      let { x, y } = this.getChessPos(chess);
      chess.render(ctx, x, y);
    });
  }

  getChessPos(chess) {
    const row = chess.row;
    const col = chess.col;
    const l = this.l;
    return {
      x: (col + 1) * l,
      y: (row + 1) * l
    };
  }

  drawLine(ctx, xi, yi, xf, yf) {
    ctx.moveTo(xi, yi);
    ctx.lineTo(xf, yf);
    ctx.stroke();
  }
}

