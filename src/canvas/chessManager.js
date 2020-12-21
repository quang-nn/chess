import { General } from "./chess";
import { cfg } from "./constants";
import { getChessPos } from './helper';
// export default class ChessManager {
//   constructor(ctx, unit, state = []) {
//     this.ctx = ctx
//     this.state = state
//     this.l = unit
//   }

const clear = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawChess = (ctx, l, state) => {
  const chessList = state.flat(2).filter(el => el != null)

  chessList.forEach(chess => {
    let { x, y } = getChessPos(chess, l);

    chess.render(ctx, x, y);
  });
}


export { clear, drawChess }
