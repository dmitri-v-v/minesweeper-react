import { CellCoordinates } from "types/cell";

export interface BoardProps {
  rows: number;
  cols: number;
  numBombs: number;
  flags: CellCoordinates[];
}
