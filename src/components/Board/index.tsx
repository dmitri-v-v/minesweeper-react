import React from "react";

import './Board.scss';

interface BoardProps {
  rows: number;
  cols: number;
}

const Board: React.FC<BoardProps> = ({rows, cols}) => {
  const grid = Array(rows).fill(null).map(() => Array(cols).fill(0));
  const style = { '--rows': rows, '--cols': cols } as React.CSSProperties;

  return (
    <div className="board" style={ style }>
      {grid.map((row, rowIndex) => row.map((col, colIndex) => <div>({rowIndex},{colIndex})</div>))}
    </div>
  );
}

export default Board;