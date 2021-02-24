import React, {useState} from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function ModalDialog(props) {
  return (
    <Dialog
      open={ props.isOpen }
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
        <Button onClick={ props.onClose} color="primary">
          Неа
        </Button>
        <Button onClick={ props.onNewGame} color="primary" autoFocus>
          Ага
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default ModalDialog;
