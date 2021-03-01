import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

import areaPicture from "./area.jpg"
import {setAutoPlay, setHint, setSoundMute} from "../../reducers/reposReducer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardRoot: {
    maxWidth:'400px',
  },
  cardMedia: {
    height: 400,
    width: 400
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function About(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={props.isOpen} onClose={props.onClose(false)} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.onClose(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Описание игры "Ход конем"
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: '100%', width: '100%' }}>
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={areaPicture}
                title="Игровое поле"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Правила игры
                </Typography>
                <Typography variant="body2" color="textSecondary" component="h5">
                  Основная задача игры - заполнить все ячейки цифрами от 1 до 100 (цифры проставляются автоматически). Ходить вы можете, только буквой "Г" (конем) как показано на рисунке.<br/><br/>
                  <strong>Горячие клавиши: </strong><br/>
                  1) CTRL + ALT + N - Новая Игра <br/>
                  2) CTRL + ALT + H - Включить подсказку<br/>
                  3) CTRL + ALT + S - Статистика<br/>
                  4) CTRL + ALT + A - Автоигра<br/>
                  5) CTRL + ALT + Z - Вкл/выкл звуки<br/>
                  6) CTRL + ALT + M - Вкл/Выкл музыку<br/>

                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}
