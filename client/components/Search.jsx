//this should go in an overlay over the map

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Container 
} from '@material-ui/core';

const Search = (props) => {

  return (
  <Container className = 'SearchOverlay'>
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="search"
      label="Search for an area..."
      name="search"
      autoComplete="Search for an area..."
      autoFocus
      color="primary"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('hello there');
          props.handleSearchForLocation();
        }
      }}
    />
  </Container>
  )
}

export default Search;