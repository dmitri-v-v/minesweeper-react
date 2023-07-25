import React from "react";
import { Button } from '@mui/material';
import { Cell, CellState, CellValue } from "types/cell";

interface CellProps {
  cell: Cell,
  onReveal: (row: number, col: number) => void;
  onExplosion: (row: number, col: number) => void;
}

export default class CellComponent extends React.Component<CellProps> {
  isRevealed = (): boolean => this.props.cell.state === CellState.Revealed;
  isFlagged = (): boolean => this.props.cell.state === CellState.Flagged;
  isBomb = (): boolean => this.props.cell.value === CellValue.Bomb;

  handleCellClick = () => {
    if (this.isBomb()) {
      this.props.onExplosion(this.props.cell.row, this.props.cell.col);
    } else {
      this.props.onReveal(this.props.cell.row, this.props.cell.col);
    }
  };

  render() {
    return (
      <Button 
        variant={this.isRevealed() ? "outlined" : "contained"}
        disabled={this.isRevealed()} 
        onClick={this.handleCellClick}>
        { this.isRevealed() ? this.props.cell.value : "?"}
      </Button>
    );
  }
}
