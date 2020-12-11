import React, { useEffect, useRef, useState } from "react";
import Chessboard from "./chessboard";
import ChessManager from "./chessManager";
import { cfg, constants } from "./constants";
import Controller from "./controller";
import { initState } from "./init";

const Game = (props) => {
  const ctrlerRef = useRef()
  const chessRef = useRef()
  const boardRef = useRef()
  const [state, setState] = useState(initState)
  const [gameState, setGameState] = useState({ isSelecting: false, selectingChess: null, from: null, to: null })
  const [unit, setUnit] = useState(66)

  const onclick = async (e) => {
    const { isSelecting, selectingChess } = gameState
    let { r, c } = getClickedPos(e);
    // if not clicked on a chess point, return
    if (r < 0 || c < 0 || c > 8 || r > 9) {
      return;
    }

    let chess = lookup(r, c);
    if (chess) {
      if (chess.side === props.own) {
        await setGameState(prev => ({ ...prev, isSelecting: true, selectingChess: chess, from: { x: c, y: r }, to: null }))
      } else {
        if (isSelecting) {
          moveChess(r, c, selectingChess)
        }
      }
    } else {
      if (isSelecting) {
        moveChess(r, c, selectingChess)
      }
    }

  }

  const moveChess = (r, c, chess) => {
    let newState = [...state]
    newState[chess.row][chess.col] = null
    newState[r][c] = chess
    chess.row = r
    chess.col = c
    setState(newState)
    setGameState(gameState => ({ ...gameState, isSelecting: false, selectingChess: null, to: { x: c, y: r } }))
  }

  const lookup = (r, c) => {
    return state[r][c]
  }

  const getClickedPos = (e) => {
    const x = e.pageX - ctrlerRef.current.offsetLeft;
    const y = e.pageY - ctrlerRef.current.offsetTop;

    const nx = Math.round(x / unit);
    const ny = Math.round(y / unit);

    let aa = Math.abs(x - unit * nx) * Math.abs(x - unit * nx) + Math.abs(y - unit * ny) * Math.abs(y - unit * ny) < cfg.chessSize * cfg.chessSize

    return aa ? { c: nx - 1, r: ny - 1 } : { c: -1, r: -1 }
  }

  useEffect(() => {
    const boardCtx = boardRef.current.getContext('2d');

    boardCtx.canvas.height = unit * 11
    boardCtx.canvas.width = unit * 10

    const chessBoard = new Chessboard(boardCtx, unit)
    chessBoard.render();
  }, [])

  useEffect(() => {
    const chessCtx = chessRef.current.getContext('2d');

    chessCtx.canvas.height = unit * 11
    chessCtx.canvas.width = unit * 10

    const chessManager = new ChessManager(chessCtx, unit, state)
    chessManager.render()
  }, [state])

  useEffect(() => {
    const { isSelecting, selectingChess, from, to } = gameState
    const ctrlerCtx = ctrlerRef.current.getContext('2d');
    ctrlerCtx.canvas.height = unit * 11
    ctrlerCtx.canvas.width = unit * 10

    const controller = new Controller(ctrlerCtx, unit, state)
    if (from && to) {
      console.log(from, to);
      controller.drawState(from, to)
    }
    if (isSelecting)
      controller.drawSelecting(selectingChess)
  }, [gameState])

  return (
    <div className="canvas-container">
      <p>他们所有的设备和仪器彷佛都是有生命的。俥 俥 俥 1 亻</p>
      <canvas className="canvas canvas-controller" ref={ctrlerRef} onClick={(e) => onclick(e)}></canvas>
      <canvas className="canvas canvas-chess" ref={chessRef}></canvas>
      <canvas className="canvas canvas-board" ref={boardRef}></canvas>
    </div>
  );
};

export default Game;