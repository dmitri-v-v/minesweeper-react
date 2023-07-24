export enum CellValue {
  None = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Bomb = '💣'
}

export enum CellState {
  Default,
  Revealed,
  Flagged
}

export type Cell = {
  state: CellState,
  value: CellValue,
  row: number,
  col: number
}
