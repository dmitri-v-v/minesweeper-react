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

    const initializedGrid = this.initializeBoard(this.props.rows, this.props.cols);
    const bombs = this.placeBombs(initializedGrid, this.props.numBombs);

    this.state = {
      grid: initializedGrid,
      bombs: bombs
    };
  }

  initializeBoard(rows: number, cols: number): Cell[][] {
    return Array(rows).fill(null).map((_, rowIndex) => 
      Array(cols).fill(null).map((_, colIndex) => {
        return {
          coordinates: { row: rowIndex, col: colIndex },
          state: CellState.Default,
          value: CellValue.None,
        } as Cell;
      })
    );
  }

  placeBombs(grid: Cell[][], bombs: number): CellCoordinates[] {
    let bombCounter = 0;
    const bombsPlaced: CellCoordinates[] = [];

    while (bombCounter < bombs) {
      const bombCol = Math.floor(Math.random() * this.props.cols);
      const bombRow = Math.floor(Math.random() * this.props.rows);

      if (grid[bombRow][bombCol].value !== CellValue.Bomb) {
        grid[bombRow][bombCol].value = CellValue.Bomb;
        bombsPlaced.push({ row: bombRow, col: bombCol });
        bombCounter++;

        // Increment CellValues of surrounding cells since there's now a bomb here:
        const surroundingCells = getSurroundingCells(grid, { row: bombRow, col: bombCol });

        for (const cell of surroundingCells) {
          if (cell.value !== CellValue.Bomb) {
            cell.value = incrementCellValue(cell.value);
          }
        }
      }
    }

    return bombsPlaced;
  }

  /**
   * Allows to clone the grid to avoid direct mutation when modifying it.
   */
  cloneGrid = (grid: Cell[][]): Cell[][] => grid.map((rowCells) => rowCells.map((cell) => ({ ...cell })));

  handleCellReveal = (coordinates: CellCoordinates): void => {
    this.setState((prevState) => {
      const newGrid = this.cloneGrid(prevState.grid);

      if (prevState.grid[coordinates.row][coordinates.col].value === CellValue.None) {
        return { grid: revealNeighbouringCells(newGrid, coordinates) };
      } else {
        newGrid[coordinates.row][coordinates.col].state = CellState.Revealed;
        return { grid: newGrid };
      }
    });
  }

  /**
   * Handles the explosion event by revealing all the other bombs.
   * 
   * @param coordinates 
   */
  handleExplosion = (coordinates: CellCoordinates) => {
    this.setState((prevState) => {
      const newGrid = this.cloneGrid(prevState.grid);

      // TODO: Update the Cell at `coordinates` background to red.

      for (const bombCoordinates of prevState.bombs) {
        if (newGrid[bombCoordinates.row][bombCoordinates.col].state !== CellState.Flagged) {
          newGrid[bombCoordinates.row][bombCoordinates.col].state = CellState.Revealed;
        }
      }

      return { grid: newGrid };
    });
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
