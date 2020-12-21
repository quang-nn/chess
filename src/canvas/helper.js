import { Advisor, Cannon, Chariot, Elephant, General, Horse, Soldier } from "./chess";

const getChessPos = (chess, l) => {
  const row = chess.row;
  const col = chess.col;
  return {
    x: (col + 1) * l,
    y: (row + 1) * l
  };
}

const drawLine = (ctx, xi, yi, xf, yf) => {
  ctx.moveTo(xi, yi);
  ctx.lineTo(xf, yf);
  ctx.stroke();
}

const jsonToChess = (chess) => {
  if (!chess)
    return null

  switch (chess.type) {
    case 0:
      return new General(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 1:
      return new Advisor(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 2:
      return new Elephant(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 3:
      return new Horse(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 4:
      return new Chariot(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 5:
      return new Cannon(chess.side, { r: chess.row, c: chess.col }, chess.type)
    case 6:
      return new Soldier(chess.side, { r: chess.row, c: chess.col }, chess.type)
    default:
      return null
  }
}

export { getChessPos, drawLine, jsonToChess }