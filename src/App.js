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
  playSound,
  getRandomIntInclusive, getStepVariantArray
} from "./utils/gameUtils";
import ModalDialog from "./components/ModalDialog/ModalDialog";
import Notification from "./components/Notification/Notification";
import MyAudio from "./components/MyAudio/MyAudio";
import errorSound from "./components/MyAudio/error.mp3"
import correctSound from "./components/MyAudio/correct.mp3"
import bgSound from "./components/MyAudio/Medianoche.mp3"

import {useDispatch, useSelector} from "react-redux";
import {setAutoPlay, setDarkTheme, setHint, setMusicMute, setOptions, setSoundMute} from "./reducers/reposReducer";
import OptionsPanel from "./components/OptionsPanel/OptionsPanel";
import Statistics from "./components/Statistics/Startistics";
import { v4 as uuidv4 } from 'uuid'
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

let timerId = 0;


function App() {
  const [score, setScore] = useState(0);
  const [prevCol, setPrevCol] = useState(0);
  const [prevRow, setPrevRow] = useState(0);

  const [openOptions, setOpenOptions] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isFullScreen, setIsFullScree] = useState(false);

  const [av, setAv] = useState(false);

  let altPress, shiftPress, ctrlPress;

  const dispatch = useDispatch();
  const autoPlaySpeed = useSelector(state => state.repos.autoPlaySpeed);
  const darkTheme = useSelector(state => state.repos.darkTheme);

  const optionsStore = useSelector(state => {
    const options = state.repos.options;

    if ((options.hint) && (score !== 0)) {
      showHint(prevCol, prevRow)
    } else {
      hideHint();
    }

    if (options.music.mute) {
      playSound('.bgaudio', bgSound, options.music.volume);
    } else {
      playSound('.bgaudio', '', options.music.volume);
    }

    return options;
  })

  const autoPlay = useSelector(state => state.repos.autoPlay);

  // useHotkeys('ctrl+alt+n', () => clearAreaClick())
  // useHotkeys('ctrl+alt+h', () => dispatch(setHint(!optionsStore.hint)))
  // useHotkeys('ctrl+alt+s', () => setOpenStatistics(true))
  // useHotkeys('ctrl+alt+a', () => dispatch(setAutoPlay(!autoPlay)))
  // useHotkeys('ctrl+alt+z', () => {
  //   console.log('z', optionsStore.sound.mute)
  //   dispatch(setSoundMute(!optionsStore.sound.mute))
  // })
  // useHotkeys('ctrl+alt+m', () => dispatch(setMusicMute(!optionsStore.music.mute)))

  function keyDownEvent(event) {
    const codeKey = event.code;

    if ((codeKey === 'AltLeft') || (codeKey === 'AltRight')) {
      altPress = true;
    }

    if ((codeKey === 'ShiftRight') || (codeKey === 'ShiftLeft')) {
      shiftPress = true;
    }

    if ((codeKey === 'ControlLeft') || (codeKey === 'ControlRight')) {
      ctrlPress = true;
    }
  }

  function keyUpEvent(event) {
    const codeKey = event.code;

    if ((codeKey === 'AltLeft') || (codeKey === 'AltRight')) {
      altPress = false;
    }

    if ((codeKey === 'ShiftRight') || (codeKey === 'ShiftLeft')) {
      shiftPress = false;
    }

    if ((codeKey === 'ControlLeft') || (codeKey === 'ControlRight')) {
      ctrlPress = false;
    }

    if (ctrlPress && altPress && (codeKey === 'KeyN')) {
      console.log('CTRL + ALT + N - Новая Игра');

      clearAreaClick();

    } else if (ctrlPress && altPress && (codeKey === 'KeyH')) {
      console.log('CTRL + ALT + H - Включить подсказку', optionsStore.hint);

      dispatch(setHint(!optionsStore.hint))

    } else if (ctrlPress && altPress && (codeKey === 'KeyS')) {
      console.log('CTRL + ALT + S - Статистика');

      setOpenStatistics(true);

    } else if (ctrlPress && altPress && (codeKey === 'KeyA')) {
      console.log('CTRL + ALT + A - Автоигра');
      dispatch(setAutoPlay(!autoPlay))

    } else if (ctrlPress && altPress && (codeKey === 'KeyZ')) {
      console.log('CTRL + ALT + Z - Вкл/выкл звуки');
      dispatch(setSoundMute(!optionsStore.sound.mute))


    } else if (ctrlPress && altPress && (codeKey === 'KeyM')) {
      console.log('CTRL + ALT + M - Вкл/Выкл музыку');
      dispatch(setMusicMute(!optionsStore.music.mute))

    }
}

  useEffect(() => {
    const gameLogArray = JSON.parse(localStorage.getItem('gameLog'));
    const gameOptions = JSON.parse(localStorage.getItem('gameOptions'));

    console.log('Загружаем сохраненные настройки >>', gameOptions);

    if (gameOptions) {
      if ((gameOptions.options.music.mute) && (gameOptions.options.music.volume > 0)) {
        playSound('.bgaudio', bgSound, gameOptions.options.music.volume)
        setAv(true);
      }
    }

    if (gameLogArray) {
      loadSaveGame(gameLogArray);
    }

    if (gameOptions) {
      dispatch(setOptions(gameOptions.options));
      dispatch(setDarkTheme(gameOptions.darkTheme));
    }

  }, []);


  useEffect(() => {
    let varStepArray = [];

    const col = prevCol;
    const row = prevRow;

    console.log('[useEffect] prevCol, prevRow >>', col, row);

    if (autoPlay) {
      varStepArray = getStepVariantArray(col, row);

      varStepArray = varStepArray.filter((item) => {
        const el = getElementInGameArea(item.col, item.row);

        if ((el) && (el.innerText === '')) {
          return item;
        }
      });

      if (varStepArray.length !== 0) {
        let n = varStepArray.length - 1;
        n = getRandomIntInclusive(0, n);

        const el = getElementInGameArea(varStepArray[n].col, varStepArray[n].row);
        setTimeout(() => {el.click()}, autoPlaySpeed);

      } else {

      }
    }
  }, [prevCol, prevRow]);

  useEffect(() => {
    console.log('[useEffect] autoPlay >>', autoPlay, timerId);

    if ((autoPlay) && (timerId === 0)) {
      autoPlayStart(999);

      timerId = 999;

      console.log('Начало автоигры >>', timerId);

    } else {
      console.log('Окончание автоигры >>', timerId);

      clearInterval(timerId)
      timerId = 0;
    }

  }, [autoPlay]);

  useEffect(() => {

    console.log('1. useEffect [score] timerId, score >> ', timerId, score);

    if ((timerId > 0) && (score === 0)) {
      console.log('2. useEffect [score] timerId, score >> ', timerId, score);

      let row = getRandomIntInclusive(1, 10);
      let col = getRandomIntInclusive(1, 10);

      const el = getElementInGameArea(col,row);
      el.click();
    }
  }, [score]);


  function handleCloseModalDialog() {
    setOpenModal(false);
  }

  function handleOpenModalDialog() {
    let gameStatistics = JSON.parse(localStorage.getItem('gameStatistics')) || [];
    const date = new Date();

    gameStatistics.push({
      id: uuidv4(),
      date: date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-Ru'),
      score: score + 1
    });

    gameStatistics = gameStatistics.sort((a, b) => {
      return b.score - a.score;
    });

    if (gameStatistics.length > 10) {
      gameStatistics.pop();
    }

    localStorage.setItem('gameStatistics', JSON.stringify(gameStatistics));

    setOpenModal(true);
  }

  const handleOpenNotification = () => {
    console.log('optionsStore.sound.mute >>', optionsStore.sound.mute);

    if ((optionsStore.sound.mute) && (optionsStore.sound.volume > 0)) {
      playSound('.audio', errorSound, optionsStore.sound.volume);
    }

    setOpenNotification(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const toggleOptionsPanel = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenOptions(open);
  };

  const toggleStatisticsPanel = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenStatistics(open);
  };

  const toggleAboutPanel = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenAbout(open);
  };

  function setNewScore(event, col, row) {
    let xScore = 0;

    if ((optionsStore.sound.mute) && (optionsStore.sound.volume)) {
      playSound('.audio', correctSound, optionsStore.sound.volume);
    }

    event.target.classList.remove('emptyCell');
    event.target.classList.add('currentCell');

    xScore = score + 1;
    setScore(xScore);

    event.target.innerText = xScore;

    setGameLog(col, row, xScore);

    if (optionsStore.hint) {
      showHint(col, row);
    }

    setPrevCol(col);
    setPrevRow(row);
  }

  function cellClick(event) {
    const cCol = Number(event.target.dataset.col);
    const cRow = Number(event.target.dataset.row);
    const cScore = event.target.innerText;

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

  function autoPlayStart(tId = 0) {
    clearAreaClick();

    console.log('1. autoPlayStart timerId, score >> ', tId, score);

    if ((tId > 0) && (score === 0)) {
      console.log('2. autoPlayStart timerId, score >> ', tId, score);

      let row = getRandomIntInclusive(1, 10);
      let col = getRandomIntInclusive(1, 10);

      const el = getElementInGameArea(row,col);
      el.click();
    }
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScree(false);
    } else {
      document.getElementById('fsArea').requestFullscreen().catch((e) => {
        console.log('Full Screen error >>', e);
      })
      setIsFullScree(true);
    }
  }


  return (
    <div tabIndex="0" className="wrapper"  onKeyDown={ keyDownEvent } onKeyUp={ keyUpEvent }>
      <Header
        undoClick={ undo }
        newGameClick={ clearAreaClick }
        openSettings={ toggleOptionsPanel }
        openStatistics={ toggleStatisticsPanel }
        openAbout={ toggleAboutPanel }
      />

      <div id="fsArea" style={ darkTheme ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}>
        <InfoPanel score={ score } />

        <Container maxWidth="sm" >
          <GameArea onClick={cellClick}/>
        </Container>



        <div className="fullScreen" onClick={() => toggleFullScreen()}>
          {isFullScreen ? 'Выйти из полноэкранного режима' : 'Развернуть на весь экран'}
        </div>

      </div>

      <OptionsPanel
        isOpen={ openOptions }
        onClose={ toggleOptionsPanel }
      />

      <Statistics
        isOpen={ openStatistics }
        onClose={ toggleStatisticsPanel }
      />

      <About
        isOpen={ openAbout }
        onClose={ toggleAboutPanel }
      />

      <ModalDialog currentScore={score} isOpen={ openModal } onClose={ handleCloseModalDialog } onNewGame={ clearAreaClick }/>
      <Notification isOpen={ openNotification } onClose={ handleCloseNotification } soundMute={ false } />
      <MyAudio audioClass={'audio'} />
      <MyAudio audioClass={'bgaudio'} />
      <Footer />
    </div>
  );
}

export default App;
