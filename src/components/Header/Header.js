import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UndoIcon from "@material-ui/icons/Undo";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import TableIcon from "@material-ui/icons/TableChart";

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
    <div>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" noWrap>
            Игра "Ход конем"
          </Typography>

          <div className="centerButton">
            <Button variant="contained" color="secondary" startIcon={<UndoIcon />} onClick={props.undoClick}>Отменить ход</Button>
            <Button variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={props.newGameClick}>Новая игра</Button>

          </div>
          <div className="autoPlay">
            <FormControlLabel
              control={< Switch checked={ autoPlay } onChange={ autoPlayChange } name="hint" /> }
              label="Автоигра (ctrl+alt+a)"
            />
          </div>

          <div className="leftButton">
            <Button variant="contained" color="default" startIcon={<SettingsIcon />} onClick={props.openSettings(true)}>Настройки</Button>
            <Button variant="contained" color="default" startIcon={<TableIcon />} onClick={props.openStatistics(true)}>Статистика</Button>
            <Button variant="contained" color="default" startIcon={<HelpIcon />} onClick={props.openAbout(true)}>Об игре</Button>
          </div>


        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
