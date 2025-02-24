/**
 * ************************************
 * @module Profile
 * @description React component houses user favorites from concert venue choices
 * ************************************
 */

 import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Divider,
  Card,
  CardContent
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FavCard from './FavCard'
import { pink, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: '#ea1e63'
  }
}));




const Profile = (props) => {

  const classes = useStyles();

  return (
    <Grid
    container 
    direction="column"
    justifyContent="center"
    alignItems="center"
    >
      
      <Typography
        color='primary'
        variant='h4'
        > 
        Welcome {props.currUser.name}!
      </Typography>
      <Avatar 
        className={classes.avatar}
      >
       {props.currUser.email[0].toUpperCase()} 
      </Avatar>

      
      <Typography
        align='center'
        color='default'
        >
        {props.currUser.email}
      </Typography>
      <hr />
      <Typography
        color='primary'
        variant='h5'
        >
        Your upcoming shows:
      </Typography>

      {/* <Card>
        <CardContent>
          <Typography color='primary'>
            {props.currUser.favorites[0].favorite.description}
          </Typography>
          <Typography>
            Date: November 28, 2021 @ 7:00 PM
          </Typography>
          <Typography>
            Location: Bowery Ballroom, 123 Bowery, New York, NY 11206
          </Typography>
        </CardContent>
      </Card> */}
      <div>
        {props.currFavs.map((card, i) => (
          <FavCard 
            currUser={props.currUser}
            currFavs={props.currFavs}
            key={i}
            num={i}/>
        ))}
      </div>
    </Grid>
  );
};

export default Profile;



//"data:image/jpeg;base64,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" 