import { cfg, constants } from "./constants";
import { Soldier, Cannon, Chariot, Horse, Elephant, Advisor, General } from './chess';

// init chess arr
const initArr = [
  new General(
    constants.sides.red,
    cfg.startPos.red.general[0],
    constants.types.general
  ),
  new General(
    constants.sides.black,
    cfg.startPos.black.general[0],
    constants.types.general
  ),

  new Advisor(
    constants.sides.red,
    cfg.startPos.red.advisor[0],
    constants.types.advisor
  ),
  new Advisor(
    constants.sides.red,
    cfg.startPos.red.advisor[1],
    constants.types.advisor
  ),
  new Advisor(
    constants.sides.black,
    cfg.startPos.black.advisor[0],
    constants.types.advisor
  ),
  new Advisor(
    constants.sides.black,
    cfg.startPos.black.advisor[1],
    constants.types.advisor
  ),

  new Elephant(
    constants.sides.red,
    cfg.startPos.red.elephant[0],
    constants.types.elephant
  ),
  new Elephant(
    constants.sides.red,
    cfg.startPos.red.elephant[1],
    constants.types.elephant
  ),
  new Elephant(
    constants.sides.black,
    cfg.startPos.black.elephant[0],
    constants.types.elephant
  ),
  new Elephant(
    constants.sides.black,
    cfg.startPos.black.elephant[1],
    constants.types.elephant
  ),

  new Horse(
    constants.sides.red,
    cfg.startPos.red.horse[0],
    constants.types.horse
  ),
  new Horse(
    constants.sides.red,
    cfg.startPos.red.horse[1],
    constants.types.horse
  ),
  new Horse(
    constants.sides.black,
    cfg.startPos.black.horse[0],
    constants.types.horse
  ),
  new Horse(
    constants.sides.black,
    cfg.startPos.black.horse[1],
    constants.types.horse
  ),

  new Chariot(
    constants.sides.red,
    cfg.startPos.red.chariot[0],
    constants.types.chariot
  ),
  new Chariot(
    constants.sides.red,
    cfg.startPos.red.chariot[1],
    constants.types.chariot
  ),
  new Chariot(
    constants.sides.black,
    cfg.startPos.black.chariot[0],
    constants.types.chariot
  ),
  new Chariot(
    constants.sides.black,
    cfg.startPos.black.chariot[1],
    constants.types.chariot
  ),

  new Cannon(
    constants.sides.red,
    cfg.startPos.red.cannon[0],
    constants.types.cannon
  ),
  new Cannon(
    constants.sides.red,
    cfg.startPos.red.cannon[1],
    constants.types.cannon
  ),
  new Cannon(
    constants.sides.black,
    cfg.startPos.black.cannon[0],
    constants.types.cannon
  ),
  new Cannon(
    constants.sides.black,
    cfg.startPos.black.cannon[1],
    constants.types.cannon
  ),

  new Soldier(
    constants.sides.red,
    cfg.startPos.red.soldier[0],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.red,
    cfg.startPos.red.soldier[1],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.red,
    cfg.startPos.red.soldier[2],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.red,
    cfg.startPos.red.soldier[3],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.red,
    cfg.startPos.red.soldier[4],
    constants.types.soldier
  ),

  new Soldier(
    constants.sides.black,
    cfg.startPos.black.soldier[0],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.black,
    cfg.startPos.black.soldier[1],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.black,
    cfg.startPos.black.soldier[2],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.black,
    cfg.startPos.black.soldier[3],
    constants.types.soldier
  ),
  new Soldier(
    constants.sides.black,
    cfg.startPos.black.soldier[4],
    constants.types.soldier
  )
];
const state = []

const initChessboard = () => {
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let c = null;
      row.push(c);
    }
    state.push(row);
  }
  console.log(state.length);
  initArr.forEach(chess => {
    putChess(chess);
  });
}

const putChess = (chess) => {
  // put a chess to its current position
  // called when chess position have changed
  state[chess.row][chess.col] = chess;
}

export const initState = () => {
  if (!state.length)
    initChessboard()
  return state
}