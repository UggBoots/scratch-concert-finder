import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


function LogRegDrawer(props) {
  return (
    <div>
      <List>
        <ListItem button component="a" onClick={()=>props.showSignIn()}>
          <ListItemText primary={'Log In'} />
        </ListItem>
        <Divider />
        <ListItem button component="a" onClick={()=>props.showRegister()}>
          <ListItemText primary={'Sign Up'} />
        </ListItem>
      </List>
    </div>
  );
}

export default LogRegDrawer;