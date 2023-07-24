export interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  onReveal: (row: number, col: number) => void;
  onExplosion: (row: number, col: number) => void;
}

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
  Bomb = '💣',
}
