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
import { Grid, Box, Drawer, Modal, Accordian } from '@material-ui/core';
//importing dummy data
import dummy from './dummyData';
import { makeStyles } from '@material-ui/core/styles';
import getConcertsFromPredictHQ from '../api/getConcertsFromPredictHQ';
import axios from 'axios';

//styling
const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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
  const [concerts, setConcerts] = useState([]);;
  

  //handleGetUser - gets user obj from BE
  //when to invoke?
  const handleGetUser = () => {
    // const results = 
    // {user: {
    //   name: 'Bilbo Baggins',
    //   email: 'bilbo@shirenet.com',
    //   favorites: [{
    //     artist: 'Rage Against the Machine',
    //     art: 'temp',
    //     date: '1 August, 2021',
    //     venue: 'Madison Square Garden',
    //     address: '4 Pennsylvania Plaza, New York, NY 10001'
    //   },
    //   {
    //     artist: 'Gucci Mane',
    //     art: 'temp',
    //     date: '18 July, 2021',
    //     venue: 'Music Hall of Williamsburg',
    //     address: '66 N 6th St, Brooklyn, NY 11211'
    //   }]
    // }}
    axios.post('/api/getUser', {
      params: {
        //user id goes here
      }
    })
    .then((response) => setUser(response))
    setUser(results);
  }

  //getConcerts - makes call to BE to get the predictHQ results
  const getConcerts = async (lat, long) => {
    // const latLong = `${lat},${long}`;
    // data = year/month/day
    const predictHQResults = await getConcertsFromPredictHQ({
      lat: lat,
      lng: long,
      date: '2021/07/14',
      radius: 25,
    });
    console.log(predictHQResults);
    setConcerts(predictHQResults.results);
    showSearchResults(true);
  };


  return (
    <Box>
      <Map2 
      getConcerts={getConcerts}
      concerts={concerts}
      />
      <MenuButton click={() => showDrawer(true)} />
      {/* <Search
        testSearchResultsDisplay={() => testSearchResultsDisplay()}
        handleSearchForLocation={() => handleSearchForLocation()}
      /> */}
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
            handleGetUser();
            showProfile(true);
            showDrawer(false);
          }}
        />
      </Drawer>
      <Drawer
        className="profileDrawer"
        anchor={'right'}
        open={profileOpen}
        onClose={() => showProfile(false)}
        BackdropProps={{ invisible: true }}
        classes={{paper : classes.paper}}
      >
        <Profile 
          currUser = {currUser}
        />
      </Drawer>
      <Drawer
        className="searchResultsDrawer"
        anchor={'bottom'}
        open={searchResultsOpen}
        onClose={() => showSearchResults(false)}
        BackdropProps={{ invisible: true }}
      >
        <SearchResults 
        searchResults={searchResults}
        concerts={concerts} />
      </Drawer>
      <Modal
        className="signInModal"
        open={signInOpen}
        onClose={() => showSignIn(false)}
      >
        <Login
          currUser={currUser}
          setUser={setUser} />
      </Modal>
      <Modal
        className="registerModal"
        open={registerOpen}
        onClose={() => showRegister(false)}
      >
        <Register 
          currUser={currUser}
          setUser={setUser}/>
      </Modal>
    </Box>
  );
};

export default MainContainer;
