import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import {useDispatch, useSelector} from "react-redux";
import {setHint, setMusicMute, setMusicVolume, setSoundMute, setSoundVolume} from "../../reducers/reposReducer";

const useStyles = makeStyles({
  root: {
    width: 200,
    marginTop: '25px',
  },
  title:{
    textAlign: "center"
  }
});

export default function VolumeSettings(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const mute = useSelector((state) => {
    return state.repos.options[props.name].mute
  });

  const volume = useSelector((state) => {
    return state.repos.options[props.name].volume
  });

  function muteChange(event) {
    if (props.name === 'sound') {
      dispatch(setSoundMute(event.target.checked));
    } else if (props.name === 'music') {
      dispatch(setMusicMute(event.target.checked));
    }
  }

  function volumeChange(event, newValue) {
    if (props.name === 'sound') {
      dispatch(setSoundVolume(newValue));
    } else if (props.name === 'music') {
      dispatch(setMusicVolume(newValue));
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h4>{props.title}</h4>
      </div>

      <FormControlLabel
        control={< Switch checked={ mute } onChange={ muteChange } name={props.name} /> }
        label="Выкл/Вкл"
      />

      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={volume}
            onChange={ volumeChange }
            aria-labelledby="continuous-slider"
            min={0}
            step={0.01}
            max={1}
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item>
          { volume * 100 }
        </Grid>
      </Grid>
    </div>
  );
}
