import { Cell } from "types/cell";

export interface BoardProps {
  rows: number;
  cols: number;
  bombs: number;
}

export interface BoardState {
  grid: Cell[][];
}
