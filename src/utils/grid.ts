import { Cell, CellState, CellValue } from "types/cell"

export function getSurroundingCells(grid: Cell[][], row: number, col: number): Cell[] {
  const surroundingCells: Cell[] = [];

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

export function revealNeighbouringCells(grid: Cell[][], row: number, col: number): Cell[][] {
  const neighbours = getSurroundingCells(grid, row, col);

  for (let cell of neighbours) {
    if (cell.state === CellState.Default && cell.value !== CellValue.Bomb) {
      grid[cell.row][cell.col] = {
        ...grid[cell.row][cell.col],
        state: CellState.Revealed
      };

      if (cell.value === CellValue.None) {
        revealNeighbouringCells(grid, cell.row, cell.col);
      }
    }
  }

  return grid;
}
