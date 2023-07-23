import { CellState } from "types/cell"

export function getSurroundingCells(grid: CellState[][], row: number, col: number): CellState[] {
  const surroundingCells: CellState[] = [];

  const numRows = grid.length;
  const numCols = grid[0].length;

  // Define offsets to get the surrounding cell coordinates
  const offsets = [
    { dCol: -1, dRow: -1 },
    { dCol: -1, dRow: 0 },
    { dCol: -1, dRow: 1 },
    { dCol: 0, dRow: -1 },
    { dCol: 0, dRow: 1 },
    { dCol: 1, dRow: -1 },
    { dCol: 1, dRow: 0 },
    { dCol: 1, dRow: 1 },
  ];

  for (const offset of offsets) {
    const newCol = col + offset.dCol;
    const newRow = row + offset.dRow;

    // Check if the new coordinates are within bounds
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      surroundingCells.push(grid[newRow][newCol]);
    }
  }

  return surroundingCells;
}
