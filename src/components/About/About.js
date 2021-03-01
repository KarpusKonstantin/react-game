import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {DataGrid} from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getStatistics() {
  const columnsData = [
    { field: 'date', headerName: 'Дата игры', width: 250 },
    { field: 'score', headerName: 'Набранные очки', width: 250 },
  ];
  const rowsData = JSON.parse(localStorage.getItem('gameStatistics')) || [];

  const data = {
    columns: columnsData,
    rows: rowsData
  }

  console.log('Статистика >>', data);

  return data;
}

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

        </div>
      </Dialog>
    </div>
  );
}
