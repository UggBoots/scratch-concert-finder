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
import { Grid, Box, Drawer, Modal } from '@material-ui/core';
//importing dummy data
import dummy from './dummyData';

const MainContainer = () => {
  //hooks
  const [drawerOpen, showDrawer] = useState(false);
  const [signInOpen, showSignIn] = useState(false);
  const [registerOpen, showRegister] = useState(false);
  const [profileOpen, showProfile] = useState(false);
  const [searchResultsOpen, showSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currUser, setUser] = useState({});

  //functions
  //handleSearchForLocation - invoked on enter in search component, currently just a test to render the search results
  const handleSearchForLocation = () => {
    //here - make async call to BE and set results in an array
    //below is using dummy data based on expected return (see dummy data component in this folder)
    setSearchResults(dummy)
    showSearchResults(true)
  }

  //handleGetUser - gets user obj from BE
  //when to invoke?
  const handleGetUser = () => {
    //make async call to /getUser
    //results are an obj containing user data, faked here as results
    const results = 
    {user: {
      name: 'Bilbo Baggins',
      email: 'bilbo@shirenet.com',
      favorites: [{
        artist: 'Rage Against the Machine',
        art: 'temp',
        date: '1 August, 2021',
        venue: 'Madison Square Garden',
        address: '4 Pennsylvania Plaza, New York, NY 10001'
      },
      {
        artist: 'Gucci Mane',
        art: 'temp',
        date: '18 July, 2021',
        venue: 'Music Hall of Williamsburg',
        address: '66 N 6th St, Brooklyn, NY 11211'
      }]
    }}
    setUser(results);
  }

  
  return (
    <Box>
      <Map2 />
      <MenuButton click={() => showDrawer(true)} />
      <Search
        testSearchResultsDisplay={() => testSearchResultsDisplay()}
        handleSearchForLocation={() => handleSearchForLocation()}
      />
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
        />
      </Drawer>
      <Drawer
        className="profileDrawer"
        anchor={'right'}
        open={profileOpen}
        onClose={() => showProfile(false)}
        BackdropProps={{ invisible: true }}
      >
        <Profile />
      </Drawer>
      <Drawer
        className="searchResultsDrawer"
        anchor={'bottom'}
        open={searchResultsOpen}
        onClose={() => showSearchResults(false)}
        BackdropProps={{ invisible: true }}
      >
        <SearchResults searchResults={searchResults} />
      </Drawer>
      <Modal
        className="signInModal"
        open={signInOpen}
        onClose={() => showSignIn(false)}
      >
        <Login />
      </Modal>
      <Modal
        className="registerModal"
        open={registerOpen}
        onClose={() => showRegister(false)}
      >
        <Register />
      </Modal>
    </Box>
  );
};

export default MainContainer;
