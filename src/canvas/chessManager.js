import { cfg } from "./constants";
import { getChessPos } from './helper';
export default class ChessManager {
  constructor(ctx, unit, state = []) {
    this.ctx = ctx
    this.state = state
    this.l = unit
  }

  render() {
    this.drawChess()
  }

  drawChess() {
    const { ctx, l } = this;
    const chessList = this.state.flat(2).filter(el => el != null)

    chessList.forEach(chess => {
      let { x, y } = getChessPos(chess, l);
      chess.render(ctx, x, y);
    });
  }
}

