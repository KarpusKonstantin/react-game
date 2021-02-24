import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import './optionsPanel.css'
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function TemporaryDrawer(props) {

  return (
    <div>
      <Drawer anchor={'left'} open={props.isOpen} onClose={props.onClose(false)}>
        <div className="optionsPanel">
          <h1>Настройки</h1>

          <FormGroup row>
            <FormControlLabel
              control={< Switch checked={ props.onUseHint } onChange={ props.onClickHint } name="hint" /> }
              label="Включить подсказки"
            />
          </FormGroup>
        </div>
      </Drawer>
    </div>
  );
}
