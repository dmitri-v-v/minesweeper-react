import React from "react";

import './Board.scss';

interface BoardProps {
  rows: number;
  cols: number;
}

const Board: React.FC<BoardProps> = ({rows, cols}) => {
  const style = { '--rows': rows, '--cols': cols } as React.CSSProperties;

  const grid = Array(rows).fill(null).map(() => Array(cols).fill(0));

  return (
    <div className="board" style={ style }>
      {grid.map((row, rowIndex) => row.map((col, colIndex) => {
        return <div className="cell" key={`${rowIndex}-${colIndex}`}>({rowIndex},{colIndex})</div>
      }))}
    </div>
  );
}

export default Board;