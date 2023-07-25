import React from "react";
import { Button } from '@mui/material';
import { Cell, CellCoordinates, CellState, CellValue } from "types/cell";

interface CellProps {
  cell: Cell,
  onReveal: (coordinates: CellCoordinates) => void;
  onExplosion: (coordinates: CellCoordinates) => void;
}

export default class CellComponent extends React.Component<CellProps> {
  isRevealed = (): boolean => this.props.cell.state === CellState.Revealed;
  isFlagged = (): boolean => this.props.cell.state === CellState.Flagged;
  isBomb = (): boolean => this.props.cell.value === CellValue.Bomb;

  handleCellClick = () => {
    if (this.isBomb()) {
      this.props.onExplosion(this.props.cell.coordinates);
    } else {
      this.props.onReveal(this.props.cell.coordinates);
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
