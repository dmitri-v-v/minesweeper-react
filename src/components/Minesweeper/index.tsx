import React from "react";

import { Container } from '@mui/material';

import Board from "components/Board";
import { BoardProps } from "types/board";
import { MinesweeperState } from "types/minesweeper";

import "./Minesweeper.scss";



class Minesweeper extends React.Component<{}, MinesweeperState> {
  static defaultBoard: BoardProps = {
    cols: 7,
    rows: 13,
    bombs: 10
  };
  
  state: MinesweeperState = {
    flags: 0
  };

  render() {
    return (
      <Container component='main' maxWidth='md'>
        <div className="center">
          <h1>React Minesweeper</h1>
          <Board {...Minesweeper.defaultBoard} />
        </div>
      </Container>
    );
  }
}

export default Minesweeper;