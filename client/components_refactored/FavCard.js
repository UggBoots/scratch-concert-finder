import React from 'react';
import {
  Typography,
  Card,
  CardContent
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const FavCard = (props) => {


  console.log('props', props)
  let currentFav = props.currFavs[props.num].favorite;
  return (
    <div>
      <Card>
        <CardContent>
          <Typography color='primary' className='favTitle'>
            {currentFav.title}
          </Typography>
          <Typography className='favDate'>
            {currentFav.startDate, ', ', currentFav.startTime}
          </Typography>
          <Typography className='favLoc'>
            {currentFav.entities[0].name, ', ', currentFav.entities[0].formatted_address}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavCard;