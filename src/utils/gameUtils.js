import React from 'react';
import errorSound from "../components/MyAudio/error.mp3";

export function getElementInGameArea(col, row) {
  const id = `col${col}row${row}`;

  if (document) {
    return document.getElementById(id);
  } else {
    console.log('getElementInGameArea >> нет document ');
  }
}

export function statusGameCheck(col, row, score, cb) {
  let xCount = 0;

  if  (((col - 2) >= 1) && ((row - 1) >= 1)) {
    if (getElementInGameArea((col - 2), (row - 1)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col - 2) >= 1) && ((row - 2) >= 1)) {
    if (getElementInGameArea((col - 1), (row - 2)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col + 1) <= 10) && ((row - 2) >= 1)) {
    if (getElementInGameArea((col + 1), (row - 2)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col + 2) <= 10) && ((row - 1) >= 1)) {
    if (getElementInGameArea((col + 2), (row - 1)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col + 2) <= 10) && ((row + 1) <= 10)) {
    if (getElementInGameArea((col + 2), (row + 1)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col + 1) <= 10) && ((row + 2) <= 10)) {
    if (getElementInGameArea((col + 1), (row + 2)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col - 1) >= 1) && ((row + 2) <= 10)) {
    if (getElementInGameArea((col - 1), (row + 2)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if (((col - 2) >= 1) && ((row + 1) <= 10)) {
    if (getElementInGameArea((col - 2), (row + 1)).innerText !== '') {
      xCount = xCount + 1;
    }
  } else xCount = xCount + 1;

  if ((xCount === 8) && (score !== 100)) {
    cb();
  }

  if (score === 100) {
    return '1';
  }
}

export function setGameLog(col, row, score) {
  let gameLogArray = JSON.parse(localStorage.getItem('gameLog')) || [];

  gameLogArray.push({col, row, score});

  localStorage.setItem('gameLog', JSON.stringify(gameLogArray));
}

export function clearArea() {
  let cells = document.querySelectorAll('.cell');

  cells.forEach((item) => {
    item.innerText = '';
    item.classList.remove('currentCell');
    item.classList.remove('useCell');
    item.classList.remove('hintCell');

    if (!item.classList.contains('emptyCell')) {
      item.classList.add('emptyCell');
    }
  });

  localStorage.removeItem('gameLog');
}

export function hideHint() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((item) => {
    item.classList.remove('hintCell');
    if (item.innerText === '') {
      item.classList.add('emptyCell');
    }
  });
}

export function showHint(col, row) {
  const hintArray = [];

  hideHint();

  hintArray.push({col: col - 2, row: row - 1});
  hintArray.push({col: col - 1, row: row - 2});
  hintArray.push({col: col + 1, row: row - 2});
  hintArray.push({col: col + 2, row: row - 1});
  hintArray.push({col: col + 2, row: row + 1});
  hintArray.push({col: col + 1, row: row + 2});
  hintArray.push({col: col - 1, row: row + 2});
  hintArray.push({col: col - 2, row: row + 1});

  hintArray.forEach((item) => {
    const el = getElementInGameArea(item.col, item.row);

    if ((el) && (el.innerText === '')) {
      el.classList.remove('emptyCell');
      el.classList.add('hintCell');
    }
  });
}

export function playSound(selector, src, volume) {
  if (!document) {
    console.log('Не найден объуйкт document [playSound]');
    return ;
  }

  console.log('volume >>', volume)

  const audio = document.querySelector(selector);


  if (audio) {
    audio.setAttribute('src', src);

    audio.autoplay = true;
    audio.volume = volume;
  } else {
    console.log('Не найден элемент для воспроизведения!');
  }
}
