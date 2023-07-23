import React from "react";

import { Container } from '@mui/material';

import Board from "../Board";

import "./Minesweeper.scss";
import { stat } from "fs";

interface MinesweeperState {
  rows: number;
  cols: number;
  bombs: number;
  flags: number;
}

class Minesweeper extends React.Component<{}, MinesweeperState> {
  state: MinesweeperState = {
    rows: 5,
    cols: 7,
    bombs: 10,
    flags: 0
  };

  render() {
    return (
      <Container component='main' maxWidth='md'>
        <div className="center">
          <h1>React Minesweeper</h1>
          <Board rows={this.state.rows} cols={this.state.cols} />
        </div>
      </Container>
    );
  }
}

export default Minesweeper;