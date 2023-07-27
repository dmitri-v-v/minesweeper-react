import React from "react";
import { connect } from 'react-redux';
import { Button } from '@mui/material';

import { Cell, CellCoordinates, CellState, CellValue } from "types/cell";
import { addFlag, removeFlag } from 'store/flagsSlice';

interface CellProps {
  cell: Cell,
  onReveal: (coordinates: CellCoordinates) => void;
  onExplosion: (coordinates: CellCoordinates) => void;
  addFlag: (coords: CellCoordinates) => void;
  removeFlag: (coords: CellCoordinates) => void;
}

class CellComponent extends React.Component<CellProps> {
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

  handleRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    if(!this.isRevealed()) {
      if (this.isFlagged()) {
        this.props.removeFlag(this.props.cell.coordinates);
      } else {
        this.props.addFlag(this.props.cell.coordinates);
      }
    }
  }

  render() {
    return (
      <Button 
        variant={this.isRevealed() ? "outlined" : "contained"}
        onClick={this.handleClick}
        onContextMenu={(e) => this.handleRightClick(e)}>
          { this.showCellContent() }
      </Button>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addFlag,
  removeFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(CellComponent);