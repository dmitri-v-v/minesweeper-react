import React from "react";

import CellComponent from "components/Cell";
import { BoardProps, BoardState } from "types/board";
import { Cell, CellState, CellValue } from "types/cell";
import { getSurroundingCells } from "utils/grid";
import { incrementCellValue } from "utils/cellUtils";

import './Board.scss';

export default class Board extends React.Component<BoardProps, BoardState> {
  
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      grid: this.initializeBoard(props.rows, props.cols, props.bombs),
    };
  }

  initializeBoard(rows: number, cols: number, bombs: number): Cell[][] {
    const grid: Cell[][] = Array(rows)
      .fill(null)
      .map((_, rowIndex) => Array(cols)
        .fill(null)
        .map((_, colIndex) => {
          return {
            col: colIndex,
            row: rowIndex,
            value: CellValue.None,
          } as Cell;
        })
      );

    return this.placeBombs(grid, bombs);
  }

  placeBombs(grid: Cell[][], bombs: number): Cell[][] {
    let bombsPlaced = 0;

    while (bombsPlaced < bombs) {
      const bombCol = Math.floor(Math.random() * this.props.cols);
      const bombRow = Math.floor(Math.random() * this.props.rows);

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

    return grid;
  }

  updateCellStateInGrid(row: number, col: number): void {
    this.setState((prevState) => {
      const grid = [...prevState.grid];
      grid[row][col].state = CellState.Revealed;
      return { grid };
    });
  }

  handleCellReveal(row: number, col:number): void {
    this. updateCellStateInGrid(row, col);
  
    // TODO: Reveal all neighbours.
    console.log(`Revealed cell at (${row+1},${col+1})`);
  }

  handleExplosion = (row: number, col: number) => {
    this. updateCellStateInGrid(row, col);

    // TODO: Update Cell's background to red.

    // TODO: reveal all other bombs.
    console.log(`DEAD because of bomb at (${row+1},${col+1})`);
  }

  render() {
    const style = { '--rows': this.props.rows, '--cols': this.props.cols } as React.CSSProperties;
    const grid = this.state.grid;

    return (
      <div className="board" style={ style }>
        {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
          <CellComponent 
            cell={cell}
            key={`${rowIndex}-${colIndex}`}
            onReveal ={this.handleCellReveal}
            onExplosion={this.handleExplosion}
          />
        )))}
      </div>
    );
  }
}
