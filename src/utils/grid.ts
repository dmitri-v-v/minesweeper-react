import { Cell, CellCoordinates, CellState, CellValue } from "types/cell"

export function getSurroundingCells(grid: Cell[][], coordinates: CellCoordinates): Cell[] {
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
    const newCol = coordinates.col + offset.dCol;
    const newRow = coordinates.row + offset.dRow;

    // Check if the new coordinates are within bounds
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      surroundingCells.push(grid[newRow][newCol]);
    }
  }

  return surroundingCells;
}

export function revealNeighbouringCells(grid: Cell[][], coordinates: CellCoordinates): Cell[][] {
  // Reveal the cell at coordinates first:
  grid[coordinates.row][coordinates.col].state = CellState.Revealed;
  
  const neighbours = getSurroundingCells(grid, coordinates);

  for (let cell of neighbours) {
    if (cell.state === CellState.Default && cell.value !== CellValue.Bomb) {
      const {row, col} = cell.coordinates;
      
      grid[row][col] = {
        ...grid[row][col],
        state: CellState.Revealed
      };

      if (cell.value === CellValue.None) {
        revealNeighbouringCells(grid, cell.coordinates);
      }
    }
  }

  return grid;
}
