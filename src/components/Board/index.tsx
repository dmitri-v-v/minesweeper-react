import React from "react";

import './Board.scss';

import { BoardProps } from "@src/types/board";

const Board: React.FC<BoardProps> = ({board}) => {
  const style = { '--rows': board.rows, '--cols': board.cols } as React.CSSProperties;

  const grid = Array(board.rows).fill(null).map(() => Array(board.cols).fill(0));

  return (
    <div className="board" style={ style }>
      {grid.map((row, rowIndex) => row.map((_, colIndex) => {
        return <div className="cell" key={`${rowIndex}-${colIndex}`}>({rowIndex},{colIndex})</div>
      }))}
    </div>
  );
}

export default Board;