/**
 * ************************************
 * @file index.js
 * @description main javascript file that is the React hook for index.html file
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';

//next line imports refactored App component
import App from './components_refactored/App.jsx';

render(<App />, document.getElementById('root'));