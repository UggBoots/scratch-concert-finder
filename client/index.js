import React from 'react';
import { render } from 'react-dom';

//next line imports original App component
//import App from './components/App.jsx';

//next line imports refactored App component
import App from './components_refactored/App.jsx';

render(<App />, document.getElementById('root'));