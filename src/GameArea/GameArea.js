import React, { useState } from 'react';
import './gameArea.css'


function GameArea(props) {
  const [score, setScore] = useState(0);
  const [prevCol, setPrevCol] = useState(0);
  const [prevRow, setPrevRow] = useState(0);

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

      content.push(<div className='cell emptyCell' data-col={col} data-row={row} key={i} onClick={cellClick}/>);
    }

    return content;
  }

  function cellClick(event) {
    const cCol = Number(event.target.dataset.col);
    const cRow = Number(event.target.dataset.row);
    const cScore = event.target.innerText;

    console.log(cCol, cRow, cScore);
    console.log(prevCol, prevRow);


    if (score !== 0) {
      if (((cCol === prevCol - 2) && (cRow === prevRow - 1) && (cScore === '')) ||
      ((cCol === prevCol - 1) && (cRow === prevRow - 2) && (cScore === '')) ||
      ((cCol === prevCol + 1) && (cRow === prevRow - 2) && (cScore === '')) ||
      ((cCol === prevCol + 2) && (cRow === prevRow - 1) && (cScore === '')) ||
      ((cCol === prevCol + 2) && (cRow === prevRow + 1) && (cScore === '')) ||
      ((cCol === prevCol + 1) && (cRow === prevRow + 2) && (cScore === '')) ||
      ((cCol === prevCol - 1) && (cRow === prevRow + 2) && (cScore === '')) ||
      ((cCol === prevCol - 2) && (cRow === prevRow + 1) && (cScore === '')))
      {
        event.target.classList.remove('emptyCell');
        event.target.classList.add('useCell');

        setScore(score + 1);
        event.target.innerText = score;

        setPrevCol(cCol);
        setPrevRow(cRow);

      } else {
        console.log('eeewfew')
      }
    } else {
      event.target.classList.remove('emptyCell');
      event.target.classList.add('useCell');

      setScore(score + 1);
      event.target.innerText = score;

      setPrevCol(cCol);
      setPrevRow(cRow);
    }
  }

  return (
    <div className='gameArea'>
      {getGameArea(10)}
    </div>
  );
}

export default GameArea;
