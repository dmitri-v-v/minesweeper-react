import React from "react";
import { Button } from '@mui/material';
import { Cell, CellState, CellValue } from "types/cell";

interface CellProps {
  cell: Cell,
  onReveal: (row: number, col: number) => void;
  onExplosion: (row: number, col: number) => void;
}

interface CellComponentState {
  value: CellState;
}

export default class CellComponent extends React.Component<CellProps, CellComponentState> {
  constructor(props: CellProps) {
    super(props);

    this.state = {
      value: props.cell.state
    };
  }

  isRevealed = (): boolean => this.state.value === CellState.Revealed;
  isFlagged = (): boolean => this.state.value === CellState.Flagged;
  isBomb = (): boolean => this.props.cell.value === CellValue.Bomb;

  handleCellClick = () => {
    if (!this.isRevealed()) {
      this.setState({value: CellState.Revealed});
    }

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
