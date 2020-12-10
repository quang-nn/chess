import { useEffect, useRef, useState } from "react";
import Chessboard from "./chessboard";
import { cfg, constants } from "./constants";
import { initState } from "./init";

const Game = () => {
  const canvasRef = useRef()
  const [chessBoard, setChessBoard] = useState(new Chessboard())
  const [state, setState] = useState(initState)
  const [gameState, setgGameState] = useState({ turn: constants.sides.red, isSelecting: false, selectingChess: null })
  const [unit, setUnit] = useState(66)

  const onclick = (e) => {
    let { r, c } = getClickedPos(e);
    // if not clicked on a chess point, return
    if (r < 0 || c < 0 || c > 8 || r > 9) {
      return;
    }

    let chess = lookup(r, c);
    if (chess)
      setgGameState(prev => ({ ...prev, isSelecting: true, selectingChess: chess }))
  }

  const moveChess = (r, c, chess) => {
    
  }

  const lookup = (r, c) => {
    return state[r][c]
  }

  const getClickedPos = (e) => {
    // console.log(e);
    const x = e.pageX - canvasRef.current.offsetLeft;
    const y = e.pageY - canvasRef.current.offsetTop;

    const nx = Math.round(x / unit);
    const ny = Math.round(y / unit);

    let aa = Math.abs(x - unit * nx) * Math.abs(x - unit * nx) + Math.abs(y - unit * ny) * Math.abs(y - unit * ny) < cfg.chessSize * cfg.chessSize

    return aa ? { c: nx - 1, r: ny - 1 } : { c: -1, r: -1 }
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.canvas.height = unit * 11
    ctx.canvas.width = unit * 10
    chessBoard.render(ctx, unit, state);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {

  }, [state])

  return (
    <div className="canvas-container">
      <canvas className="canvas" ref={canvasRef} onClick={(e) => onclick(e)}></canvas>
    </div>
  );
};

export default Game;