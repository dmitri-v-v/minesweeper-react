import React from "react";
import { Button } from '@mui/material';
import { Cell, CellCoordinates, CellState, CellValue } from "types/cell";

interface CellProps {
  cell: Cell,
  onReveal: (coordinates: CellCoordinates) => void;
  onExplosion: (coordinates: CellCoordinates) => void;
  onFlag: (coordinates: CellCoordinates) => void;
}

export default class CellComponent extends React.Component<CellProps> {
  isRevealed = (): boolean => this.props.cell.state === CellState.Revealed;
  isFlagged = (): boolean => this.props.cell.state === CellState.Flagged;
  isBomb = (): boolean => this.props.cell.value === CellValue.Bomb;

  showCellContent = (): string => {
    switch (this.props.cell.state) {
      case CellState.Default:
        return "❔";
      case CellState.Flagged:
        return "🚩";
      default:
        return this.props.cell.value.toString();
    }
  }

  handleClick = () => {
    if (!this.isFlagged()) {
      if (this.isBomb()) {
        this.props.onExplosion(this.props.cell.coordinates);
      } else {
        this.props.onReveal(this.props.cell.coordinates);
      }
    }
  };

  handleRightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.props.onFlag(this.props.cell.coordinates);    
  }

  render() {
    return (
      <Button 
        variant={this.isRevealed() ? "outlined" : "contained"}
        disabled={this.isRevealed()} 
        onClick={this.handleClick}
        onContextMenu={(e) => this.handleRightClick(e)}>
          { this.showCellContent() }
      </Button>
    );
  }
}
