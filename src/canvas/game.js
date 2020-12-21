import React, { useEffect, useRef, useState } from "react";
import * as chessBoard from "./chessboard";
import * as chessManager from "./chessManager";
import { cfg, constants } from "./constants";
import * as controller from "./controller";
import { initState } from "./init";

const Game = (props) => {
  const ctrlerRef = useRef()
  const chessRef = useRef()
  const boardRef = useRef()
  // const [state, setState] = useState(initState)
  const {state, gameState, updateGameState} = props
  // const [gameState, setGameState] = useState({ isSelecting: false, selectingChess: null, from: null, to: null })
  const [unit, setUnit] = useState(66)

  const onclick = (e) => {
    const { isSelecting, selectingChess } = gameState
    let { r, c } = getClickedPos(e);

    // if not clicked on a chess point, return
    if (r < 0 || c < 0 || c > 8 || r > 9) {
      return;
    }

    let chess = lookup(r, c);
    console.log(chess);
    if (chess) {
      if (chess.side === gameState.turn) {
        if (chess === selectingChess) {
          updateGameState(prev => ({ ...prev, isSelecting: false, selectingChess: null }))
        }
        else {
          updateGameState(prev => ({ ...prev, isSelecting: true, selectingChess: chess }))
        }
      }
      else {
        if (isSelecting) {
          moveChess(r, c, selectingChess)
        }
      }
    }
    else {
      if (isSelecting) {
        moveChess(r, c, selectingChess)
      }
    }
  }

  const isValidNext = (nextStep, next) => {
    return nextStep.some(e => (e.row === next.row && e.col === next.col));
  }

  const moveChess = (r, c, chess) => {
    let nextStep = chess.getNextSteps(state)
    let next = { row: r, col: c }

    if (!isValidNext(nextStep, next))
      return

    let old = { ...chess }
    let newState = [...state]
    newState[chess.row][chess.col] = null
    newState[r][c] = chess
    chess.row = r
    chess.col = c
    props.updateState(newState)
    updateGameState(gameState => ({ ...gameState, isSelecting: false, selectingChess: null, from: { x: old.col, y: old.row }, to: { x: c, y: r } }))
  }

  const lookup = (r, c) => {
    return state[r][c]
  }

  const getClickedPos = (e) => {
    // const x = e.pageX - ctrlerRef.current.offsetLeft;
    // const y = e.pageY - ctrlerRef.current.offsetTop;

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    const nx = Math.round(x / unit);
    const ny = Math.round(y / unit);

    let aa = Math.abs(x - unit * nx) * Math.abs(x - unit * nx) + Math.abs(y - unit * ny) * Math.abs(y - unit * ny) < cfg.chessSize * cfg.chessSize

    return aa ? { c: nx - 1, r: ny - 1 } : { c: -1, r: -1 }
  }

  useEffect(() => {
    const ctrlerCtx = ctrlerRef.current.getContext('2d');
    ctrlerCtx.canvas.height = unit * 11
    ctrlerCtx.canvas.width = unit * 10

    const chessCtx = chessRef.current.getContext('2d');

    chessCtx.canvas.height = unit * 11
    chessCtx.canvas.width = unit * 10
    const boardCtx = boardRef.current.getContext('2d');

    boardCtx.canvas.height = unit * 11
    boardCtx.canvas.width = unit * 10

    chessBoard.drawBoard(boardCtx, unit);
  }, [])

  useEffect(() => {
    const chessCtx = chessRef.current.getContext('2d');

    chessManager.clear(chessCtx)
    chessManager.drawChess(chessCtx, unit, state)
  }, [state])

  useEffect(() => {
    const ctrlerCtx = ctrlerRef.current.getContext('2d');
    const { isSelecting, selectingChess, from, to } = gameState

    controller.clear(ctrlerCtx)

    if (isSelecting)
      controller.drawSelecting(ctrlerCtx, unit, selectingChess)
    if (from && to) {
      controller.drawState(ctrlerCtx, unit, from, to)
    }
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