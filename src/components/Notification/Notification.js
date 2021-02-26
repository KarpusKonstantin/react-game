import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import bgSoundFile from "../MyAudio/Medianoche.mp3";

function Notification(props) {
  return (
    <>
      <Snackbar open={ props.isOpen } autoHideDuration={1000} onClose={props.onClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="error">Сюда ходить нельзя!</Alert>
      </Snackbar>

      { props.soundMute &&
        <audio autoPlay={true}  src={ bgSoundFile } />
      }
    </>
  )
}

export default Notification;
