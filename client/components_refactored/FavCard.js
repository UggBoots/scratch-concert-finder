import React from 'react';
import { Typography, Card, CardContent, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const FavCard = (props) => {
  const formatAddress = (add) => {
    const str = add.replace('United States of America', '');
    return str;
  };

  console.log('props', props);
  let currentFav = props.currFavs[props.num].favorite;
  return (
    <div>
      <Card
        onClick={() =>
          props.setRecenterAt({
            latitude: currentFav.location[1],
            longitude: currentFav.location[0],
          })
        }
      >
        <CardContent>
          <Typography
            color="primary"
            className="favTitle"
            fontWeight="fontWeightBold"
          >
            {currentFav.title}
          </Typography>
          <Divider />
          {/* <Typography className='favDate' fontWeight='fontWeightBold'>
            {currentFav.startDate, ', ', currentFav.startTime}
          </Typography> */}
          <Typography component="div">
            <Box fontWeight="fontWeightBold">
              {currentFav.startDate}, {currentFav.startTime}
            </Box>
          </Typography>
          <Typography className="favLoc">
            {
              (currentFav.entities[0].name,
              ', ',
              formatAddress(currentFav.entities[0].formatted_address))
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavCard;
