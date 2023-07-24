import React from "react";
import { Button } from '@mui/material';
import { CellProps, CellValue } from "types/cell";

interface CellState {
  isRevealed: boolean;
  isFlagged: boolean;
}

export default class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);

    this.state = {
      isRevealed: false,
      isFlagged: false
    };
  }

  handleCellClick = () => {
    const { isRevealed } = this.state;

    if (!isRevealed) {
      this.setState({ isRevealed: true });
    }

    if (this.props.value === CellValue.Bomb) {
      this.props.onExplosion(this.props.row, this.props.col);
    } else {
      this.props.onReveal(this.props.row, this.props.col);
    }
  };

  render() {
    const { isRevealed } = this.state;

    return (
      <Button variant={isRevealed ? "outlined" : "contained"} disabled={isRevealed} onClick={this.handleCellClick}>
        { isRevealed ? this.props.value : "?"}
      </Button>
    );
  }
}
