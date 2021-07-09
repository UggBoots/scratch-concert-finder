import React, { useState, useEffect } from 'react';
import Map from './Map'
import Search from './Search'
import MenuButton from './MenuButton'
import Profile from './Profile'
import LogRegDrawer from './LogRegDrawer'
import Login from './Login'
import { 
  Grid, Box, Drawer, Modal
} from '@material-ui/core';


const MainContainer = () => {

  const [drawerOpen, showDrawer] = useState(false)
  const [signInOpen, showSignIn] = useState(false);


  return (
    <Box>
      <MenuButton click={()=>showDrawer(true)} />
      <Search />
      <Drawer anchor={'left'} open={drawerOpen} onClose={()=>showDrawer(false)}>
        <LogRegDrawer 
          showSignIn={()=>showSignIn(true)}/>
      </Drawer>
      <Modal
        open={signInOpen}
        onClose={()=>showSignIn(false)}
        >
          <Login />
      </Modal>
      <Map />
    </Box>
  )
}

export default MainContainer;