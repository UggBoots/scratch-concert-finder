import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import MainContainer from './MainContainer'


const theme = createTheme({});

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