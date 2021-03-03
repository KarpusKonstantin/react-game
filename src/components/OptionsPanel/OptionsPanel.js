import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import './optionsPanel.css'
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import VolumeSettings from "../VolumeSettings/VolumeSettings";
import {useDispatch, useSelector} from "react-redux";
import {setAutoPlaySpeed, setHint} from "../../reducers/reposReducer"
import TextField from "@material-ui/core/TextField";

export default function OptionsPanel(props) {
  const dispatch = useDispatch();
  const hintValue = useSelector(state => state.repos.options.hint)
  const autoPlaySpeedValue = useSelector(state => state.repos.autoPlaySpeed)

  function hintChange(event) {
    dispatch(setHint(event.target.checked));
  }

  function autoPlaySpeedChange(event) {
    dispatch(setAutoPlaySpeed(event.target.value));
  }

  return (
    <div>
      <Drawer anchor={'left'} open={props.isOpen} onClose={props.onClose(false)}>
        <div className="optionsPanel">
          <div className="optionsPanel-title"><h1>Настройки</h1></div>

          <FormGroup row className="hintSwitch">
            <FormControlLabel
              control={< Switch checked={ hintValue } onChange={ hintChange } name="hint" /> }
              label="Включить подсказки (ctrl+alt+h)"
            />
          </FormGroup>

          <TextField
            value={autoPlaySpeedValue}
            onChange={ autoPlaySpeedChange }
            className="speedAutoPlay"
            id="outlined-number"
            label="Скорость хода автоигры, мс"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

          <VolumeSettings title={'Настройка звуков (ctrl+alt+z)'} name="sound"  />
          <VolumeSettings title={'Настройка музыки (ctrl+alt+m)'} name="music"  />

        </div>
      </Drawer>
    </div>
  );
}
