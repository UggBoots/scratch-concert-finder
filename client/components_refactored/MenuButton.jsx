import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

//note - currently cant figure out how to get the 'login/signup' text to display...


const MenuButton = (props) => {
  return (
    <div>
      <IconButton className='MenuButton' onClick={()=>props.click()}>
        <AllInclusiveIcon style={{ fontSize: 100, color: 'pink'}} />
      </IconButton>
      <div>
        <h1 style={{padding: '5px', fontSize: '12px', zIndex: 2, color:'yellow'}}>Login/Signup</h1>
      </div>
    </div>
  );
};

export default MenuButton;