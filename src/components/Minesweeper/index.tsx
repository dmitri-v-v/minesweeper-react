import React from "react";

import { Container } from '@mui/material';

import Board from "components/Board";
import { BoardProps } from "types/board";

import "./Minesweeper.scss";

interface MinesweeperState {
  flags: number
}

class Minesweeper extends React.Component<{}, MinesweeperState> {
  static defaultProps: BoardProps = {
    cols: 7,
    rows: 13,
    numBombs: 10
  };
  
  state: MinesweeperState = {
    flags: 0
  };

  render() {
    return (
      <Container component='main' maxWidth='md'>
        <div className="center">
          <h1>React Minesweeper</h1>
          <Board {...Minesweeper.defaultProps} />
        </div>
      </Container>
    );
  }
}

export default Minesweeper;