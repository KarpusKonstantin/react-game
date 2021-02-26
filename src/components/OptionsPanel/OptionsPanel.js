import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import './optionsPanel.css'
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import VolumeSettings from "../VolumeSettings/VolumeSettings";
import {useDispatch, useSelector} from "react-redux";
import {setHint} from "../../reducers/reposReducer"

export default function OptionsPanel(props) {
  const dispatch = useDispatch();
  const hintValue = useSelector(state => state.repos.options.hint)

  function hintChange(event) {
    dispatch(setHint(event.target.checked));
  }

  return (
    <div>
      <Drawer anchor={'left'} open={props.isOpen} onClose={props.onClose(false)}>
        <div className="optionsPanel">
          <div className="optionsPanel-title"><h1>Настройки</h1></div>

          <FormGroup row>
            <FormControlLabel
              control={< Switch checked={ hintValue } onChange={ hintChange } name="hint" /> }
              label="Включить подсказки"
            />
          </FormGroup>

          <VolumeSettings title={'Настройка звуков'} name="sound"  />
          <VolumeSettings title={'Настройка музыки'} name="music"  />

        </div>
      </Drawer>
    </div>
  );
}
