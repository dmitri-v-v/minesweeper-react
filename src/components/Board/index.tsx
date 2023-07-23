import React from "react";

import './Board.scss';

import { BoardProps } from "types/board";
import { CellState, CellValue } from "types/cell";
import { getSurroundingCells } from "utils/grid";
import { incrementCellValue } from "utils/cellUtils";

const Board: React.FC<BoardProps> = ({board}) => {
  const style = { '--rows': board.rows, '--cols': board.cols } as React.CSSProperties;

  const grid: CellState[][] = Array(board.rows)
    .fill(null)
    .map((_, rowIndex) => Array(board.cols)
      .fill(null)
      .map((_, colIndex) => {
        return {
          col: colIndex,
          row: rowIndex,
          value: CellValue.None,
          isRevealed: false
        } as CellState;
      })
    );

    // Fill the grid with bombs:
    const placeBombs = () => {
      let bombsPlaced = 0;

      while (bombsPlaced < board.bombs) {
        const bombCol = Math.floor(Math.random() * board.cols);
        const bombRow = Math.floor(Math.random() * board.rows);

        if (grid[bombRow][bombCol].value !== CellValue.Bomb) {
          grid[bombRow][bombCol].value = CellValue.Bomb;
          bombsPlaced++;

          // Increment CellValues of surrounding cells since there's now a bomb here:
          const surroundingCells = getSurroundingCells(grid, bombRow, bombCol);

          for (const cell of surroundingCells) {
            if (cell.value !== CellValue.Bomb) {
              cell.value = incrementCellValue(cell.value);
            }
          }
        }
      }
    };
    placeBombs();

  return (
    <div className="board" style={ style }>
      {grid.map((row, rowIndex) => row.map((_, colIndex) => {
        return <div className="cell" key={`${rowIndex}-${colIndex}`}>{grid[rowIndex][colIndex].value}</div>
      }))}
    </div>
  );
}

export default Board;