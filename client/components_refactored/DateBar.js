import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const DateBar = (props) => {

  const handleStartDateChange = (date) => {
    props.setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    props.setEndDate(date);
  };

  // const handleSliderChange = (e, val) => {
  //   props.setRadius(val)
  // }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM-dd-yyyy"
            margin="normal"
            id="date-picker-first"
            label="Search From"
            value={props.startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM-dd-yyyy"
            margin="normal"
            id="date-picker-last"
            label="Search To"
            value={props.endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        
        <Grid item xs={4}>
          <Typography>
            {'Radius (Miles)'}
          </Typography>
          <Slider
          value={props.radius}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          marks
          min={5}
          max={50}
          onChange={(_, value) => props.setRadius(value)}
        />
      </Grid>
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DateBar;