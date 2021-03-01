import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UndoIcon from "@material-ui/icons/Undo";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import PlayIcon from "@material-ui/icons/PlayArrow";

import './header.css'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import {useDispatch, useSelector} from "react-redux";
import {setAutoPlay, setHint} from "../../reducers/reposReducer";

function Header(props) {
  const dispatch = useDispatch();
  const autoPlay = useSelector(state => state.repos.autoPlay)

  function autoPlayChange(event) {
    dispatch(setAutoPlay(event.target.checked));
  }

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Игра "Ход конем"
          </Typography>

          <Button variant="contained" color="secondary" startIcon={<UndoIcon />} onClick={props.undoClick}>Отменить ход</Button>
          <Button variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={props.newGameClick}>Новая игра</Button>

          <FormControlLabel
            control={< Switch checked={ autoPlay } onChange={ autoPlayChange } name="hint" /> }
            label="Автоигра"
          />

          <Button variant="contained" color="default" startIcon={<SettingsIcon />} onClick={props.openSettings(true)}>Настройки</Button>
          <Button variant="contained" color="default" startIcon={<RefreshIcon />} onClick={props.openStatistics(true)}>Статистика</Button>
          <Button variant="contained" color="default" startIcon={<RefreshIcon />}>Об игре</Button>

        </Toolbar>
      </AppBar>
      <Toolbar/>
    </header>
  )
}

export default Header;
