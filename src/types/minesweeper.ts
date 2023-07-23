import { BoardState } from "@src/types/board";

export interface MinesweeperState {
  board: BoardState,
  flags: number
}
