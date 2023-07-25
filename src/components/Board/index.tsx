import React from "react";

import CellComponent from "components/Cell";
import { BoardProps } from "types/board";
import { Cell, CellCoordinates, CellState, CellValue } from "types/cell";
import { getSurroundingCells, revealNeighbouringCells } from "utils/grid";
import { incrementCellValue } from "utils/cellUtils";

import './Board.scss';

interface BoardState {
  grid: Cell[][];
  bombs: CellCoordinates[];
}

export default class Board extends React.Component<BoardProps, BoardState> {
  
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      grid: this.initializeBoard(props.rows, props.cols, props.numBombs),
      bombs: []
    };
  }

  initializeBoard(rows: number, cols: number, bombs: number): Cell[][] {
    const grid: Cell[][] = Array(rows)
      .fill(null)
      .map((_, rowIndex) => Array(cols)
        .fill(null)
        .map((_, colIndex) => {
          return {
            coordinates: { row: rowIndex, col: colIndex },
            state: CellState.Default,
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
        const surroundingCells = getSurroundingCells(grid, { row: bombRow, col: bombCol });

        for (const cell of surroundingCells) {
          if (cell.value !== CellValue.Bomb) {
            cell.value = incrementCellValue(cell.value);
          }
        }
      }
    }

    return grid;
  }

  updateCellStateInGrid = (coordinates: CellCoordinates): void => {
    this.setState((prevState) => {
      const grid = [...prevState.grid];
      grid[coordinates.row][coordinates.col].state = CellState.Revealed;
      return { grid };
    });
  }

  handleCellReveal= (coordinates: CellCoordinates): void => {
    this.updateCellStateInGrid(coordinates);

    if (this.state.grid[coordinates.row][coordinates.col].value === CellValue.None) {
      // Clone the grid and cells to avoid direct mutation:
      let newGrid = this.state.grid.map((rowCells) => rowCells.map((cell) => ({ ...cell })));
      this.setState({ grid: revealNeighbouringCells(newGrid, coordinates) });
    }
  }

  handleExplosion = (coordinates: CellCoordinates) => {
    this.updateCellStateInGrid(coordinates);

    // TODO: Update Cell's background to red.

    // TODO: reveal all other bombs.
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
