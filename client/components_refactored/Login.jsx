/**
 * ************************************
 * @module Login
 * @description React Login component to rendered in Sign in Modal
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

/*
TODO:
-Make these functional (grab data and send to BE)
-Rig up the link to the signup route
*/


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
  }
}));

const Login = React.forwardRef((props, ref) => {
  const classes = useStyles();

  //state to store input field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, displaySuccessMsg] = useState(false);


  //function to handle login request to BE
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/signin', {
      params: {
        email,
        password
      }
    })
      .then((response) => {
        //set user
        console.log(response);
        props.setUser(response.data.user);
        console.log(props.currUser);
      })
      .then(displaySuccessMsg(true))
      .then(setTimeout(()=>{
        props.setLoggedIn(true);
        props.showSignIn(false); 
        props.showDrawer(false);
      }, 1500))
      .catch((err) => console.log(err))
  };

  //handle close for success msg
  const handleClose = () => {
    displaySuccessMsg(false)
  }

  return (
    <div ref={ref} className={classes.paper}>
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          className="logEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          className="logPW"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="logClick"
        // className={classes.submit}
        >
          Log In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Snackbar
        open={successMsg}
        onClose={handleClose}>
          <SnackbarContent
            message={'Login Success!  Redirecting to main page...'}
            className={classes.snackbarContent}>
          </SnackbarContent>
        </Snackbar> 
        
      </form>
    </div>
  );
});

export default Login;