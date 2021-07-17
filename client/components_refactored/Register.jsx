/**
 * ************************************
 * @module Register
 * @description MaterialUI component (React) that when Register button is clicked this Modal pops up 
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
-Rig up the link to the login route
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



const Register = React.forwardRef((props, ref) => {
  const classes = useStyles();

  //state to store input field values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, displaySuccessMsg] = useState(false);
  const [failMsg, displayFailMsg] = useState(false);

  //submit fxn to make http call to BE
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password)
    axios.post('/api/signup', {
        name: name,
        email: email,
        password: password
      }
    )
    .then((response) => {
      if (!response.data.message) {
        displayFailMsg(true);
        return;
      } else {
        axios.post('/api/signin', {
          email,
          password
        })
          .then((response) => {
            if (!response.data.user) {
              displayFailMsg(true);
              return;
            } else {
              props.setUser(response.data.user);
              displaySuccessMsg(true);
              setTimeout(()=>{
                props.setLoggedIn(true);
                props.showRegister(false); 
                props.showDrawer(false);
              }, 1500)
            }   
          })
      }   
    })
    .catch((err) => console.log(err))
  };

    //handle close for success msg
    const handleCloseS = () => {
      displaySuccessMsg(false)
    }
  
    //handle close for fail msg
    const handleCloseF = () => {
      displayFailMsg(false)
    }
  

  return (
    <div ref={ref} className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          className="regName"
          autoComplete="Name"
          autoFocus
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          className="regEmail"
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
          className="regPW"
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
          id="regClick"
        // className={classes.submit}
        >
          Register
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2">
              {"Already have an account?  Click here to log in"}
            </Link>
          </Grid>
        </Grid>
        <Snackbar
          open={successMsg}
          onClose={handleCloseS}>
          <SnackbarContent
            message={'Registration Success!  Redirecting to main page...'}
            className={classes.snackbarContent}>
          </SnackbarContent>
        </Snackbar> 
        <Snackbar
          open={failMsg}
          onClose={handleCloseF}>
          <SnackbarContent
            message={'Registration failed, please try again'}
            className={classes.snackbarContent}>
          </SnackbarContent>
        </Snackbar> 
      </form>
    </div>
  );
});

export default Register;