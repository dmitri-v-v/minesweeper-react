export interface BoardState {
  rows: number;
  cols: number;
  bombs: number;
}

export interface BoardProps {
  board: BoardState;
}
