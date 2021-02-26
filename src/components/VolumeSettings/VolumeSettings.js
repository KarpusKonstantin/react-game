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
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h4>{props.title}</h4>
      </div>

      <FormControlLabel
        control={< Switch name="mute" /> }
        label="Выключить"
      />

      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={ handleChange } aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
      {/*<Typography id="disabled-slider" gutterBottom>*/}
      {/*  Disabled slider*/}
      {/*</Typography>*/}
      {/*<Slider disabled defaultValue={30} aria-labelledby="disabled-slider" />*/}
    </div>
  );
}
