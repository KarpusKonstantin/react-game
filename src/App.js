import React from 'react';
import './App.css';
import GameArea from "./GameArea/GameArea";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UndoIcon from '@material-ui/icons/Undo';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';

function App() {

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Игра "Ход конем"
          </Typography>

          <Button variant="contained" color="secondary" startIcon={<UndoIcon />} >Отменить ход</Button>
          <Button variant="contained" color="secondary" startIcon={<RefreshIcon />}>Новая игра</Button>

          <Button variant="contained" color="default" startIcon={<SettingsIcon />}>Настройки</Button>
          <Button variant="contained" color="default" startIcon={<RefreshIcon />}>Статистика</Button>
          <Button variant="contained" color="default" startIcon={<RefreshIcon />}>Об игре</Button>

        </Toolbar>
      </AppBar>
      <Toolbar/>

      <Container maxWidth="sm">
        <GameArea />
      </Container>
    </div>

  );
}

export default App;
