import React from "react";

import { Container } from '@mui/material';

import Board from "../Board";
import { BoardState } from "@src/types/board";
import { MinesweeperState } from "@src/types/minesweeper";

import "./Minesweeper.scss";


class Minesweeper extends React.Component<{}, MinesweeperState> {
  defaultBoard: BoardState = {
    cols: 7,
    rows: 5,
    bombs: 10
  };
  
  state: MinesweeperState = {
    board: this.defaultBoard,
    flags: 0
  };

  render() {
    return (
      <Container component='main' maxWidth='md'>
        <div className="center">
          <h1>React Minesweeper</h1>
          <Board board={this.state.board} />
        </div>
      </Container>
    );
  }
}

export default Minesweeper;