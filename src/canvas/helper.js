
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

export { getChessPos, drawLine }