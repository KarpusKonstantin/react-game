import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import GameArea from "./components/GameArea/GameArea";
import Container from "@material-ui/core/Container";
import {
  getElementInGameArea,
  statusGameCheck,
  setGameLog,
  clearArea,
  showHint,
  hideHint,
  playSound
} from "./utils/gameUtils";
import ModalDialog from "./components/ModalDialog/ModalDialog";
import Notification from "./components/Notification/Notification";
import TemporaryDrawer from "./components/OptionsPanel/OptionsPanel";
import MyAudio from "./components/MyAudio/MyAudio";
import errorSound from "./components/MyAudio/error.mp3"
import correctSound from "./components/MyAudio/correct.mp3"
import bgSound from "./components/MyAudio/Medianoche.mp3"
import {useDispatch, useSelector} from "react-redux";
import {store} from "./reducers";
import {element} from "prop-types";


function App() {
  const [score, setScore] = useState(0);
  const [prevCol, setPrevCol] = useState(0);
  const [prevRow, setPrevRow] = useState(0);

  const optionsListener = useSelector(state => {
    const options = state.repos.options

    if (options.hint) {
      showHint(prevCol, prevRow)
    } else {
      hideHint();
    }

    return options;
  })

  const [options, setOptions] = useState({
    hint: false,
    infoSoundMute: true,
    infoSoundVolume: 1,
    bgSoundMute: false,
    bgSoundVolume: 1
  });

  const [openOptions, setOpenOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  function handleCloseModalDialog() {
    setOpenModal(false);
  }



  function handleOpenModalDialog() {
    setOpenModal(true);
  }

  const handleOpenNotification = () => {
    if (!options.infoSoundMute) {
      console.log('options.infoSoundVolume >> ', options);
      playSound('.audio', errorSound, options.infoSoundVolume);
    }

    setOpenNotification(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!open) {
      console.log('options >> ', options);
      localStorage.removeItem('gameOptions');
      localStorage.setItem('gameOptions', JSON.stringify(options));
    }

    setOpenOptions(open);
  };

  function setNewScore(event, col, row) {
    let xScore = 0;

    if (!options.infoSoundMute) {
      console.log('setNewScore volume >>', options.infoSoundVolume)
      playSound('.audio', correctSound, options.infoSoundVolume);
    }

    event.target.classList.remove('emptyCell');
    event.target.classList.add('currentCell');

    xScore = score + 1;
    setScore(xScore);

    event.target.innerText = xScore;

    setGameLog(col, row, xScore);

    if (options.hint) {
      showHint(col, row);
    }

    setPrevCol(col);
    setPrevRow(row);
  }

  function cellClick(event) {
    const cCol = Number(event.target.dataset.col);
    const cRow = Number(event.target.dataset.row);
    const cScore = event.target.innerText;

    // console.log(cCol, cRow, cScore);
    // console.log(prevCol, prevRow);

    if (score !== 0) {
      if (
        ((cCol === prevCol - 2) && (cRow === prevRow - 1) && (cScore === '')) ||
        ((cCol === prevCol - 1) && (cRow === prevRow - 2) && (cScore === '')) ||
        ((cCol === prevCol + 1) && (cRow === prevRow - 2) && (cScore === '')) ||
        ((cCol === prevCol + 2) && (cRow === prevRow - 1) && (cScore === '')) ||
        ((cCol === prevCol + 2) && (cRow === prevRow + 1) && (cScore === '')) ||
        ((cCol === prevCol + 1) && (cRow === prevRow + 2) && (cScore === '')) ||
        ((cCol === prevCol - 1) && (cRow === prevRow + 2) && (cScore === '')) ||
        ((cCol === prevCol - 2) && (cRow === prevRow + 1) && (cScore === ''))
      )
      {
        const prevEl = getElementInGameArea(prevCol, prevRow);

        prevEl.classList.remove('currentCell');
        prevEl.classList.add('useCell');

        setNewScore(event, cCol, cRow);

      } else {
        handleOpenNotification();

        return;
      }
    } else {
      setNewScore(event, cCol, cRow);
    }

    statusGameCheck(cCol, cRow, score, handleOpenModalDialog);
  }

  function undo() {
    const gameLogArray = JSON.parse(localStorage.getItem('gameLog'));

    if (gameLogArray && gameLogArray.length > 1) {
      let el = getElementInGameArea(prevCol, prevRow);

      el.innerText = '';
      el.classList.remove('currentCell');
      el.classList.add('emptyCell');

      gameLogArray.pop();
      const c = gameLogArray[gameLogArray.length - 1].col;
      const r = gameLogArray[gameLogArray.length - 1].row;
      const s = gameLogArray[gameLogArray.length - 1].score;

      el = getElementInGameArea(c, r);
      el.classList.remove('useCell');
      el.classList.add('currentCell');

      setPrevCol(c);
      setPrevRow(r);
      setScore(s);

      localStorage.setItem('gameLog', JSON.stringify(gameLogArray));
    } else {
      clearAreaClick();
    }
  }

  function clearAreaClick() {
    clearArea();

    handleCloseModalDialog();
    setScore(0);
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

  const handleOptionsChange = (event) => {
    console.log('event.target.name >> ', event.target.name);
    setOptions({ ...options, [event.target.name]: event.target.checked });

    if ((event.target.name === 'hint') && (event.target.checked === false)) {
      hideHint()
    } else if ((event.target.name === 'hint') && (event.target.checked === true)){
      showHint(prevCol, prevRow);
    }
  };

  useEffect(() => {

    if (options.hint) {
      showHint(prevCol, prevRow);
    }
  }, [options])

  useEffect(() => {
    const gameLogArray = JSON.parse(localStorage.getItem('gameLog'));
    const gameOptions = JSON.parse(localStorage.getItem('gameOptions'));

    console.log('gameOptions >>', gameOptions);

    // playSound('.audio', errorSound, options.bgSoundVolume);

    if (gameLogArray) {
      loadSaveGame(gameLogArray);
    }

    if (gameOptions) {
      setOptions(gameOptions);
    }

  }, []);

  return (
    <div>
      <Header
        undoClick={ undo }
        newGameClick={ clearAreaClick }
        openSettings={ toggleDrawer }
      />

      <TemporaryDrawer
        isOpen={ openOptions }
        onClose={ toggleDrawer }
        onUseHint={ options.hint }
        onClickHint={ handleOptionsChange }
      />

      <InfoPanel score={ score } />

      <Container maxWidth="sm">
        <GameArea onClick={cellClick}/>
      </Container>

      <ModalDialog isOpen={ openModal } onClose={ handleCloseModalDialog } onNewGame={ clearAreaClick }/>
      <Notification isOpen={ openNotification } onClose={ handleCloseNotification } soundMute={ false } />
      <MyAudio />
    </div>
  );
}

export default App;
