/**
 * ************************************
 * @module MainContainer
 * @description React component houses @modules Map, Search, Profile, Drawers, Login, Register, and Search Results
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import Map from './Map';
import Map2 from './Map2';
import Search from './Search';
import MenuButton from './MenuButton';
import Profile from './Profile';
import LogRegDrawer from './LogRegDrawer';
import Login from './Login';
import Register from './Register';
import SearchResults from './SearchResults';
import {
  Grid,
  Box,
  Drawer,
  Modal,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
//importing dummy data
import dummy from './dummyData';
import { makeStyles } from '@material-ui/core/styles';
import getConcertsFromPredictHQ from '../api/getConcertsFromPredictHQ';
import axios from 'axios';
import DateBar from './DateBar';
import { GiHandheldFan } from 'react-icons/gi';

//styling
const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MainContainer = () => {
  const classes = useStyles();

  //hooks
  const [drawerOpen, showDrawer] = useState(false);
  const [signInOpen, showSignIn] = useState(false);
  const [registerOpen, showRegister] = useState(false);
  const [profileOpen, showProfile] = useState(false);
  const [searchResultsOpen, showSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currUser, setUser] = useState({});
  const [concerts, setConcerts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [startDate, setStartDate] = useState('01-01-2021');
  const [endDate, setEndDate] = useState('01-02-2021');
  const [radius, setRadius] = useState('');

  //getConcerts - makes call to BE to get the predictHQ results
  const getConcerts = async (lat, long) => {
    // const latLong = `${lat},${long}`;
    // data = year/month/day
    const predictHQResults = await getConcertsFromPredictHQ({
      lat: lat,
      lng: long,
      date: '2021/07/14',
      //note - below needs to be parsed
      // startDate: startDate,
      // endDate: endDate,
      radius: 25,
    });
    // console.log(predictHQResults);
    setConcerts(predictHQResults.results);
    showSearchResults(true);
  };

  //logout - sets current user to null, logged out to false
  const logOut = () => {
    setUser({});
    setLoggedIn(false);
  };

  const addFav = () => {
    let userId = currUser.userId;
    let favorite = { temp: 'temporary favorite' };
    axios
      .post('/api/addFavoriteToUser', {
        userId,
        favorite,
      })
      .then((response) => console.log('response: ', response))
      .catch((err) => console.log(err));
  };

  const [drawerHeight, setDrawerHeight] = useState(0);

  const handleResultsToggle = () => {
    // console.log(document.getElementById('bottomDrawer').offsetHeight);
    showSearchResults((prev) => !prev);
  };

  useEffect(() => {
    if (searchResultsOpen) {
      setDrawerHeight(document.getElementById('bottomDrawer').offsetHeight);
    } else setDrawerHeight(0);
  }, [searchResultsOpen, concerts]);

  // return (
  //   <Box>
  //     <Map2
  //     getConcerts={getConcerts}
  //     concerts={concerts}
  //     setStartDate={setStartDate}
  //     setEndDate={setEndDate}
  //     startDate={startDate}
  //     endDate={endDate}
  //     />
  //     <Accordion
  // //  height: '40px',
  // // position: 'fixed',
  // // bottom:'0%',
  // // width:'100%',
  // // background-color: '#393838',
  // // opacity: 1,

  return (
    <Box>
      {/* <div
        style={{
          height: '40px',
          position: 'fixed',
          bottom: '0%',
          width: '100%',
          backgroundColor: '#393838',
          zIndex: 1000,
        }}
      >
        test
      </div> */}

      <AppBar
        position="fixed"
        color="primary"
        style={{ top: 'auto', bottom: drawerHeight }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleResultsToggle}
          >
            <MenuIcon />
          </IconButton>

          <div
            style={{
              flexGrow: 1,
            }}
          />
        </Toolbar>
      </AppBar>

      <Map2
        getConcerts={getConcerts}
        concerts={concerts}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <MenuButton click={() => showDrawer(true)} />
      <Drawer
        className="logRegDrawer"
        anchor={'left'}
        open={drawerOpen}
        onClose={() => showDrawer(false)}
      >
        <LogRegDrawer
          showSignIn={() => showSignIn(true)}
          showRegister={() => showRegister(true)}
          showProfile={() => {
            showProfile(true);
            showDrawer(false);
          }}
          loggedIn={loggedIn}
          showDrawer={showDrawer}
          logOut={() => logOut()}
          addFav={addFav}
        />
      </Drawer>
      <Drawer
        className="profileDrawer"
        anchor={'right'}
        open={profileOpen}
        onClose={() => showProfile(false)}
        BackdropProps={{ invisible: true }}
        classes={{ paper: classes.paper }}
      >
        <Profile currUser={currUser} />
      </Drawer>
      <Drawer
        variant="persistent"
        className="searchResultsDrawer"
        anchor={'bottom'}
        open={searchResultsOpen}
        style={{ height: '400px' }}
        onClose={(e) => {
          console.log(e);
          showSearchResults(false);
        }}
        BackdropProps={{ invisible: true }}
      >
        <div id="bottomDrawer">
          <SearchResults searchResults={searchResults} concerts={concerts} />
        </div>
      </Drawer>
      <Modal
        className="signInModal"
        open={signInOpen}
        onClose={() => showSignIn(false)}
      >
        <Login
          currUser={currUser}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          showSignIn={showSignIn}
          showDrawer={showDrawer}
        />
      </Modal>
      <Modal
        className="registerModal"
        open={registerOpen}
        onClose={() => showRegister(false)}
      >
        <Register currUser={currUser} setUser={setUser} />
      </Modal>
    </Box>
  );
};

export default MainContainer;
