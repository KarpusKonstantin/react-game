import React, {useEffect, useState} from 'react';

import './gameArea.css'


function GameArea({ onClick }) {

   function getGameArea (num) {
    let content = [];
    let n = (num * num) + 1;

    for (let i = 1; i < n; i++) {
      let x = i % num;

      let col = 0;
      let row = 0;

      if (x > 0) {
        col = x;
        row = Math.trunc(i / num) === 0 ? 1 : Math.trunc(i / num) + 1;
      } else {
        col = num;
        row = i / num;
      }

      content.push(
        <div
          className='cell emptyCell'
          id={`col${col}row${row}`}
          data-col={col}
          data-row={row}
          key={i}
          onClick={(event) => onClick(event) }/>);
    }

    return content;
  }

  return (
    <div className='gameArea'>
      { getGameArea(10) }
    </div>
  );
}

export default GameArea;
