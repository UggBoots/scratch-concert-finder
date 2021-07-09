import React, { useState, useEffect } from 'react';
import Map from './Map'
import Search from './Search'
import MenuButton from './MenuButton'
import Profile from './Profile'
import LogRegDrawer from './LogRegDrawer'
import Login from './Login'
import Register from './Register'
import SearchResults from './SearchResults';
import { 
  Grid, Box, Drawer, Modal
} from '@material-ui/core';
//importing dummy data
import dummy from './dummyData';


const MainContainer = () => {

  //hooks
  const [drawerOpen, showDrawer] = useState(false)
  const [signInOpen, showSignIn] = useState(false);
  const [registerOpen, showRegister] = useState(false);
  const [searchResultsOpen, showSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  //functions
  //handleSearchForLocation - invoked on enter in search component, currently just a test to render the search results
  const handleSearchForLocation = () =>{
    //here - make async call to BE and set results in an array
    //below is using dummy data based on expected return (see dummy data component in this folder)
    setSearchResults(dummy)
    showSearchResults(true)
  }


  return (
    <Box>
      <MenuButton click={()=>showDrawer(true)} />
      <Search 
        testSearchResultsDisplay={()=>testSearchResultsDisplay()}
        handleSearchForLocation={()=>handleSearchForLocation()}
      />
      <Drawer className='logRegDrawer'
        anchor={'left'} 
        open={drawerOpen}
        onClose={()=>showDrawer(false)}>
        <LogRegDrawer 
          showSignIn={()=>showSignIn(true)}
          showRegister={()=>showRegister(true)}
          />
      </Drawer>
      <Drawer className='searchResultsDrawer'
        anchor={'bottom'}
        open={searchResultsOpen}
        onClose={()=>showSearchResults(false)}
        BackdropProps={{ invisible: true }}
        >
        <SearchResults 
          searchResults={searchResults}
        />
      </Drawer>
      <Modal className='signInModal'
        open={signInOpen}
        onClose={()=>showSignIn(false)}>
        <Login />
      </Modal>
      <Modal className='registerModal'
        open={registerOpen}
        onClose={()=>showRegister(false)}>
          <Register />
        </Modal>
      <Map />
    </Box>
  )
}

export default MainContainer;