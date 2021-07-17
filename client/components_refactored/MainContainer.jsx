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
  drawer: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 150,
  },
  test: {
    width: 500,
    background: 'blue',
  },
}));

const MainContainer = () => {
  const classes = useStyles();

  let today = new Date().toISOString().slice(0, 10);

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
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [radius, setRadius] = useState(25);
  const [currFavs, setFavs] = useState([]);

  //getConcerts - makes call to BE to get the predictHQ results
  const getConcerts = async (lat, long) => {
    // const latLong = `${lat},${long}`;
    // data = year/month/day
    const predictHQResults = await getConcertsFromPredictHQ({
      lat: lat,
      lng: long,
      startDate: startDate,
      endDate: endDate,
      radius: radius,
    });
    setConcerts(predictHQResults.results);
    // showSearchResults(showSearchResultsBool);
  };

  //logout - sets current user to null, logged out to false
  const logOut = () => {
    setUser({});
    setLoggedIn(false);
    showSearchResults(false);
    showProfile(false);
    showDrawer(false);
  };

  const handleProfile = () => {
    let userId = currUser.userId;
    axios
      .post('/api/getFavorites', {
        userId,
      })
      .then((response) => {
        setFavs(response.data.favorites);
      })
      .then(() => {
        showDrawer(false);
        showProfile(true);
      })
      .catch((err) => console.log(err));
  };

  //get favs - grabs user obj and updates in state
  const getFavs = () => {
    let userId = currUser.userId;
    axios
      .post('/api/getFavorites', {
        userId,
      })
      .then((response) => {
        setFavs(response.data.favorites);
      })
      .catch((err) => console.log(err));
  };

  //addFav - adds fav in DB
  const addFav = (favorite) => {
    let userId = currUser.userId;
    axios
      .post('/api/addFavoriteToUser', {
        userId,
        favorite,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const [drawerHeight, setDrawerHeight] = useState(0);

  const handleResultsToggle = () => {
    showSearchResults((prev) => !prev);
  };

  useEffect(() => {
    if (searchResultsOpen) {
      setDrawerHeight(document.getElementById('bottomDrawer').offsetHeight);
    } else setDrawerHeight(0);
  }, [searchResultsOpen, concerts]);

  return (
    <Box>
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
        setRadius={setRadius}
        startDate={startDate}
        endDate={endDate}
        radius={radius}
        addFav={addFav}
      />
      <MenuButton click={() => showDrawer(true)} />

      <Drawer
        classes={{ paper: classes.drawer }}
        anchor={'left'}
        open={drawerOpen}
        onClose={() => showDrawer(false)}
      >
        <LogRegDrawer
          showSignIn={() => showSignIn(true)}
          showRegister={() => showRegister(true)}
          showProfile={() => {
            // getFavs()
            // showDrawer(false)
            // showProfile(true)
            handleProfile();
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
        <Profile currUser={currUser} currFavs={currFavs} />
      </Drawer>
      <Drawer
        variant="persistent"
        className="searchResultsDrawer"
        anchor={'bottom'}
        open={searchResultsOpen}
        // style={{ maxHeight: '200px' }}
        onClose={(e) => {
          console.log(e);
          showSearchResults(false);
        }}
        BackdropProps={{ invisible: true }}
      >
        <div id="bottomDrawer" style={{ maxHeight: '40vh' }}>
          <SearchResults
            searchResults={searchResults}
            concerts={concerts}
            addFav={addFav}
          />
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
        <Register
          currUser={currUser}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          showSignIn={showSignIn}
          showRegister={showRegister}
          showDrawer={showDrawer}
        />
      </Modal>
    </Box>
  );
};

export default MainContainer;
