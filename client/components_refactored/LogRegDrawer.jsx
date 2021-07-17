/**
 * ************************************
 * @module LogRegDrawer
 * @description MaterialUI component (React) that when Login button is clicked this Modal pops up 
 * ************************************
 */
import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { VpnKey, Edit, ExitToApp, Face } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: '40%'
  },
  snackbarContent: {
    left: '50%',
    backgroundColor: 'lightgreen',
    color: 'black',
    alignSelf: 'center'
  },
  test: {
    width: 200,
    boxShadow: theme.shadows[5],
    backgroundColor: 'pink',
    color: 'primary'
  },
  iconButton: {
    backgroundColor: 'pink'
  }
}));

function LogRegDrawer(props) {
  
  const [logOutMsg, displayLogOutMsg] = useState(false);
  const classes = useStyles();


  const handleLogout = () => {
    axios.post('/api/signout')
    .then(response=>console.log(response))
    // .then(props.setLoggedIn(false))
    .then(displayLogOutMsg(true))
    .then(setTimeout(()=>{
      props.logOut();
      props.showDrawer(false);
    }, 1500))
    .catch((err) => console.log(err))
  }

  if (props.loggedIn) {
    return (
      <div>
        <List>
          <ListItem button component="a" id="logoutID" onClick={()=>handleLogout()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
          <Divider />
          <ListItem button component="a" onClick={()=>props.showProfile()}>
          <ListItemIcon>
            <Face />
          </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>
        </List>
        <Snackbar
        open={logOutMsg}
        onClose={()=>displayLogOutMsg(false)}>
          <SnackbarContent
            message={'Logged Out - Redirecting to main page...'}
            className={classes.snackbarContent}>
          </SnackbarContent>
        </Snackbar> 
      </div>  
    );
  }
  else return (
    <div>
      <List>
        <ListItem button 
          classes={{selected: classes.iconButton}}
          component="a" 
          id="loginID" 
          onClick={()=>props.showSignIn()}>
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText  primary={'Log In'} /> 
        </ListItem>
        <Divider />
        <ListItem  button component="a"  onClick={()=>props.showRegister()}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText id="registerID" primary={'Sign Up'} />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}

export default LogRegDrawer;