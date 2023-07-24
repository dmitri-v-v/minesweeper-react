import React from "react";
import { Button } from '@mui/material';
import { CellState } from "types/cell";

interface CellProps {
  cellState: CellState;
  onReveal: (row: number, col: number) => void;
}

export default class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.state = props.cellState;
  }

  handleCellClick = () => {
    const { row, col, isRevealed } = this.state;
    
    // Change the 'isRevealed' value and update the state
    if (!isRevealed) {
      this.setState({ isRevealed: true});
    }

    this.props.onReveal(row, col);
  };

  render() {
    const { value, isRevealed } = this.state;

    return (
      <Button variant={isRevealed ? "outlined" : "contained"} disabled={isRevealed} onClick={this.handleCellClick}>
        { isRevealed ? value : "?"}
      </Button>
    );
  }
}
