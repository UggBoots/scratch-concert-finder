//this should go in an overlay over the map

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Container 
} from '@material-ui/core';

const Search = () => {

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
    />
  </Container>
  )
}

export default Search;