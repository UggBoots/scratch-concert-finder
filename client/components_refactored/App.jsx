/**
 * ************************************
 * @module App
 * @description React main component to render on index.html
 * ************************************
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { pink, indigo } from '@material-ui/core/colors';
import MainContainer from './MainContainer'


const theme = createTheme({
  palette:{
    primary: pink,
    secondary: indigo
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/">
          <MainContainer />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;