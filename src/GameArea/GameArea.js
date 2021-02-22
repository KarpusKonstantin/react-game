import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

import './gameArea.css'
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";


function GameArea(props) {
  const [score, setScore] = useState(0);
  const [prevCol, setPrevCol] = useState(0);
  const [prevRow, setPrevRow] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

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

      content.push(<div className='cell emptyCell' id={`col${col}row${row}`} data-col={col} data-row={row} key={i} onClick={cellClick}/>);
    }

    return content;
  }

  function getElementInGameArea(col, row) {
    const id = `col${col}row${row}`;
    return document.getElementById(id);
  }


  function setGameLog(col, row, score) {
    let gameLogArray = JSON.parse(localStorage.getItem('gameLog')) || [];

    gameLogArray.push({col, row, score});

    localStorage.setItem('gameLog', JSON.stringify(gameLogArray));
  }

  function statusGameCheck(cCol, cRow, score) {
    let xCount = 0;

    if  (((cCol - 2) >= 1) && ((cRow - 1) >= 1)) {
      if (getElementInGameArea((cCol - 2), (cRow - 1)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol - 2) >= 1) && ((cRow - 2) >= 1)) {
      if (getElementInGameArea((cCol - 1), (cRow - 2)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol + 1) <= 10) && ((cRow - 2) >= 1)) {
      if (getElementInGameArea((cCol + 1), (cRow - 2)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol + 2) <= 10) && ((cRow - 1) >= 1)) {
      if (getElementInGameArea((cCol + 2), (cRow - 1)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol + 2) <= 10) && ((cRow + 1) <= 10)) {
      if (getElementInGameArea((cCol + 2), (cRow + 1)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol + 1) <= 10) && ((cRow + 2) <= 10)) {
      if (getElementInGameArea((cCol + 1), (cRow + 2)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol - 1) >= 1) && ((cRow + 2) <= 10)) {
      if (getElementInGameArea((cCol - 1), (cRow + 2)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if (((cCol - 2) >= 1) && ((cRow + 1) <= 10)) {
      if (getElementInGameArea((cCol - 2), (cRow + 1)).innerText !== '') {
        xCount = xCount + 1;
      }
    } else xCount = xCount + 1;

    if ((xCount === 8) && (score !== 100)) {
      handleClickOpen();
    }

    //
  //   if MaxCount = 100 {
  //   begin
  //   ShowMessage('Вы прошли игру!!!!');
  //   Form4AddRecords.ShowModal;
  //   SGField.Enabled = false;
  //   end;
  //
  //
  }

  function cellClick(event) {
    const cCol = Number(event.target.dataset.col);
    const cRow = Number(event.target.dataset.row);
    const cScore = event.target.innerText;
    let xScore = 0;

    // console.log(cCol, cRow, cScore);
    // console.log(prevCol, prevRow);


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
        const prevEl = getElementInGameArea(prevCol, prevRow);

        prevEl.classList.remove('currentCell');
        prevEl.classList.add('useCell');

        event.target.classList.remove('emptyCell');
        event.target.classList.add('currentCell');

        xScore = score + 1;
        setScore(xScore);

        event.target.innerText = xScore;

        setGameLog(cCol, cRow, xScore);

        setPrevCol(cCol);
        setPrevRow(cRow);

      } else {
        handleClickOpenSnackBar()
        return;
      }
    } else {
      event.target.classList.remove('emptyCell');
      event.target.classList.add('currentCell');

      xScore = score + 1;
      setScore(xScore);

      event.target.innerText = xScore;

      setGameLog(cCol, cRow, xScore);

      setPrevCol(cCol);
      setPrevRow(cRow);
    }

    statusGameCheck(cCol, cRow, score);
  }

  function loadSaveGame(gameLogArray) {
    gameLogArray.forEach((item, idx, array) => {
      const el = getElementInGameArea(item.col, item.row);
      el.innerText = item.score;
      el.classList.remove('emptyCell');

      if (idx === array.length - 1) {
        el.classList.add('currentCell');
        setScore(item.score);
        setPrevCol(item.col);
        setPrevRow(item.row);
      } else {
        el.classList.add('useCell');
      }
    });
  }

  useEffect(() => {
    const gameLogArray = JSON.parse(localStorage.getItem('gameLog'));
    if (gameLogArray) {
      loadSaveGame(gameLogArray);
    }
  }, [props.counter]);

  return (
    <div>
      <div className="currentScore">
        Текущий счет: { score }
      </div>
      <div className='gameArea'>
        {getGameArea(10)}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Хотите повторить?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вам не удалось набрать максимальное количество баллов.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Неа
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ага
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackBar} autoHideDuration={1000} onClose={handleCloseSnackBar} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="error">Сюда ходить нельзя!</Alert>
      </Snackbar>

    </div>

  );
}

export default GameArea;
